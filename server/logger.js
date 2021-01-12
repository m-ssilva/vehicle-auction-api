const winston = require('winston')
const { format: { combine, timestamp, prettyPrint } } = winston

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [new winston.transports.Console()]
})

module.exports = logger