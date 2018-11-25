const express = require("express");
const router = express.Router();
const restaurantData = require("../data/restaurants");
const commentsData = require("../data/comments");
const userData = require("../data/users");


router.get("/:id", async (req, res) => {
    try {
        restaurantId = req.params.id;
        restaurant = await restaurantData.getRestaurantById(restaurantId);
        sendData = {}
        comments = await commentsData.getCommentsByRestaurant(restaurantId);
        showCommentSection = true;
        var userId = 'ab';
        if(req.user) {
            userId = req.user._id;
            userJSON = await userData.getUserById(userId);
            if(userJSON.hasOwnProperty("wishlist")) {
                wishlist = userJSON.wishlist;
                if(wishlist.includes(restaurantId)) {
                    sendData.wishlist = 'added-to-wishlist';
                }
            }
        }
        for(let i = 0; i< comments.length; i++){
            let user = await userData.getUserById(comments[i].userid)
            if(comments[i].userid === userId) {
                showCommentSection = false;
            }
            comments[i].username = user.firstname;
        }

        sendData.restaurant = restaurant;
        sendData.comments = comments;
        sendData.enablecomment = showCommentSection;

        res.render('resturants/restaurantDescriptionPage', sendData);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post('/addrestaurant', async function (req, res, next) {
    try {
        const restaurantInfo = req.body;
        const restaurant = await restaurantData.addRestaurant(restaurantInfo);
        res.json(restaurant);
    } catch (error) {

    }

});



module.exports = router;