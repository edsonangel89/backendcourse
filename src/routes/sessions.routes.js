import { Router } from "express"
import passport from "passport"
import { authorize, passportErr } from "../utils/msgsErrors.js"
import { sessionLogin, sessionSign, sessionLogout, githubCallback, currentSession } from "../controllers/sessions.controller.js"

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), async (req, res) => {
    try {
        sessionLogin(req.user)
        res.status(200).send()
    }
    catch (error) {
        res.status(400).send('Error al iniciar sesion\n' + error)
    }
})
sessionRouter.post('/sign', passport.authenticate('sign'), async (req, res) => {
    try {
        console.log('New user added:\n')
        console.log(req.user)
        res.status(200).send(req.user)
    }
    catch (error) {
        res.status(400).send('Error al iniciar sesion\n' + error)
    }
})
sessionRouter.get('/sign', async (req, res) => {
    res.status(200).render('sign')
})
sessionRouter.get('/logout', sessionLogout)
sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {

})
sessionRouter.get('/githubCallback', passport.authenticate('github'), githubCallback)
sessionRouter.get('/current', passportErr('jwt'), authorize('user'), currentSession)

export default sessionRouter