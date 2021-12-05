const mongoose = require('mongoose');
const sendSchema = mongoose.Schema({
    
    customer_id:{type:mongoose.Schema.Types.ObjectId, ref:'Customer', },
  
    mountOfMoney:Number,
    typeOf:String,
    Date:{
        type:Date,
        default:Date.now
    },
    
})

module.exports = mongoose.model('Send',sendSchema)