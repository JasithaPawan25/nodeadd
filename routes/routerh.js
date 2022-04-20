const userController =require("../controllers/userController.js");
const itemController =require("../controllers/itemController.js");
const loginController =require("../controllers/loginController.js");
const passport = require('passport')
const express = require ("express")

// var myPassportService = require("./auth/passport")(passport)

const router =require('express').Router()


// item per page
router.get('/:page',itemController.itemPerPage)


module.exports =router