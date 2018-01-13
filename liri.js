//LOAD NPM Packages

var inquirer = require("inquirer");
//dotenv Package: Allows global variables (i.e. API keys) to be set in .env files, but not be sent to github using .gitignore file
require("dotenv").config();

//Request package: Used to access OMDB api
var request = require("request");

//Spotify and twitter packages
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

//Called when user enters "my-tweets" in command line
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

//Called when user enters "spotify-this-song" in command line (along with a title)
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
                console.log(`\nTrack: ${itemArr[eachTrack].name}\n` + `Artist(s):${artistList}\n` + `Album:  ${itemArr[eachTrack].album.name}\n` + `Take a Listen: ${previewLink}`);
                console.log("-------------------------------------------------------------")

            }
        }


    )
};


//Called when user enters "movie-this" in command line (along with movie title)
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
        console.log(data)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        // console.log(dataArr);
        console.log(dataArr);

        if (dataArr[0] === "spotify-this-song") {
            spotifyDisplay(dataArr[1])
        } else {
            tweetDisplay();
        }
    });

};


//Inquirer Menu

//Save all menu questions into array, and pass to prompt method
var questions = [{
        type: "list",
        message: "Would you like to check out my tweets, look up a movie from OMDB, or search for a song using Spotify?",
        choices: ["Display tweets", "Spotify a song", "Search for a movie", "Surprise Me!"],
        name: "action"
    },
    {
        type: "input",
        message: "Enter a song title to spotify:",
        name: "userSong",
        when: function (answers) {
            return answers.action === "Spotify a song"
        },
        default: "The Sign"
    },
    {
        type: "input",
        message: "Enter a movie tile to get more info:",
        name: "userMovie",
        when: function (answers) {
            return answers.action === "Search for a movie"
        },
        default: "Mr+Nobody"
    }
];

inquirer.prompt(questions).then(function (answers) {
    console.log("Answers:");

    // Switch case to call 1 of 4 functions depending on user input
    switch (answers.action) {
        case "Surprise Me!":
            randomDisplay();
            break;

        case "Display tweets":
            tweetDisplay("CoderLi3"); //Add limit?
            break;

        case "Spotify a song":
            spotifyDisplay(answers.userSong); //Add limit?
            break;

        case "Search for a movie":
            movieDisplay(answers.userMovie);
            break;

        default: //Not sure if I need this...
            console.log("Please make a valid choice!")
    };

});







//Remaining Steps:

//Get menu to work
//Add more tweets for twitter function
//Link to it from portfolio
//Update twitter timestamp

//ADDITIONAL TASKS: 

//Create a README.MD file

//BONUS:
//  * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file.