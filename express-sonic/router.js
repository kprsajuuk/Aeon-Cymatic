var indexRouter = require('./routes/index');
var search = require('./routes/search');
var test = require('./routes/test');

module.exports = function (app) {
	search(app);
	indexRouter(app);
	test(app);
};