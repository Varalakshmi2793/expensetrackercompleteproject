const express = require('express');
const controller = require('../controller/logincontroller');

const router = express.Router();


router.post('/signup', controller.signupform);
router.post('/login', controller.loginform);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
module.exports = router; 
