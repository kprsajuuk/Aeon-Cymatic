var express = require('express');
var router = express.Router();
var request = require("request");

module.exports = function (app) {
	app.get('/test', function(req, response, next){
		request('https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=000I5jJB3blWeN&filename=C400000I5jJB3blWeN.m4a&guid=126548448', function(err, res, body){
	        console.log(res.statusCode);
	        console.log(body)
	        response.send(body);
	    })
	});
};