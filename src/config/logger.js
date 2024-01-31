import winston from "winston"

const loggerOptions = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'gray',
        verbose: 'gray',
        debug: 'gray',
        silly: 'gray'
    }
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: './info.log', 
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: loggerOptions.colors }),
                winston.format.simple()
        )}),
        new winston.transports.File({
            filename: './error.log', 
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize({ colors: loggerOptions.colors }),
                winston.format.simple()
        )}),
        new winston.transports.Console({ 
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize({ colors: loggerOptions.colors }),
                winston.format.simple()
        )})
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger
    
    //console.log(logger.level == 'info')
    /*if (logger.level == 'error') {
        logger.error(`${req.method} en ${req.url} - ${ new Date().toLocaleTimeString() }`)
        next()
    }*/
    next()
}