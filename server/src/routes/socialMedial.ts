import { Router } from 'express'
import { googleLogin, facebookLogin } from '../controllers/socialMedial'

const router = Router()

router.post('/google', googleLogin)
router.post('/facebook', facebookLogin)

export default router
