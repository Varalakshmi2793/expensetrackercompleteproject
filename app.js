const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./model/model');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
        const existingUser = await sequelize.findOne({ where: { email } });
        if (existingUser) {
            return res.status(403).json({ error: 'Email already exists' });
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                throw err; // Handle error during hashing
            }
            await sequelize.create({ username, email, password: hash });
            res.status(200).json({ message: 'User created successfully' });
        });
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
        const user = await sequelize.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ error: 'Incorrect email or password' });
            }
            res.status(200).json({ message: 'Login successful', user });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.listen(1099, () => {
    console.log('Server is running on port 1099');
});
