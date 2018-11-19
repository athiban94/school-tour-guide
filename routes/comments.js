const express = require("express");
const router = express.Router();
const commentsData = require("../data/comments");
const userData = require("../data/users");

router.post('/addcomment', async function(req, res, next) {
    try {
        const comment = req.body;
        let newComment = {
            'userid': req.user._id,
            'restaurantid':comment.restaurantid,
            'commenttexxt': comment.commenttext
        }
        const commentSaved = await commentsData.addComment(newComment);
        let user = await userData.getUserById(commentSaved.userid)
        commentSaved.username = user.firstname;
        console.log("Comment Added");
        res.send(commentSaved);
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;