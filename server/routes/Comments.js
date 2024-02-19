const express = require('express');
const router = express.Router();
const {Comments} = require('../models');
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get('/:postId', async (req, res) => { //request from server/comments/postID
    const postId = req.params.postId;
    const comments = await Comments.findAll({ // goes to comments table and returns all elements where the PostId column in mysql 
                                                // is the same as the postId we got from params
        where: {PostId: postId}
    }); //returns list of all comments of that postID
    res.json(comments);
})
                // Goes through middleware first
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username; // req.user contains username and password from middleware
    comment.username = username;
    const createComment = await Comments.create(comment);
    res.json(createComment);
})

router.delete("/:commentId", validateToken, async(req, res) => {
    const commendId = req.params.commentId;

    await Comments.destroy({where: {id: commendId,}});

    res.json("DELETED")
})

module.exports = router; //export routerss