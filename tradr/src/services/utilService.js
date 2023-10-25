const mongoose = require('mongoose')

class utilService {
    static async createObjectId(str) {
        return mongoose.Types.ObjectId(str)
    }
}

module.exports = utilService