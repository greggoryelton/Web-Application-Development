const express = require('express');
const fs = require("fs");
const pug = require("pug");
const movie_db = require("./movie-data.json");
const logic = require("./logic.js");
let router = express.Router();
const app = express();



router.get('/', send_all);
router.get("/:query", search_movies);
router.get("/id/:id",get_movieByID);
router.get("/add/:title",send_movieform);
router.post("/:title/addReview", express.json(), add_review)


function send_all(req,res,next){
    var temp = movie_db;
    var query = "All movies"
    res.render('movies',{temp, query});
    res.status(200);
    next();
    
}


function search_movies(req,res,next){
    //First check to see if the search is the exact same as a movie title
    console.log(req.method);
    var s = req.url.substring(1);

   

    if(s.length !== 4){
        s = logic.cleanURL(s);
    }
    s = s.toLowerCase();
    //console.log(s);
    var temp = logic.search_movie(s);
    var mov = temp.pop();
    var similar = logic.search_movie(mov.Genre);

    if(mov.Title.toLowerCase()===s){
        //console.log(mov.Title.toLowerCase());
        res.render('movieView', {mov, similar});
        res.status(200);
        next();
    //would handle a genre
    }else if(temp != null){
        res.render('movies', {temp: temp, query: s.toUpperCase()});
        res.status(200);
        next();
    }
    //display movies per year
    else if(s.length == 4){
        res.render('movies',{temp: temp, query: s.toUpperCase()});
        res.status(200);
        next();
    }

    else if(s.length == 3 && !s.includes('.')){
        res.render('movies',{temp: temp, query: 'MinRating: ' + s.toUpperCase() + '%'});
        res.status(200);
        next();
        
    }
    else {
        res.status(404).send("Error: Invalid search");
    }
    return mov;
}

function get_movieByID(req,res,next){
    var index = req.url.substring(4);
    

    index = parseInt(index);
    //console.log(index);
    if(index >= 0 && index < 9125){
        var mov = movie_db[index];
        //console.log(mov.Title);

        res.render('movieView', {mov});
        res.status(200);
        next();
        
    }else{
        res.status(404).send("Movie ID is Invalid!");
        next();
    }

}




function send_movieform(req,res,next){
    console.log(req.method)
    res.render("createMovie", {});
    res.status(200);
    next();
}

function add_review(req,res,next){
    
    var s = req.url;
    //console.log(s);
    var loc = s.indexOf("/",s.indexOf("/") + 1);

    var movTitle= s.substring(0, loc);
    movTitle = movTitle.replace('/', '');

    movieTitle = logic.cleanURL(movTitle);

   // console.log(movieTitle);

    var reviewText = s.substring(s.indexOf('='));

    reviewText = logic.cleanURL(reviewText);
    reviewText = reviewText.replace('=', '');

    var temp = logic.search_movie(movieTitle);
    var mov = temp.pop();
    var similar = logic.search_movie(mov.Genre);

    

    

    
    
    var review = [];
    review[0] = reviewText;

    for(var i=0;i<review.length;i++){
        review[i] = reviewText;
    }

    res.redirect("/movies/"+ movTitle);
    res.status(200);

}

module.exports = router;