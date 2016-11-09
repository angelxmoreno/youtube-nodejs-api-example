'use strict';

var google = require('googleapis');
var youtube = google.youtube('v3');
var config = require('./config');
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
    res.send('You need to search via "/{something}"');
});

app.get('/:search', function (req, res) {

    youtube.search.list({
        auth: config.API_KEY,
        part: 'id,snippet',
        q: req.params.search
    }, function (err, data) {
        if (err) {
            res.send(err);
        }
        if (data) {
            res.send(data);
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port'));
});