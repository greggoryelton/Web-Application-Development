const express = require('express');
const session = require('express-session');
const user_db = require("./users.json");
const logic = require("./logic.js");
const { create_user, has_account } = require('./logic.js');

const app = express();

app.use(session({secret: 'secret_s', cookie:{maxAge: 10000}}))

app.use(express.static("public", {index: "index.html"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post("/loginTest.html", login);
app.post("/newAccount.html",createAccount);


function login(req,res,next){
   // var user = basicAuth(req);
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
   

};

//Create account 

function createAccount(req,res,next){
    var user = req.body.User;
    var pass = req.body.Pass;

    var tempUser = logic.create_user({Username:user, Password:pass});

    if(has_account(tempUser)){
        res.status(200).send(`Success! User ${user} created.`);
        console.log(`Success! User ${user} created. ` );

    }
    else {
        res.status(200).send("Fatal Error: There was a problem creating the account.")
    }
    next();

}

function logout(req,res,next){
    if(req.session.loggedin){
        req.session.loggedin = false;
        res.status(200).sendFile("public/index.html", {root: __dirname});
        console.log("Success! User signed out.");
    }else{
        res.status(200).send("Error: User is not currently logged in.");
        
    }
    next();

}

app.listen(3000);
console.log("Listening on port 3000");

