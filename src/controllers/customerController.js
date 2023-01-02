const customerModel = require("../Models/customerModels");
const { isValidEmail, isValidPassword, isValidRequestBody, isValid } = require("../validator/validator");




const createCustomer = async function (req, res) {
    try {
        let data = req.body
        const { fname, lname, email, phone, shippingAddress, billingAddress, password } = data

        if (!isValidRequestBody(data))
            return res.send({ status: false, message: "Field cannot be empty." })

        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "fname is required." })
        }
        if (!/^[a-zA-Z ]+$/.test(fname))
            return res.status(400).send({ status: false, message: "Invalid fname." })

        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "lname is required." })
        }
        if (!/^[a-zA-Z ]+$/.test(lname))
            return res.status(400).send({ status: false, message: "Invalid lname." })

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email id is required" })
        }
        if (!isValidEmail(email))
            return res.status(400).send({ status: false, message: "Invalid Email id." })

        let emailAlredyPresent = await customerModel.findOne({ email: email })
        if (emailAlredyPresent) {
            return res.status(409).send({ status: false, message: `Email Already Present` });
        }

        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: "Phone number is required" })
        }
        //validating phone number of 10 digits only by using RegEx. 
        if (!/^[6-9]{1}[0-9]{9}$/.test(phone))
            return res.status(400).send({ status: false, message: "Invalid Phone number." })

        let phoneAlredyPresent = await customerModel.findOne({ phone: phone })
        if (phoneAlredyPresent) {
            return res.status(409).send({ status: false, message: 'Phone Number Already Present' });
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }
        //setting password's mandatory length in between 8 to 15 characters.
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Password criteria not fulfilled." })
        }

        // ------- Address Validation  -------- c

        if (!isValid(shippingAddress)) {
            return res.status(400).send({ status: false, message: " Shipping Address cannot be empty." })
        }

        if (!isValid(billingAddress)) {
            return res.status(400).send({ status: false, message: " Billing Address cannot be empty." })
        }


        let userData = await customerModel.create(req.body)

        return res.status(201).send({ status: true, message: "Success", data: userData });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createCustomer }