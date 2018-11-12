const express = require("express");
const router = express.Router();
// const data = require("../data");
var csrf = require('csurf');
const userData = require("../data/users");
var passport = require('passport');

// All the routes in the router should be protected by csrf protection

// var csrfProtection = csrf();
// router.use(csrfProtection);


router.get("/signup", (req, res, next) => {
  res.render("user/signup", {
    message: req.flash('loginMessage')  
  });
});

router.get("/login", (req, res, next) => {
  res.render("user/login", {
    message: req.flash('loginMessage')
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', {failureFlash: true}, function(err, user, info) {
    if (err) {
       return next(err); 
    }
    if (!user) {
       return res.redirect('/user/login'); 
    }  
    req.logIn(user, function(err) {
      if (err) {
        return next(err); 
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.post('/custom', async function(req, res, next) {
  const user = await userData.getUserByUsername(req.body.username);
  res.json(user);
});

// router.post('/signup', passport.authenticate('local.signup', {
//   successRedirect: '/user/profile',
//   failureRedirect: '/user/signup',
//   failureFlash: true 
// }));

router.get('/profile', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('user/profile', {
      user: req.user
    });
  } else {
    res.redirect('/');
  }
});

router.post('/signup', async function(req, res, next) {
  try {
    req.body.password = userData.encryptPassword(req.body.password);
    let newUserData = req.body;
    userName = newUserData.username.toLowerCase();
    userEmail = newUserData.email;
    let user = await userData.getUserByUserNameOrEmail(userName, userEmail)
    if(user) {
      req.flash('loginMessage', 'Username or User Email Already Exists');
      res.redirect("/user/signup");
    } else {
        console.log("Inside the else part");
        const createuser = await userData.addUser(newUserData);
        req.login(createuser, function(err){
          if(err) {
            req.flash('loginMessage', err);
            res.redirect("/user/signup");
          }
          res.redirect('/user/profile');
        });
    }
  } catch (error) {
    console.log("Got Exception error : " + error);
    res.redirect('/');
  }
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});



module.exports = router;
