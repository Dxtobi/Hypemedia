const express = require('express');
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

const Post = require( '../../models/Post' );
const Profile = require( '../../models/Profile' );

const validatePostInput = require( '../../validation/post' );

router.get('/test', (req, res) => {
    res.json({
        message: 'Posts works!'
    })
});

router.get('/', (req, res) => {
    Post.find()
        .sort( { date: -1 } )
        .then( posts => {
        res.json( posts )
    })
    .catch( err => res.status( 404 ).json( { nopostsfound: 'No posts found!' } ) );
});

router.get('/:id', (req, res) => {
    Post.findById( req.params.id )
        .then( post => {
        res.json( post )
    })
    .catch( err => res.status( 404 ).json( { nopostfound: 'No post found with that id!' } ) );
});
    
router.post( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    
    const { errors, isValid } = validatePostInput( req.body );
    
    if( !isValid ){
        return res.status( 400 ).json( errors );    
    }
    
    const newPost = new Post( {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id    
    } );
    
    newPost.save().then( post => res.json( post ) );
});

router.delete( '/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    
    Profile.findOne( { user: req.user.id } )
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




module.exports = router;