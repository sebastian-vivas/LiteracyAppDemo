module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('names').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            names: result
          })
        })
    });

    // How to Play ===================================================
    app.get('/howTo', function(req, res) {
        db.collection('stats').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('howTo.ejs', {
            stats: result
          })
        })
    });

    //What is Rad Rocket =============================================
    app.get('/about', function(req, res) {
        db.collection('stats').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('about.ejs', {
            stats: result
          })
        })
    });

    // CONTACT =======================================================
    app.get('/contact', function(req, res) {
        db.collection('stats').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('contact.ejs', {
            stats: result
          })
        })
    });

    // EPISODE ONE =====================================================
    app.get('/episodeOne', isLoggedIn, function(req, res) {
        db.collection('stats').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('episodeOne.ejs', {
            user : req.user,
            stats: result
          })
        })
    });

    // ACCOUNT ===============================================
    app.get('/account', isLoggedIn, function(req, res) {
        db.collection('names').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('account.ejs', {
            user : req.user,
            names: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      db.collection('stats').save({name:req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.post('/displayName', (req, res) => {
      db.collection('names').save({name: req.body.name, displayName: req.body.displayName, stars: 0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/messages', (req, res) => {
      db.collection('stats')
      .findOneAndUpdate({name:req.body.name, msg: req.body.msg}, {
        $set: {
          heart: true
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/addStars', (req, res) => {
      db.collection('stats')
      .findOneAndUpdate({name:req.body.name, displayName: req.body.displayName}, {
        $set: {
          stars: req.body.stars + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      db.collection('stats').findOneAndDelete({name:req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    app.delete('/resetName', (req, res) => {
      db.collection('names').findOneAndDelete({displayName: req.body.displayName}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    app.delete('/deleteAccount', (req, res) => {
      db.collection('users').findOneAndDelete({email: req.body.email}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
