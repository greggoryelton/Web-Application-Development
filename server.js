const express = require('express');
const session = require('express-session');
const user_db = require("./users.json");
const movie_db = require("./movie-data.json");
const logic = require("./logic.js");
const pug = require("pug");
const { search_movie } = require('./logic.js');
const movieRouter = require('./movie-router');
const userRouter = require("./user-router");
const peopleRouter = require("./people-router");
const app = express();
let router = express.Router();



app.use(session({secret: 'secret_s', cookie:{maxAge: 10000}}))
app.set("view engine","pug");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", send_homepage);
app.use("/movies",movieRouter);
app.use("/user", userRouter);
app.use("/people", peopleRouter);
//app.use("/login", userRouter);

function send_homepage(req, res, next){
    let rnd = [];
    for(var i=0; i<9;i++){
        rnd[i] = Math.floor(Math.random() * 5000);
    }
    //console.log("mov");
    res.render('index', {t1: movie_db[rnd[0]].Title, p1 : movie_db[rnd[0]].Poster, t2: movie_db[rnd[1]].Title, p2: movie_db[rnd[1]].Poster, t3: movie_db[rnd[2]].Title, p3: movie_db[rnd[2]].Poster, t4: movie_db[rnd[3]].Title, p4: movie_db[rnd[3]].Poster, t5: movie_db[rnd[4]].Title, p5: movie_db[rnd[4]].Poster, t6: movie_db[rnd[5]].Title, p6: movie_db[rnd[5]].Poster, t7: movie_db[rnd[6]].Title, p7: movie_db[rnd[6]].Poster, t8: movie_db[rnd[7]].Title, p8:movie_db[rnd[7]].Poster, t9: movie_db[rnd[8]].Title, p9: movie_db[rnd[8]].Poster})
    res.status(200);
    next();
    
}




app.listen(3000);
console.log("Listening on port 3000");

