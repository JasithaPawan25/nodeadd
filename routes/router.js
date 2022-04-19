const userController =require("../controllers/userController.js");
const itemController =require("../controllers/itemController.js");
const loginController =require("../controllers/loginController.js");
const passport = require('passport')
const express = require ("express")

// var myPassportService = require("./auth/passport")(passport)

const router =require('express').Router()




router.post('/addusers',userController.addUser)



// item routes

 router.post('/additems',passport.authenticate('jwt',{session:false}), itemController.upload, itemController.addItem)

router.get('/getallitems',passport.authenticate('jwt',{session:false}),itemController.getAllProducts)
router.get('/:id',itemController.getSingleItem)
router.put('/:id',itemController.updateItem)
router.delete('/:id',itemController.deleteItem)


// login testing

router.post("/login",loginController.Uerslogin)

module.exports =router