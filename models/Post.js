const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
   },
   text: {
       type: String,
       //required: true,
       default:''
    },
    htmlText: {
        type: String,
        required: true,
        
    },
   header: {
       type: String,
       required: true
   },
   avatar: {
       type: String
   },
    likes: {
        type: Number,
        default:0
    },
    views: {
        type: Number,
        default:0
    },
    postImage: [],
    videoLink: {
        type: String
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'tags'
        }
    ],
    comments: [
        {
            text: {
               type: String,
               required: true
            },
            name: {
                type: String,
               // required: true,
                default: "Anonymous",
                
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Post = mongoose.model('post', PostSchema);