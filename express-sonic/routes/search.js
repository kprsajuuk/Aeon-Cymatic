var express = require('express');
var router = express.Router();
var request = require("request");

module.exports = function (app) {
	app.get('/search', function(req, response, next){
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
	});
};