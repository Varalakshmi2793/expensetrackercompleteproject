const Sequelize=require('sequelize');

const sequelize= new Sequelize('testexpense', 'root', 'Password@123', {
    host:'localhost',
    dialect:'mysql'
})




module.exports=sequelize;