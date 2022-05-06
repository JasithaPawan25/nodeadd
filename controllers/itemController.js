
const db =require('../models')
const pass = require('../auth/passport')
const loginController =require("../controllers/loginController.js");

// image Upload
const multer = require('multer')
// const path = require('path')
const path = require('path');
const jwt = require('jsonwebtoken')
const passport = require("passport");
const { items, users } = require('../models');
const { jwtToken } = require('../controllers/loginController.js');
const { request } = require('express');
const { response } = require('express');





const Item = db.items;
const uss = db.users;

//const iddd = res.locals.jwtToken.userid;

//const Users =loginController.Uerslogin;
//  const fff =loginController.Uerslogin
//  const zeed =fff.


//const UserrID = pass.sampleFunction;


// add Item

const addItem =  async (req,res)=>{

    //const sdsdsdsdp =response.locals;
   // const {erfd} =req.jwtToken.id

   const dead = req.headers.authorization.split(' ')[1];
  // const deadio = deco

 // const deddi ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoienpAZ21haWwuY29tIiwiaWF0IjoxNjUxNDg4NTIyfQ.ScQB2t4QtUK3RB8_q_oiPyD9Xaj7t4Do0NR0nEcaIno"

   const decodedJwt = jwt.decode(dead);

   // const iid=req.decodedJwt.id;

    console.log('id :',dead)
    console.log('info :',decodedJwt)
    console.log('infos :',decodedJwt.id)
    
  //  console.log('id :',iid)


    let iteminfo ={

       ItemName:req.body.ItemName,
        ItemDescription:req.body.ItemDescription,
        ItemCatagory:req.body.ItemCatagory,
        ItemImage:req.file.path,
        ItemPrice:req.body.ItemPrice,	
        ItemCity:req.body.ItemCity,
        ItemTelephone:req.body.ItemTelephone,
        userId:decodedJwt.id



        // name:req.body.name,
        // email:req.body.email,
        // password:req.body.password
    }
    const item = await Item.create(iteminfo)
    res.status(200).send(item)
    console.log(item)
}

// get All Items

const getAllProducts = async (req,res) =>{
    let items = await Item.findAll({})
    res.status(200).send(items)
}




const getAllProductss = async (req,res) =>{
    let items = await Item.findAll({
        include:[{
            model:uss,
            as: 'user'
        }]
    })
    res.status(200).send(items)
}


// items per page
const itemPerPage = async (req,res) =>{
    let limit =3;
    let offset =0;

    db.items.findAndCountAll()
    .then((data)=>{
        let page =req.params.page;
        let pages = Math.ceil(data.count/limit);

        offset =limit*(page-1);

        db.items.findAll({
            attributes:['id','ItemName','ItemDescription','ItemCatagory','ItemImage','ItemPrice','ItemCity','ItemTelephone','createdAt','updatedAt','userId'],
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
        })
        .then((users)=>{
            res.status(200).json({'result': users, 'count': data.count, 'pages': pages});
        });

        // .catch(function (error) {
        //     res.status(500).send('Internal Server Error');
        // });

    })



}


// get single Item using Item Id

const getSingleItem = async (req,res) =>{
    let id =req.params.id
    let item = await Item.findOne({ where : {id : id}})
    res.status(200).send(item)
}

// Update the Item

// const updateItem =async (req,res) =>{
//     let id =req.params.id
//     const item =await Item.update(req.body, {where :{id :id}})

//     res.status(200).send(item,'Item Updated')

// }


const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Item.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

//Delete the Item

const deleteItem = async (req,res)=>{
    let id =req.params.id
    await Item.destroy({where :{id :id}})
    res.status(200).send('Item is deleted !')
}


//  connect one to many relation item and user

 const itemSeller = async (req,res)=>{
    const id =req.params.id
     const data =await Item.findOne({
         include:[{
             model:uss,
             as: 'user'
         }],
         where : {id:id}


        //  const data =await Item.findAll({
        //     include:[{
        //         model:uss,
        //         as: 'user'
        //     }],
        //     where : {id:id}
     })
     res.status(200).send(data)
 }




// Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('ItemImage')





module.exports = {
    addItem,
    upload,
    getAllProducts,
    getAllProductss,
    deleteItem,
    itemSeller,
    updateProduct,
    getSingleItem,
    itemPerPage
}