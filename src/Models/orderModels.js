const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    customerId: {
        type: ObjectId,
        ref: 'customer',
        required: true
    },

    items: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],

    totalPrice: {
        type: Number,
        required: true
    },

    totalQuantity: {
        type: Number,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)