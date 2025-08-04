import { Router } from 'express'
import {
  sendVerificationEmail,
  verifyEmail,
} from '../controllers/gmailVerifing'

const router = Router()

router.post('/send-verification', sendVerificationEmail)
router.post('/resend', sendVerificationEmail)
router.post('/verify', verifyEmail)

export default router
