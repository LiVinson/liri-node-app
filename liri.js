//INITIAL SET UP

//This utilizes dotenv package, which allows for global variables to be set in .env files, but not be sent to github for security using .gitignore file
require("dotenv").config();

//Makes request package required; Used to access OMDB api
var request = require("request");

var Spotify = require("node-spotify-api");

var Twitter = require("twitter")

//Makes the keys.js file requred, which references the keys store in .env file
var keys = require("./keys.js");

var spotify = new Spotify({
    id: "a3227b6e28254b01844b22d69511021d",
    secret: "1696a29d483744aebdaf0e4ca646f053"
}
    // keys.spotify
);
var client = new Twitter(keys.twitter);

console.log(client);

console.log(spotify.credentials);

//Logs Twitter and spotify keys - remove once app complete
// console.log(spotify);
// console.log(client);

//Saves value of user inputs
var action = process.argv[2];
var title = process.argv[3];

//Switch case to call 1 of 4 functions depending on user text or display message if valid action is not chosen
switch (action) {
    case "my-tweets":
        tweetDisplay("CoderLi3");
        break;

    case "spotify-this-song":
        //If song title is not provided (will be undefined, which is false)
        if (!(title)){
            title = "The Sign" //by Ace of Base; determine how to format after reviewing spotify API
        }else{
            //title = determine how to format
        };

        spotifyDisplay(title);
        break;

    case "movie-this":
        //If movie title is not provided (will be undefined, which is false)
        if (!(title)) {
            title = "Mr+Nobody"
        } else {

            for (var i = 4; i < process.argv.length; i++) {
                title += `+${process.argv[i]}`
            }
        };
        movieDisplay(title);
        break;

    case "do-what-it-says":
        randomDisplay();
        break;

    default:
        console.log("Please make a valid choice!")
}

//Called when user enters "my-tweets"
function tweetDisplay(username) {
    console.log("Check my tweets!");
    var params = {screen_name: username};
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            console.log(`Tweets by: ${tweets[0].user.name}\n + Created: ${tweets[0].created_at}\n + Tweet: ${tweets[0].text}`);
        }
    })
    //Pulls the last 20 tweets from CoderLi account and when they were created in terminal bash window
};

//Called when user enters "spotify-this-song"
function spotifyDisplay(songTitle) {
    // var authOptions = {
    //     url: "https://accounts.spotify.com/api/token",
    //     headers: {
    //         "Authorization": "Basic " + (new Buffer(spotify.Spotify.credentials.id))
    //     }
    // }





    console.log(`Listen to This: ${songTitle}!`);
   
    spotify.search({type: "track", query: songTitle, limit: 5}, function (err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        }
        console.log(data);
    })
 };
    
    
    
    // show the following information about the song selected:
    // Artist(s)

    // The song's name

    // A preview link of the song from Spotify

    // The album that the song is from

    // If no song is provided then your program will default to "The Sign" by Ace of Base.


//Called when user enters "movie-this"
function movieDisplay(movieTitle) {
    console.log("Movie Display Function");
    var queryURL = `http://www.omdbapi.com/?t=${movieTitle}&y=&plot=short&apikey=trilogy`
    console.log(queryURL);

    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            var movieData = JSON.parse(body);

            console.log(`Title:${movieData.Title}\n` +
                `Release Year: ${movieData.Year}\n` +
                `IMDB Rating: ${movieData.imdbRating}/10\n` +
                `Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}\n` +
                `Production Location: ${movieData.Country}\n` +
                `Movie Language(s): ${movieData.Language}\n` +
                `Plot: ${movieData.Plot}\n` +
                `Actors: ${movieData.Actors}\n`
            )
        }

    })
};

//Called when user enters "do-what-it-says"
function randomDisplay() {
    console.log("Do something!");

    //

    //Use fs Node package to take text inside of random/txt and use it to call one of Liti's command:
    //Run spotify-this-song for I want it this way (Can be changed)

}



//ADDITIONAL TASKS: 

//Create a README.MD file

//BONUS:
//  * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

//Link to it from portfolio