const request = require("supertest");
const app = require("../app");
const DB = require('../dbConfig')

describe('make payment success', () => {
  it('return success respond if user provide correct payment details', async () => {
    const respond = await request(app).post('/api/v1/payments').send({
      cvv:111,
      account_number:'9812345678',
      account_name:'saman',
      expDate:'2021-12-12'
    })
    expect(respond.status).toEqual(200)
    closeDatabase()
  });
})

describe('make payment fail', () => {
  it('return bad request if user not valid payment details', async () => {
    const respond = await request(app).post('/api/v1/payments').send({
      cvv:1112,
      account_number:'9812345678',
      account_name:'saman',
      expDate:'2021-12-12'
    })
    expect(respond.status).toEqual(400)
    closeDatabase()
  });
})

const closeDatabase = () => {
  DB.disconnect().then(() => {
    console.log('database connection close')
  })
}

