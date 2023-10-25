const config = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const randomstring = require("randomstring")
const uuid = require('uuid')

class AuthService {
    static async encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    static async compare(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword)
    }
    static async verify(token) {
        return jwt.verify(token, config.JWT_SECRET)
    }
    static async generateToken(payload) {
        return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '30d'})
    }
    static async generateRandomString(payload) {
        return randomstring.generate(payload)
    }
    static async generateUUID() {
        return uuid.v4()
    }
}

module.exports = AuthService