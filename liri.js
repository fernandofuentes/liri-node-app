

var fs = require("fs");
var inputs = process.argv[2]
var arr = process.argv[3]
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
