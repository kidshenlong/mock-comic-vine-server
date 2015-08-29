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
    if(req.query.force){
        res.json(getJSONFixture(req.query.force));
    }else{
        res.json(getJSONFixture('search'));
    }
});

app.get('/api/issues', function (req, res) {
    console.log('hit issues search');
    if(req.query.force){
        res.json(getJSONFixture(req.query.force));
    }else {
        var limit = 20;
        var page = req.query.page;
        if(page > 2){
            res.json(getJSONFixture('search_issues_' + page));
        }else if(page == 2){
            var json = getJSONFixture('search_issues_out_of_bounds')
            json.offset = offset;
            res.json(json);
        }else{
            res.json(getJSONFixture('search_issues'));
        }
    }
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});