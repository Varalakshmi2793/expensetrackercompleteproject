const express=require('express');
const mysql=require('mysql');
const app=express();
const bodyparser=require('body-parser');
const path=require('path');

const db=mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Password@123',
    database:'expensetracerapp'
})
db.connect((error) =>{
    if(error){
        console.log(err)
    }
    else{
        console.log('mysql connected');
    }
})
app.use(express.urlencoded({extended: false}))
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, './public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.post('/auth/signup',(req, res) => { 
    console.log(req.body);
    res.send("form submitted")
});
app.listen(1055);