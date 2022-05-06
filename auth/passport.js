const passport =require('passport')
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJwt =  passportJWT.Strategy;
const UserDb =require('../models/UserModel')


const jjwt =require("jsonwebtoken");

const db =require('../models');
const res = require('express/lib/response');
const req = require('express/lib/request');

const User = db.users;

// module.exports = (req, res, next) => {

passport.use(
    new StrategyJwt(
       { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:process.env.JWT_SECRET,
        },
        function(jwtPayload,done,)
        { 
        
              return User.findOne({ where: {id :jwtPayload.id }})
            .then((users)=>
              { 

          //      req.jwtPayload=jwtPayload
                // module.exports = (req,res)=>{

                // }
              //  res.locals.userID=
            //    res.locals.jwtPayload=jwtPayload
                // const jwtID = async (req,res)=>{
                //   const jwttID = req.jwtPayload.id;
                //   res.status(200).send(jwttID)

                // }
               
              
            
                 
                   return done(null,users);
              })
              .catch((err)=>{
                  return done(err);
              });

            

        }

    )
    
 
)






      // }

// module.exports = {
//   jwtID,
  
// }


