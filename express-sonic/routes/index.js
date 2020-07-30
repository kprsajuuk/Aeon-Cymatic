var express = require('express');
var router = express.Router();
var IndexController = require('../controller/index');
var fs = require('fs');
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/' + 'index.html')
});

router.get('/search', function(req, response, next) {
	var keyword = req.query.keyword;
    var limit = req.query.limit;
    var offset = req.query.offset;
    request(encodeURI(`http://musicapi.leanapp.cn/search?keywords=${keyword}&limit=${limit}&offset=${offset}`), function (err, res, body) {
        if (res && res.statusCode === 200){
            let result = JSON.parse(body);
            result.success = true;
            response.send(result);
        } else {
            response.send({success: false});
        }
    })
})

router.get('/albumMusic', function(req, response, next) {
	let id = req.query.id;
    request(encodeURI(`http://musicapi.leanapp.cn/album?id=${id}`), function (err, res, body) {
        if (res && res.statusCode === 200){
            let result = JSON.parse(body);
            result.success = true;
            response.send(result);
        } else {
            response.send({success: false});
        }
    })
})

router.get('/artistMusic', function(req, response, next) {
	let id = req.query.id;
	request(encodeURI(`http://musicapi.leanapp.cn/artists?id=${id}`), function (err, res, body) {
        if (res && res.statusCode === 200){
        	let result = JSON.parse(body);
            result.success = true;
            response.send(result);
        } else {
            response.send({success: false});
        }
    })
})

router.get('/artistAlbum', function(req, response, next) {
	let id = req.query.id;
	let limit = req.query.limit || 10;
	let offset = req.query.offset || 0;
	request(encodeURI(`http://musicapi.leanapp.cn/artist/album?id=${id}&limit=${limit}&offset=${offset}`), function (err, res, body) {
        if (res && res.statusCode === 200){
        	let result = JSON.parse(body);
            result.success = true;
            response.send(result);
        } else {
            response.send({success: false});
        }
    })
})

router.get('/download', function(req, response, next) {
	var id = req.query.id;
    request.get('http://music.163.com/song/media/outer/url?id=' + id + '.mp3')
        .on('response', function (res) {
            this.pipe(response)
        }).on('error', function (err) {
            response.send('')
        })
})

module.exports = router;
