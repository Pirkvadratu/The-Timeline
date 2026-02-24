const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require ("../models/comment");


router.get("/", async(req, res) =>{
    try{
        const posts = await Post.find().populate('user_id').sort({ createdAt: -1});
        const users = await User.find().sort({ first_name: 1});
        res.render("index", {posts, users});
    } catch(err){
        res.status(500).send(err.message);
    }
})
router.get("/posts/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id).populate('user_id');
        if(!post) return res.status(404).send("Post not found");

        const comments = await Comment.find({ message_id: req.params.id })
            .populate('user_id')
            .sort({ createdAt: 1 }); // oldest first

        const users = await User.find().sort({ first_name: 1});

        res.render("post", {post, comments, users});
    }catch (err){
        res.status(500).send(err.message);
    }
});

router.post("/posts/:id/comments", async (req, res) => {
    try {
        const { comment, user_id } = req.body;
        await Comment.create({
            message_id: req.params.id,
            user_id,
            comment
        });
        res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/posts", async (req, res) => {

    try{
        const {post, user_id } =req.body;
        await Post.create({post, user_id });

        res.redirect("/");

    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.post("/posts/delete", async (req, res) => {

    try{
        const { id } =req.body;
        await Post.findByIdAndDelete(id);
        res.redirect("/");
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.get("/posts/:id/edit", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send("Post not found");
        res.render("edit",{post});
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.post("/posts/update", async (req, res) =>{
    try{
        const{ id,post} = req.body;
        await Post.findByIdAndUpdate(id, {post});
        res.redirect("/");
    }catch (err){
        res.status(400).send(err.message)
    }
});

module.exports = router;
router.get("/seed-users", async (req, res) => {
    try {
        await User.create([
            { first_name: "Michael", last_name: "Choi", email: "michael@example.com", password: "test" },
            { first_name: "Cory", last_name: "Whiteland", email: "cory@example.com", password: "test" },
            { first_name: "Jane", last_name: "Doe", email: "jane@example.com", password: "test" },
        ]);
        res.send("Users seeded");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// CRUD create read update delete