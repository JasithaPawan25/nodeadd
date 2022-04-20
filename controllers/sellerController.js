const db =require('../models')
const pass = require('../auth/passport')
const loginController =require("../controllers/loginController.js");

// image Upload
const multer = require('multer')
// const path = require('path')
const path = require('path');
const jwt = require('jsonwebtoken')
const passport = require("passport");




const Seller = db.sellers;

//add

const addSeller =  async (req,res)=>{

    // const sds = req.userId
 
     let sellerinfo ={

        SellerFName:req.body.SellerFName,
        SellerPAderess:req.body.SellerPAderess,
        SellerPTelephone:req.body.SellerPTelephone,
        userId:1,
       //  userId:userIdd
 
 
 
         // name:req.body.name,
         // email:req.body.email,
         // password:req.body.password
     }
     const seller = await Seller.create(sellerinfo)
     res.status(200).send(seller)
     console.log(seller)
 }


//getAll seller

const getAllSellers = async (req,res) =>{
    let selllers = await Seller.findAll({})
    res.status(200).send(selllers)
}





//getById seller


const getSingleSeller = async (req,res) =>{
    let id =req.params.id
    let seller = await Seller.findOne({ where : {id : id}})
    res.status(200).send(seller)
}

//update seller

const updateSeller =async (req,res) =>{
    let id =req.params.id
    const seller =await Seller.update(req.body, {where :{id :id}})

    res.status(200).send('Information Updated !')

}

//Delete Seller

const deleteSeller = async (req,res)=>{
    let id =req.params.id
    await Seller.destroy({where :{id :id}})
    res.status(200).send('Seller is deleted !')
}





module.exports = {
    addSeller,
    getAllSellers,
    deleteSeller,
    updateSeller,
    getSingleSeller
}