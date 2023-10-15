import { Router } from "express"
import { userModel } from "../models/users.models.js"
import passport from "passport"
import { makeToken, authToken } from "../utils/jwt.js"
import { authorize, passportErr } from "../utils/msgsErrors.js"

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'),async (req, res) => {
   try {
    const tok = makeToken(req.user)
    res.cookie('jwtCookie', tok, {
        maxAge: 4000000000
    })
    if (req.user.role == 'user') {
        console.log('User logged in')
        res.redirect('/home',200,{})
    }
    else {
        console.log('User logged in')
        res.redirect('/realtimeproducts',200,{})
    }
   }
   catch(error) {
    res.status(400).send('Error de logueo\n' + error)
   }
}
)
sessionRouter.post('/sign', passport.authenticate('sign'), async (req, res) => {
    console.log('New user added: ')
    console.log(req.user)
    res.redirect('/',200,{})
})
sessionRouter.get('/sign', async (req, res) => {
    res.status(200).render('sign')
})
sessionRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    console.log('User logged out')
    res.redirect('/',200,{})
})
sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {

})
sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    if (req.session.user) {
        res.redirect('/home',200,{})
    }
    else {
        res.status(400).send('Error de logueo')
    }
})
sessionRouter.get('/current', passportErr('jwt'), authorize('user'), (req, res) => {
    console.log('Current user: ')
    console.log(req.user)
    res.status(200).send(req.user)
})

export default sessionRouter