var IndexController = require('./controller/index');
var fs = require('fs');
var request = require("request");

module.exports = function (app) {
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/' + 'index.html')
    });
    app.get('/search', function (req, response, next) {
        var keyword = req.query.keyword;
        var limit = req.query.limit;
        var offset = req.query.offset;
        request(encodeURI(`http://musicapi.leanapp.cn/search?keywords=${keyword}&limit=${limit}&offset=${offset}`), function (err, res, body) {
            if (res.statusCode === 200){
                response.send(body);
            }
        })
    });
    app.get('/download', function(req, response, next){
        var id = req.query.id;
        request.get('http://music.163.com/song/media/outer/url?id=' + id + '.mp3')
            .on('response', function (res) {
                console.log('===========')
                console.log(res.statusCode)
                this.pipe(response)
            });
    });
};