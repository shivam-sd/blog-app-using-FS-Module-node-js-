const express = require("express");
const app = express();
const path = require("path");
const cookiesParser = require("cookie-parser");
const expressSession = require("express-session");


// const routers = require("./router/index");
const { session } = require("passport");

const indexRouter = require("./router/index");
const userRouter = require("./router/user");
const passport = require("passport");

app.set("view engine" , "ejs");

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"Hey Hey"
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userRouter.serializeUser());
passport.deserializeUser(userRouter.deserializeUser());


app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , "/public")));

app.use("/" , indexRouter);
app.use("/user" , userRouter);


  

app.listen(3000 , function(){
    console.log("Server Is Started From PORT 3000");
});