import 'dotenv/config' 
import jwt from 'jsonwebtoken'

export const makeToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '24h'})
    return token
}

export const passToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: 300})
    return token
}

export const authToken = (req, res, next) => {
    const auth = req.headers.Authorization

    if (!auth) {
        res.status(401).send('Usuario invalido')
    }

    const token = auth.split(' ')[1]
    jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
        if (error) {
            res.status(403).send('Usuario no autorizado')
        }
    })
    req.user = credential.user
    next()
} 