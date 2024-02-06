import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import passport from 'passport'
import jwt from 'passport-jwt'
import { createHash, validatePass } from '../utils/bcrypt.js'
import { userModel } from '../models/users.models.js'

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT =jwt.ExtractJwt

export const initialize = () => {

    passport.use('sign', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const { fname, lname, email, age } = req.body
            try {
                const user = await userModel.findOne({email: username})
                if (user) {
                    return done(null, false)
                }
                const criptPassword = createHash(password)
                const addedUser = await userModel.create({
                    fname: fname,
                    lname: lname,
                    age: age,
                    email: email,
                    password: criptPassword,
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

        passport.use('github', new GithubStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({email: profile._json.email})
                if (user) {
                    done(null, user)
                }
                else 
                {
                    const addedUser = await userModel.create({
                        fname: profile._json.login,
                        lname: ' ',
                        age: 18,
                        email: profile._json.email,
                        password: createHash(profile._json.login)
                    })
                    done(null, addedUser)
                }
            }
            catch(error) {
                done(error)
            }
        }))

        const cookieExtractor = req => {
            const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {}
            return token
        }

        passport.use('jwt', new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET
        }, async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload)
            }
            catch (error) {
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