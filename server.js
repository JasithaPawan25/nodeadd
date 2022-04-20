const express = require("express");
const cors = require("cors");
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

app.use('/Images', express.static('./Images'))





app.get('/',(req,res)=>{
    res.json({message:'Hello from API'})
})


const PORT=process.env.PORT || 8081

app.listen(PORT,()=>{
    console.log('server is running port:', PORT)
})