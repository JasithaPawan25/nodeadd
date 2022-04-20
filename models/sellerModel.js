
 module.exports=(sequelize, DataTypes) => {

    const User = sequelize.define('seller',{ 
        
        SellerFName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        SellerPAderess: {
            type: DataTypes.STRING,
           // allowNull:false
        },
        SellerPTelephone : {
            type: DataTypes.STRING,
           // allowNull:false
        }
    },{
        timestamps:false,
       // updatedAt:false,
      //  createdAt:false
    })

     return User;
 }