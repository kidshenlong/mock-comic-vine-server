/**
 * Created by Michael on 29/08/15.
 */
var express = require('express');
var app = express();
var fs = require('fs');

function getJSONFixture(filename, callback) {
    return JSON.parse(fs.readFileSync("fixtures/" + filename + ".json"));
}

app.get('/', function (req, res) {
    res.json(getJSONFixture('respond_200'));
});

app.get('/api/search', function (req, res) {
    console.log('hit search');
    res.json(getJSONFixture('search'));
});

app.get('/api/issues', function (req, res) {
    console.log('hit issues search');
    res.json(getJSONFixture('search_issues'));
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});