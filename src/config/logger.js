import winston from "winston"

const loggerOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'gray',
        warning: 'yellow',
        info: 'green',
        debug: 'blue'
    }
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: loggerOptions.colors }),
                winston.format.simple()
            ) }),
        new winston.transports.File({
            filename: './errors.log', 
            level: 'fatal',
            format: winston.format.combine(
                winston.format.colorize({ colors: loggerOptions.colors }),
                winston.format.simple()
            )}),
        new winston.transports.File( {
            filename: './info.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: loggerOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})

export const addInfoLogger = (req,res,next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${ new Date().toLocaleTimeString() }`)
    next()
}