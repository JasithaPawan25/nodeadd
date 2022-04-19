// const User = require('../models/UserModel');
const Express = require('express')
const jwt = require('jsonwebtoken')

const db =require('../models')

const User = db.users;


const Uerslogin=  async (req,res)=>{
    const{ email,password} = req.body;

    const userWithEmail =await User.findOne({where: { email } }).catch(
        (err)=> {
            console.log("Error : ", err);
        }
    );

    if(!userWithEmail)
    
      {  return res
    
    // else
    // {
        .status(400)
        .json({message:"Email or Password does not match!"});
    }

    if(userWithEmail.password != password)
    {
        return res
        .status(400)
        .json({message:"Email  or Password does not  match!!"})
    }

    const jwtToken = jwt.sign(
        { id:userWithEmail.id , email: userWithEmail.email},
        process.env.JWT_SECRET
    );

    res.json({message:"Welcome Back, User", token:jwtToken})


    
}

module.exports = {
    Uerslogin
}