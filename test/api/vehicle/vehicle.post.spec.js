const supertest = require('supertest')
const app = require('../../../app')
const nock = require('nock')
const postVehicleMock = require('../../mocks/postVehicle.json')
const createdVehicleMock = require('../../mocks/createdVehicle.json')
const expectedCreateVehicle = require('../../expected/post.vehicle.json')

let request
let server

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
})

afterEach(() => {
  server.close()
  nock.cleanAll()
})

describe('POST on /v1/auction/vehicles', () => {
  test('return 201 and a message with the created vehicle', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, createdVehicleMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .post('/v1/auction/vehicles')
      .send(postVehicleMock)
      .expect(201, expectedCreateVehicle)
  })

  test('return 400 when valid parameters is not provided', async () => {
    await request
      .post('/v1/auction/vehicles')
      .send({})
      .expect(400)
  })

  test('return 500 and a error message when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .post('/v1/auction/vehicles')
      .send(postVehicleMock)
      .expect(500, { message: 'Ocorreu um problema ao realizar o cadastro do veículo' })
  })
})