// Resend password reset link
export const resendResetLink = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await prisma.auth.findUnique({ where: { email } })
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  const now = new Date()
  if (user.resetToken && user.resetTokenExpiry && user.resetTokenExpiry > now) {
    return res.json({ message: 'Password reset link resent' })
  }
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(now.getTime() + 60 * 60 * 1000)
  await prisma.auth.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expires },
  })
  return res.json({ message: 'Password reset link resent' })
}
import { Request, Response } from 'express'
import prisma from '../config/db'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// Request password reset: send email with token
export const requestReset = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await prisma.auth.findUnique({ where: { email } })
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  const now = new Date()
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour
  await prisma.auth.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expires },
  })
  return res.json({ message: 'Password reset link sent' })
}

// Reset password: verify token and update password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body
  const user = await prisma.auth.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  })
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' })
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  await prisma.auth.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })
  return res.json({ message: 'Password reset successful' })
}
