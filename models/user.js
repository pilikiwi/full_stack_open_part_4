const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: {
        type: String,
        minlength: 3,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
})

userSchema.set('toJSON', {
    transform: (document, retunedObject)=>{
        retunedObject.id = retunedObject._id.toString()
        delete retunedObject._id
        delete retunedObject.__v
        delete retunedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User