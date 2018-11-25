const express = require("express");
const router = express.Router();
const restaurantData = require("../data/restaurants");
const commentsData = require("../data/comments");
const userData = require("../data/users");


router.get("/:id", async (req, res) => {
    try {
        restaurantId = req.params.id;
        restaurant = await restaurantData.getRestaurantById(restaurantId);
        comments = await commentsData.getCommentsByRestaurant(restaurantId);
        showCommentSection = true;
        var userId = 'ab';
        if(req.user) {
            userId = req.user._id;
            console.log("User ID :: " + userId);
        }
        for(let i = 0; i< comments.length; i++){
            let user = await userData.getUserById(comments[i].userid)
            console.log(comments[i]);
            if(comments[i].userid === userId) {
                showCommentSection = false;
                console.log("The logged in user had already commented");
            }
            comments[i].username = user.firstname;
        }
        

        res.render('resturants/restaurantDescriptionPage', {
            restaurant: restaurant,
            comments: comments,
            enablecomment: showCommentSection
        });
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