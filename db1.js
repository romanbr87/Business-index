var express = require('express');
var router = express.Router();

const mongoDB = require('./db.js');
var Types = mongoDB.Types, Business = mongoDB.Business, db = mongoDB.db;


router.get('/set/:id', function(req, res, next) {
  let id = req.params.id;
  var t = new Types ({ gsx$type: id });
  t.save(function (err, type) {
    if (err) next ({ message: err})
    res.send ("<h1>" + id + "</h1>");
  });
})


router.get('/set1', function(req, res, next) {
    let obj = {
        gsx$type: "ספורט",
        gsx$name: "דה בייס",
        gsx$logo: "https://res.cloudinary.com/foodies/image/upload/v1626119448/Github/61421310_2948143198561616_2375046408504868864_n.jpg",
        gsx$logoheight: 200,
        gsx$logowidth: 200,
        gsx$address: "שומרון 4",
        gsx$city: "נוף הגליל", 
        gsx$mobilephone :  "508118216",
        gsx$facebook :  "https://www.facebook.com/TheBassHipHopDance",
        gsx$instagram :  "https://www.instagram.com/thebass.official/",
        gsx$whatsapp :  "508118216",
        gsx$desc :  'סטודיו "דה בייס" סטודיו מקצועי, הראשון והיחיד בעיר לריקודי רחוב וסגנון ההיפ הופ בפרט,',
        gsx$desc2 :  "בהנהלת נטלי מלין. מתאים לכל הרמות וכל הגילאים לפי קבוצות החל מכיתה א' ועד גיל 20+",
        gsx$link : 0
    }
    
    var t = new Business (obj);
    t.save(function (err, type) {
      if (err) next ({ message: err})
      res.send ("<h1>OK</h1>");
    });
  })
  
module.exports = router;
