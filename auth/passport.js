const passport =require('passport')
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJwt =  passportJWT.Strategy;
const UserDb =require('../models/UserModel')

const db =require('../models')

const User = db.users;

passport.use(
    new StrategyJwt(
       { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:process.env.JWT_SECRET,
        },
        function(jwtPayload,done)
        {
            return User.findOne({ where: {id :jwtPayload.id }})
            .then((users)=>
              { 
                   return done(null,users);
              })
              .catch((err)=>{
                  return done(err);
              });

        }

    )
)