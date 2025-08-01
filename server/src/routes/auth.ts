import { Router } from 'express'
import { register, login, refresh, logout } from '../controllers/authcontroller'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)

export default router
