const request = require("supertest");
const app = require("../app");
const DB = require('../dbConfig')

describe('log in user success', () => {
  it('return success request if user provide correct email and password', async () => {
    const respond = await request(app).post('/api/v1/auth/signingUser').send({
      email:'lahiru@gmail.com',
      password:'Lahiru12@'
    })
    expect(respond.status).toEqual(200)
    closeDatabase()
  });
})

describe('log in user fail', () => {
  it('return bad request if user not provide email or password', async () => {
    const respond = await request(app).post('/api/v1/auth/signingUser').send({
      email:'lahiru@gmail.com',
      password:'lahiru12@1'
    })
    expect(respond.status).toEqual(401)
    closeDatabase()
  });
})

const closeDatabase = () => {
  DB.disconnect().then(() => {
    console.log('database connection close')
  })
}

