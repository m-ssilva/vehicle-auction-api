const supertest = require('supertest')
const app = require('../../../app')
const nock = require('nock')
const allVehiclesMock = require('../../mocks/allVehicles.json')
const putVehicleMock = require('../../mocks/putVehicle.json')
const expectedPutVehicle = require('../../expected/put.vehicle.json')

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

describe('PUT on /auction/vehicle/:id', () => {
  test('return 200 and a message with the updated vehicle information', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'consultar' })
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'alterar', 'VEICULO': putVehicleMock })
      .reply(200, putVehicleMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .put('/auction/vehicle/1')
      .send({ bid_user: 'mssilva' })
      .expect(200, expectedPutVehicle)
  })

  test('return 400 when invalid parameters is provided', async () => {
    await request
      .put('/auction/vehicle/1')
      .send({ aaa: 'WRONG_PARAMETER' })
      .expect(400)
  })

  test('return 404 and not found message when id of vehicle is not found', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'consultar' })
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'alterar', 'VEICULO': putVehicleMock })
      .reply(200, putVehicleMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .put('/auction/vehicle/9452')
      .send({ bid_user: 'mssilva' })
      .expect(404, { message: 'O ID de veículo informado não foi encontrado' })
  })

  test('return 500 and return a error message when integration returns a error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'consultar' })
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .put('/auction/vehicle/1')
      .send({ bid_user: 'mssilva' })
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })
})