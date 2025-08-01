// Example: Facebook login callback
export const facebookLogin = async (req: Request, res: Response) => {
  // req.user should be set by passport-facebook or similar middleware
  const { email, name, facebookId } = req.user as any
  let user = await prisma.auth.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.auth.create({
      data: { email, name, facebookId, isVerified: true },
    })
  }
  // Issue JWT
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET ?? '',
    {
      expiresIn: '15m',
    },
  )
  try {
    return res.json({ accessToken, user })
  } catch (err) {
    console.error('Error in facebookLogin:', err)
    return res
      .status(500)
      .json({ message: 'Facebook login failed', error: err })
  }
}
import { Request, Response } from 'express'
import prisma from '../config/db'
import jwt from 'jsonwebtoken'
// import passport or your OAuth utility here

// Example: Google login callback
export const googleLogin = async (req: Request, res: Response) => {
  // req.user should be set by passport-google-oauth or similar middleware
  const { email, name, googleId } = req.user as any
  let user = await prisma.auth.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.auth.create({
      data: { email, name, googleId, isVerified: true },
    })
  }
  // Issue JWT
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET ?? '',
    {
      expiresIn: '15m',
    },
  )
  try {
    return res.json({ accessToken, user })
  } catch (err) {
    console.error('Error in googleLogin:', err)
    return res.status(500).json({ message: 'Google login failed', error: err })
  }
}
