import { json, Request, Response } from 'express'
import prisma from '../config/db'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendGmailVerificationEmail(email: string, token: string) {
  const verifyUrl = `${
    process.env.FRONTEND_URL || 'http://localhost:5173'
  }/gmail-verifying?token=${token}`
  await transporter.sendMail({
    from: `"Dashboard Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify Your Email - Secure Dashboard',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; border:1px solid #e5e7eb; border-radius:12px; background:#f9fafb; padding:32px;">
        <div style="text-align:center; margin-bottom:24px;">
          <img src="https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg" alt="Dashboard Logo" width="48" height="48" style="margin-bottom:8px;" />
          <h2 style="color:#2563eb; font-size:1.5rem; margin:0;">Secure Dashboard</h2>
        </div>
        <p style="color:#222; font-size:1rem;">Hi,</p>
        <p style="color:#222; font-size:1rem;">Thank you for registering! Please verify your email address by clicking the button below. This link will expire in <b>24 hours</b>.</p>
        <div style="text-align:center; margin:32px 0;">
          <a href="${verifyUrl}" style="display:inline-block; padding:12px 32px; background:#2563eb; color:#fff; border-radius:8px; font-weight:bold; text-decoration:none; font-size:1rem;">Verify Email</a>
        </div>
        <p style="color:#222; font-size:0.95rem;">If the button above doesn't work, copy and paste this link into your browser:</p>
        <div style="background:#e0e7ef; color:#222; padding:10px; border-radius:6px; word-break:break-all; font-size:0.95rem; margin-bottom:16px;">${verifyUrl}</div>
        <p style="color:#666; font-size:0.95rem;">If you did not create an account, you can safely ignore this email or <a href="mailto:support@example.com" style="color:#2563eb;">contact support</a>.</p>
        <div style="margin-top:32px; text-align:center; color:#aaa; font-size:0.85rem;">&copy; ${new Date().getFullYear()} Secure Dashboard</div>
      </div>
    `,
  })
}

// Send email verification link
export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  try {
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' })
    }
    // Rate limit: 3 per 24 hours
    const now = new Date()
    let resetCount = false
    if (user.verifyEmailSentAt) {
      const diff = now.getTime() - new Date(user.verifyEmailSentAt).getTime()
      if (diff < 24 * 60 * 60 * 1000) {
        if ((user.verifyEmailSentCount ?? 0) >= 3) {
          return res
            .status(429)
            .json({
              message: 'Resend limit reached. Please try again in 24 hours.',
            })
        }
      } else {
        resetCount = true
      }
    } else {
      resetCount = true
    }
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verifyToken: token,
        verifyTokenExpiry: expires,
        verifyEmailSentCount: resetCount
          ? 1
          : (user.verifyEmailSentCount ?? 0) + 1,
        verifyEmailSentAt: now,
      },
    })
    await sendGmailVerificationEmail(user.email, token)
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
  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token,
      verifyTokenExpiry: { gt: new Date() },
    },
  })
  try {
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }
    await prisma.user.update({
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
