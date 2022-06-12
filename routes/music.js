const { Router } = require("express");
const routes = Router();
const Music = require("../model/Music");
const User = require("../model/User");
const eA = require("../middleware/eA")

routes.get("/music/:id", eA, (req, res) => {
    Music.findById(req.params.id, (err, data) => {
        if (err) console.log(err);
        else {
            User.findById(data.author, (err, user) => {
                if (err) console.log(err);
                else {
                    res.render("music", { data, admin: user.name })
                }
            })
        }

    })
})


module.exports = routes