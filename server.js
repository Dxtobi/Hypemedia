const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
//const blogPost = require('./routes/api/blogPost');
const passport = require('passport');
const path = require('path');
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/upload' , express.static(path.join(__dirname , '/upload')));
//db config
const db = require('./config/keys').mongoURI;

//db connection
mongoose
    .connect(db)
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport strategy
require('./config/passport')(passport);
//middleware

app.use('/api/users', users);
//app.use('/api/trade', trade);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));

