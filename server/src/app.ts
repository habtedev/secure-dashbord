import express from 'express'
import cookieParser from 'cookie-parser'
import { register, login, refresh, logout } from './controllers/authcontroller'
import resetPasswordRouter from './routes/resetPassword'
import gmailVerifingRouter from './routes/gmailVerifing'

const app = express()

app.use(express.json())
app.use(cookieParser())

// Auth routes
app.post('/api/auth/register', register)
app.post('/api/auth/login', login)
app.post('/api/auth/refresh', refresh)
app.post('/api/auth/logout', logout)

// Password reset routes
app.use('/api/password', resetPasswordRouter)

// Email verification routes
app.use('/api/email', gmailVerifingRouter)

app.get('/', (req, res) => {
  res.send('Secure Dashboard API is running')
})

export { app }
export default app
