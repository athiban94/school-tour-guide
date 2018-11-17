const express = require("express");
const router = express.Router();
const commentsData = require("../data/comments");

router.post('/addcomment', async function(req, res, next) {
    try {
        const comment = req.body;
        let newComment = {
            'userid': req.user._id,
            'restaurantid':comment.restaurantid,
            'commenttexxt': comment.commenttext
        }
        const commentSaved = await commentsData.addComment(newComment);
        console.log("Comment Added");
        res.send(commentSaved);
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;