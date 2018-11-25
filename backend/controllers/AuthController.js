const User = require("../models/userModel"); 
const passport = require("passport");
require("../services/passport");
const lodash = require("lodash");
const jwt = require("jwt-simple");
const config = require("../config");

function getTokenFormUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timeStamp
    }, config.secret)
}

exports.signup = function(req, res, next) {
    const {email, password} = req.body;

    User.findOne({email:email}, function (err, existingUser) {
        if(err) {
            return next(err);
        }
        
        if (existingUser) {
            return res.status(422).send({
                error: "Email utilisé"
            });
        }
        
        if(lodash.isEmpty(email) || lodash.isEmpty(password)) {
            return res.status(422).send({
                error: "Email ou mdp vide"
            });
        } else {
            const user = new User({
                email: email,
                password: password
            })
            user.save(function(err) {
                if(err) {
                    return next(err)
                }
                res.json({token: getTokenFormUser(user)});
            })
        }
    });
};

exports.signin = function(req, res, next) {
    res.json({
        token: getTokenFormUser(req.user)
    });
};