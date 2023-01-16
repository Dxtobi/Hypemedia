const express = require('express');
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const uploadFunctions = require( './media' );
const Post = require( '../../models/Post' );
//const nodemailer = require("nodemailer");

const validatePostInput = require( '../../validation/post' );
const User = require('../../models/User');
const Messages = require('../../models/Messages');
const Tag = require('../../models/Tag');


router.post('/messages', (req, res) => {
    //console.log("hit")
    const message = new Message({
        message: req.body.message,
        phone:req.body.phone,
   });

    message.save().then((m) => {
        return res.status(200);
    }).catch((err) => {
        console.log(err.message)
    })
});
router.get('/messages',passport.authenticate( 'jwt', { session: false } ), (req, res) => {
    Messages.find()
    .sort({ date: -1 })
    .then(posts => {
        //console.log(posts)
    return res.json( posts )
    })
    .catch(err => {
        console.log(err.message)
        return res.status(404).json({ nopostsfound: 'No posts found!' })
    });
});
router.delete('/message/:id', passport.authenticate( 'jwt', { session: false } ),(req, res) => {
    Messages.find({_id:req.params.id})
    .then(post => {
        post.remove()
    return res.status(200);
    })
    .catch(err => {
        console.log(err.message)
        return res.status(404).json({ nopostsfound: 'No posts found!' })
    });
});
router.get('/search/:searchValue', (req, res) => {
    let searchRegix = new RegExp(`^${req.params.searchValue}`, 'gi')
    Post.find({$or:[
        {text:searchRegix},
        {header:searchRegix},
      ]})
    .sort({ date: -1 })
    .then(posts => {
        //console.log(posts)
    return res.json( posts )
    })
    .catch(err => {
        console.log(err.message)
        return res.status(404).json({ nopostsfound: 'No posts found!' })
    });
});
router.get('/tags', (req, res) => {
  // console.log("tag")
    Tag.find()
    .then(posts => {
        //console.log(posts)
    return res.json( posts )
    })
    .catch(err => {
        console.log(err.message)
        return res.status(404).json({ nopostsfound: 'No posts found!' })
    });
});
router.get('/:skip', (req, res) => {
   // console.log("hit route")
   // console.log(req.params.skip)
    Post.find()
        .populate('tags')
        .sort({ date: -1 })
        .skip(parseInt(req.params.skip))
        .limit(8)
        .then(posts => {
            //console.log(posts)
        return res.json( posts )
    })
        .catch(err => {
            console.log(err.message)
            return res.status(404).json({ no_post_found: 'No posts found!' })
        });
});

router.get('/tagged/:tag/:skip', (req, res) => {
 //   console.log("hit route tagged")
  //  console.log(req.params.skip, req.params.tag )
    Post.find({tags:req.params.tag})
        .populate('tags')
        .sort({ date: -1 })
        .skip(parseInt(req.params.skip))
        .limit(8)
        .then(posts => {
            //console.log(posts)
        return res.json( posts )
    })
        .catch(err => {
            console.log(err.message)
            return res.status(404).json({ nopostsfound: 'No posts found!' })
        });
});
router.get('/one/:id', (req, res) => {
   // console.log("hit get one post", req.params.id)
    const rn = Math.floor(Math.random()*5)
    Post.findById(req.params.id)
        .populate('tags name')
        .then(post => {
            post.views = post.views + rn
            post.save()
            //console.log(post)
        return res.status(200).json( post )
    })
        .catch(err => {
            console.log(err)
            return res.status(404).json({ nopostfound: 'No post found with that id!' })
        });
});

