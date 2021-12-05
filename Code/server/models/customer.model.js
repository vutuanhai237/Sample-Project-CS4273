const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const customerSchema = mongoose.Schema({
    
    username:String,
    password:{
        type:String,
        require:true
    },
    name:String,
    role:{
        type:String,
        default:'USER'
    }
    
})
customerSchema.pre('save',async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})
module.exports = mongoose.model('Customer',customerSchema)