const path = require("path");
// var express = require('express');
// var router = express.Router();

const constructorMethod = app => {
  
  // Route to get to the Homepage
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get("/about", (req, res) => {
    res.sendFile(path.resolve("static/about.html"));
  });

  app.use("*", (req, res) => {
    console.log("Caught in here");
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
