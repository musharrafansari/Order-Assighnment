const orderModel = require("../Models/orderModels")
const customerModel = require("../Models/customerModels")
const productModel = require("../Models/productModels")
const { isValidRequestBody, isValidObjectId } = require("../validator/validator")

const createOrder = async function (req, res) {
    try {
        let data = req.body
        const { customerId, productId,quantity} = data

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Data is required." })
        }
        if (!isValidObjectId(customerId)) {
            return res.status(400).send({ status: false, message: 'customerId is not  valid.' })
        }
        let checkCustomer = await customerModel.findById({ _id: customerId })
        if (!checkCustomer) {
            return res.status(400).send({ status: false, msg: "customerId not found." })
        }
        if (!isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: 'productId is not a valid.' })
        }
        let checkProduct = await productModel.findById({ _id: productId })
        if (!checkProduct) {
            return res.status(400).send({ status: false, msg: "productId not found." })
        }

        // let checkQuantity = await orderModel.findById({ _id: customerId })
        // if (checkQuantity.quantity==0 || checkQuantity.quantity <9) {

            let saveOrder=await orderModel.create(data)
            return res.status(201).send({status:true,msg:"Order created",data:saveOrder})

            // let update = await orderModel.findByIdAndUpdate({ _id: customerId }, { $inc: { quantity: +1 } }, { new: true,upsert:true})
            // return res.status(201).send({status: true, message: "Added one more product.", data: update
            // })
        // }
        // if (checkQuantity.quantity>= 9 && checkQuantity.quantity< 19) {

        //     let update = await orderModel.findByIdAndUpdate({ _id: customerId }, { $inc: { quantity: +1 } }, { new: true})
        //     return res.status(201).send({
        //         status: true, message: "Customer got 10% discount and becomes gold customerType.", data: update
        //     })
        // }
        // if (checkQuantity.quantity>19) {

        //     let update = await orderModel.findByIdAndUpdate({ _id: customerId }, { $inc: { quantity: +1 } }, { new: true})
        //     return res.status(201).send({
        //         status: true, message: "Customer got 200% discount and becomes platinum customerType.", data: update
        //     })
        // }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {
    createOrder
}