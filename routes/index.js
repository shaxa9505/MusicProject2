const express = require('express');
const router = express.Router();
const Music = require("../model/Music")

/* GET home page. */

router.get('/', function(req, res, next) {
  
  Music.find({}, (err, music) => {
    if(err) console.log(err)
    else {
      res.render('index', { title: 'Bosh sahifa', musics: music, isIndex: true});
    }
  })
});

module.exports = router;
