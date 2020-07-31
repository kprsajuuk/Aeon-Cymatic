var axios = require('axios');

const requestUrl = {
	'net': 'http://musicapi.leanapp.cn/search',
	'qq': 'http://c.y.qq.com/soso/fcgi-bin/client_search_cp',
}

function formatNetMusicList (list) {
	let result = [];
	list.forEach(item => {
		result.push({
			id: item.id, name: item.name, duration: item.duration, 
			artist: item.artists[0].name,artistId: item.artists[0].id,
			album: item.album.name,albumId: item.album.id,
			source: 'net',
		})
	})
	return result;
}

function formatQqMusicList (list) {
	let result = [];
	list.forEach(item => {
		result.push({
			id: item.songmid, name: item.songname, duration: item.interval + '000',
			artist: item.singer[0].name, artistId: item.singer[0].mid,
			album: item.albumname, albumId: item.albummid,
			source: 'qq',
		})
	})
	return result;
}

module.exports = function (app) {
	app.get('/search', function(req, response, next){
		var source = req.query.source || 'net';
		var keyword = req.query.keyword;
	    var limit = req.query.limit || 10;
	    var page = req.query.page || 1;
	    let params = {};
	    if (source === 'net'){
	    	params = {keywords: keyword,limit: limit,offset: (page - 1) * limit}
	    } else if (source === 'qq'){
	    	params = {w: keyword, n: limit, p: page, format: 'json'}
	    }
		axios.get(requestUrl[source], {
			params: params
		}).then(res => {
			if (res && res.status === 200){
				let result = {success: true}
				if (source === 'net'){
					result.total = res.data.result.songCount;
					result.songs = formatNetMusicList(res.data.result.songs);
				} else if (source === 'qq'){
					result.total = res.data.data.song.totalnum;
					result.songs = formatQqMusicList(res.data.data.song.list)
				}
				response.send(result);
			} else {
				response.send({success: false});
			}
		}).catch(err=>{console.log(err); response.send({success: false})});
	});
};