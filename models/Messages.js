const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
   phone: {
        type: String,
        default:0
  },
  message: {
    type: String,
    default:""
  },
   date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model( 'messages', MessageSchema );