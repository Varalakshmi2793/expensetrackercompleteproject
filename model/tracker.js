const Sequelize= require('sequelize');
const sequelize=require('../path/database');
const dataType=Sequelize;
const tracker=sequelize.define('expenseTracker',{
    expenseamount:{
        type:dataType.DOUBLE,
        allowNull:false
    },
    description:{
        type:dataType.STRING,
        allowNull:false
    },
    category:{
        type:dataType.STRING,
        allowNull:true
    }

});


module.exports=tracker;

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database:', err);
});