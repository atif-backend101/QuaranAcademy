const passport = require('passport');
const strategy = require("passport-facebook");


const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "1427438870956312",
      clientSecret: "f0a81ae6038c2b60b8bdee4069b0c0f4",
      callbackURL: "http://localhost:3005/user/auth/facebook/callback",
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
    //   const { email, first_name, last_name } = profile._json;
    //   const userData = {
    //     email,
    //     firstName: first_name,
    //     lastName: last_name
    //   };
    //   new userModel(userData).save();
      return done(null, profile);
    }
  )
);