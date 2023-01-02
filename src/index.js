const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const route=require('./routes/route')
const app=express()

app.use(bodyparser.json())


mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://musharrafansari:XY5t9CKinqT75evR@cluster0.xsylin5.mongodb.net/OrderDatabase", {
    useNewUrlParser: true
})
.then(()=>console.log("mongoDB is connected"))
.catch((error)=>console.log(error))


app.use('/',route)

app.listen(4000,function(){
    console.log("express app is running on PORT " + (4000))
})