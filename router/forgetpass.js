const express = require('express');
const router = express.Router();
const controller = require('../controller/password');

router.post('/forgetpassword', async (req, res) => {
    try {
        const receiverEmail = req.body.email;
        await controller.sendPasswordResetEmail(receiverEmail);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
