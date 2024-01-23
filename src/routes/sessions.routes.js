import { Router } from "express"
import passport from "passport"
import { authorize, passportErr } from "../utils/msgsErrors.js"
import { sessionLogin, 
        sessionSign, 
        getSessionSign, 
        sessionLogout, 
        githubCallback, 
        currentSession 
    } from "../controllers/sessions.controller.js"

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), sessionLogin)
sessionRouter.post('/sign', passport.authenticate('sign'), sessionSign)
sessionRouter.get('/sign', getSessionSign)
sessionRouter.get('/logout', sessionLogout)
sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {})
sessionRouter.get('/githubCallback', passport.authenticate('github'), githubCallback)
sessionRouter.get('/current', passportErr('jwt'), authorize('user'), currentSession)

export default sessionRouter