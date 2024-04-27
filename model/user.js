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
    ispremiumuser: dataType.BOOLEAN
});

module.exports=User;
