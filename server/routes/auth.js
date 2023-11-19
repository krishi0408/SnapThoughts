const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
            // Create a new user object with Google profile data
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          profileImage: profile.photos[0].value,
        };
  
        try {
             // Check if the user already exists in the database
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            // If the user exists, pass the user data to the next middleware
            done(null, user);
          } else {
             // If the user doesn't exist, create a new user in the database
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

// Google Login Route
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  
  // Retrieve user data
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login-failure",
      successRedirect: "/dashboard",
    })
  );

 //Router if something goes wrong 

 router.get('/login-failure', (req, res) => {
    res.send('Something went wrong...');
  });



// Destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if(error) {
        console.log(error);
        res.send('Error loggin out');
      } else {
        res.redirect('/')
      }
    })
  });
  
  
  // Presist user data after successful authentication
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
// Deserialize user data from the session
 
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  
  
  
module.exports = router;
