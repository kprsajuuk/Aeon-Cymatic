var axios = require('axios');

const requestUrl = {
	'net': 'https://interface.music.163.com/eapi/cloudsearch/pc',
	'qq': 'https://s.music.qq.com/fcgi-bin/music_search_new_platform',
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
	});
	return result;
}

function formatQqMusicList (list) {
	let result = [];
	list.forEach(item => {
		result.push({
			id: item.mid, name: item.name, duration: item.interval + '000',
			artist: item.singer[0].name, artistId: item.singer[0].mid,
			album: item.album?.name, albumId: item.album?.mid,
			source: 'qq',
		})
	})
	return result;
}

module.exports = function (app) {
	app.get('/search', function(req, response, next){
		var source = req.query.source || 'net';
		var searchKey = req.query.keyword;
	    var pageSize = req.query.limit || 10;
	    var pageNum = req.query.page || 1;
	    let params = {};
	    if (source === 'net'){

	    } else if (source === 'qq'){
	    	params = {w: keyword, n: limit, p: page, format: 'json'}
	    }
		axios(qqRequest.axiosConfig(searchKey, pageSize, pageNum)).then(res => {
			if (res && res.status === 200){
				let list = res.data?.req_1?.data?.body?.song?.list || []
				list = formatQqMusicList(list);
				response.send({success: true, data: {songs: list, total: list.length}});
			} else {
				response.send({success: false});
			}
		})
		
	});
};

class qqRequest {
	static axiosConfig = (searchKey, pageSize, pageNum) => {
		let data = {
			req_1: {
				method: "DoSearchForQQMusicDesktop",
				module: "music.search.SearchCgiService",
				param: {
					num_per_page: pageSize,
					page_num: pageNum,
					query: searchKey,
					search_type: 0
				}
			}
		}
		return {
			url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
			method: 'POST',
			data: data,
			headers: {
				Referer: 'https://y.qq.com'
			},
		}
	}
}
