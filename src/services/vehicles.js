const vehiclesLib = require('../lib/vehicles')

const getAllVehicles = async (req, res, next) => {
  const { _sort, _order } = req.query
  const allVehicles = await vehiclesLib.getAllVehicles(_sort, _order).catch(e => next(e))
  res.status(200).send(allVehicles)
}

const getVehicleById = async (req, res, next) => {
  const { id } = req.params
  await vehiclesLib.getVehicleById(id)
    .then(vehicle => {
      res.status(200).json(vehicle, [
        { rel: 'self', method: 'PUT', uri: req.originalUrl },
        { rel: 'self', method: 'DELETE', uri: req.originalUrl }
      ])
    })
    .catch(e => next(e))
}

const getVehiclesByLot = async (req, res, next) => {
  const { lot } = req.params
  const { _sort, _order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByLot(lot, _sort, _order).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByManufacturer = async (req, res, next) => {
  const { manufacturer } = req.params
  const { _sort, _order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByManufacturer(manufacturer, _sort, _order).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByModelName = async (req, res, next) => {
  const { modelName } = req.params
  const { _sort, _order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByModelName(modelName, _sort, _order).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByManufacturerYearAndModelYear = async (req, res, next) => {
  const { manufactureYear, modelYear } = req.params
  const { _sort, _order } = req.query
  const vehicles = await vehiclesLib.getVehicleByManufacturerYearAndModelYear(manufactureYear, modelYear, _sort, _order)
    .catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehiclesByYearPeriod = async (req, res, next) => {
  const { startYear, endYear } = req.params
  const { _sort, _order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByYearPeriod(startYear, endYear, _sort, _order)
    .catch(e => next(e))
  res.status(200).send(vehicles)
}

const createVehicle = async (req, res, next) => {
  const { body: vehicle } = req
  await vehiclesLib.createVehicle(vehicle)
    .then(createdVehicle => {
      res.location(`${req.headers.host}${req.originalUrl}/${createdVehicle.id}`)
      res.status(201).json(createdVehicle, [
        { rel: 'self', method: 'GET', uri: `${req.originalUrl}/${createdVehicle.id}` },
        { rel: 'self', method: 'PUT', uri: `${req.originalUrl}/${createdVehicle.id}` },
        { rel: 'self', method: 'DELETE', uri: `${req.originalUrl}/${createdVehicle.id}` }
      ])
    })
    .catch(e => next(e))
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
    .then(_ => res.status(204).send())
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