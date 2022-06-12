const { Router } = require("express");
const routes = Router();
const Music = require("../model/Music");
const eA = require("../middleware/eA")

routes.get("/music/add", eA, (req, res) => {
    res.render("musicAdd", { title: "Musiqa qo'shish sahifasi", isMusicAdd: true })
})

routes.post("/music/add", (req, res) => {

    req.checkBody("name", "Iltimos Qushiqchini nomini yozing").notEmpty();
    req.checkBody("singer", "Iltimos Qushiqchini avtorini yozing").notEmpty();
    req.checkBody("comments", "Iltimos Qushiqga izoh yozing").notEmpty();

    const errors = req.validationErrors()

    if (errors) {
        res.render("musicAdd", { title: "Musiqa qushishda xatolik bor", errors: errors })
    }

    else {
        const music = new Music();
        music.name = req.body.name;
        music.singer = req.body.singer;
        music.comments = req.body.comments;
        music.author = req.user._id;

        music.save((err) => {
            if (err) console.log(err)
            else {
                req.flash("success", "Musiqangiz muvaffaqiyatli quwildi")
                res.redirect("/")
            }
        })
    }


})

module.exports = routes