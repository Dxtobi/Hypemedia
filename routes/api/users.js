const express = require( 'express' );
const router = express.Router();
//const gravatar = require( 'gravatar' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const keys = require( '../../config/keys' );
const passport = require( 'passport' );


const User = require( '../../models/User' );
const Post = require( '../../models/Post' );
const Site = require( '../../models/SiteBank' );
const Tag = require('../../models/Tag');



router.get( '/test', ( req, res ) =>  res.json({ message: 'Users works!' }) );

router.post('/register', (req, res) => {
    console.log(req.body)
  let errors={}
            User.findOne({ email : req.body.email })
            .then( user => {
            if( user ){
                errors.email = 'Email already exists';
                console.log(errors)
                return res.status( 400 ).json( errors );
            } else {
                User.findOne({ username: req.body.username })
                    .then(user => {
                        if (user) {
                            errors.username = 'User Name already exists';
                            console.log(errors)
                            return res.status( 400 ).json( errors );
                        } else {
                            const newUser = new User({
                                fullName: req.body.fullName,
                                email: req.body.email,
                                password: req.body.password,
                                username: req.body.username,
                                admin: req.body.admin,
                            });
                            
                            bcrypt.genSalt( 10, ( err, salt ) => {
                                bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                                    if (err) {
                                        console.log(err)
                                    } 
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => {
                                            console.log('saved new user')
                                            return res.json(user)
                                        })
                                        .catch( err => console.log( err ) );
                                })
                            })
                        }
                     })
               
            }
        });
    
   
   
});

router.post( '/login', ( req, res ) => {
    console.log(req.body)

    let errors={}
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then( user => {
        //check for user
            console.log(user)
            if (!user) {
            
            errors.email = 'User not found!';
            return res.status( 404 ).json( errors );
        }
        
        //check pass
        bcrypt.compare( password, user.password )
            .then( isMatch => { 
            if( isMatch ){
                //create JWT payload
                const payload = { id: user.id, email:user.email, fullName: user.fullName,  username:user.username, }
                
                jwt.sign(
                    payload, 
                    keys.secretKey, 
                    { expiresIn: 3600 * 60 * 60 * 60}, 
                    ( err, token ) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                            user:user
                        });    
                });
                
            } else {
                errors.password = 'Password incorrect!'; 
                return res.status( '400' ).json( errors );
            }
        });
    });
});

router.get( '/current', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    //res.json( req.user );
    res.json({
        id: req.user.id,
        fullName: req.user.fullName,
        email: req.user.email,
        username:req.user.username
    });
});

router.get( '/get_profile', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

//console.log(req.user)
    User.find()
        .then( user => {
            return res.json({users:user})
        }).catch(err => {
            let errors={ could_not : 'could not make request !' }
            return res.status( 404 ).json( errors );
    })
});

router.get( '/get_profile_id/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

  //  console.log(req.params)
        User.findOne({ _id:req.params.id })
            .then( user => {
                //console.log(user)
                return res.status( 200 ).json(user)
            }).catch(err => {
                let errors={ could_not : 'could not make request !' }
                return res.status( 404 ).json( errors );
        })
});

router.get( '/admin/get_all_info', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
 console.log("hit")
    const users = await User.count({}, function(err, count) {
        return count
    })

    const posts = await Post.count({}, function(err, count) {
        return count
    })
    
    const site = await Site.findOne({}, function(err, count) {
        return count
    })

    const tags = await Tag.find({}, function(err, count) {
        return count
    })
    const admins = await User.find({}, function(err, count) {
        return count
    })

    Post.findOne().sort( { date: -1 } ).then((lastPost) => {
        
        const siteData = {
            users:users,
            posts:posts,
            site:site,
            lastPost: lastPost,
            tags: tags,
            admins:admins
        }
       // console.log(siteData)
        return  res.status(200).json(siteData);
    }).catch(err => {
        console.log(err.message)
    })
    //console.log("hit")

});

router.post( '/admin/tag', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
    console.log("hit new tag")
    const newTag = new Tag({
        name:req.body.name
    });
    newTag.save().then((t) => {
        return res.status(200).json({success:true});
    }).catch((err) => {
        console.log(err)
    })

});
router.delete( '/admin/tag/:id', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
    console.log("hit delete tags")
    Tag.findOne({ _id: req.params.id }).then((t) => {
        t.remove().then(() => {
            return res.status(200).json({success:true});
       })
    }).catch(err => {
       console.log(err)
   })
});
//get_all_info
module.exports = router;

/*;*/