const eA = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    }
    else {
        req.flash("danger", "Iltimos Ro'yhatdan utib tizimga kiring");
        res.redirect("/user")
    }
}

module.exports = eA