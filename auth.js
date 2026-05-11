const passport = require('passport');
const Doctor = require('./models/doctor');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async(username,password,done) =>{
    try{
        //console.log('received credentials',username,password );
        const user = await Doctor.findOne({username:username});
        if(!user)
            return done(null,false,{message:'incorrect username'})
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch)
            return done(null,user)
        else
            return done(null,false,{message:'incorrect password'})
    }catch(err){
        return done(err);
    }
}))

module.exports = passport;