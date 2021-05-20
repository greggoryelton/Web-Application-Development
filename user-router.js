const express = require('express');
const session = require('express-session');
const fs = require("fs");
const pug = require("pug");
const logic = require("./logic.js");
const user_db = require("./users.json");
const bodyParser = require('body-parser');
let router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    cookie: {
        maxAge: 50000000000000000

    },
    secret: 'TestingThisSecret'


}))

//double check
router.get("/", send_login, logInUser)
router.post("/loginUser", logInUser)
router.get("/:username", get_username_page)




function logInUser(req,res){
    console.log(req.method);
    if(session.loggedin == true){
        res.send("Error: Unable to Log in. User is already logged in.")
    }
    else {
        let logUser = req.body;
        console.log(logUser);
        console.log("Username: " + req.body.Username);
        let auth_bool = true;

        for(var i=0;i<user_db.length;i++){
            if(logUser.username == user_db[i].Username && logUser.password == user_db[i].Password){
                console.log("user found");
                auth_bool = false;
                req.session.username = logUser.username;
                req.session.loggedin = true;
                //redirect to localhost:3000/users/Username
                res.status(200).redirect(`/user/${user_db[i].Username}`)
            }
        }

        if(auth_bool){
            res.status(401).send("Error: Wrong password or username.")
        }

    


    }
}

function send_login(req,res,next){
    res.render('login', {session: req.session})
}

function get_username_page(req,res){
    // /let uname = req.params.username;
    let user = req.url.substring(1);
   // console.log(user);

    for(var i=0;i<user_db.length-1;i++){
        
        if(user_db[i].Username.toLowerCase() == user.toLowerCase()){
            let temp = user_db[i];
          //  console.log("sending users page");
            res.render("userView", {temp});
            res,status(200);
            
        }
    }

}


/*
function login(req,res,next){

    res.render("login", {});
    res.status(200);

    
    var user = basicAuth(req);
    if(req.session.loggedin){
        res.status.send("You are already logged in.");
        return;
    }
    
    var user = req.body.User;
    console.log("Requesting Username: ", user);
    var pass = req.body.Pass;
    console.log("Password Attempt: ", pass);
    for(Username in user_db){
        let usr = user_db.User1;
        if(usr.Username.toLowerCase().indexOf(user.toLowerCase()) >= 0){
            if(usr.Username === user && usr.Password === pass){
                req,session.loggedin = true;
                req.session.username = user;
                res.status(200).sendFile("public/userView.html", {root: __dirname});
            }
        }
        else{
            res.status(401).send("Error: wrong user or pass");
            return;
        }
 
    }
    next();
    
 
 }
*/
 function createAccount(req,res,next){
    var user = req.body.User;
    var pass = req.body.Pass;

    var tempUser = logic.create_user({Username:user, Password:pass});


    if(has_account(tempUser)){
        res.status(200).send(`Success! User ${user} created.`);
        console.log(`Success! User ${user} created. ` );

    }
    else {
        res.status(404).send("Fatal Error: There was a problem creating the account.")
    }
    next();

}

function logout(req,res,next){
    if(req.session.loggedin){
        req.session.loggedin = false;
        res.status(200).redirect("/");
        console.log("Success! User signed out.");
    }else{
        res.status(200).send("Error: User is not currently logged in.");
        
    }
    next();

}

module.exports = router;