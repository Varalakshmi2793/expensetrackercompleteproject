const sib = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User= require('../model/user');

const Password= require('../model/forgetpassword');


exports.sendPasswordResetEmail = async (req, res) => {
    try {

        const receiverEmail = req.body.email;
        const user = await User.findOne({ where: { email: receiverEmail } });
        const id = uuidv4();
      
        if(user){
            
           
            await Password.create({ id: id, isactive: true, userId: user.id }); 
                }

        const client = new sib.ApiClient();
        
        client.authentications['api-key'].apiKey = process.env.SENGRID_API_KEY;
        const tranEmailApi = new sib.TransactionalEmailsApi(client);

        const sender = {
            email: 'varaluckky.2@gmail'
        };

       
        await tranEmailApi.sendTransacEmail({
            sender,
            to: [{ email: receiverEmail }],
            subject: 'Reset your password',
            html: `<a href="http://localhost:1280/resetpassword/${id}">Reset password</a>`
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; 
    }
};
exports.resetpassword = async (req, res) => {
    try {
        const id = req.params.id;
        const passwordRequest = await Password.findOne({ where: { id } });
        if (passwordRequest) {
            await passwordRequest.update({ active: false });
            res.status(200).send(`
                <html>
                    <form action="/updatepassword/${id}" method="post">
                        <label for="newpassword">Enter New password</label>
                        <input name="newpassword" type="password" required></input>
                        <button type="submit">Reset password</button>
                    </form>
                </html>
            `);
        } else {
            res.status(404).send('Password reset request not found');
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updatepassword = async (req, res) => {
    try {
        const { newpassword } = req.body;
        const { resetpasswordid } = req.params;
        
        const resetpasswordrequest = await Password.findOne({ where: { id: resetpasswordid } });
        if (!resetpasswordrequest) {
            return res.status(404).json({ error: 'No password reset request found', success: false });
        }
    
        const user = await User.findOne({ where: { id: resetpasswordrequest.userId } });
        if (!user) {
            return res.status(404).json({ error: 'No user found', success: false });
        }
    
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        console.log('Generated salt:', salt);
        console.log('New password:', newpassword);
        const hash = await bcrypt.hash(newpassword, salt);
        console.log('Generated hash:', hash);
    
        await user.update({ password: hash });
        return res.status(201).json({ message: 'Password successfully updated', success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', success: false });
    }
}
