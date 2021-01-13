const supertest = require('supertest')
const app = require('../../../app')
const nock = require('nock')
const allVehiclesMock = require('../../mocks/allVehicles.json')
const expectedGetVehiclesOrdened = require('../../expected/get.vehicles.ordened.json')
const expectedGetVehicle = require('../../expected/get.vehicles.json')
const expectedGetVehicleId = require('../../expected/get.vehicle.id.json')
const expectedGetVehicleManufacturer = require('../../expected/get.vehicle.manufacturer.json')

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

describe('GET on /v1/auction/vehicles', () => {
  test('return 200 and a list of vehicles when integration returns success', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles')
      .expect(200, expectedGetVehicle)
  })

  test('return 200 and sort vehicles by option provided', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles')
      .query({ sort: 'id', order: 'desc' })
      .expect(200, expectedGetVehiclesOrdened)
  })

  test('return 500 and an error message when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles')
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })
})

describe('GET on /v1/auction/vehicles/:id', () => {
  test('return 200 and a unique vehicle based on provided ID, when integration returns success', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/1')
      .expect(200, expectedGetVehicleId)
  })

  test('return 404 and a not found message, when integration returns success but vehicleID is not found', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/945')
      .expect(404, { message: 'O ID de veículo informado não foi encontrado' })
  })

  test('return 500 and a error message, when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/1')
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })

  test('return 400, when a invalid id is provided', async () => {
    await request
      .get('/v1/auction/vehicles/non_valid')
      .expect(400)
  })
})

describe('GET on /v1/auction/vehicles/lot/:lot', () => {
  test('return 200 and a list of vehicles filtered by lot, when integration returns success', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/lot/0196')
      .expect(200, expectedGetVehicle)
  })

  test('return 200 and a list of vehicles filtered by lot and orderned by provided options, when integration returns success', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/lot/0196')
      .query({ sort: 'id', order: 'desc' })
      .expect(200, expectedGetVehiclesOrdened)
  })

  test('return 404 and a not found message when vehicles with provided lot is not found', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/lot/4040')
      .expect(404, { message: 'O lote de veículo informado não foi encontrado' })
  })

  test('return 500 and a error message when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/lot/0196')
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })
})

describe('GET on /v1/auction/vehicles/manufacturer/:manufacturer', () => {
  test('return 200 and a list of vehicles filtered by provided manufacturer name', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacturer/fiat')
      .expect(200, expectedGetVehicleManufacturer)
  })

  test('return 404 and an not found message when manufacturer name is not found', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacturer/non_valid')
      .expect(404, { message: 'O fabricante de veículo informado não foi encontrado' })
  })

  test('return 500 and a error message when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacturer/fiat')
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })
})

describe('GET on /auction/vehicle/model/:modelName', () => {
  test('return 200 and a list of vehicles based on provided model name', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/model/palio')
      .expect(200, [expectedGetVehicle[1]])
  })

  test('return 200 and a list of vehicles when partial name is provided', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/model/cli')
      .expect(200, [expectedGetVehicle[0]])
  })

  test('return 404 when model name provided is not found', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/model/not_valid')
      .expect(404, { message: 'O modelo de veículo informado não foi encontrado' })
  })

  test('return 500 and a error message when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/model/not_valid')
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })
})

describe('GET on /v1/auction/vehicles/manufacture/:manufactureYear/model/:modelYear', () => {
  test('return 200 and a list of vehicles based on provided manufacture year and model year', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacture/2004/model/2004')
      .expect(200, [expectedGetVehicle[1]])
  })

  test('return 404 and a not found message when a vehicle is not found with the provided filter options', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacture/2010/model/2010')
      .expect(404, { message: 'Não foi encontrado veículos com a combinação de ano de fabricação e ano de modelo informado' })
  })

  test('return 500 and a error message when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacture/2004/model/2004')
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })
})

describe('GET on /v1/auction/vehicles/manufacture/:startYear/:endYear', () => {
  test('return 200 and a list of vehicles based on provided parameters', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacture/2004/2007')
      .expect(200, expectedGetVehicle)
  })

  test('return 404 when vehicles is not found with the provided parameters', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(200, allVehiclesMock, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacture/2009/2012')
      .expect(404, { message: 'Não foi encontrado veículos com o período de ano informado' })
  })

  test('return 500 and a error message when integration returns error', async () => {
    nock('https://dev.apiluiza.com.br')
      .post('/legado/veiculo')
      .reply(500, { message: 'ANY_ERROR' }, { 'Access-Control-Allow-Origin': '*' })

    await request
      .get('/v1/auction/vehicles/manufacture/2004/2007')
      .expect(500, { message: 'Ocorreu um erro interno ao consultar a listagem de veículos' })
  })
})