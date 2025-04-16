const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Userdb = require('../models/user');

const clientID = "76494981715-l3if10h2dmh5r3lg75rqlbdmi0ngoorv.apps.googleusercontent.com";
const clientSecret = "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";
const facebookID = "1252397179082903";
const facebookSecret = "149a03dccd816bb96e97a5adb18ecdfc";

passport.use(new GoogleStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email'],
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await Userdb.findOne({ googleId: profile.id });
    if (!user) {
      // New user signing up
      user = new Userdb({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value
      });
      await user.save();
      return done(null, { user, isNewUser: true });
    }
    // Existing user logging in
    return done(null, { user, isNewUser: false });
  } catch (err) {
    done(err, null);
  }
}));
passport.use(new FacebookStrategy({
    clientID: facebookID,
    clientSecret: facebookSecret,
    callbackURL: 'http://localhost:5001/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
  
      if (!email) {
        // If no email is provided, return an error
        return done(null, false, { message: 'Email is required to sign up' });
      }
  
      let user = await Userdb.findOne({ facebookId: profile.id });
      if (!user) {
        // New user signing up
        user = new Userdb({
          facebookId: profile.id,
          username: profile.displayName,
          email: email,
          profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : null // Check if photos exist
        });
        await user.save();
        return done(null, { user, isNewUser: true });
      }
      // Existing user logging in
      return done(null, { user, isNewUser: false });
    } catch (err) {
      done(err, null);
    }
  }));
  
  

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.user._id); // Assuming the user object has a user property containing user data
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Userdb.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
