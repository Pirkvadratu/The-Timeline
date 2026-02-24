const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Post = require("./models/post")
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
//app.use(methodOverride("_method"))
app.use(require('./routes/posts'));


// async function testCreatePost() {
//     try {
//       const post = await Post.create({
//         post: "This is a test post that is definitely longer than 25 characters."
//       });
//       console.log("Test post created:", post._id);
//     } catch (err) {
//       console.error("Error creating test post:", err.message);
//     }
//   }
  
//   testCreatePost();
  

mongoose
.connect('mongodb+srv://pirkvadratu_db_user:rjtmvJ0iraVwXEA3@cluster0.8nb5vkr.mongodb.net/?appName=Cluster0')
.then (() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen( 3000, () => console.log('Server running on port 3000'));