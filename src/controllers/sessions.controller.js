import { makeToken, authToken } from "../utils/jwt.js"

export const sessionLogin = async (user) => {
    try {
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
    catch (error) {
        return res.status(400).send('Error al iniciar sesion\n' + error)
    }
}

export const sessionSign = async () => {
    console.log('New user added')
    //console.log(req.user)
    return res.redirect('/',200,{})
}

export const sessionLogout = () => {
    if (req.session) {
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    console.log('User logged out')
    return res.redirect('/',200,{})
}

export const currentSession = () => {
    console.log('Current user: ')
    console.log(req.user)
    return res.status(200).send(req.user)
}

export const githubCallback = async () => {
    req.session.user = req.user
    if (req.session.user) {
        return res.redirect('/home',200,{})
    }
    else {
        return res.status(400).send('Error de login')
    }
}