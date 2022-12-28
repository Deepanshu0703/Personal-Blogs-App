require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = new mongoose.Schema({
    day: String,
    title: String,
    blogs: String,
    wId: String,
    userName: String
});

const itemsScheme = new mongoose.Schema({
    userName: String,
    password: String,
    googleId: String
});
itemsScheme.plugin(passportLocalMongoose);
itemsScheme.plugin(findOrCreate);



const blog = mongoose.model("blog", itemsSchema);
const user = mongoose.model("user", itemsScheme);
passport.use(user.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    user.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/blogDB",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        user.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};
const today = new Date();
const days = today.toLocaleDateString('en-US', options);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {

        blog.find({}, (err, foundItems) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render('index', { year: new Date().getFullYear(), data: foundItems, login: true });
            }
        })
    } else {
        blog.find({}, (err, foundItems) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render('index', { year: new Date().getFullYear(), data: foundItems, login: false });
            }
        });
    }
});
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/blogDB", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/compose");
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) { console.log(err); }
        else {
            res.redirect("/");
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get("/registor", (req, res) => {
    res.render("registor");
});

app.get("/about", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("about", { year: new Date().getFullYear(), login: true });
    } else {
        res.render("about", { year: new Date().getFullYear(), login: false });
    }
});

app.get("/contact", (req, res) => {
    if (req.isAuthenticated()) {

        res.render("contact", { year: new Date().getFullYear(), login: true });
    } else {
        res.render("contact", { year: new Date().getFullYear(), login: false });
    }
});



app.post("/registor", (req, res) => {
    user.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/registor");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/compose");
            });
        }
    });
});

app.post("/login", (req, res) => {
    const users = new user({
        usename: req.body.username,
        password: req.body.password
    });
    req.login(users, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/compose");
            });
        }
    });
}
);

app.get("/compose", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("compose", { year: new Date().getFullYear(), login: true });
    } else {
        res.redirect("/login");
    }
});

app.post("/compose", (req, res) => {
    const blogs = new blog({
        day: days,
        title: req.body.title,
        blogs: req.body.blogs,
        wId: req.user._id,
        userName: req.user.username
    });
    blogs.save();
    res.redirect("/");
});

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;

    if (req.isAuthenticated()) {
        blog.findById(id, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("blogs", { year: new Date().getFullYear(), id: resp._id, days: resp.day, title: resp.title, blog: resp.blogs, login: true });
            }
        });
    } else {
        blog.findById(id, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("blogs", { year: new Date().getFullYear(), id: resp._id, days: resp.day, title: resp.title, blog: resp.blogs, login: false });
            }
        });
    }
});

app.post('/del', (req, res) => {
    const id = req.body.id;
    blog.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
})

app.listen(3000, () => {
    console.log("Server is running");
});

