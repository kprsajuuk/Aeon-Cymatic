var axios = require('axios');

const requestUrl = {
	'net': 'http://music.163.com/song/media/outer/url',
	'qq': 'http://u.y.qq.com/cgi-bin/musicu.fcg',
}

function getQqParam(id){
	return {
		format: 'json',
		data:{
    		req_0: {
    			module: "vkey.GetVkeyServer",
    			method: "CgiGetVkey",
    			param: {
    				guid: "358840384",
    				songmid: [id],
    				songtype: [0],
    				uin: "1443481947",
					loginflag: 1,
					platform: "20"
    			}
    		},
    		comm: {
				uin: "18585073516",
				format: "json",
				ct: 24,
				cv: 0
			}
    	}
	}
}

module.exports = function (app) {
	app.get('/download', function(req, response, next){
        var source = req.query.source || 'net';
		var id = req.query.id;
	    let params = {};
	    if (source === 'net'){
	    	params = {id: id + '.mp3'}
	    } else if (source === 'qq'){
	    	params.format = 'json';
	    	params = getQqParam(id);
	    }
	    if (source === 'net'){
	    	axios.get(requestUrl[source], {
				params: params,
				responseType: "stream",
			}).then(res => {
				res.data.pipe(response);
			}).catch(err=>{response.send({success: false})})
	    } else if (source === 'qq'){
	    	axios.get(requestUrl[source], {
	    		params: params,
	    	}).then(res => {
	    		let sip = res.data.req_0.data.sip;
				let purl = res.data.req_0.data.midurlinfo[0].purl
				axios.get(sip + purl, {
					responseType: "stream",
				}).then(qqres => {
					qqres.data.pipe(response);
				}).catch(err=>{response.send({success: false})})
	    	}).catch(err=>{response.send({success: false})})
	    }
	});
};