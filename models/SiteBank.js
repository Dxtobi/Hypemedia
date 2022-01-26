const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
   totalSiteHit: {
        type: Number,
        default:0
  },
  rating: {
    type: Number,
    default:0
  },
  numberOfRating: {
    type: Number,
    default:0
},
   date: {
        type: Date,
        default: Date.now
    }
});

module.exports = site = mongoose.model( 'site', SiteSchema );