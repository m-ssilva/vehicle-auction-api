const supportedOrderByFields = ['id', 'lot', 'control_code', 'manufacturer_name', 'manufacture_year', 'model_name', 'model_year', 'bid_date', 'bid_value', 'bid_user']

const singleVehicleMapper = vehicle => ({
  id: vehicle.ID,
  lot: vehicle.LOTE,
  control_code: vehicle.CODIGOCONTROLE,
  manufacturer_name: vehicle.MARCA,
  manufacture_year: vehicle.ANOFABRICACAO,
  model_name: vehicle.MODELO,
  model_year: vehicle.ANOMODELO,
  bid: {
    date: vehicle.DATALANCE,
    value: vehicle.VALORLANCE,
    user: vehicle.USUARIOLANCE
  }
})

const vehicleMapperLegacy = vehicle => ({
  DATALANCE: vehicle.bid.date,
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

const ascendingOrder = (vehicles, field) => vehicles.sort((a, b) => a[field] - b[field])

const descendingOrder = (vehicles, field) => vehicles.sort((a, b) => b[field] - a[field])

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