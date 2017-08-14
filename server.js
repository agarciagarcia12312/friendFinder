var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");



var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, 'app')));


var userProfiles = [];
function Profiles (name, photoLink, scores) {
	this.name = name,
	this.link = photoLink,
	this.scores = scores 

}

// .get function that routes user to index.html

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

// .get function that takes user to survey

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/survey.html"))
})


//  .get function that  that displays a json of profiles (/api/friends)
app.get("/api/friends", function(req, res) {
	res.json(userProfiles);
});
// .post function that adds data to api
app.post("/api/friends", function(req, res) {
	// data.profiles(new Profile(req.body))
	// res.end("complete")
	var userScores = req.body.scores;
	var bestMatch;
	console.log("============");
	console.log("user scores: " + userScores);
	
	// var diferences = [];
	// lopo that goes through all the profiles and compares the closet
	var bestMatchDifence = 100;
	var bestMatch=[];

	for (index in userProfiles) {
		// var dataOthers = []
		var totalDiference = 0;
		for(i=0; i < userProfiles[index].scores.length ; i++) {
			totalDiference += Math.abs(userProfiles[index].scores[i] - userScores[i])
			// console.log("others scores: "+userProfiles[index].scores);
		}
		console.log("user" + index + "totalDiference is: " + totalDiference);
		
		if (totalDiference < bestMatchDifence ) {
			bestMatchDifence = totalDiference;
			bestMatch = userProfiles[index];
			console.log(bestMatch.profiles)
		}
	}
	
	console.log("best match" + bestMatch.name);
	// return bestMatch;
	userProfiles.push(new Profiles(req.body.name, req.body.photoLink, req.body.scores));
	res.end(bestMatch.name + "," + bestMatch.link);
})




// confirm server is runing
app.listen(port, function()
{
  console.log("Server running on port: " + port);
});