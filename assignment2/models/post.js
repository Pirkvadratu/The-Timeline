const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    post: {
        type: String, //text
        required: true, //must be not empty
        minlength: [25, "Post should be minimum 25 charachter"]

    },
}, {timestamps: true});
module.exports = mongoose.model('Post', postSchema);//automatically creates createdAtand updatedAt fields

//mangoose data base code mongodb+srv://pirkvadratu_db_user:rjtmvJ0iraVwXEA3@cluster0.8nb5vkr.mongodb.net/?appName=Cluster0