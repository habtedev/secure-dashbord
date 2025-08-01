import { json, Request, Response } from 'express'
import prisma from '../config/db'
import crypto from 'crypto'
// import your email sending utility here (e.g., nodemailer)

// Send email verification link
export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await prisma.auth.findUnique({ where: { email } })
  try {
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' })
    }
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    await prisma.auth.update({
      where: { id: user.id },
      data: { verifyToken: token, verifyTokenExpiry: expires },
    })
    // TODO: Send email with verification link containing token
    // e.g., sendVerificationEmail(user.email, token)
    return res.json({ message: 'Verification email sent' })
  } catch (err) {
    console.error('Error in sendVerificationEmail:', err)
    return res
      .status(500)
      .json({ message: 'Send verification email failed', error: err })
  }
}

// Verify email with token
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.body
  const user = await prisma.auth.findFirst({
    where: {
      verifyToken: token,
      verifyTokenExpiry: { gt: new Date() },
    },
  })
  try {
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }
    await prisma.auth.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    })
    return res.json({ message: 'Email verified successfully' })
  } catch (err) {
    console.error('Error in verifyEmail:', err)
    return res.status(500).json({ message: 'Verify email failed', error: err })
  }
}
