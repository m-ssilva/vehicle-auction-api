const winston = require('winston')
const { format: { combine, timestamp, json, colorize } } = winston

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
    colorize({ all: true })
  ),
  transports: [new winston.transports.Console()]
})

module.exports = logger