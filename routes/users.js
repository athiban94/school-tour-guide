const express = require("express");
const router = express.Router();
// const data = require("../data");
var csrf = require('csurf');
const userData = require("../data/users");
var passport = require('passport');
const restaurantData = require("../data/restaurants");

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
       console.log("error happend");
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
router.post('/updateprofile', async function(req, res, next) {
  if (req.isAuthenticated()) {
      data = req.body;
      userId = req.user._id;
      userInfoUpdated = await userData.updateUser(data,userId);
      console.log("User data updated in the route-user.js");
      console.log(userInfoUpdated);
      res.send(userInfoUpdated);
  } else {
      res.redirect('/');
  }
  
});
router.get('/profile', async function(req, res, next) {
  if (req.isAuthenticated()) {
    userId = req.user._id;
    userInfo = await userData.getUserById(userId);
    restaurantIds = userInfo.wishlist;
    showWishlist = false;
    if(restaurantIds) {
      showWishlist = true;
      wishlistJSON = [];
      for(var i=0; i<restaurantIds.length; i++) {
        restaurant = await restaurantData.getRestaurantById(restaurantIds[i]);
        wishlistJSON.push(restaurant);
      }
      res.render('user/profile', {
        user: req.user,
        existwishlist: showWishlist,
        wishlist: wishlistJSON
      });
      console.log("wishlist exists");
    } else {
      res.render('user/profile', {
        user: req.user,
        existwishlist: showWishlist
      });
    }
    
    
  } else {
    res.redirect('/');
  }
});


router.post('/addtowishlist', async function(req, res, next) {
  if (req.isAuthenticated()) {
    data = req.body;
    userId = req.user._id;
    data.validation = true;
    wishlistAdded = await userData.addToWishlist(data,userId);
    res.send(data);  
  } else {
    const json = {
      "validation": false,
      "message": "Please login to your account to comment"
    }
    res.send(json);
  }
});

router.post('/removefromwishlist', async function(req, res, next) {
  if (req.isAuthenticated()) {
    data = req.body;
    userId = req.user._id;
    data.validation = true;
    wishlistRemoved = await userData.removeFromWishlist(data,userId);
    res.send(data);  
  } else {
    const json = {
      "validation": false,
      "message": "Please login to your account to comment"
    }
    res.send(json);
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
