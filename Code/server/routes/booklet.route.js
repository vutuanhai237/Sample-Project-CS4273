const express = require('express')
const router = express.Router()
const Customer = require('../models/customer.model')
const Booklet = require('../models/booklet.model')
const Deposit = require('../models/deposit.model')
const Send = require('../models/send.model')
const authenToken = require('../controllers/authenticateToken')


router.get('/getList', authenToken.authen, async (req, res) => {
    if (req.user.role == 'ADM') {
        try {
            let booklet = await Booklet.find().populate('customer_id')
            // console.log(booklet)
            return res.json({
                booklet
            })

        } catch (error) {
            return res.json('error')
        }
    }
    return res.json('fail')
})
router.get('/searchMoney', authenToken.authen, async (req, res) => {

    let customer_id = req.user.user_id
    try {
        let booklet = await Booklet.findOne({ customer_id }).populate('customer_id')
        res.json(booklet)
    } catch (error) {
        res.json(error)
    }
})
router.get('/channn', authenToken.authen, async (req, res) => {
    // console.log('channnnnn')
    let customer_id = req.user.user_id
    try {
        let booklet = await Booklet.findOne({ customer_id }).populate('customer_id')
        res.json(booklet)
    } catch (error) {
        res.json(error)
    }
    res.json('channnnnn')
})
router.get('/perBooklet', authenToken.authen, async (req, res) => {
    // console.log(req.user)
    let customer_id = req.user.user_id
    try {
        let booklet = await Booklet.findOne({ customer_id })
        res.json(booklet.mountOfMoney)
    } catch (error) {
        res.json(error)
    }
})
router.get('/sum', authenToken.authen, async (req, res) => {
    // console.log('k hieu 1')
    if (req.user.role == 'ADM') {
        try {
            let send = await Send.find()
            let deposit = await Deposit.find()
            let sumSend = 0
            let sumDeposit = 0
            for (let i = 0; i < send.length; i++) {
                sumSend = sumSend + send[i].mountOfMoney
            }
            for (let i = 0; i < deposit.length; i++) {
                sumDeposit = sumDeposit + deposit[i].mountOfMoney
            }
            let tong = sumDeposit - sumSend
            res.json({
                sumSend, sumDeposit, tong
            })
        } catch (error) {
            res.json({sign:'fail'})
        }

    } else {
        res.json('fail')
    }


})
router.post('/create', authenToken.authen, (req, res) => {
    // console.log(req.user)
    let customer_id = req.user.user_id
    Customer.findById(customer_id)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            const booklet = new Booklet({
                typeOf: req.body.typeOf,
                mountOfMoney: req.body.mountOfMoney,
                address: req.body.address,
                customer_id: customer_id,

            });
            return booklet.save();
        })
        .then(result => {
            res.json({ sign: 'thanh cong', result })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
})


router.get('/:id', async (req, res) => {
    try {
        let booklet = await Booklet.findById(req.params.id)
        res.json(booklet)
    } catch (error) {
        res.json(error)
    }
})


router.post('/deposit', authenToken.authen, async (req, res) => {

    let customer_id = req.user.user_id
    // let { customer_id } = req.body
    let booklet = await Booklet.findOne({ customer_id })
    let money = booklet.mountOfMoney
    let deposit = new Deposit({ customer_id, mountOfMoney: money })
    try {
        await deposit.save()
        if (booklet.tin == 1) {
            let upda = await Booklet.findOneAndUpdate({ customer_id }, { mountOfMoney: 0 });
            res.json({ upda, sign: "thanh cong" })
        } else {
            res.json({ sign: 'chua du thoi han rut tien' })
        }
    } catch (error) {
        res.json({ sign: error })

    }


})
router.post('/send', authenToken.authen, async (req, res) => {
    // console.log(req.user.user_id)
    // console.log(req.body.mountOfMoney)

    let customer_id = req.user.user_id
    let { mountOfMoney } = req.body
    let send = new Send({ customer_id, mountOfMoney })
    try {
        await send.save()
        let booklet = await Booklet.findOne({ customer_id })
        let updateMoney = booklet.mountOfMoney + parseInt(mountOfMoney)
        if (booklet.tin == 1) {
            let upda = await Booklet.findOneAndUpdate({ customer_id }, { mountOfMoney: updateMoney, tin: 0 })
            res.json({ upda, sign: 'thanh cong' })

        } else {
            res.json({sign:'chua den han'})
        }

    } catch (error) {
        res.json({sign:'chua den han'})
        Booklet.findOneAndUpdate

    }



})




module.exports = router