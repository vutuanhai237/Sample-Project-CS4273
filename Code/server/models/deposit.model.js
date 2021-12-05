const mongoose = require('mongoose');
const depositSchema = mongoose.Schema({
    
    customer_id:{type:mongoose.Schema.Types.ObjectId, ref:'Customer', },
  
    mountOfMoney:Number,
    typeOf:String,
    date:{
        type:Date,
        default:Date.now
    },
    
})

module.exports = mongoose.model('Deposit',depositSchema)