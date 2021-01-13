const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const utc = require('dayjs/plugin/utc')

dayjs.extend(customParseFormat)
dayjs.extend(utc)

const dateToString = date => {
  if (date) return dayjs(date).utc(true).format("DD/MM/YYYY - HH:mm")
}

const stringToDate = stringDate => {
  if (stringDate) return dayjs(stringDate, "DD/MM/YYYY - HH:mm").utc(true).format()
}

const supportedOrderByFields = ['id', 'lot', 'control_code', 'manufacture_year', 'model_year', 'bid.date', 'bid.value']

const singleVehicleMapper = vehicle => ({
  id: vehicle.ID,
  lot: vehicle.LOTE,
  control_code: vehicle.CODIGOCONTROLE,
  manufacturer_name: vehicle.MARCA,
  manufacture_year: vehicle.ANOFABRICACAO,
  model_name: vehicle.MODELO,
  model_year: vehicle.ANOMODELO,
  bid: {
    date: stringToDate(vehicle.DATALANCE),
    value: vehicle.VALORLANCE,
    user: vehicle.USUARIOLANCE
  }
})

const vehicleMapperLegacy = vehicle => ({
  DATALANCE: dateToString(vehicle.bid.date),
  LOTE: vehicle.lot,
  CODIGOCONTROLE: vehicle.control_code,
  MARCA: vehicle.manufacturer_name,
  MODELO: vehicle.model_name,
  ANOFABRICACAO: vehicle.manufacture_year,
  ANOMODELO: vehicle.model_year,
  VALORLANCE: vehicle.bid.value,
  USUARIOLANCE: vehicle.bid.user
})

const vehicleMapper = vehicles => {
  if (vehicles.length) return vehicles.map(vehicle => singleVehicleMapper(vehicle))
  return singleVehicleMapper(vehicles)
}

const sortDateAscending = (vehicles, fieldArray) =>
  vehicles.sort((a, b) => new Date(a[fieldArray[0]][fieldArray[1]]) - new Date(b[fieldArray[0]][fieldArray[1]]))

const sortDateDescending = (vehicles, fieldArray) =>
  vehicles.sort((a, b) => new Date(b[fieldArray[0]][fieldArray[1]]) - new Date(a[fieldArray[0]][fieldArray[1]]))

const ascendingOrder = (vehicles, field) => {
  if (!field.includes('.')) return vehicles.sort((a, b) => a[field] - b[field])
  const splitedField = field.split('.')
  if (splitedField[1] === 'date') return sortDateAscending(vehicles, splitedField)
  return vehicles.sort((a, b) => a[splitedField[0]][splitedField[1]] - b[splitedField[0]][splitedField[1]])
}

const descendingOrder = (vehicles, field) => {
  if (!field.includes('.')) return vehicles.sort((a, b) => b[field] - a[field])
  const splitedField = field.split('.')
  if (splitedField[1] === 'date') return sortDateDescending(vehicles, splitedField)
  return vehicles.sort((a, b) => new Date(b[splitedField[0]][splitedField[1]]) - new Date(a[splitedField[0]][splitedField[1]]))
}

const orderByField = (vehicles, field, orderType) => {
  const isFieldSupported = supportedOrderByFields.find(mappedField => mappedField === field)
  if (!isFieldSupported) throw new Error('INVALID_SORT_FIELD')
  const isDescendingOrder = orderType === `desc` ? true : false
  if (isDescendingOrder) return descendingOrder(vehicles, field)
  return ascendingOrder(vehicles, field)
}

const orderVehicles = (vehicles, sort, order) => {
  const mappedVehicles = vehicleMapper(vehicles)
  if (!sort) return mappedVehicles
  return orderByField(mappedVehicles, sort, order)
}

module.exports = {
  orderVehicles,
  vehicleMapperLegacy
}