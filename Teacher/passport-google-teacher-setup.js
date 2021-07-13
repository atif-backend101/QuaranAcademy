const passport = require('passport');
const GoogleStrategy2 = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use('jwt-2', new GoogleStrategy2({
    clientID: "862532654552-7h3uh5s7nmu753e1tb01fcpq1707l5ni.apps.googleusercontent.com",
    clientSecret: "ZdqCL2ZummEp__LnJWmK85qh",
    callbackURL: "https://quran-server.herokuapp.com/teacher/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
   console.log(profile)
    return done(null, profile);
  }
));



//asd