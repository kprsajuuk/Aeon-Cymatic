var indexRouter = require('./routes/index');
var search = require('./routes/search');
var albumMusic = require('./routes/albumMusic');
var artistMusic = require('./routes/artistMusic');
var artistAlbum = require('./routes/artistAlbum');
var download = require('./routes/download');
var test = require('./routes/test');

module.exports = function (app) {
	search(app);
	albumMusic(app);
	artistMusic(app);
	artistAlbum(app);
	download(app);
	indexRouter(app);
	test(app);
};