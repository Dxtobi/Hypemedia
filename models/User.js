const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
   fullName:{
       type: String,
       required: true
   },
   username:{
      type: String,
      required: true
   },
    password:{
       type: String,
       required: true
   },
   email:{
      type: String,
      required: true
   },
    admin:{
       type: String,
       required: true,
       default:false
   },
    date:{
       type: Date,
        default: Date.now
   }
});

module.exports = User = mongoose.model('users', UserSchema);