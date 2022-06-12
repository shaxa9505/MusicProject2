const {Router} = require("express");
const routes = Router();
const Music = require("../model/Music")

routes.get("/music/edit/:id", (req, res) => {
    Music.findById(req.params.id, (err, data) => {
        if(err) console.log(err);
        else {
            res.render("musicEdit", {title: "Musiqa o'zgartirish", data: data})
        }
    })
})


routes.post("/music/edit/:id", (req, res) => {
    const music = {};
    music.name = req.body.name;
    music.singer = req.body.singer;
    music.comments = req.body.comments;

    const query = {_id: req.params.id}

    Music.findByIdAndUpdate(query, music, (err) => {
        if(err) console.log(err);
        else {
            res.redirect("/")
        }
    })    
})


// delete ham editni ichida 

routes.get("/music/delete/:id", (req, res) => {
    Music.findByIdAndDelete(req.params.id, (err) => {
        if(err) console.log(err);
        else {
            res.redirect("/")
        }
    })
})

module.exports = routes