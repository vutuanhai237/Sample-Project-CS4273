const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const staffSchema = mongoose.Schema({
    
    username:String,
    password:{
        type:String,
        require:true
    },
    name:String,
    role:{
        type:String,
        default:'ADM'
    }
    
})
staffSchema.pre('save',async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})
module.exports = mongoose.model('Staff',staffSchema)