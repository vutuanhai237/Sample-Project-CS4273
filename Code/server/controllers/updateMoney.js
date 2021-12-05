// const Customer = require('../models/customer.model')
// const Staff = require('../models/staff.model')
const Booklet = require('../models/booklet.model')
let increment = async () => {
    let booklet = await Booklet.find()

    let time = new Date()
    booklet.map(data => {

        if ((time.getTime() - data.Date.getTime()) > 60000 && data.tin == 0 && data.typeOf == '6') {
            let money = data.mountOfMoney * 0.5 + data.mountOfMoney
            Booklet.findByIdAndUpdate(data._id, { mountOfMoney: money, tin: 1 },
                function (err, docs) {
                    if (err) {

                        console.log(err)

                    }
                    else {
                        console.log("Updated User : ", docs);
                    }
                });

        }

        else if ((time.getTime() - data.Date.getTime()) > 30000 && data.tin == 0 && data.typeOf == '3') {
            let money = data.mountOfMoney * 0.25 + data.mountOfMoney
            Booklet.findByIdAndUpdate(data._id, { mountOfMoney: money, tin: 1 },
                function (err, docs) {
                    if (err) {

                        console.log(err)
                        

                    }
                    else {
                        console.log("Updated User : ", docs);
                    }
                });
        }
        else {
            console.log("chua can update")
        }
    })
}

module.exports = {
    increment
}