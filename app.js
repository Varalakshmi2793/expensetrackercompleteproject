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
    console.log(req.body);
    
    try {
        // Check if the email already exists in the database
        const existingUser = await sequelize.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        // Create a new user with signup data
        const newUser = await sequelize.create({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        console.log('New user created:', newUser);
        res.send("User signed up successfully");
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.post('/auth/login',(req, res) => { 
    console.log(req.body);
    res.send("Log in sucessfully")
});
app.listen(1090);