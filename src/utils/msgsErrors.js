import passport from "passport"

export const passportErr = (strat) => {
    return async (req, res, next) => {
        passport.authenticate(strat, (error, user, info) => {
            if (error) {
                return next(error)
            }
            if (!user) {
                return res.status(404).send('No hay usuario logueado')
            }
            req.user = user.user
            next()
        })(req, res, next)
    }
}

export const authorize = (role) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send('Usuario no autorizado')
        }
        if (req.user.role != role) {
            return res.status(403).send('Usuario no tiene acceso')
        }
        next()
    }
}