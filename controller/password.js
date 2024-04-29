const sib = require('sib-api-v3-sdk');

exports.sendPasswordResetEmail = async (receiverEmail) => {
    try {
        console.log(receiverEmail);
        const client = new sib.ApiClient();
        
        client.authentications['api-key'].apiKey = process.env.API_KEY;
        const tranEmailApi = new sib.TransactionalEmailsApi(client);

        const sender = {
            email: 'varaluckky.2@gmail.com'
        };

        // Correcting the method name to sendTransacEmail
        await tranEmailApi.sendTransacEmail({
            sender,
            to: [{ email: receiverEmail }],
            subject: 'Reset your password',
            textContent: 'Reset your password'
        });

        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; 
    }
};
