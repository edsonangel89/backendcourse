import local, { Strategy } from 'passport-local'
import passport from 'passport'
import { createHash, validatePass } from '../utils/bcrypt.js'
import { userModel } from '../models/users.models.js'

const LocalStrategy = local.Strategy

const initialize = () => {

    passport.use('sign', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const { fname, lname, email, age } = req.body

            try {
                const user = await userModel.findOne({email: email})
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

    passport.use('login', new LocalStrategy(
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

        passport.serializeUser((user, done) => {
            done(null, user._id)
        })

        passport.deserializeUser(async (id, done) => {
            const user = await userModel.findById(id)
            done(null, user)
        })

}

export default initialize