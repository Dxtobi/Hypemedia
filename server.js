const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
//const blogPost = require('./routes/api/blogPost');
const passport = require('passport');
const path = require('path');
const app = express();
const bcrypt = require( 'bcryptjs' );
//body parser middleware

//db config
const db = require('./config/keys').mongoURI;
const User = require('./models/User');
//db connection
mongoose
    .connect(process.env.MONGODB_URI||db)
    .then(() => async () => {
        try {
  
                  
            // you can refer here any other method to get count or number of record
            let count = await User.countDocuments({});
  
            if (count < 1) {
console.log("count users 0:", count)
                var user = {
                    fullName: "oluwatobi",
                    email: "akanbijosephtobi@gmail.com",
                    password: "Jummy1_6snip!",
                    username: 'oluwatobi',
                    admin: true,
                }
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, async (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        const admin = new User(user);
                        await admin.save().then(c => console.log('created new user =>>>>admin')).catch(err => console.log(err));
                    })
                })
             
            }else{  
             console.log("count users:", count)
  }
          
  
        } catch (err) {
  
            console.log(err);
        }
    })
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport strategy
require('./config/passport')(passport);
//middleware
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/upload' , express.static(path.join(__dirname , '/upload')));
app.use(express.urlencoded({extended:false}))

//app.get('*', (req, res) => {
   // res.sendFile(path.join(__dirname, '../build'))
//})


app.use('/api/users', users);
//app.use('/api/trade', trade);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));

