// const User = require('../models/UserModel');
const Express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const db =require('../models');
const { response } = require('express');
const decode = require('jsonwebtoken/decode');

const User = db.users;




const Uerslogin=  async (req,res)=>{
    const{email,password} = req.body;

   

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

    const validPassword = await bcrypt.compare(password,userWithEmail.password);


  //  if(userWithEmail.password != validPassword)
  if (!validPassword)
    {
        return res
        .status(400)
        .json({message:"Email  or Password does not  match!!"})
    }

    const jwtToken = jwt.sign(
        { id:userWithEmail.id , email: userWithEmail.email},
        process.env.JWT_SECRET,

    );

    

    // if(jwtToken)
    // {
    //     req.decodetoken =decode
    // }

   

    res.json({message:"Welcome Back, User", token:jwtToken,id:userWithEmail.id})


    const iind =userWithEmail.id

 

  

    
}

// export jwtToken =userWithEmail.id

module.exports = {
    Uerslogin
    
}