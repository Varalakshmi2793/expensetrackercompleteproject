const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        console.log(token);
        const user = jwt.verify(token, 'secretkey');

        console.log('userID>>', user.userId);
        
        User.findByPk(user.userId).then(user => {
               
                req.user = user;
                
                next(); 
            })
            .catch(err => {
                console.error('Error finding user by ID test:', err);
                res.sendStatus(401);
            });
    } catch (error) {
        console.error('Error authenticating token:', error);
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateToken: authenticateToken
};
