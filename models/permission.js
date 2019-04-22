//permission  middelwhare check user

module.exports = function permission(req, res, next){
    if(req.session.role == 'lead dev')
        return next();
        res.json('You do not have permisson !!!!')    
}

module.exports.checkLogin = (req, res, next)=>{
    if(!req.session.role){
        return next()
    } else{
        res.send('Already Logged in')
    }
}