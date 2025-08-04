import request from 'supertest'
import app from '../../../src/app'

describe('Auth Integration', () => {
  // Register a unique user for each test to avoid duplication issues
  it('should register a new user', async () => {
    const uniqueEmail = `test+${Date.now()}@example.com`
    const res = await request(app).post('/api/auth/register').send({
      email: uniqueEmail,
      password: 'Test1234!',
      name: 'Test User',
    })
    expect(res.statusCode).toBe(201)
    expect(res.body.user).toBeDefined()
  })

  it('should login with valid credentials', async () => {
    const email = `login+${Date.now()}@example.com`
    await request(app).post('/api/auth/register').send({
      email,
      password: 'Login1234!',
      name: 'Login User',
    })
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'Login1234!' })
    expect(res.statusCode).toBe(200)
    expect(res.body.accessToken).toBeDefined()
    expect(res.body.user).toBeDefined()
  })

  it('should request password reset', async () => {
    const email = `reset+${Date.now()}@example.com`
    await request(app).post('/api/auth/register').send({
      email,
      password: 'Reset1234!',
      name: 'Reset User',
    })
    const res = await request(app)
      .post('/api/password/request-reset')
      .send({ email })
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/Password reset link sent/)
  })

  it('should resend password reset link', async () => {
    const email = `resend+${Date.now()}@example.com`
    await request(app).post('/api/auth/register').send({
      email,
      password: 'Resend1234!',
      name: 'Resend User',
    })
    const res = await request(app)
      .post('/api/password/resend-reset')
      .send({ email })
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/Password reset link resent/)
  })

  it('should send verification email', async () => {
    const email = `verify+${Date.now()}@example.com`
    await request(app).post('/api/auth/register').send({
      email,
      password: 'Verify1234!',
      name: 'Verify User',
    })
    const res = await request(app)
      .post('/api/email/send-verification')
      .send({ email })
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/Verification email sent/)
  })
})
