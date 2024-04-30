const Sequelize = require('sequelize');
const sequelize = require('../path/database');

const fileURL = sequelize.define('fileURL', {
        
    url: Sequelize.STRING
    
});

module.exports = fileURL;
