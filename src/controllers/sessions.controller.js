import { makeToken } from "../utils/jwt.js"

export const sessionLogin = (req, res) => {
    const token = makeToken(req.user)
    res.cookie('jwtCookie', token, {
        maxAge: 40000000
    })
    const userRole = req.user.role

    switch(userRole) {
        case 'user':
            req.logger.info('User ' + req.user._id + ' logged in')
            return res.redirect('/',200,{status: 'success', payload: 'User'})
        case 'userPremium':
            req.logger.info('User ' + req.user._id + ' logged in')
            return res.redirect('/',200,{status: 'success', payload: 'User Premium'})
        case 'admin':
            req.logger.info('User ' + req.user._id + ' logged in')
            return res.redirect('/',200,{status: 'success', payload: 'User Admin'})
    }
}
   
export const sessionSign = (req, res) => {
    try {
        console.log('New user added:\n')
        console.log(req.user)
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
        console.log(req.session)
        if (req.session) {
            console.log('User ' + req.session.passport.user + ' logged out')
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
        return res.redirect('/',200,{})
    }
    else {
        return res.status(400).send('Error de login')
    }
}