const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
//const market = require('./routes/api/market');
const passport = require('passport');
const path = require('path');
const app = express();
const bcrypt = require( 'bcryptjs' );
//body parser middleware
const cors = require('cors');
//db config
const db = require('./config/keys').mongoURI;
const User = require('./models/User');
//db connection
app.use(cors({
    origin: '*'
}));
mongoose
    .connect(process.env.MONGODB_URI||db, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => async () => {
        console.log('new----00')
        try {
            console.log('new----11')
            // you can refer here any other method to get count or number of record
            let count = await User.countDocuments({});
  
            if (count < 1) {
                console.log("count users 0:", count)
                var user = {
                    fullName: "oluwatobi",
                    email: process.env.EMAIL||"akanbijosephtobi@gmail.com",
                    password: process.env.PASSWORD||"somethingSimple!",
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




const dbi = mongoose.connection
dbi.once('open', _ => {
    console.log('connected db');
    User.findOne((err, user) => {
        if (err) throw err;
        if (user) {
            
        } else {
            var user = {
                fullName: "oluwatobi",
                 email: process.env.EMAIL||"akanbijosephtobi@gmail.com",
                    password: process.env.PASSWORD||"somethingSimple!",
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
        }
    })
})

dbi.once('error', _ => {
    console.log('error connected db')
})
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
//app.use('/api/market', market);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));

