var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', 3000);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/adjectives.json', function(req, res) {
  fs.readFile('adjectives.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/adjectives.json', function(req, res) {
  fs.readFile('adjectives.json', function(err, data) {
    var adjectives = JSON.parse(data);
    adjectives.push(req.body);
    fs.writeFile('adjectives.json', JSON.stringify(adjectives, null, 2), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(adjectives);
    });
  });
});

app.get('/nouns.json', function(req, res) {
  fs.readFile('nouns.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/nouns.json', function(req, res) {
  fs.readFile('nouns.json', function(err, data) {
    var nouns = JSON.parse(data);
    nouns.push(req.body);
    fs.writeFile('nouns.json', JSON.stringify(nouns, null, 2), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(nouns);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on http://localhost:' + app.get('port'));
});
