const express = require("express");
const router = express.Router();
const Post = require("../models/post");


router.get("/", async(req, res) =>{
    try{
        const posts = await Post.find().sort({ createdAt: -1});
        res.render("index", {posts});
    } catch(err){
        res.status(500).send(err.message);
    }
})
router.get("/posts/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).send("Post not found");
        res.render("post", {post});
    }catch (err){
        res.status(500).send(err.message);
    }
});

router.post("/posts", async (req, res) => {

    try{
        const {post} =req.body;
        await Post.create({post});

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

// CRUD create read update delete