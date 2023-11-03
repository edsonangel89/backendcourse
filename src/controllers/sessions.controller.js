import { makeToken, authToken } from "../utils/jwt.js"

export const sessionLogin = async (req, res) => {
    const token = makeToken(req.user)
    res.cookie('jwtCookie', token, {
        maxAge: 40000000
    })
    if (req.user.role == 'user') {
        console.log('User logged in')
        return res.redirect('/home',200,{})
    }
    else {
        console.log('Admin logged in')
        return res.redirect('/realtimeproducts',200,{})
    }
}
   
export const sessionSign = async (req, res) => {
    try {
        console.log('New user added:\n')
        console.log(req.user)
        res.redirect('/',200,{})
    }
    catch (error) {
        res.status(400).send('Error al iniciar sesion\n' + error)
    }
}

export const getSessionSign = async (req, res) => {
    res.status(200).render('sign')
}

export const sessionLogout = (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    console.log('User logged out')
    return res.redirect('/',200,{})
}

export const currentSession = async (req, res) => {
    console.log('Current user: ')
    console.log(req.user)
    return res.status(200).send(req.user)
}

export const githubCallback = async (req, res) => {
    req.session.user = req.user
    if (req.session.user) {
        return res.redirect('/home',200,{})
    }
    else {
        return res.status(400).send('Error de login')
    }
}