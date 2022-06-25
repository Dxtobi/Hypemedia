const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
  
  passport.use( 
      new JwtStrategy( opts, (jwt_payload, done) => {
            //console.log(jwt_payload);
          User.findById(jwt_payload.id)
            .then( thisUser =>{
              if (thisUser) {
                let user = {
                  fullName : thisUser.fullName,
                  id : thisUser._id,
                  username : thisUser.username,
                  email: thisUser.email,
                  isAdmin: thisUser.admin
                }
                return done( null, user );
            }
              return done( null, false );
          })
          .catch( err => console.log( err ) );
        })
  );
    
};