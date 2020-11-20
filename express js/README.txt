Name: Greggory Elton
Student Number: 101038024

1) Source Files:
index.html - This page is the starting homepage for the site which is titled "The Movie Sight". It currently features a navbar so the user can traverse the site as they please. 
The navbar also has a search field that will be able to search movies and users once implemented. The "Featured Movies" will be a random set of movies from the provided data json list, currently it is using the short json version. 

login.html - This page is a simple login page that uses built-in bootstrap form's. If the submit button is click there is an alert that pops up. Eventually this will only pop up if there is an error (wrong email/pass etc..).

castView.html - This page is where cast members profiles will appear which will display the actors/actress' name, age, location, genres appeared in, movies appeared in (with corresponding movie poster and title), last film, and an average rating based on their movies. 
This page also has a "follow" button that when clicked twice will change to blue and display the text 'followed' using JS. Please note you need to double click the follow button for it to change. (I havent figured a way to fix it at the moment.) This page also has a little pop-up box that has a quote from the actor/actress. 

directorView.html - This page is very similar to the cast member page however instead of "movies appeared in" and "genres appeared in" there are "genres directed" and "movies directed" with movie posters as well.

userView.html - similar to the previous 2 but instead lists accounts "username", "last online date", "favourite genres" and "number of posts". This page also has the follow button so other users can follow one another. The users favourite movies are also listed along with their followers. 

script.js - contains a function to switch color and text of a button. this will be greatly expanded. 

movieView.html - This page has the movie poster, title, release date, runtime, genre, rating, director, cast, plot, similar movies, review section and review input box. Once a review is submitted it will appear under the reviews section.

stylesheet.css - basic stylesheet for fonts, margins etc...

server.js - This js file contains the server code serves my static pages via a node.js server. It can support any js, css, html, jpg, json, or png file. It is not hardcoded.

logic.js - This js file contains most of my logic that will be added onto later once other components are built into the course such as keeping track of time that users are logged in for, last login etc... Below is a list of my functions and what they docs
    create_user() - Takes in a new_user param and adds the user to the database as well as inits its data fields.
    get_user() - Takes in a requesting user and a user to find and returns the user profile contained in the database if it is found. 
    has_account() - takes in a user param and checks to see if that user has a valid account in the database.
    search_userDB() - Takes in a requesting user param and search field, searches the database and returns the user based on the string that was used to query the database. 
    change_usertype() - Takes in a requesting user and changes its account type from normal (0) to contributor (1) if the user is trying to change his type only.
    follow_user() - takes in a requesting user and a user to follow. If the user to follow isnt already followed by the requesting user than the requesting user will follow. The "following" array adds the recently followed user and the user to follow "followers" array adds the requesting user. 
    unfollow_user() - the requesting user unfollows the user_to_unfollow and they are removed from their followers list. 
    has_movie() - takes in a movie param and checks if the movie is in the database. 
    get_similar() - this is like a "recommended movies" suggestion where it compares the genre of the movie to other movies in the same genre and compiles a list of them. Please note I didnt want to print out all the info as it would be hard for you to read as there are multiple movies, so I simply just added the titles of the movies. 
    search_movie() - takes in a user and a query and looks through the movie database to see if the specific movie is valid. If it is in the database it returns it in an array.
    last_online() - I have yet to put this in but I will be using session info and cookies to calculate when the user was last online. 

users.json - this file is a schema for my users database. 

REST_API.txt - This is a outline of my REST API that I will be using for Check-In 3. 
movie-data-short.json - Contains the movie data that feeds the movie database. 

express-server.js - Uses an express server to serve content, and connect website frontent to my backend logic scripts (found in logic.js)

Added Content:
Since check-in 2, I have linked up my scripts to work via my front end. Ex. when a user fills out the form to create an account the json database is updated with that new account. 


Movie Database

3) Partner Name:
N/A - Just myself

4) Instructions: 
OpenStack VM Address - 134.117.129.180
Username - "student"
Password - Comp123

Once logged in complete the follow:

1. cd check-in-3
2. run node express-server.js
3. open a new terminal
4. create link to localhost using command ssh -L 9999:localhost:3000 student@134.117.129.180
5. Re-enter ssh password 'Comp123' without the quotes. 

Citations:
Bootstrap Documenation (for layout and forms): https://getbootstrap.com/docs/4.5/layout/overview/

    Movie Posters:
    Jumanji - https://m.media-amazon.com/images/M/MV5BZTk2ZmUwYmEtNTcwZS00YmMyLWFkYjMtNTRmZDA3YWExMjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg
    Toy Story - https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg
    Grumpier Old Men - https://m.media-amazon.com/images/M/MV5BMjQxM2YyNjMtZjUxYy00OGYyLTg0MmQtNGE2YzNjYmUyZTY1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg
    Waiting to Exhale - https://m.media-amazon.com/images/M/MV5BYzcyMDY2YWQtYWJhYy00OGQ2LTk4NzktYWJkNDYwZWJmY2RjXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg
    Father of the Bride II - https://m.media-amazon.com/images/M/MV5BOTEyNzg5NjYtNDU4OS00MWYxLWJhMTItYWU4NTkyNDBmM2Y0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg
    Goldeneye - https://m.media-amazon.com/images/M/MV5BMzk2OTg4MTk1NF5BMl5BanBnXkFtZTcwNjExNTgzNA@@._V1_SX300.jpg
    Sudden Death - https://m.media-amazon.com/images/M/MV5BN2NjYWE5NjMtODlmZC00MjJhLWFkZTktYTJlZTI4YjVkMGNmXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_SX300.jpg
    Heat - https://m.media-amazon.com/images/M/MV5BMDJjNWE5MTEtMDk2Mi00ZjczLWIwYjAtNzM2ZTdhNzcwOGZjXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg
    Sabrina - https://m.media-amazon.com/images/M/MV5BYjQ5ZjQ0YzQtOGY3My00MWVhLTgzNWItOTYwMTE5N2ZiMDUyXkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_SX300.jpg


    Martin Campbell Image - https://static.wikia.nocookie.net/jamesbond/images/6/60/Martincampbell.jpg/revision/latest/scale-to-width-down/349?cb=20190120153227
    Pierce Brosnan Image - https://m.media-amazon.com/images/M/MV5BMTMwMjMxNzM4OV5BMl5BanBnXkFtZTcwNDM5NzkxMw@@._V1_.jpg

    t_user123 Account Image - https://st.depositphotos.com/2413271/5050/i/450/depositphotos_50503825-stock-photo-handsome-man-taking-selfie.jpg
    Bob_123 Account Image - https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

    3D Glasses - https://www.pinclipart.com/picdir/big/108-1081968_item-detail-3d-glasses-itembrowser-itembrowser-movie-3d.png



5) Additional Functionality
I have built additional schemas for the user database as well as I am querying directly from separate json files instead of dumping data into the logic script file. 
I have also made my server able to take any web file(js, images, css, html etc... ) as I use mime tables and the file names and paths are NOT hardcoded.





