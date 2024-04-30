const express = require('express');
const controller = require('../controller/logincontroller');

const router = express.Router();


router.post('/signup', controller.signupform);
router.post('/login', controller.loginform);


module.exports = router; 