router.post( '/', uploadFunctions.upload.array('postImageData'), passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
  
    let allImg = uploadFunctions.pushImgs(req.files)
  
    if (allImg.length < 0 || req.body.name === '' || req.body.text === '' || req.body.tags === '') {
        return res.status(400).json({error:'something went wrong'})
   }
    //console.log("hit-create post")
    
   // console.log(req.body)
    const newPost = new Post( {
        text: req.body.text,
        name: req.body.header,
        header: req.body.header,
        tags:req.body.tags,
        htmlText: req.body.htmlText,
        postImage:allImg,
        videoLink:req.body.videoLink,
        user: req.user.id
    } );

    newPost.save().then(post => {
      //  console.log(post)
        return res.json(post)
    }).catch(err => {
        console.log(err.message)
    });
});

router.put( '/update/:id', uploadFunctions.upload.array('postImageData'), passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    User.findOne( { id: req.user.id } )
        .then( profile => {
            Post.findById( req.params.id )
                .then( post => {
                
                if( post.user.toString() !== req.user.id ){
                    return res.status( 401 ).json( { notauthorized: 'User not authorized!' } );
                }
                
                post.remove()
                    .then( () => {
                    res.json( { success: true } );
                })
            })
            
    })
    .catch( err => res.status( 404 ).json( err ) );
    
});

router.delete( '/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    
    User.findOne( { user: req.user.id } )
        .then( profile => {
            Post.findById( req.params.id )
                .then( post => {
                post.remove()
                    .then( () => {
                    res.json( { success: true } );
                })
            })
            
    })
    .catch( err => res.status( 404 ).json( err ) );
    
});

router.post( '/like/:id',  ( req, res ) => {

   // const rn = Math.floor(Math.random()*3)
    Post.findById(req.params.id)
        .populate('tags name')
        .then(post => {
            post.likes = post.likes + 1
            post.save()
            //console.log(post)
        return res.status(200).json( post )
    })
        .catch(err => {
            console.log(err)
            return res.status(404).json({ nopostfound: 'No post found with that id!' })
        });
    
});


router.post( '/comment/:id',  ( req, res ) => {
console.log("hit")
    Post.findById( req.params.id )
        .then( post => {
        const newcomment = {
            text: req.body.text,
            name: req.body.name,
        }
        post.comments.unshift( newcomment );
            post.save().then(post => {
                return res.json(post)
            });
    })
        .catch(err => {
            console.log(err.message)
            return res.status(404).json({ postnotfound: 'No post found!' })
        });

});
router.get( '/related/:tagID', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    Post.find({tags:req.params.tagID})
        .populate('tags')
        //.sort({ date: -1 })
        .limit(5)
        .then(posts => {
            //console.log(posts)
        return res.json( posts )
    })
        .catch(err => {
            console.log(err.message)
            return res.status(404).json({ nopostsfound: 'No posts found!' })
        });
});


router.post( '/sendmail',  ( req, res ) => {
    console.log(req.body)
    /*let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service:"gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'hackmankin@gmail.com', //process.env.EMAIL,// generated ethereal user
          pass:'jummy16snip'// process.env.PASSWORD, // generated ethereal password
        },
      });
      let details = {
        from:'hackmankin@gmail.com',//process.env.EMAIL,
        to: req.body.to,
        subject: req.body.subject,
        text:  req.body.text,
      }
  
      transporter.sendMail(details, (err) => {
        if (err) {
          console.log(err)
        } else {
         
          console.log('sent', err)
         // return navigate("/error");
        }
      })*/
     


});
router.delete( '/comment/:id/:comment_id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    
    Post.findById( req.params.id )
        .then( post => {
        
        //check if comment exists
        if( post.comments.filter( comment => comment._id.toString() === req.params.comment_id ).length === 0){
            return res.status( 404 ).json( { commentnoexists : 'Comment does not exists!' } );
        }
        
       const removeIndex = post.comments
                .map( item => item._id.toString() )
                .indexOf( req.params.comment_id );
        
        post.comments.splice( removeIndex, 1 );
        
        post.save().then( res.json( post ) );
                     
    })
    .catch( err => res.status( 404 ).json( { postnotfound: 'No post found!' } ) );
    
});

module.exports = router;
