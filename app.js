const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { vehicles } = require('./src/services')
const { errorHandler, parameterValidator } = require('./src/middlewares')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/auction/vehicle', parameterValidator('GET_ALL_VEHICLES'), vehicles.getAllVehicles)
app.get('/auction/vehicle/:id', parameterValidator('GET_VEHICLE_BY_ID'), vehicles.getVehicleById)
app.get('/auction/vehicle/lot/:lot', parameterValidator('GET_VEHICLES_BY_LOT'), vehicles.getVehiclesByLot)
app.get('/auction/vehicle/manufacturer/:manufacturer', parameterValidator('GET_VEHICLES_BY_MANUFACTURER'), vehicles.getVehicleByManufacturer)
app.get('/auction/vehicle/model/:modelName', parameterValidator('GET_VEHICLES_BY_MODEL_NAME'), vehicles.getVehicleByModelName)
app.get('/auction/vehicle/manufacture/:manufactureYear/model/:modelYear', parameterValidator('GET_VEHICLES_BY_MANUFACTURER_YEAR_AND_MODEL_YEAR'), vehicles.getVehicleByManufacturerYearAndModelYear)
app.get('/auction/vehicle/manufacture/:startYear/:endYear', parameterValidator('GET_VEHICLES_BY_MANUFACTURE_YEAR_PERIOD'), vehicles.getVehiclesByYearPeriod)
app.post('/auction/vehicle', parameterValidator('CREATE_VEHICLE'), vehicles.createVehicle)
app.put('/auction/vehicle/:id', parameterValidator('UPDATE_VEHICLE'), vehicles.updateVehicle)
app.delete('/auction/vehicle/:id', parameterValidator('DELETE_VEHICLE'), vehicles.deleteVehicle)

app.use(errorHandler)

module.exports = app