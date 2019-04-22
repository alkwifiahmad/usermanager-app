// index.js
const express = require('express');
const router = express.Router();

// models User Schema
const User = require('../models/user')
const permission = require('../models/permission')

router.get('/user/list', (req, res)=>{
    res.render('userlist')
})

router.get('/profile', (req, res)=>{
    res.render('profile')
})

// registration form page requset (open)
router.get('/', (req, res)=>{
  res.render('index')  
})

//post data for registration 
router.post('/signup', (req, res)=>{
    let user = {
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        address:{
            city:'Grevenbroich',
            zip: 41515,
            street: 'Gersbergstr',
            country: 'Deutschland'
        }
    }
    const newUser = new User(user);
    newUser.save((err, user)=>{
        if(err) throw err;
        //res.json(user)
        res.redirect('/login')
    })
    //User.find().then(data=>{res.send(data)})
    
})

// login form page requset (open)
router.get('/login', permission.checkLogin, (req, res)=>{
    res.render('login')
})

//post data for login
router.post('/login', (req, res)=>{
    let {email, password} = req.body;
    
    const query = {email: email}
    User.findOne(query, (err, user)=>{
        if(err) throw err;
        if(password === user.password){
            // save user role in session data
            req.session.user = user;
            req.session.save();
            console.log(req.session)
            res.render('profile', {
                user: user
            })
        } else {
            // res.send('Check your Password and Email...Sothing wrong!!!')
            res.render('login', {msg: 'Check your Password and Email...Something wrong!!!'})
        }
        
    })
})

// user list by manager

router.get('/userlist', permission.checkLogin, (req, res)=> {
    let list = User.find();
    list.exec((err, user)=> {
        res.render('userlist', {
            user: user
        })
    })
})

router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/login')
})



module.exports = router;