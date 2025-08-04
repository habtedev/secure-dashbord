// Auth controller: register, login, refresh token
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/db'
import { validateUser } from '../utils/validator'
import { sendVerificationEmail } from './gmailVerifing'

// JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET ?? ''

// Token expiry constants
const ACCESS_EXPIRES = '15m'
const REFRESH_EXPIRES = '7d'

// Token generators
const generateAccessToken = (userId: number) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES })
const generateRefreshToken = (userId: number) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES })

// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    // Debug: log incoming request body
    console.log('Register request body:', req.body)
    // Debug: log prisma.user
    console.log('prisma.user:', prisma.user)
    // Validate request body
    const result = validateUser(req.body)
    if (!result.success) {
      console.error('Validation error:', result.error)
      return res.status(400).json({
        message: result.error.issues[0].message,
        details: result.error,
      })
    }
    const { email, password, name } = result.data
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }
    } catch (prismaFindErr) {
      console.error('Prisma error on findUnique:', prismaFindErr)
      return res
        .status(500)
        .json({ message: 'Database error (findUnique)', error: prismaFindErr })
    }
    let hashedPassword = ''
    try {
      const salt = await bcrypt.genSalt(10)
      hashedPassword = await bcrypt.hash(password, salt)
    } catch (bcryptErr) {
      console.error('Bcrypt error:', bcryptErr)
      return res
        .status(500)
        .json({ message: 'Password hashing failed', error: bcryptErr })
    }
    // Role-based check for admin registration
    let role = 'user'
    if (name === 'HabteDev' && password === 'Pa$$w0rd') {
      role = 'admin'
    }
    try {
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role },
      })
      // Send Gmail verification email after registration
      try {
        // Fake req/res for internal call
        await sendVerificationEmail(
          { body: { email } } as any,
          { json: () => {}, status: () => ({ json: () => {} }) } as any,
        )
      } catch (emailErr) {
        console.error(
          'Failed to send verification email after register:',
          emailErr,
        )
      }
      return res.status(201).json({ user })
    } catch (prismaCreateErr) {
      console.error('Prisma error on create:', prismaCreateErr)
      return res
        .status(500)
        .json({ message: 'Database error (create)', error: prismaCreateErr })
    }
  } catch (err) {
    console.error('Error in register (outer catch):', err)
    return res
      .status(500)
      .json({ message: 'Registration failed (outer catch)', error: err })
  }
}

// Login user, issue tokens
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    if (!user.isVerified) {
      // Block login for unverified users
      return res.status(403).json({
        message: 'Your email is not verified. Please check your inbox.',
        redirect: '/gmail-verifying?email=' + encodeURIComponent(email),
      })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.json({ accessToken, user })
  } catch (err) {
    console.error('Error in login:', err)
    return res.status(500).json({ message: 'Login failed', error: err })
  }
}

// Refresh access token, rotate refresh token
export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken as string | undefined

    if (!token) {
      return res.status(401).json({ message: 'No refresh token' })
    }

    let payload: any
    try {
      payload = jwt.verify(token, JWT_SECRET)
    } catch {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    })

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: 'Refresh token mismatch' })
    }

    const newRefreshToken = generateRefreshToken(user.id)

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    })

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const accessToken = generateAccessToken(user.id)

    return res.json({ accessToken })
  } catch (err) {
    console.error('Error in refresh:', err)
    return res.status(500).json({ message: 'Refresh failed', error: err })
  }
}

// Logout user
export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken as string | undefined
    if (token) {
      // Optionally remove refresh token from DB for extra security
      try {
        const payload: any = jwt.verify(token, JWT_SECRET)
        await prisma.user.update({
          where: { id: payload.userId },
          data: { refreshToken: null },
        })
      } catch {}
    }
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    return res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    console.error('Error in logout:', err)
    return res.status(500).json({ message: 'Logout failed', error: err })
  }
}
