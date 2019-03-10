const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();
let userArray = [];
let editUser;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// needs to be set as 'views'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//App GETS
app.get('/', (req, res)=>{
    res.render('index', {title: 'Add users'});
});

app.get('/users', (req, res)=>{
    editUser = '';
    res.render('users', {title: 'User listing', userArray: userArray})
});

app.get('/edit/:id', (req, res)=>{
    userArray.forEach( user =>{
        if(user.userId === req.params.id){
            editUser = user;
        }
    });

    res.render('edit', {title: 'Edit User', user: editUser })
});

app.get('/delete/:id', (req, res)=>{
    editUser = req.params.id;
    userArray = userArray.filter(user =>{
       return user.userId !== editUser});
    res.redirect('/users');
});

//App POSTS

app.post('/', (req, res)=>{

   let user = {
       userId: req.body.userId,
       userName: req.body.username,
       email: req.body.email,
       address: req.body.address,
       age: req.body.age
   };
   userArray.push(user);
   res.redirect('/users');
});

app.post('/edit/:id', (req, res)=>{
 userArray.forEach( user =>{
     console.log("is this working?");
     if (user.userName === editUser.userName){
         user.userId = req.body.userId;
         user.userName = req.body.username;
         user.email = req.body.email;
         user.address = req.body.address;
         user.age = req.body.age;
     }
 });
    res.redirect('/');
});

//Set up port
app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});