import { Router } from "express"
import { userModel } from "../models/users.models.js"
import passport from "passport"
import { makeToken } from "../utils/jwt.js"

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'),async (req, res) => {
   try {
    const tok = makeToken(req.user)
    res.cookie('jwtCookie', tok, {
        maxAge: 4000000000
    })
    if (req.user.role == 'user') {
        res.redirect('/home',200,{})
    }
    else {
        res.redirect('/realtimeproducts', 200 ,{})
    }
   }
   catch(error) {
    res.status(400).send('Error de logueo\n' + error)
   }
}
)
sessionRouter.post('/sign', passport.authenticate('sign'), async (req, res) => {
    res.redirect('/',200,{})
})
sessionRouter.get('/sign', async (req, res) => {
    res.status(200).render('sign')
})
sessionRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
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
sessionRouter.get('/current', (req, res) => {
    
})

export default sessionRouter