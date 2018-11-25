const passport = require("passport");
const User = require("../models/userModel");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local");

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

const jwtHaveToken = new JwtStrategy(jwtOptions, function(payload, done){
    const userId =  payload.sub;

    User.findById(userId, function(err, user){
        if(err) {
            return done(err, false);
        }
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

// https://github.com/jaredhanson/passport-local
// par défaut LocalStrategy, s'attend à trouver les clé 'username' et 'password', il faut donc les renommer si on utilise des clé différentes
const localOptions = {
    usernameField: 'email'
}

const localLoginStrategy = new localStrategy(localOptions, function(email, password, done){
    User.findOne({
        email : email
    }, function(err, user){
        if(err) return done(err)
        if(!user) return done(null, false)
        user.isPasswordEqualTo(password, function(err, isMatch){
            if(err) return done(err)
            if(!isMatch) return done(null,  false)
            return done(null, user);
        });
    });
});

passport.use(jwtHaveToken);
passport.use(localLoginStrategy);