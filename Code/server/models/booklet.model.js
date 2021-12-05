const mongoose = require('mongoose');
const bookletSchema = mongoose.Schema({
    
    customer_id:{type:mongoose.Schema.Types.ObjectId, ref:'Customer', },
    address:String,
    mountOfMoney:Number,
    typeOf:String,
    // identification:String,
    Date:{
        type:Date,
        default:Date.now
    },
    tin:{
        type:Number,
        default:0
    },
    timestamp: {type:Number, default: new Date().getTime()}
     
    
})

module.exports = mongoose.model('Booklet',bookletSchema)