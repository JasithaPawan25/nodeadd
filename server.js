const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); 
 require('./auth/passport');

const app=express()
var corOptions ={
    origin:'https://localhost:8080'
}



app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))




const router=require('./routes/router.js')
const routerHome=require('./routes/routerh.js')
const routerSeller=require('./routes/routerseller.js')
app.use('/api/users',router)
app.use('/api/home',routerHome)
app.use('/api/sellers',routerSeller)



//static Images Folder

//app.use('/Images', express.static(__dirname+'./Images'))
// app.use('/images', express.static(path.join(__dirname,'Images')))
 app.use('/public',express.static(path.join(__dirname,'images')))





app.get('/',(req,res)=>{
    // res.json({message:'Hello from API'})
  //  res.sendFile(path.join(__dirname,'images','1650538907727.jpg'))
})


const PORT=process.env.PORT || 8081

app.listen(PORT,()=>{
    console.log('server is running port:', PORT)
})