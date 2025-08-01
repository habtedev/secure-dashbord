import { Router } from 'express'
import {
  requestReset,
  resetPassword,
  resendResetLink,
} from '../controllers/resetPassword'

const router = Router()

router.post('/request-reset', requestReset)
router.post('/reset-password', resetPassword)
router.post('/resend-reset', resendResetLink)

export default router
