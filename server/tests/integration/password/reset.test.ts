import request from 'supertest'
import app from '../../../src/app'

describe('Password Reset Integration', () => {
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
})
