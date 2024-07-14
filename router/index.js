const express = require("express");
const router = express.Router();
const localStratagy = require("passport-local");
const passport = require("passport");
const usermodel = require("../router/user")
const bcrypt = require("bcrypt");

passport.use(new localStratagy(usermodel.authenticate()));

router.get("/" , (req,res) => {
    res.render("index");
});

router.get("/login" , (req,res) => {
    res.render("login");
});

router.post("/register" , function(req,res){
    const userdata = new usermodel({
        username:req.body.username,
        email:req.body.email,
        age:req.body.age
    });
    usermodel.register(userdata , req.body.password)
    .then(function(){
        passport.authenticate("local")(req,res , function(){
            res.redirect("/feed");
        });
    });
});

router.post("/login" , passport.authenticate("local" , {
    successRedirect:"/feed",
    failureRedirect:"/login"
}), function(req, res){})


router.get("/logout" , function(req,res , next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect("/");
    });
});

function IsLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/register");
}

module.exports = router;