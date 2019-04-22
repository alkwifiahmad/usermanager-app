const express = require('express');
const app = express();
const session = require('express-session')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5400;

app.use(bodyParser.urlencoded({
    extended: false
}))

mongoose.connect('mongodb://Alkwifi:Alkwifi1976@ds141674.mlab.com:41674/loginserverfolderdb', { useNewUrlParser: true }).then(()=>{
    console.log('DB is connected')
}).catch(()=>{
    console.log('Error to connect DB...');
    
})

// setup a static folder
app.use(express.static(__dirname + '/public'))

// setup view engine
app.set('view engine', 'hbs')
// setup session express
app.use(session({
    secret: 'I am SPY',
    cookie:{
        maxAge: 864001000 // 1 day
    },
    resave: false,
    saveUninitialized: true
}));



// // mddleaware to give access control 
// let authTest = function(req, res, next){
//     if(req.user.role = 'web dev'){
//         return true;
//     } else {
//         return false
//     }
//     next();
// }
// app.use(authTest())

app.use('/', require('./routes/index'))

// route error handler
app.get('*', (req, res)=>{
    res.send('<h1>404</h1> This is wrong route. Please contact to the owner ')
})

app.listen(PORT, ()=>{
    console.log('Server is running on port 5400');
    
})