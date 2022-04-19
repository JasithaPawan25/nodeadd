// const { USER } = require('../config/dbConfig')
// const db =require('../models/UserModel.js')
const db =require('../models')

const User = db.users;

const addUser =  async (req,res)=>{
    let info ={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    const user = await User.create(info)
    res.status(200).send(user)
    console.log(user)
}



module.exports = {
    addUser
}