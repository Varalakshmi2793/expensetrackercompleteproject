const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const path=require('path');
const sequelize=require('./model/model');
const cors=require('cors')

app.use(express.urlencoded({extended: false}))
app.use(bodyparser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));

sequelize.sync().then(() => {
    console.log('Database synced');
   
}).catch(err => {
    console.error('Error syncing database:', err);
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.post('/auth/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await sequelize.findOne({ where: { email } });
        if (existingUser) {
            // Email already exists, send a 403 response with an error message
            return res.status(403).json({ error: 'Email already exists' });
        }

        // Create the new user
        const newUser = await sequelize.create({ username, email, password });

        // Send a success response
        res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await sequelize.findOne({ where: {email: email } });

        if (!user || user.password !== password || !password) {
            return res.status(403).json({ error: 'Error: request failed with status code' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});
    

app.listen(1099);