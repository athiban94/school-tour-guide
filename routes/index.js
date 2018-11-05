const path = require("path");
const userRoutes = require("./users");
// var express = require('express');
// var router = express.Router();

const constructorMethod = app => {
  
  // Global to use in all the routes
  // app.use(function(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     res.locals.user = req.user;
  //   } else {

  //   }
  // });

  // User Routes
  app.use("/user", userRoutes);

  // Route to get to the Homepage
  app.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('index', { 
        title: 'Express',
        user: req.user 
      });
    } else {
      res.render('index', { 
        title: 'Express',
        user: null 
      });
    }
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
