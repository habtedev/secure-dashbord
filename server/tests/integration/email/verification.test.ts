import request from 'supertest'
import app from '../../../src/app'

describe('Email Verification Integration', () => {
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
