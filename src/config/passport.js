import local, { Strategy } from 'passport-local'
import passport from 'passport'
import { createHash, validatePass } from '../utils/bcrypt.js'
import { userModel } from '../models/users.models.js'

const LocalStrategy = local.Strategy

const initialize = () => {

    passport.use('sign', new Strategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const { fname, lname, age } = req.body

            try {
                const user = await userModel.findOne({email: username})
                if (user) {
                    return done(null, false)
                }

                const criptPassword = createHash(password)
                const addedUser = await userModel.create({
                    lname: fname,
                    fname: lname,
                    age: age,
                    email: email,
                    password: criptPassword
                })

                return done(null, addedUser)

            }
            catch(error) {
                return done(error)
            }
        }
    ))

    passport.use('login', new Strategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email: username})
                if (!user) {
                    return done(null, false)
                }

                if (validatePass(password, user.password)) {
                    return done(null, user)
                }

                return done(null, false)

            }
            catch(error) {
                return done(error)
            }
        }
        ))
}