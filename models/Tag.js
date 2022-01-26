const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const TagSchema = new Schema({
   name: {
        type: String,
        default:""
    },
   date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tag = mongoose.model( 'tags', TagSchema );