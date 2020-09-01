const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
})

userSchema.set('toJSON', {
    transform: (document, retunedObject)=>{
        retunedObject.id = retunedObject._id.toString()
        delete retunedObject._id
        delete retunedObject.__v
        delete retunedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User