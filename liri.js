//INITIAL SET UP

//This utilizes dotenv package, which allows for global variables to be set in .env files, but not be sent to github for security using .gitignore file
require("dotenv").config();

//Makes request package required; Used to access OMDB api
var request = require("request");

//Makes spotify and twitter packages required
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

//Built-in node method, used to read and write to other files
var fs = require("fs");

//Makes the keys.js file requred, which references the api keys stored in .env file
var keys = require("./keys.js");

//Constructor function creates "copy" of object containing keys for each API
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Saves value of user inputs
var action = process.argv[2];
var title = process.argv[3];

//Switch case to call 1 of 4 functions depending on user text or display message if valid action is not chosen
switch (action) {
    case "do-what-it-says":

        var randomArr = randomDisplay();
        console.log(randomArr);
        action = randomArr[0];
        title = randomArr[1];
        console.log(action);
        console.log(title)

    case "my-tweets":
        tweetDisplay("CoderLi3");
        break;

    case "spotify-this-song":
        //If song title is not provided (will be undefined, which is false)
        if (!(title)) {
            title = "The Sign" //by Ace of Base; determine how to format after reviewing spotify API
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

    default:
        console.log("Please make a valid choice!")
}

//Called when user enters "my-tweets"
function tweetDisplay(username) {
    console.log("Check my tweets!");
    var params = {
        screen_name: username
    };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(`Tweet# ${i}: ${tweets[i].text}\n` + `Created: ${tweets[i].created_at}\n`);
                console.log("---------------------------------------------------")
            }
        }
    })
};

//Called when user enters "spotify-this-song"
function spotifyDisplay(songTitle) {
    console.log(`Listen to This: ${songTitle}!`);

    spotify.search({
            type: "track",
            query: songTitle,
            limit: 2
        }, function (err, data) {
            if (err) {
                console.log("Error occured: " + err);
            };

            // console.log(Object.prototype.toString.call(data.tracks.items));
            var itemArr = data.tracks.items;

            //Check with TA's on exactly how this works...        
            for (var eachTrack in itemArr) { //this
                if (itemArr.hasOwnProperty(eachTrack)) { //this
                    ;
                    var artistArr = itemArr[eachTrack].artists;
                    var artistList = "";

                    for (var eachArtist in artistArr) {

                        if (artistArr.hasOwnProperty(eachArtist)) {
                            artistList += (` ${artistArr[eachArtist].name},`);
                        }

                    };

                    artistList = artistList.slice(0, -1); //Removes comma from end of string
                };

                var previewLink = JSON.stringify(itemArr[eachTrack].preview_url);

                if (previewLink == "null") {
                    previewLink = "Spotify preview link is unavailable"

                };
                console.log(`Track: ${itemArr[eachTrack].name}\n` + `Artist(s):${artistList}\n` + `Album:  ${itemArr[eachTrack].album.name}\n` + `Take a Listen: ${previewLink}`);
                console.log("-------------------------------------------------------------")

            }
        }


    )
};


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
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        };

        // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        // console.log(dataArr);
        console.log(dataArr);
        return dataArr;

    });

    //

    //Use fs Node package to take text inside of random/txt and use it to call one of Liti's command:
    //Run spotify-this-song for I want it this way (Can be changed)

}

//Remaining Steps:

//Get spotify function to pull correct song when no title provided
//Get random function to work
//Add more tweets for twitter function
//Link to it from portfolio

//ADDITIONAL TASKS: 

//Create a README.MD file

//BONUS:
//  * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file.