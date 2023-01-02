const express = require('express')
const router = express.Router()
const customerController = require("../controllers/customerController")
// const orderController = require("../controller/orderController")


router.post('/createCustomer',customerController.createCustomer)




module.exports = router;