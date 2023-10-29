import * as winston from "winston";
const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
  level: 'http' || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: `${__dirname}/logs.log`,
      handleExceptions: true,
    })
  ],
});
logger.on('error',(err:any)=>logger.error("Error " + err))
export default logger