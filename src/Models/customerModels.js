const mongoose=require('mongoose')

const customerSchema=new mongoose.Schema({
    
    fname: {
        type: String,
        require: true,
        trim: true
      },
      lname: {
        type: String,
        require: true,
        trim: true
      },
      email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
  
      },
                                     
      phone: {
        type: String,
        require: true,
        unique: true,
        trim: true
      },
      password: {
        type: String,
        require: true,
        trim: true,
        min: 8,
        max: 15
      },                                       
      shippingAddress: {
        type:String,
        required:true,
      },
      billingAddress: {
          type:String,
          required:true,
        }
      },
    { timestamps: true });

    module.exports=mongoose.model('customer',customerSchema)