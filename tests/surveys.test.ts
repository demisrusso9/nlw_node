import request from 'supertest'
import createConnection from '../src/database'
import app from '../src/app'

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('should be able to create a new surveys', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'This is a simple survey',
      description: 'random letters'
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})
