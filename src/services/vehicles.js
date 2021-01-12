const vehiclesLib = require('../lib/vehicles')

const getAllVehicles = async (req, res, next) => {
  const { sortBy, orderBy } = req.query
  const allVehicles = await vehiclesLib.getAllVehicles(sortBy, orderBy).catch(e => next(e))
  res.status(200).send(allVehicles)
}

const getVehicleById = async (req, res, next) => {
  const { id } = req.params
  const vehicle = await vehiclesLib.getVehicleById(id).catch(e => next(e))
  res.status(200).send(vehicle)
}

const getVehiclesByLot = async (req, res, next) => {
  const { lot } = req.params
  const { sortBy, orderBy } = req.query
  const vehicles = await vehiclesLib.getVehiclesByLot(lot, sortBy, orderBy).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByManufacturer = async (req, res, next) => {
  const { manufacturer } = req.params
  const { sortBy, orderBy } = req.query
  const vehicles = await vehiclesLib.getVehiclesByManufacturer(manufacturer, sortBy, orderBy).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByModelName = async (req, res, next) => {
  const { modelName } = req.params
  const { sortBy, orderBy } = req.query
  const vehicles = await vehiclesLib.getVehiclesByModelName(modelName, sortBy, orderBy).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByManufacturerYearAndModelYear = async (req, res, next) => {
  const { manufactureYear, modelYear } = req.params
  const { sortBy, orderBy } = req.query
  const vehicles = await vehiclesLib.getVehicleByManufacturerYearAndModelYear(manufactureYear, modelYear, sortBy, orderBy)
    .catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehiclesByYearPeriod = async (req, res, next) => {
  const { startYear, endYear } = req.params
  const { sortBy, orderBy } = req.query
  const vehicles = await vehiclesLib.getVehiclesByYearPeriod(startYear, endYear, sortBy, orderBy)
    .catch(e => next(e))
  res.status(200).send(vehicles)
}

const createVehicle = async (req, res, next) => {
  const { body: vehicle } = req
  const createdVehicle = await vehiclesLib.createVehicle(vehicle).catch(e => next(e))
  res.status(201).send(createdVehicle)
}

const updateVehicle = async (req, res, next) => {
  const { id } = req.params
  const { body: vehicle } = req
  const updatedVehicle = await vehiclesLib.updateVehicle(id, vehicle).catch(e => next(e))
  res.status(200).send(updatedVehicle)
}

const deleteVehicle = async (req, res, next) => {
  const { id } = req.params
  await vehiclesLib.deleteVehicle(id)
    .then(_ => {
      res.status(200).send({ message: 'O veículo informado foi deletado com sucesso' })
    })
    .catch(e => next(e))
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  getVehiclesByLot,
  getVehicleByManufacturer,
  getVehicleByModelName,
  getVehicleByManufacturerYearAndModelYear,
  getVehiclesByYearPeriod,
  createVehicle,
  updateVehicle,
  deleteVehicle
}