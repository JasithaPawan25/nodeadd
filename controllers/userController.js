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

const register = async (req,res)=>{
    const {name,email,password} = req.body;

    const alreadyExistUser = await User.findOne({where:{email}}).catch(
        (err)=>{
            console.log("Error :",err);
        }
    );

    if(alreadyExistUser){
        return res.status(409).json({message:"User with email already exist!"});
    }

    const newUser =new User ({name,email,password});
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