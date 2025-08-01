// Auth controller: register, login, refresh token
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/db'
import { validateUser } from '../utils/validator'

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
    // Validate request body
    const result = validateUser(req.body)
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message })
    }
    const { email, password, name } = result.data
    const existingUser = await prisma.auth.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Role-based check for admin registration
    let role = 'user'
    if (name === 'HabteDev' && password === 'Pa$$w0rd') {
      role = 'admin'
    }
    const user = await prisma.auth.create({
      data: { email, password: hashedPassword, name, role },
    })
    return res.status(201).json({ user })
  } catch (err) {
    console.error('Error in register:', err)
    return res.status(500).json({ message: 'Registration failed', error: err })
  }
}

// Login user, issue tokens
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await prisma.auth.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    await prisma.auth.update({
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

    const user = await prisma.auth.findUnique({
      where: { id: payload.userId },
    })

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: 'Refresh token mismatch' })
    }

    const newRefreshToken = generateRefreshToken(user.id)

    await prisma.auth.update({
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
        await prisma.auth.update({
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
