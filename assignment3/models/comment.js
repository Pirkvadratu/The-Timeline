const mongoose = require('mongoose');
const{Schema} = mongoose;

const commentSchema = new Schema({

    message_id:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment:{
        type: String,
        required: true,
        minlength: [25,'Comment must contain at least 25 characters']
    }
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);


