import request from 'supertest'
import app from '../../../src/app'

describe('Resend Password Reset Link Integration', () => {
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
})
