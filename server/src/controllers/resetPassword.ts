import { Request, Response } from 'express'
import prisma from '../config/db'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
// Nodemailer transporter setup using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Utility to send password reset email
async function sendResetEmail(email: string, token: string) {
  const resetUrl = `${
    process.env.FRONTEND_URL || 'http://localhost:5173'
  }/new-password?token=${token}`
  try {
    const info = await transporter.sendMail({
      from: `"Dashboard Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reset Your Password - Secure Dashboard',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; border:1px solid #e5e7eb; border-radius:12px; background:#f9fafb; padding:32px;">
          <div style="text-align:center; margin-bottom:24px;">
            <img src="https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg" alt="Dashboard Logo" width="48" height="48" style="margin-bottom:8px;" />
            <h2 style="color:#2563eb; font-size:1.5rem; margin:0;">Secure Dashboard</h2>
          </div>
          <p style="color:#222; font-size:1rem;">Hi,</p>
          <p style="color:#222; font-size:1rem;">We received a request to reset your password. Click the button below to set a new password. This link will expire in <b>30 minutes</b>.</p>
          <div style="text-align:center; margin:32px 0;">
            <a href="${resetUrl}" style="display:inline-block; padding:12px 32px; background:#2563eb; color:#fff; border-radius:8px; font-weight:bold; text-decoration:none; font-size:1rem;">Reset Password</a>
          </div>
          <p style="color:#222; font-size:0.95rem;">If the button above doesn't work, copy and paste this link into your browser:</p>
          <div style="background:#e0e7ef; color:#222; padding:10px; border-radius:6px; word-break:break-all; font-size:0.95rem; margin-bottom:16px;">${resetUrl}</div>
          <p style="color:#666; font-size:0.95rem;">If you did not request a password reset, you can safely ignore this email or <a href="mailto:support@example.com" style="color:#2563eb;">contact support</a>.</p>
          <div style="margin-top:32px; text-align:center; color:#aaa; font-size:0.85rem;">&copy; ${new Date().getFullYear()} Secure Dashboard</div>
        </div>
      `,
    })
    console.log('Password reset email sent:', info.response)
  } catch (err) {
    console.error('Nodemailer sendMail error:', err)
    throw err
  }
}

// Resend password reset link
export const resendResetLink = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  const now = new Date()
  if (user.resetToken && user.resetTokenExpiry && user.resetTokenExpiry > now) {
    return res.json({ message: 'Password reset link resent' })
  }
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(now.getTime() + 60 * 60 * 1000)
  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expires },
  })
  return res.json({ message: 'Password reset link resent' })
}

// Request password reset: send email with token (generic response, 30min expiry)
export const requestReset = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (user) {
    const now = new Date()
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(now.getTime() + 30 * 60 * 1000) // 30 minutes
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: expires },
    })
    try {
      await sendResetEmail(email, token)
    } catch (err) {
      // Optionally log error, but do not reveal to user
      console.error('Error sending reset email:', err)
    }
  }
  // Always respond with generic message
  return res.json({
    message: 'If your email is registered, a reset link has been sent.',
  })
}

// Reset password: verify token and update password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body
  const user = await prisma.user.findFirst({
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
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })
  return res.json({ message: 'Password reset successful' })
}
