require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./path/database');
const loginrouter = require('./router/loginrouter');
const expenserouter = require('./router/expenserouter');
const purchaserouter = require('./router/purchase');
const premium= require('./router/premium');
const forgetpass=require('./router/forgetpass');
const User=require('./model/user');
const Expense=require('./model/tracker');
const Order= require('./model/purchase');
const password=require('./model/forgetpassword');
<<<<<<< HEAD
<<<<<<< HEAD
const fileUrl=require('./model/fileUrl');
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975

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
app.use(premium);
app.use(loginrouter);
app.use(expenserouter);
app.use(purchaserouter);
app.get('/forgetpassword', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'forgetpassword.html'))
})
app.use(forgetpass);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(password);
password.belongsTo(User);
<<<<<<< HEAD
<<<<<<< HEAD
User.hasMany(fileUrl);
fileUrl.belongsTo(User);
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975
=======
>>>>>>> 96a6eeb49bd73a14325de3b68195ea4a4e6c3975

sequelize.sync().then(() => {
    app.listen(1280);
}).catch(err => {
    console.error('Error syncing database:', err);
});


