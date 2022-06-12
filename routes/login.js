const express = require('express');
const routes = express.Router();
const passport = require("passport");
const { route } = require('../app');

/* GET users listing. */
routes.get('/login', function (req, res, next) {
    res.render("login", { title: "Tizimga kirish", isLogin: true })
});


routes.post("/login", (req, res, next) => {
    req.checkBody("username", "Iltimos foydalanuvchi ismini tuldiring").notEmpty();
    req.checkBody("password", "Iltimos parolingizni yozing").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render("login", { title: "Tizimga kirishda xatolik bor", errors: errors })
    }

    else {
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res, next)
    }
})

routes.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Tizimdan chiqdingiz")
        res.redirect('/');
    });
});

// routes.post('/login',
//     passport.authenticate('local', { 
//         failureRedirect: '/login',
//         failureFlash: true 
//     }),
//     function (req, res) {
//         res.redirect('/');
//     });



module.exports = routes