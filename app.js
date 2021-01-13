const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')
const { API: { VERSION } } = require('./configs')
const { vehicles } = require('./src/services')
const { errorHandler, parameterValidator } = require('./src/middlewares')
const hateoasLinker = require('express-hateoas-links')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(hateoasLinker)

app.use(`/${VERSION}`, router)

router.get('/auction/vehicles', parameterValidator('GET_ALL_VEHICLES'), vehicles.getAllVehicles)
router.get('/auction/vehicles/:id', parameterValidator('GET_VEHICLE_BY_ID'), vehicles.getVehicleById)
router.get('/auction/vehicles/lot/:lot', parameterValidator('GET_VEHICLES_BY_LOT'), vehicles.getVehiclesByLot)
router.get('/auction/vehicles/manufacturer/:manufacturer', parameterValidator('GET_VEHICLES_BY_MANUFACTURER'), vehicles.getVehicleByManufacturer)
router.get('/auction/vehicles/model/:modelName', parameterValidator('GET_VEHICLES_BY_MODEL_NAME'), vehicles.getVehicleByModelName)
router.get('/auction/vehicles/manufacture/:manufactureYear/model/:modelYear', parameterValidator('GET_VEHICLES_BY_MANUFACTURER_YEAR_AND_MODEL_YEAR'), vehicles.getVehicleByManufacturerYearAndModelYear)
router.get('/auction/vehicles/manufacture/:startYear/:endYear', parameterValidator('GET_VEHICLES_BY_MANUFACTURE_YEAR_PERIOD'), vehicles.getVehiclesByYearPeriod)
router.post('/auction/vehicles', parameterValidator('CREATE_VEHICLE'), vehicles.createVehicle)
router.put('/auction/vehicles/:id', parameterValidator('UPDATE_VEHICLE'), vehicles.updateVehicle)
router.delete('/auction/vehicles/:id', parameterValidator('DELETE_VEHICLE'), vehicles.deleteVehicle)

app.use(errorHandler)

module.exports = app