const express = require('express');
const fs = require("fs");
const pug = require("pug");
const user_db = require("./users.json");
const movie_db = require("./movie-data.json");
const path = require('path');
const logic = require("./logic.js");
let router = express.Router();
let accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';


//router.get("/", send_all);
router.get("/", search_all);

router.get("/:name", search_person);


function search_person(req,res,next){
    console.log(req.method);

    var s = req.url.substring(1);
    //console.log(s);
    s = logic.cleanURL(s);
    s = s.toLowerCase();
    //console.log(s);

    //if(s.includes(","))

    var movie = logic.search_movie(s);
    var person = movie.pop();
    
    //finds and returns page with director or actor/actress info
    if(person != null){
        var capital = s.toUpperCase();
        //console.log(person);
        res.render("personView", {person, capital, movie});
        res.status(200);
        next();
    }

    else{
        
        res.status(404).send("Error: name is invalid. Ensure you are typing a proper name.")
        next();
    }
    



}



function search_all(req,res,next){
    var people = movie_db;
    var query = "All People";

    var s = " ";
    people = logic.search_movie(s);


    res.render("people",{people, query});
    res.status(200);


    
    

}



module.exports = router;