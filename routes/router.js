const userController =require("../controllers/userController.js");
const itemController =require("../controllers/itemController.js");
const loginController =require("../controllers/loginController.js");
const passport = require('passport')
const express = require ("express")

// var myPassportService = require("./auth/passport")(passport)

const router =require('express').Router()




//router.post('/addusers',userController.addUser)
router.post('/signup',userController.register)

// item per page
//router.get('/:page',itemController.itemPerPage)

// item routes

 router.post('/add',passport.authenticate('jwt',{session:false}), itemController.upload, itemController.addItem)

router.get('/getall',passport.authenticate('jwt',{session:false}),itemController.getAllProducts)
router.get('/:id', passport.authenticate('jwt',{session:false}), itemController.getSingleItem)
router.put('/update/:id',passport.authenticate('jwt',{session:false}),itemController.updateProduct)
router.delete('/:id',passport.authenticate('jwt',{session:false}),itemController.deleteItem)


// login testing

router.post("/login",loginController.Uerslogin)

module.exports =router