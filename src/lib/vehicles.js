const { legacy } = require('../integrations')
const { vehicle: vehicleOrganizer } = require('../builders')

const YEAR_REGEX = /^\d{4}$/

const getAllVehicles = async (sort, order) => {
  const allVehicles = await legacy.getAllVehicles()
  return vehicleOrganizer.orderVehicles(allVehicles, sort, order)
}

const getVehicleById = async id => {
  const allVehicles = await legacy.getAllVehicles()
  const vehicle = allVehicles.find(vehicle => vehicle.ID.toString() === id)
  if (!vehicle) throw new Error('VEHICLE_NOT_FOUND')
  return vehicleOrganizer.orderVehicles(vehicle)
}

const getVehiclesByLot = async (lot, sort, order) => {
  const allVehicles = await legacy.getAllVehicles()
  const vehicles = allVehicles.filter(vehicle => vehicle.LOTE.toString() === lot)
  if (!vehicles.length) throw new Error('VEHICLE_LOT_NOT_FOUND')
  return vehicleOrganizer.orderVehicles(vehicles, sort, order)
}

const getVehiclesByManufacturer = async (manufacturer, sort, order) => {
  const allVehicles = await legacy.getAllVehicles()
  const vehicles = allVehicles.filter(vehicle => vehicle.MARCA === manufacturer.toUpperCase())
  if (!vehicles.length) throw new Error('VEHICLE_MANUFACTURER_NOT_FOUND')
  return vehicleOrganizer.orderVehicles(vehicles, sort, order)
}

const getVehiclesByModelName = async (modelName, sort, order) => {
  const allVehicles = await legacy.getAllVehicles()
  const vehicles = allVehicles.filter(vehicle => {
    if (vehicle.MODELO) return vehicle.MODELO.startsWith(modelName.toUpperCase())
  })
  if (!vehicles.length) throw new Error('VEHICLE_MODEL_NAME_NOT_FOUND')
  return vehicleOrganizer.orderVehicles(vehicles, sort, order)
}

const getVehicleByManufacturerYearAndModelYear = async (manufactureYear, modelYear, sort, order) => {
  const allVehicles = await legacy.getAllVehicles()
  const vehicles = allVehicles.filter(vehicle => {
    if (vehicle.ANOFABRICACAO && vehicle.ANOMODELO)
      return vehicle.ANOFABRICACAO.toString() === manufactureYear
        && vehicle.ANOMODELO.toString() === modelYear
  })
  if (!vehicles.length) throw new Error('VEHICLE_MANUFACTURER_MODEL_YEAR_NOT_FOUND')
  return vehicleOrganizer.orderVehicles(vehicles, sort, order)
}

const getVehiclesByYearPeriod = async (startYear, endYear, sort, order) => {
  const isYearValid = YEAR_REGEX.test(startYear) && YEAR_REGEX.test(endYear)
  const isStartYearLowerThanEndYear = startYear <= endYear
  if (!isYearValid || !isStartYearLowerThanEndYear) throw new Error('INVALID_YEAR_PERIOD')
  const allVehicles = await legacy.getAllVehicles()
  const vehicles = allVehicles.filter(vehicle => {
    if (vehicle.ANOFABRICACAO)
      return vehicle.ANOFABRICACAO >= startYear && vehicle.ANOFABRICACAO <= endYear
  })
  if (!vehicles.length) throw new Error('VEHICLES_BY_YEAR_PERIOD_NOT_FOUND')
  return vehicleOrganizer.orderVehicles(vehicles, sort, order)
}

const createVehicle = async vehicle => {
  const legacyMappedVehicle = vehicleOrganizer.vehicleMapperLegacy(vehicle)
  const createdVehicle = await legacy.createVehicle(legacyMappedVehicle)
  return vehicleOrganizer.orderVehicles(createdVehicle)
}

const updateVehicle = async (id, updatedFieldsVehicle) => {
  const allVehicles = await legacy.getAllVehicles()
  const legacyVehicle = allVehicles.find(vehicle => vehicle.ID.toString() === id)
  if (!legacyVehicle) throw new Error('VEHICLE_NOT_FOUND')
  const fieldsToBeUpdated = JSON.parse(JSON.stringify(vehicleOrganizer.vehicleMapperLegacy(updatedFieldsVehicle)))
  const mappedUpdatedVehicle = { ...legacyVehicle, ...fieldsToBeUpdated }
  const updatedVehicle = await legacy.updateVehicle(mappedUpdatedVehicle)
  return vehicleOrganizer.orderVehicles(updatedVehicle)
}

const deleteVehicle = async id => {
  const allVehicles = await legacy.getAllVehicles()
  const legacyVehicle = allVehicles.find(vehicle => vehicle.ID.toString() === id)
  if (!legacyVehicle) { throw new Error('VEHICLE_NOT_FOUND') }
  const deletedResponse = await legacy.deleteVehicle(Number(id))
  return deletedResponse
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  getVehiclesByLot,
  getVehiclesByManufacturer,
  getVehiclesByModelName,
  getVehicleByManufacturerYearAndModelYear,
  getVehiclesByYearPeriod,
  createVehicle,
  updateVehicle,
  deleteVehicle
}