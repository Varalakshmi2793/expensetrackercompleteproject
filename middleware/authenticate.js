const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.sendStatus(401);

        const token = authHeader.split(' ')[1]; 

        if (!token) return res.sendStatus(401);

        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                console.error('Error authenticating token:', err);
                return res.sendStatus(401);
            }
            const userId = decoded.userId;
            User.findByPk(userId)
                .then(user => {
                    if (!user) return res.sendStatus(401);
                    req.user = user;
                    next();
                })
                .catch(err => {
                    console.error('Error finding user by ID:', err);
                    res.sendStatus(401);
                });
        });
    } catch (error) {
        console.error('Error authenticating token:', error);
        res.sendStatus(401);
    }
};

module.exports = authenticateToken;
