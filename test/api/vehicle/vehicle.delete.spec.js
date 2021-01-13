const supertest = require('supertest')
const app = require('../../../app')
const nock = require('nock')
const allVehiclesMock = require('../../mocks/allVehicles.json')

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

describe('DELETE on /v1/auction/vehicles/:id', () => {
  test('return 200 when a valid id is provided', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'consultar' })
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'apagar', 'VEICULO': { 'ID': 1 } })
      .reply(200, { 'mensagem': 'sucesso' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .delete('/v1/auction/vehicles/1')
      .expect(204)
  })

  test('return 400 when a invalid id is provided', async () => {
    await request
      .delete('/v1/auction/vehicles/invalid_id')
      .expect(400)
  })

  test('return 404 when vehicle id is not found in API', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo', { 'OPERACAO': 'consultar' })
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .delete('/v1/auction/vehicles/6541')
      .expect(404, { message: 'O ID de veículo informado não foi encontrado' })
  })
})