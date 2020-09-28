import request from 'supertest'

import { Connection, getConnection } from 'typeorm'

import createConnection from '@shared/infra/typeorm/index'

import app from '@shared/infra/http/app'

let connection: Connection

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection')

    await connection.query('DROP TABLE IF EXISTS products')
    await connection.query('DROP TABLE IF EXISTS users')
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM products')
    await connection.query('DELETE FROM users')
  })

  afterAll(async () => {
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '12345678'
    })

    expect(response.body).toHaveProperty('id')
  })

  it('should not be able to create a user with one e-mail thats already registered', async () => {
    const user = await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '12345678'
    })

    expect(user.body).toHaveProperty('id')

    const response = await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '12345678'
    })

    expect(response.status).toBe(400)
  })

  it('should be able to authenticate', async () => {
    const user = await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '12345678'
    })

    const response = await request(app).post('/sessions').send({
      email: 'user@email.com',
      password: '12345678'
    })

    expect(response.body).toHaveProperty('token')
    expect(response.body.user.id).toEqual(user.body.id)
  })

  it('should not be able to authenticate with non existing user', async () => {
    const response = await request(app).post('/sessions').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '12345678'
    })

    expect(response.status).toBe(401)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '12345678'
    })

    const response = await request(app).post('/sessions').send({
      email: 'user@email.com',
      password: '1234567'
    })

    expect(response.status).toBe(401)
  })

  it('should be able to create a new product', async () => {
    await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '123456'
    })

    const session = await request(app).post('/sessions').send({
      email: 'user@email.com',
      password: '123456'
    })

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Produto 01',
        description: 'Produto 01',
        price: 500,
        image:
          'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg',
        user_id: session.body.user.id
      })

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Produto 01',
        description: 'Produto 01',
        price: 500,
        image:
          'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg',
        user_id: session.body.user.id
      })
    )
  })

  it('should be able to update a product', async () => {
    await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '123456'
    })

    const session = await request(app).post('/sessions').send({
      email: 'user@email.com',
      password: '123456'
    })

    const createdProduct = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Produto 01',
        description: 'Produto 01',
        price: 500,
        image:
          'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg',
        user_id: session.body.user.id
      })

    const updatedProduct = await request(app)
      .put(`/products/${createdProduct.body.id}`)
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Produto 02',
        description: 'Produto 02',
        price: 300,
        image:
          'https://images-na.ssl-images-amazon.com/images/I/413V3QwQ2sL._AC_.jpg',
        user_id: session.body.user.id
      })

    expect(updatedProduct.body).toEqual(
      expect.objectContaining({
        name: 'Produto 02',
        description: 'Produto 02',
        price: 300,
        image:
          'https://images-na.ssl-images-amazon.com/images/I/413V3QwQ2sL._AC_.jpg',
        user_id: session.body.user.id
      })
    )
  })

  it('should be able to delete a product', async () => {
    await request(app).post('/users').send({
      name: 'newUser',
      email: 'user@email.com',
      password: '123456'
    })

    const session = await request(app).post('/sessions').send({
      email: 'user@email.com',
      password: '123456'
    })

    const createdProduct = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Produto 01',
        description: 'Produto 01',
        price: 500,
        image:
          'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg',
        user_id: session.body.user.id
      })

    const deletedProduct = await request(app)
      .delete(`/products/${createdProduct.body.id}`)
      .set('Authorization', `Bearer ${session.body.token}`)

    expect(deletedProduct.body).toEqual(expect.objectContaining({}))
  })
})
