const user_db = require("./users.json");
const movie_db = require("./movie-data.json");
const logic = require("./logic.js");

function init(){
    document.getElementById("search").onclick = search_all;
}

function search_all(){
    let args = document.getElementById("search").nodeValue;
    console.log(args);

}

function search_movie(){
    

}
function search_users(){

}
function search_people(){

}