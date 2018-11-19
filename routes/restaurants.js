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
        //console.log(comments);

        for(let i = 0; i< comments.length; i++){
            let user = await userData.getUserById(comments[i].userid)
            comments[i].username = user.firstname;
        }
        //console.log(comments);
        // Object.keys(comments).map(
        //     async function (object) {
        //         userModel = await userData.getUserById(comments[object]['userid']);
        //         comments[object]["username"] = userModel.firstname;
        //     });

        // comments.forEach( async function(obj) {
        //     userModel = await userData.getUserById(obj.userid);
        //     obj['username'] = userModel.firstname;
        // });

        //setTimeout(function(){ console.log(comments); }, 3000);
        console.log(comments);

        res.render('resturants/restaurantDescriptionPage', {
            restaurant: restaurant,
            comments: comments
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