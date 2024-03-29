//Handles majority of the user logic
const fs = require('fs');
let user_db = require("./users.json");
let movie_db = require("./movie-data.json");

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
    results.reverse();
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
    results.reverse();
    return results;

    
}

function search_movie(args){
    let results = [];
    for(var i=0;i<movie_db.length;i++){
        if(movie_db[i].Title.toLowerCase().includes(args.toLowerCase())){
            let mov = movie_db[i];
            results.push(mov);
        }else if(movie_db[i].Genre.toLowerCase().includes(args.toLowerCase())){
            let mov = movie_db[i];
            results.push(mov);
        }
        else if(movie_db[i].Actors.toLowerCase().includes(args.toLowerCase())){
            let mov = movie_db[i];
            results.push(mov);
        }
        else if(movie_db[i].Director.toLowerCase().includes(args.toLowerCase())){
            let mov = movie_db[i];
            results.push(mov);
        }
        else if(args.length == 4 && movie_db[i].Released.toLowerCase().includes(args.toLowerCase())){
            let mov = movie_db[i];
            results.push(mov);
        }
        else if(args.length == 3){
            var x = parseFloat(movie_db[i].imdbRating);
            
            //console.log(x);
            if(args <= x){
                let mov = movie_db[i];
                results.push(mov);
            }
        }

    }
    results.reverse();
    return results;
}

function cleanURL(args){
    for(var i=0;i<args.length;i++){
        if(args.includes('+')){
            args = args.replace('+', " ");
        }
        if(args.includes('%')){
            args= args.replace('%', " ");
        }
        if(args.includes("20")){
            args=args.replace("20", "");
        }

    }
    return args;
}



module.exports = {create_user, get_user, has_account, search_userDB, change_usertype, follow_user, unfollow_user, has_movie, get_similar, search_movie, cleanURL}
