require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const bodyParser = require('body-parser')
const cors = require('cors')
const routeBooklet = require('./routes/booklet.route')
const routeStaff = require('./routes/staff.route')
const routeCustomer = require('./routes/customer.route')
const {increment} = require('./controllers/updateMoney')
var mongoose = require("mongoose")


app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// mongoose.connect('mongodb://localhost/ms4273')
mongoose.connect(process.env.MONGODB_URL)

setInterval(increment,3000)
app.use('/api/booklet',routeBooklet)
app.use('/api/staff',routeStaff)
app.use('/api/customer',routeCustomer)
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


