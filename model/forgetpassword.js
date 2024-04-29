const Sequelize = require('sequelize');
const sequelize = require('../path/database');

const forgetpwd = sequelize.define('forgetpwd', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
        },
    
    isactive: Sequelize.BOOLEAN,
    
});

module.exports = forgetpwd;
