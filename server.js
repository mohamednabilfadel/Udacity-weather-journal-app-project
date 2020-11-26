// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening =>{
    console.log(`Server is running on local host ${port}`);
})

// setting 1st get route to send last saved data on page load
app.get("/onLoad", function(req, res){
    res.send(projectData);
});

// setting post route
// acquiring the full user input from app
app.post("/all", function(request, response){
    projectData = request.body;
});

// setting 2nd get route
// responding to app with full data
app.get("/updateUI", function(req, res){
    res.send(projectData);
});
