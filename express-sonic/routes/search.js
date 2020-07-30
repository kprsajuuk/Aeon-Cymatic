var axios = require('axios');

function formatList (list) {
	let result = [];
	list.forEach(item => {
		result.push({
			id: , name: ,duration: ,artist: ,album: ,
		})
	})
}

module.exports = function (app) {
	app.get('/search', function(req, response, next){
		var source = req.query.sourceType || 'net';
		var keyword = req.query.keyword;
	    var limit = req.query.limit;
	    var offset = req.query.offset;
	    if (source === 'net'){
			axios.get('http://musicapi.leanapp.cn/search', {
				params: {
					keywords: keyword,
					limit: limit,
					offset: offset,
				}
			}).then(res => {
				if (res && res.status === 200){
					let result = res.data;
					result.success = true;
					response.send(result);
				} else {
					response.send({success: false});
				}
			});
		} else if(source === 'qq'){
	    	axios.get('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', {
	    		params: {
	    			p: 1,
					n: limit,
					w: keyword,
				}
			}).then(res => {
				if (res && res.status === 200){
					let result = res.data;
					result.success = true;
					response.send(result);
				} else {
					response.send({success: false});
				}
			});
		} else {
	    	response.send({success: false});
		}
	});
};