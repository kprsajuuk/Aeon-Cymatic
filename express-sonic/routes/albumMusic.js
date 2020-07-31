var axios = require('axios');

const requestUrl = {
	'net': 'http://musicapi.leanapp.cn/album',
	'qq': 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
}

function formatNetAlbumMusic(songs, album){
	let list = [];
	let data = {id: album.id, name: album.name, artist: album.artist.name, artistId: album.artist.id, 
				company: album.company, publishTime: album.publishTime, img: album.blurPicUrl}
	songs.forEach(item => {
		list.push({
			id: item.id, name: item.name, duration: item.dt, artist: item.ar[0].name, artistId: item.ar[0].id,
			source: 'net',
		})
	})
	return {songs: list, album: data};
}

function formatQqAlbumMusic(album){
	let list = [];
	let data = {id: album.mid, name: album.name, artist: album.singername, artistId: album.singermid, 
				company: album.company, publishTime: album.aDate, 
				img: `http://y.gtimg.cn/music/photo_new/T002R180x180M000${album.mid}.jpg`}
	album.list.forEach(item => {
		list.push({
			id: item.songmid, name: item.songname, duration: item.interval + '000', artist: item.singer[0].name, 
			artistId: item.singer[0].mid, 
			source: 'qq',
		})
	})
	return {songs: list, album: data};
}

module.exports = function (app) {
	app.get('/albumMusic', function(req, response, next){
        var source = req.query.source || 'net';
		var id = req.query.id;
	    let params = {};
	    if (source === 'net'){
	    	params = {id: id}
	    } else if (source === 'qq'){
	    	params = {albummid: id};
	    }
	    axios.get(requestUrl[source], {
	    	params: params
	    }).then(res => {
	    	if (res && res.status === 200){
				let result = {success: true}
				if (source === 'net'){
					result = Object.assign(result, formatNetAlbumMusic(res.data.songs, res.data.album))
				} else if (source === 'qq'){
					result = Object.assign(result, formatQqAlbumMusic(res.data.data))
				}
				response.send(result);
			} else {
				response.send({success: false});
			}
	    }).catch(err=>{console.log(err); response.send({success: false})});
	});
};