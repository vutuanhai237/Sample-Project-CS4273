const express =require('express')
const router = express.Router()
const Staff = require('../models/staff.model.js')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


router.get('/test',(req,res)=>{
    res.send('fdfdfdd')
})
router.post('/login',async(req,res)=>{
    try{
        const savedAdmin = await Staff.findOne({username:req.body.username});
        const match = await bcrypt.compare(req.body.password,savedAdmin.password);
        if(match){
            const accessToken =  await jwt.sign({user:savedAdmin.username,role:savedAdmin.role},'123')
            res.json({accessToken:accessToken,sign:'thanh cong'})
        }    
    }catch(err){
        res.json({mess:'sai'})
    }
})
router.post('/create',async (req,res)=>{
    let {username,password,name} = req.body
    try {
        let staff = new Staff({username,password,name})
        let usedCustomer = await staff.save()
        res.json(usedCustomer)

    } catch (error) {
        res.json("error")
    }
})
module.exports = router