

var fs = require("fs");
var inputs = process.argv[2]
var argument = process.argv[3]
var twitterKeys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");

var T = new twitter(twitterKeys);

var parameters = {
  q: "fernando4UT",
  count: 20
}

switch (inputs) {
  case "my-tweets":
  tweet();
  break;

  case "spotify-this-song":
  song();
  break;

  case "movie-this":
  movie();
  break;

  case "do-what-it-says":
  dwis();
  break;
}

// TWEET FUNCTION
function tweet() {
  T.get("search/tweets", parameters, gotData);

  function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text)
    }
  }
}

//start spotify function
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "deb8991977a0432c89104836da716fdc",
  secret: "0daec729c5fa4011ac6b21bf3a5c6128"
});

function spotifyFF() {
  if (argument === undefined) {
    argument = "the+sign";
  }
  spotify
    .search({
      type: 'track',
      query: argument

    })
    .then(function(response) {
      console.log("artist:", response.tracks.items[0].artists[0].name);
      console.log("album:", response.tracks.items[0].album.name);
      console.log("track:", response.tracks.items[0].name);
      console.log("preview url:", response.tracks.items[0].preview_url);
    })
  .catch(function(err) {
    console.log(err);
  });
}

// Movie Function
function movie() {
  var queryUrl = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=93b5e734";

  if (argument === undefined) {
    argument = "starwars";
    queryUrl = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=93b5e734";
  }

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var rating = JSON.parse(body).Ratings[0];
      console.log(imdbRating);

      if (imdbRating == undefined) {
        imdbRating = "Rating Not Availible";
      } else {
        imdbRating = JSON.parse(body).Ratings[0].Value;
      }
      console.log("-------------------------------------")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country of Production: " + JSON.parse(body).Country);
      console.log("Language(s): " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("-------------------------------------")
    }
  });
}
