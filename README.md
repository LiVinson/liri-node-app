# liri-node-app
LIRI is a Language Interpretation and Recognition Interface, a command line node app that takes in parameters and gives back data from Twitter, Spotify, or OMDB

## Features

LIRI allows users to select from 1 of 4 menu options:
1. Display tweets:
    * Makes a call to Twitter API and returns last 20 tweets from CoderLi3 account

2. Spotify a Song
    * If selected, prompts a second input for song to search using Spotify API. 
    * Return information and preview link on the songs matching the provided title, or for a default song 

3. Search for  Movie
    * If selected, prompts a second input for movie to search using OMDB API
    * Returns movie year, plot, and actors for provided title, or for a defauly movie

4. Surprise Me
    * If selectedd, will run 1 0f the 3 prompts above based on the command and song/movie title stored in the random.txt file 


## Requirements
To run liri, the following are required:

* Node.js: [Download Instructions](https://nodejs.org/en/download/)

* NPM packages: 
    * [DotEnv](https://www.npmjs.com/package/dotenv)
    * [Inquirer](https://www.npmjs.com/package/inquirer)
    * [Spotify](https://www.npmjs.com/package/node-spotify-api)
    * [Request](https://www.npmjs.com/package/request)
    * [Twitter](https://www.npmjs.com/package/twitter)
    * **Note:** The npm packages are saved as dependencies, and can be downloaded in bulk by typing `npm install` in the command line while in the local folder where the liri repository is cloned.

* .env file containing the following:(
    * Twitter API key: [Instructions to Request](https://apps.twitter.com/)
    * Spotify API key: [Instructions to Request](https://developer.spotify.com/my-applications/#!/)
    * Once keys are obtained, they should be saved in the .env file with the following format (no quotes or spaces):

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

##Additional Notes
To pull tweets from a different Twitter account, change "CoderLi3" in the liri.js file to the username of the desired account.




