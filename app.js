const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./path/database');
const loginrouter = require('./router/loginrouter');
const expenserouter = require('./router/expenserouter');
const cors = require('cors');

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

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.use(loginrouter);
app.get('/expense', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'expense.html'));
});
app.use(expenserouter);

app.listen(6098, () => {
    console.log('Server is running on port 1099');
});
