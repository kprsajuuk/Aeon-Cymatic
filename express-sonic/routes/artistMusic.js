var axios = require('axios');

const requestUrl = {
	'net': 'http://musicapi.leanapp.cn/artists',
	'qq': 'http://u.y.qq.com/cgi-bin/musicu.fcg',
}

function formatNetArtistMusic(artist, songs){
	let list = [];
	let data = {id: artist.id, name: artist.name, img: artist.picUrl};
	songs.forEach(item => {
		list.push({
			id: item.id, name: item.name, duration: item.dt, album: item.al.name, albumId: item.al.id,
			artist: item.ar[0].name, artistId: item.ar[0].id,
			source: 'net'
		})
	})
	return ({songs: list, artist: data});
}

function formatQqArtistMusic(artist){
	let list = [];
	let data = {id: artist.singer_info.mid, name: artist.singer_info.name, 
				img: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${artist.singer_info.mid}.jpg`};
	artist.songlist.forEach(item => {
		list.push({
			id: item.mid, name: item.name, duration: item.interval + '000', album: item.album.name, albumId: item.album.mid,
			artist: item.singer[0].name, artistId: item.singer[0].mid,
			source: 'qq'
		})
	})
	return ({songs: list, artist: data});
}

module.exports = function (app) {
	app.get('/artistMusic', function(req, response, next){
        var source = req.query.source || 'net';
		var id = req.query.id;
	    let params = {};
	    if (source === 'net'){
	    	params = {id: id}
	    } else if (source === 'qq'){
	    	params = {
	    		data: {
	    			comm: {
			          ct: 24,
			          cv: 0
			        },
			        singerAlbum: {
			          method: "get_singer_detail_info",
			          param: {
			            singermid: id,
			            order: "time",
			            begin: 0,
			            num: 50,
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
					result = Object.assign(result, formatNetArtistMusic(res.data.artist, res.data.hotSongs))
				} else if (source === 'qq'){
					result = Object.assign(result, formatQqArtistMusic(res.data.singerAlbum.data))
				}
				response.send(result);
			} else {
				response.send({success: false});
			}
	    }).catch(err=>{console.log(err); response.send({success: false})});
	});
};