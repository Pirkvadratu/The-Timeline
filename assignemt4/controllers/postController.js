const Post = require("../models/post");

const getAllPosts = async (req,res) => {
    try{
            const posts = await Post.find().sort({ createdAt: -1});
            res.status(200).json(posts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
const postOnePost = async (req, res) =>{
    try{
        // const Post = await Post.create(req.body);
        // const { post } = req.body;
        // await Post.create({post}
        const { post} = req.body;
        const newPost = await Post.create({post});
        res.status(201).json(newPost)
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}
const updateOnePost = async (req, res) =>{
    try{
        const{id} = req.params; 
        const {post} =req.body;
        const updatedPost = await Post.findByIdAndUpdate(id, { post }, { new: true });
        if (!updatedPost) return res.status(404).json({message: "Post not found"});
        res.status(200).json(updatedPost);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
}
const deletePost = async (req, res) =>{
    try{
        const {id}  =req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({message: "Post not found"});
        res.status(200).json({message: "Post deleted"});
    }
    catch(error){
        res.status(400).json({message: error.message})
    }

}

module.exports = { getAllPosts, postOnePost, updateOnePost, deletePost};
