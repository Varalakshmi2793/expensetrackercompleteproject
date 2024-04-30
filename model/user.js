const Sequelize= require('sequelize');
const sequelize=require('../path/database');
const dataType=Sequelize;
const User=sequelize.define('user',{
    username: {
        type: dataType.STRING,
        allowNull: false
    },
    email: {
        type: dataType.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: dataType.STRING,
        allowNull: false
    },
    ispremiumuser: dataType.BOOLEAN,
    totalexpense: dataType.DOUBLE
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
});

module.exports=User;
