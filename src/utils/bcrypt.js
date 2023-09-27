import bcrypt from 'bcrypt'

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))

export const validatePass = (passwordReq, passwordBdd) => bcrypt.compareSync(passwordReq, passwordBdd)