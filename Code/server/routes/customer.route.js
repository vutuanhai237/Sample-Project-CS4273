const express =require('express')
const router = express.Router()
const Customer = require('../models/customer.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
router.post('/create',async (req,res)=>{
    let customer = new Customer({username,password,name}= req.body)
    try {
        let usedCustomer = await customer.save()
        res.json({usedCustomer,sign:'thanh cong'})

    } catch (error) {
        res.json(error)
    }
})
router.post('/login',async (req,res)=>{
   

    try{
        const savedAdmin = await Customer.findOne({username:req.body.username});
        const match = await bcrypt.compare(req.body.password,savedAdmin.password);
        if(match){
            const accessToken =  await jwt.sign({user_id:savedAdmin._id,role:savedAdmin.role},'123')
            res.json({accessToken:accessToken,sign:'thanh cong'})
        }    
    }catch(err){
        res.json({mess:'sai'})
    }
})
router.get('/getCustomer',async(req,res)=>{
    try {
        let customer = await Customer.find()
        res.json(customer)
    } catch (error) {
        res.json(error)
    }
})
module.exports = router