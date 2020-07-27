var IndexController = require('./controller/index');
var fs = require('fs');
var request = require("request");

module.exports = function (app) {
    app.get('/', IndexController.index);
    app.get('/search', function (req, response, next) {
        var keyword = req.query.keyword;
        request(encodeURI('http://musicapi.leanapp.cn/search?keywords='+keyword), function (err, res, body) {
            if (res.statusCode === 200){
                response.send(body);
            }
        })
    });
    app.get('/download', function(req, response, next){
        var id = req.query.id;
        request.get('http://music.163.com/song/media/outer/url?id=' + id + '.mp3')
            .on('response', function (res) {
                this.pipe(response)
            });
    });
};