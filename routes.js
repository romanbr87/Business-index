var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const mongoDB = require('./db.js');
var Types = mongoDB.Types, Business = mongoDB.Business, db = mongoDB.db;

/*Business.find ({})
.then (types => console.log (types))
.catch (err => console.log(err))*/

router.get('/', function(req, res, next) {
  var userAgent = req.headers['user-agent'];     // user-agent header from an HTTP request

  arr = [Business, Types]
  Promise.all(
    arr.map(table =>
      table.find ({})
      .then (types => types)
      .catch (err => err)
    ))
    .then((value) => {
      let val = { };
      val.businesses = value[0];
      val.types = value[1];
      val.ua = userAgent;
      return res.render('./Components/HomePage', val);
      //return res.json (val);
    })
    .catch((err) => {
      var error = { }
      error.err1 = err[0];
      error.err2 = err[1];
      return res.status(404).json(error);
    })
  
});


router.post('/', function(req, res, next) {
  var userAgent = req.headers['user-agent'];     // user-agent header from an HTTP request

  arr = [Business, Types]
  Promise.all(
    arr.map(table =>
      table.find ({})
      .then (types => types)
      .catch (err => err)
    ))
    .then((value) => {
      let val = { };
      val.businesses = value[0];
      val.types = value[1];
      val.ua = userAgent;
      return res.send(val);
    })
    .catch((err) => {
      var error = { }
      error.err1 = err[0];
      error.err2 = err[1];
      return res.status(404).json(error);
    })
    
});

router.post('/getBusinessesBySearch', function(req, res, next) {
  let searchText = req.body.searchText;
  if (searchText.trim() == '') res.json ([]);
  else {
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
      .then(data => { 
        let arr = data.feed.entry;
        arr = filterKeysOfArrayOfObjects ('gsx$', arr);
        arr = filterArrayOfObjects (searchText, arr);
        res.json (arr)
      })
	    .catch(err => res.status(404).json(err))
  }    

});


router.get('/:id', function(req, res, next) {
  var userAgent = req.headers['user-agent'];

  let id = req.params.id;
  Business.find ({ gsx$link: id })
  .then(data => {
    console.log (data);
    if (data.length == 0) next ( { message: "Id not found"})
    if (data.length == 1)  res.render('./Components/Itemdata', { data: data[0], ua: userAgent });
    else next ( { message: "Error"})
  })
  .catch(err => res.status(404).json(err))

});

/*router.post('/getTypes', function(req, res, next) {
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/oye0vyq/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
      .then(data => { res.json (data) })
	    .catch(err => res.status(404).json(err))
});

router.post('/getBusinesses', function(req, res, next) {
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
      .then(data => { res.json (data) })
	    .catch(err => res.status(404).json(err))
});*/



function filterKeys(prefix, obj) {
  return Object.entries(obj).reduce((res, [key, value]) => {
      if (key.startsWith(prefix)) {
          res[key] = value;
      }
      return res;
  }, {});
}


function filterKeys1(suffix, obj) {
  return Object.entries(obj).reduce((res, [key, value]) => {
      if (suffix.some (e => key.endsWith(e)) ) {
          res[key] = value;
      }
      return res;
  }, {});
}

function filterKeysOfArrayOfObjects1 (suffix, arr) {
  return arr.map (e => filterKeys1 (suffix, e));
}

function filterKeysOfArrayOfObjects (prefix, arr) {
  return arr.map (e => filterKeys (prefix, e));
}

function filterArrayOfObjects (tags, arr) {
  return arr.filter(obj => {
    return Object.values(filterKeys1 (['name', 'desc', 'desc2'], obj)).some (e => e.includes (tags)) 
  })
}

module.exports = router;
