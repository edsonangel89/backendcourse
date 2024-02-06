import { makeToken } from "../utils/jwt.js"

export const sessionLogin = (req, res) => {
    try {
        const token = makeToken(req.user)
        res.cookie('jwtCookie', token, {
            maxAge: 40000000
        })
        const userRole = req.user.role

        switch(userRole) {
            case 'user':
                req.logger.info('User ' + req.session.passport.user + ` logged in - ${new Date().toLocaleTimeString()} : ${ new Date().toLocaleDateString() }`)
                return res.redirect('/products',200,{ name: req.user.fname })
            case 'premium':
                req.logger.info('User ' + req.session.passport.user + ` logged in - ${new Date().toLocaleTimeString()} : ${ new Date().toLocaleDateString() }`)
                return res.redirect('/products',200,{ name: req.user.fname })
            case 'admin':
                req.logger.info('User ' + req.session.passport.user + ` logged in - ${new Date().toLocaleTimeString()} : ${ new Date().toLocaleDateString() }`)
                return res.redirect('/',200,{status: 'success', payload: 'User Admin'})
            }
    }
    catch (error) {
        req.logger.error(`Fail login - ${ new Date().toLocaleDateString() } : ${new Date().toLocaleTimeString()}`)
        res.status(400).redirect('/', {})
    }
}

export const errorUser = (req, res) => {
    try {
        res.status(200).render('error_user', {})
    }
    catch (error) {
        res.status(400).render('error', {})
    }
}
   
export const sessionSign = (req, res) => {
    try {
        req.logger.info(`New user added with ID: ` + req.user._id + ` - ${new Date().toLocaleTimeString()} : ${new Date().toLocaleDateString()}`)
        req.session.destroy()
        res.redirect('/login',200,{status: 'success'})
    }
    catch (error) {
        res.status(400).send('Error al registrar usuario\n' + error)
    }
}

export const getSessionSign = async (req, res) => {
    res.status(200).render('sign')
}

export const sessionLogout = async (req, res) => {
    try {
        if (req.session) {
            req.logger.info('User ' + req.session.passport.user + ` logged out - ${new Date().toLocaleTimeString()} : ${ new Date().toLocaleDateString() }`)
            req.session.destroy()
        }
        res.clearCookie('jwtCookie')
        return res.redirect('/login',200,{})
    }
    catch (error) {
        res.status(400).send('Error al cerrar sesion')
    }
}

export const currentSession = async (req, res) => {
    return res.status(200).send(req.user)
}

export const githubCallback = async (req, res) => {
    req.session.user = req.user
    if (req.session.user) {
        req.logger.info('User ' + req.session.user._id + ` logged in - ${new Date().toLocaleTimeString()} : ${ new Date().toLocaleDateString() }`)
        return res.redirect('/',200,{})
    }
    else {
        return res.status(400).send('Error de login')
    }
}