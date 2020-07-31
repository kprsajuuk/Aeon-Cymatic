var axios = require('axios');

const requestUrl = {
	'net': 'http://musicapi.leanapp.cn/artist/album',
	'qq': 'http://u.y.qq.com/cgi-bin/musicu.fcg',
}

function formatNetArtistAlbum(songs, artist){
	let list = [];
	songs.forEach(item => {
		list.push({
			albumId: item.id, album: item.name, publishTime: item.publishTime, company: item.company, size: item.size,
			source: 'net'
		})
	})
	return ({albums: list, albumSize: artist.albumSize});
}

function formatQqArtistAlbum(album){
	let list = [];
	album.list.forEach(item => {
		list.push({
			albumId: item.album_mid, album: item.album_name, publishTime: item.pub_time, 
			company: item.company.company_name, size: '',
			source: 'qq'
		})
	})
	return ({albums: list, albumSize: album.total});
}

module.exports = function (app) {
	app.get('/artistAlbum', function(req, response, next){
        var source = req.query.source || 'net';
		var id = req.query.id;
		let limit = req.query.limit || 10;
        let page = req.query.page || 1;
	    let params = {};
	    if (source === 'net'){
	    	params = {id: id, limit: limit, offset: (page - 1) * limit}
	    } else if (source === 'qq'){
	    	params = {
	    		data: {
	    			comm: {
			          ct: 24,
			          cv: 0
			        },
			        singerAlbum: {
			          method: "get_singer_album",
			          param: {
			            singermid: id,
			            order: "time",
			            begin: (page-1)*limit,
			            num: limit,
			            exstatus: 1
			          },
			          module: "music.web_singer_info_svr"
			        }
	    		}
		    }
	    }
	    axios.get(requestUrl[source], {
	    	params: params,
	    }).then(res => {
	    	if (res && res.status === 200){
				let result = {success: true}
				if (source === 'net'){
					result = Object.assign(result, formatNetArtistAlbum(res.data.hotAlbums, res.data.artist))
				} else if (source === 'qq'){
					result = Object.assign(result, formatQqArtistAlbum(res.data.singerAlbum.data))
				}
				response.send(result);
			} else {
				response.send({success: false});
			}
	    }).catch(err=>{console.log(err); response.send({success: false})});
	});
};