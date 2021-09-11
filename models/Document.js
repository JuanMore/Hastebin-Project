const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    value: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Document', documentSchema)