const express = require('express');
const routes = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs")

/* GET users listing. */
routes.get('/user', function (req, res, next) {
  res.render("user", { title: "Ro'yhatdan utish", isUser: true})
});


routes.post("/user", (req, res) => {

  req.checkBody("name", "Iltimos ismingizni yozing").notEmpty();
  req.checkBody("username", "Iltimos foydalanuvchi ismini yozing").notEmpty();
  req.checkBody("email", "Iltimos emailingizni yozing").notEmpty();
  req.checkBody("password", "Iltimos parolingizni yozing").notEmpty();
  req.checkBody("password2", "Iltimos parolingizni tasdiqlang").equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.render("user", { title: "Ro'yhatdan utishda xatolik bor", errors: errors })
  }

  else {
    const { name, username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) console.log(err);
      else {
        const user = new User({
          name,
          username,
          email,
          password: hash
        })
        user.save((err) => {
          if (err) console.log(err);
          else {
            req.flash("success", "Ma'lumotlaringiz muvaffaqiyatli qabul qilindi")
            res.redirect("/login")
          }
        })
      }
    })
  }

})

module.exports = routes;
