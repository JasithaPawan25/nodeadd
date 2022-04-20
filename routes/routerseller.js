const userController =require("../controllers/userController.js");
const itemController =require("../controllers/itemController.js");
const loginController =require("../controllers/loginController.js");
const SellerController =require("../controllers/sellerController.js");
const passport = require('passport')
const express = require ("express")

// var myPassportService = require("./auth/passport")(passport)

const router =require('express').Router()

router.post('/add',passport.authenticate('jwt',{session:false}),SellerController.addSeller)
router.get('/getall',passport.authenticate('jwt',{session:false}),SellerController.getAllSellers)
router.get('/getid/:id',passport.authenticate('jwt',{session:false}),SellerController.getSingleSeller)
router.put('/update/:id',passport.authenticate('jwt',{session:false}),SellerController.updateSeller)
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),SellerController.deleteSeller)

module.exports =router

