import EErrors from "../../services/errors/enumErrors.js"

export default ( error, req, res, next) => {
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send(error.name)
            break
        case EErrors.ROUTING_ERROR:
            res.send(error.name)
            break
        case EErrors.DATABASE_ERROR:
            res.send(error.name)
            break
        default:
            res.send('Unhandled error')
    }
}