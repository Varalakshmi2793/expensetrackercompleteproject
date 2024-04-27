require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./path/database');
const loginrouter = require('./router/loginrouter');
const expenserouter = require('./router/expenserouter');
const purchaserouter = require('./router/purchase');
const User=require('./model/user');
const Expense=require('./model/tracker');
const Order= require('./model/purchase');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/expense', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'expense.html'));
});
app.use(loginrouter);
app.use(expenserouter);
app.use(purchaserouter);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(() => {
    app.listen(1280);
}).catch(err => {
    console.error('Error syncing database:', err);
});


