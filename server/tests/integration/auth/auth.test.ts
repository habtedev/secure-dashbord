import request from 'supertest'
import app from '../../../src/app'

describe('Auth Integration', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'Test1234!',
      name: 'Test User',
    })
    expect(res.statusCode).toBe(201)
    expect(res.body.user).toBeDefined()
  })

  it('should login with valid credentials', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'login@example.com',
      password: 'Login1234!',
      name: 'Login User',
    })
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'Login1234!' })
    expect(res.statusCode).toBe(200)
    expect(res.body.accessToken).toBeDefined()
    expect(res.body.user).toBeDefined()
  })

  it('should request password reset', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'reset@example.com',
      password: 'Reset1234!',
      name: 'Reset User',
    })
    const res = await request(app)
      .post('/api/password/request-reset')
      .send({ email: 'reset@example.com' })
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/Password reset link sent/)
  })

  it('should resend password reset link', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'resend@example.com',
      password: 'Resend1234!',
      name: 'Resend User',
    })
    const res = await request(app)
      .post('/api/password/resend-reset')
      .send({ email: 'resend@example.com' })
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/Password reset link resent/)
  })

  it('should send verification email', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'verify@example.com',
      password: 'Verify1234!',
      name: 'Verify User',
    })
    const res = await request(app)
      .post('/api/email/send-verification')
      .send({ email: 'verify@example.com' })
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/Verification email sent/)
  })
}) 
