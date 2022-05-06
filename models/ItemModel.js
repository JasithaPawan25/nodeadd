const { Sequelize } = require(".");

  

 module.exports=(sequelize, DataTypes) => {

    const Item = sequelize.define('item',{ 

        // ItemName	
        // ItemDescription
        // ItemCatagory
        // ItemImage
        // ItemPrice	
        // ItemCity
        // ItemTelephone	
        // User_idUser,
        
        ItemName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        // image: {
        //     type: DataTypes.STRING
        //     // allowNull:false
        // },

        ItemDescription: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ItemCatagory: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ItemImage: {
            type: DataTypes.STRING
            // allowNull:false
        },
        ItemPrice: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ItemCity: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ItemTelephone: {
            type: DataTypes.STRING,
            allowNull:false
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //        model: 'user', 
        //        key: 'id',
        //     }
        // }

       

        // userId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // }

    },{
        timestamps:false,
       // updatedAt:false,
      //  createdAt:false
    })

     return Item;
 }