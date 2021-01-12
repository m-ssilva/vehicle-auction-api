const { LUIZA_API } = require('../../configs')
const request = require('./request')

const getAllVehicles = () =>
  request({
    url: LUIZA_API.URL,
    method: 'post',
    data: { 'OPERACAO': 'consultar' }
  }).catch(_e => {
    throw new Error('ERROR_ON_GET_ALL_VEHICLES')
  })

const createVehicle = vehicle =>
  request({
    url: LUIZA_API.URL,
    method: 'post',
    data: { 'OPERACAO': 'criar', 'VEICULO': vehicle }
  }).catch(_e => {
    throw new Error('ERROR_CREATING_VEHICLE')
  })

const updateVehicle = vehicle =>
  request({
    url: LUIZA_API.URL,
    method: 'post',
    data: { 'OPERACAO': 'alterar', 'VEICULO': vehicle }
  }).catch(_e => {
    throw new Error('ERROR_UPDATING_VEHICLE')
  })

const deleteVehicle = vehicleId =>
  request({
    url: LUIZA_API.URL,
    method: 'post',
    data: { 'OPERACAO': 'apagar', 'VEICULO': { 'ID': vehicleId } }
  }).catch(_e => {
    throw new Error('ERROR_DELETING_VEHICLE')
  })

module.exports = {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
}