require('dotenv').config();
const fs=require('fs');
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
const morgan= require('morgan');
const fileUrl=require('./model/fileUrl');
const cors = require('cors');
const helmet = require('helmet');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined', {stream: accessLogStream}));

const accessLogStream= fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
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

User.hasMany(fileUrl);
fileUrl.belongsTo(User);

app.use(helmet());
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 1280);
}).catch(err => {
    console.error('Error syncing database:', err);
});


