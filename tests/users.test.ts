import request from 'supertest'
import createConnection from '../src/database'
import app from '../src/app'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('should be able to create a new user ', async () => {
    const response = await request(app).post('/users').send({
      name: 'User example',
      email: 'user@example.com'
    })

    expect(response.status).toBe(201)
  })

  it('should not be able to create an user with existing email ', async () => {
    const response = await request(app).post('/users').send({
      name: 'User example',
      email: 'user@example.com'
    })

    expect(response.status).toBe(400)
  })

  it('should be able to delete an existing user', async () => {
    const response = await request(app).delete('/users/user@example.com')

    expect(response.body.message).toBe('User removed successfully')
  })
})
