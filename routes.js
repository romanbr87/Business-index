var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  var userAgent = req.headers['user-agent'];     // user-agent header from an HTTP request

  
  let href2 = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/oye0vyq/public/values?alt=json"
  //types
  
  let href1 = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  //Business
  
  arr = [href1, href2]
  Promise.all(
    arr.map((url) =>
      fetch(url).then((response) => {
        //This reponse has over 100 elements always
        return response.json();
      })
      .catch(err => err.json())
    ))
    .then((value) => {
      let val = { };
      val.businesses = filterKeysOfArrayOfObjects ('gsx$', value[0].feed.entry);
      val.types = filterKeysOfArrayOfObjects ('gsx$', value[1].feed.entry);
      val.ua = userAgent;
      return res.render('./Components/HomePage', val);
    })
    .catch((err) => {
      var error = { }
      error.err1 = err[0];
      error.err2 = err[1];
      return res.status(404).json(error)
    })
  
});


router.post('/', function(req, res, next) {
  let href2 = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/oye0vyq/public/values?alt=json"
  //types
  
  let href1 = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  //Business
  
  arr = [href1, href2]
  Promise.all(
    arr.map((url) =>
      fetch(url).then((response) => {
        //This reponse has over 100 elements always
        return response.json();
      })
      .catch(err => err.json())
    ))
    .then((value) => {
      let val = { };
      val.businesses = filterKeysOfArrayOfObjects ('gsx$', value[0].feed.entry);
      val.types = filterKeysOfArrayOfObjects ('gsx$', value[1].feed.entry);
      return res.send(val);
    })
    .catch((err) => {
      var error = { }
      error.err1 = err[0];
      error.err2 = err[1];
      return res.status(404).json(error)
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
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
        .then(data => {
        if (Number (id) != id || id >= data.feed.entry.length || id < 0) next ({ message: "Undefined ID" })
        else {
          let arr = data.feed.entry[id];
          res.render('./Components/Itemdata', { data: arr, ua: userAgent });
        }
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
    return Object.values(filterKeys1 (['name', 'desc', 'desc2'], obj)).some (e => e.$t.includes (tags)) 
  })
}

module.exports = router;
