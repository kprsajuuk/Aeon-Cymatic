var fs = require('fs');
var request = require("request");

module.exports = function (app) {
    app.get('/music', function(req, response, next){
        response.sendFile(__dirname, '../index.html')
    });

    app.get('/downloadOrig', function(req, response, next){
        var id = req.query.id;
        request.get('http://music.163.com/song/media/outer/url?id=' + id + '.mp3')
            .on('response', function (res) {
                this.pipe(response)
            }).on('error', function (err) {
                response.send('')
            })
    });
}

