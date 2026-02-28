const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");

router.get("/get-posts", controller.getAllPosts);
router.post("/create-post", controller.postOnePost);
router.put("/update-post/:id", controller.updateOnePost);
router.delete("/delete-post/:id", controller.deletePost);


module.exports = router;