//Handles majority of the user logic
const fs = require('fs');
let user_db = require("./users.json");
let movie_db = require("./movie-data-short.json");

//----- User Logic -------
function create_user(new_user){
    if(!new_user.Username || !new_user.Password){
        console.log("No user information provided. Account not created.");
        return null;
    }
    if(user_db.hasOwnProperty(new_user.name)){
        console.log("Error: Username already taken.");
        return null;
    }
    

    //init values
    new_user.Username = new_user.Username;
    new_user.Age = "1";
    new_user.Password = new_user.Password;
    new_user.Location = "1";
    new_user.FavouriteGenre = "1";
    new_user.LastOnline = 1;
    new_user.Posts = 0;
    new_user.FavouriteMovies = [];
    new_user.Friends = [];
    new_user.Followers = [];
    new_user.Following = [];
    //0 is a reg user, 1 is a contributer
    new_user.Type = 0;
    user_db[new_user.Username]= new_user;

    return user_db[new_user.Username];
}

//Client side getUser, we will probably need another function later for getting a user on the server side.(sorting, querying a user etc...)

function get_user(requesting_user, usrname){
    if(!has_account(requesting_user)){   
        return null;
    }
    if(user_db.hasOwnProperty(usrname.Username)){
        if(requesting_user.Username == usrname || requesting_user.Following.includes(usrname)){
            return user_db[usrname];
        }
    }
    return null;

}

function has_account(usr){
    if(!usr){
        return false;
    }
    if(!usr.Username || !user_db.hasOwnProperty(usr.Username)){
        return false;
    }
    return true;

}

function search_userDB(requesting_user, args){
    let results = [];
    
    if(!has_account(requesting_user)){
        console.log("Error: Failed to get user.");
        return results;
    }
    for(Username in user_db){
        let usr = user_db[Username];
        if(usr.Username.toLowerCase().indexOf(args.toLowerCase()) >= 0){
            if(usr.Username === requesting_user.Username || requesting_user.Following.includes(usr.Username)){
                results.push(usr);
            }
        }
    }

    return results;

}

function change_usertype(requesting_user){
    if(!has_account(requesting_user)){
        return; 
    }
    if(user_db[requesting_user.Username].Type == 0){
        user_db[requesting_user.Username].Type = 1;
    }
    user_db[requesting_user.Username].Type == 0


}

function follow_user(requesting_user, user_to_follow){
    //If the requesting or follow user is not in the users db stop.
    if(!has_account(requesting_user) || !has_account(user_to_follow)){
        console.log("Error: Invalid Account.")
        return; 
    }
    //if the requesting user is already friends, stop
    if(user_db[requesting_user.Username].Following.includes(user_to_follow)){
        console.log("Error: User is already in your following list.")
        return;
    }
    user_db[requesting_user.Username].Following.push(user_to_follow);
    user_db[user_to_follow.Username].Followers.push(requesting_user);
    console.log("Success: User added.")
}

function unfollow_user(requesting_user, user_to_unfollow){
    if(!has_account(requesting_user) || !has_account(user_to_unfollow)){
        console.log("Error: Invalid Account.")
        return; 
    }
    if(!(user_db[requesting_user.Username].Following.includes(user_to_unfollow))){
        console.log("Error: User is not being followed.")
        return;

    }
    let i = user_db[requesting_user.Username].Following.indexOf(user_to_unfollow);
    user_db[requesting_user.Username].Following.splice(i,1);
    console.log("Success: User unfollowed.");
}

//----- END USER LOGIC --------



//----- START MOVIE LOGIC --------

function has_movie(movie){
    for(i=0;i<movie_db.length;i++){
        if(movie_db[i].Title != movie.Title){     
            return false;
        }
        return true;

    }
    
}

function get_similar(movie){
    let search = [];
    let results = [];
   
    
    if(!has_movie(movie)){
        console.log("Error: Movie not found");
        return;
    }
    //Go through movie list and pull out movies in the same genre
    for(i =0;i<movie_db.length; i++){
        if(movie_db[i].Genre.charAt(0) == movie.Genre.charAt(0)){
            //store them in this search array
            //So its easier on you to see, i am not showing all the info on the movie. just the title
            search[i] = movie_db[i].Title;
            
        }
        //to avoid having way to many movies to display on the page, limit the results to take the first 5 movie suggestions and add them to another array.
        for(j=0;j<2;j++){
            results[j] = search[j]
        }
    }
    //reture the subset array with the suggestions.
    return results;

    
}

function search_movie(requesting_user, args){
    let results = [];

    if(!has_account(requesting_user)){
        return results;
    }

    for(i=0;i<movie_db.length;i++){
        let mov = movie_db[i];
        if(movie_db[i].Title.toLowerCase() == args){
            console.log("Movie Found!");
            results.push(mov);
        }
    }
    return results;

    

}




//have not implemented, will do when we introduce cookies and session info. 
function last_online(){

}


//----- BEGIN TESTING ------

//const assert = require("assert");

console.log("Create Two Users");

//Test create_user function
let userA = create_user({Username:"Greg", Password:"123"});
let userB = create_user({Username:"Dave", Password:"1234"});


console.log(userA);
console.log(userB);

//Test follow_user function
console.log("Dave follow's Greg");
follow_user(userB,userA);
console.log("Greg's Followers: " + userA.Followers[0].Username);


console.log();

//Test get_similar function 
console.log("Getting Similar movies to Toy Story: ");
console.log(get_similar(movie_db[0]));

console.log();

//Test change_userType 
console.log("Greg's User Type Before: " + userA.Type);
change_usertype(userA);
console.log("Greg's User Type After: " + userA.Type);

console.log();
//test search_usersDB
console.log("Lets search for User Dave");
console.log();
let searchRes = search_userDB(userB,"Da");
console.log(searchRes);

//test search_movie function
console.log();
console.log("Searching for movie: Toy Story..... ");

let searchMovie = search_movie(userA,"toy story");

console.log(searchMovie);
