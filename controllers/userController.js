// const { USER } = require('../config/dbConfig')
// const db =require('../models/UserModel.js')
const db =require('../models')

//const {bcrypt}=require('bcrypt');
const bcrypt = require('bcrypt');

const User = db.users;

const addUser =  async (req,res)=>{

    const salt =genSaltSync(10);

    let info ={
        name:req.body.name,

        email:req.body.email,
        password:hashSync(req.body.password,salt)
    }
    const user = await User.create(info)
    res.status(200).send(user)
    console.log(user)
}

const register = async (req,res)=>{
  //  const salt =genSaltSync(10);
  //  let hashPassword = await hashSync(req.body.password, salt);

    const {name,email,password} = req.body;



    const alreadyExistUser = await User.findOne({where:{email}}).catch(
        (err)=>{
            console.log("Error :",err);
        }
    );

    if(alreadyExistUser){
        return res.status(409).json({message:"User with email already exist!"});
    }

   // let hashPassword = hashSync(password, salt);

    const newUser =new User ({name,email,password});

    const salt = await bcrypt.genSalt(10);
    
    // now we set user password to hashed password
    
    newUser.password = await bcrypt.hash(newUser.password, salt);


    const savedUser =await newUser.save().catch((err)=>{
        console.log("Error :",err);
        res.status(500).json({error:"Cannot register user at the moment! "});
    });

    if(savedUser) res.json({message:"thanks for registering"});

}



module.exports = {
    addUser,
    register
}