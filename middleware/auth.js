const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { promisify } = require('util');

const verifyToken = promisify(jwt.verify);

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        
        if (!token) {
            console.error('Token is missing from request headers');
            return res.sendStatus(401);
        }
        
        console.log('Received token:', token);
        const decoded = await verifyToken(token, 'secretkey');

        console.log('Decoded token:', decoded);
        
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            console.error('User not found for decoded user ID:', decoded.userId);
            return res.sendStatus(401);
        }
        
        req.user = user;
        next(); 
    } catch (error) {
        console.error('Error authenticating token:', error);
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateToken: authenticateToken
};
