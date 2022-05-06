const dbConfig = require("../config/dbConfig.js");

const {Sequelize, DataTypes}=require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
        {
            host:dbConfig.HOST,
            dialect:dbConfig.dialect,
            operatorsAliases:false
        }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected..')
})
.catch(err=>{
    console.log('Error'+err)
})

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize

db.users =require( './UserModel.js')(sequelize, DataTypes)
db.items =require( './ItemModel.js')(sequelize, DataTypes)
db.sellers =require( './sellerModel.js')(sequelize, DataTypes)

//{force:false}

db.sequelize.sync()
.then(()=>{
    console.log('yes re-sync done!')
})

// one to many relationship
db.users.hasMany(db.items, {
    //   foreignKey: 'user_id',
       as: "items"
   })
   
   db.items.belongsTo(db.users, {
       foreignKey: "userId",
       as: "user",
       // target_key:'user_id'
   })

// one to one relatioship for user and seller

// Foo.hasOne(Bar, {
//     foreignKey: 'myFooId'
//   });
//   Bar.belongsTo(Foo);

db.users.hasOne(db.sellers);
db.sellers.belongsTo(db.users);




module.exports =db