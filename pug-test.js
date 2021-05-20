const express = require('express');
const session = require('express-session');
const user_db = require("./users.json");
const logic = require("./logic.js");
const pug = require("pug");
const movie_db = require("./movie-data.json");



const app = express();
app.set("view engine","pug");
app.use(express.json());
app.use(express.urlencoded({extended: true}));


let rnd = []



app.get('/', function(req,res){
    res.render('index', {t1: movie_db[rnd[0]].Title, p1 : movie_db[rnd[0]].Poster, t2: movie_db[rnd[1]].Title, p2: movie_db[rnd[1]].Poster, t3: movie_db[rnd[2]].Title, p3: movie_db[rnd[2]].Poster, t4: movie_db[rnd[3]].Title, p4: movie_db[3].Poster, t5: movie_db[rnd[4]].Title, p5: movie_db[rnd[4]].Poster, t6: movie_db[rnd[5]].Title, p6: movie_db[rnd[5]].Poster, t7: movie_db[rnd[6]].Title, p7: movie_db[rnd[6]].Poster, t8: movie_db[rnd[7]].Title, p8:movie_db[rnd[7]].Poster, t9: movie_db[rnd[8]].Title, p9: movie_db[rnd[8]].Poster})
})



app.listen(3000);
console.log("Listening on port 3000");
console.log(movie_db[rnd[0]].Title);
console.log(movie_db[rnd[1]].Title);
console.log(movie_db[rnd[2]].Title);
console.log(movie_db[rnd[3]].Title);
console.log(movie_db[rnd[4]].Title);
console.log(movie_db[rnd[5]].Title);
console.log(movie_db[rnd[6]].Title);
console.log(movie_db[rnd[7]].Title);
console.log(movie_db[rnd[8]].Title);
