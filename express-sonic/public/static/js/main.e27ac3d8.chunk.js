(this["webpackJsonpshadow-sonic"]=this["webpackJsonpshadow-sonic"]||[]).push([[0],{195:function(t,e,a){t.exports=a(392)},204:function(t,e,a){},37:function(t,e,a){t.exports={music:"Music_music__14wUe",header:"Music_header__3qRWq",input:"Music_input__GEO7_",select:"Music_select__39bZb",item:"Music_item__TzQve",text:"Music_text__1wcOp",table:"Music_table__68FKM",album:"Music_album__1NAmb",info:"Music_info__1kELK",emphasize:"Music_emphasize__3tqAg"}},390:function(t,e,a){},392:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),o=a(19),r=a.n(o),s=a(91),c=a(85),l=function(t,e){return{type:"SEARCH_MUSIC",searchKey:t,searchType:e}},u={searchKey:"",searchType:""},d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SEARCH_MUSIC":return Object.assign({},t,{searchKey:e.searchKey,searchType:e.searchType});default:return t}},m=Object(c.b)({searchMusic:d}),p=(a(204),a(39)),h=a(40),f=a(42),g=a(41),y=(a(144),a(80)),b=(a(211),a(193)),v=a(58),E=a.n(v),w=(a(103),a(54)),k=a(44),A=(a(128),a(71)),S=(a(154),a(92)),L=(a(155),a(101)),_=(a(102),a(55)),C=(a(240),a(192)),O=(a(245),a(140)),D=(a(156),a(100)),N=(a(250),a(62)),M=a(393),I=a(394),j=a(395),P=a(396),x=a(397),T=a(86),z=a.n(T),B=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=e||"test",n=new Blob([t.data]),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=a,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},U=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"milliseconds",a=z.a.duration(t,e),n=a.hours()>1?a.hours()+"h":"",i=a.minutes()+":",o=a.seconds().toString();return i.length<3&&(i="0"+i),o.length<2&&(o="0"+o),n+i+o},K=a(49),R=a.n(K),H=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={audioSource:"",duration:"0:00",current:"0:00",paused:!0,volume:100,loop:!1,actMenuVisible:!1,extendVisible:!1},t.initAudio=function(){var e=new Blob([t.props.src.data]),a=URL.createObjectURL(e);t.setState({audioSource:a},(function(){var e=setInterval((function(){isNaN(t.audio.duration)||(clearInterval(e),t.audio.play(),t.setState({duration:Math.floor(t.audio.duration),paused:!1}))}),100);t.audio.removeEventListener("timeupdate",t.onTimeUpdate),t.audio.addEventListener("timeupdate",t.onTimeUpdate),t.progressBar.onmousedown=t.onDrageProgress,t.audio.addEventListener("ended",(function(){return t.onAudioEnd(0)}))}))},t.onTimeUpdate=function(){var e=t.state.current,a=Math.floor(t.audio.currentTime);a!==e&&t.setState({current:a})},t.onPlay=function(){t.audio.paused?t.audio.play():t.audio.pause(),t.setState({paused:t.audio.paused})},t.onVolumeChange=function(e){t.setState({volume:e},(function(){t.audio.volume=t.state.volume/100}))},t.onDrageProgress=function(e){e.preventDefault();var a=document.getElementById("progressBar").offsetWidth;t.audio.currentTime=t.audio.duration*e.offsetX/a,t.progressBar.onmousemove=function(e){t.audio.currentTime=t.audio.duration*e.offsetX/a},document.body.onmouseup=function(){t.progressBar.onmousemove=null,document.body.onmouseup=null}},t.onAudioEnd=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;t.audio.currentTime=0,t.state.loop?t.audio.play():(t.audio.pause(),t.setState({paused:!0}),t.props.onAudioEnd(e))},t.onDownload=function(){B(t.props.src,t.props.audioData.name+".mp3")},t}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.audio=document.getElementById("audioTag"),this.progressBar=document.getElementById("progressBar")}},{key:"componentDidUpdate",value:function(t,e,a){this.props.src!==t.src&&this.initAudio()}},{key:"render",value:function(){var t=this,e=this.state,a=e.paused,n=e.duration,o=e.current,r=e.volume,s=e.audioSource,c=e.actMenuVisible,l=e.extendVisible,u=i.a.createElement("div",{className:R.a.extend},i.a.createElement("div",{className:[R.a.info,"ellipsis"].join(" ")},"\u5f53\u524d\u64ad\u653e: ",this.props.audioData.name?"".concat(this.props.audioData.name," - ").concat(this.props.audioData.artist):"\u65e0"),i.a.createElement("div",{className:R.a.action},i.a.createElement(M.a,{className:"link",onClick:function(){return t.onAudioEnd(-1)}}),i.a.createElement(I.a,{className:"link",onClick:function(){return t.onAudioEnd(1)}}))),d=i.a.createElement(N.a,{onClick:function(e){"loopBtn"!==e.key&&t.setState({actMenuVisible:!1})}},i.a.createElement(N.a.Item,{key:"downloadBtn",disabled:!s,onClick:this.onDownload},"\u4e0b\u8f7d"),i.a.createElement(N.a.Item,{key:"loopBtn"},i.a.createElement(O.a,null,"\u5faa\u73af",i.a.createElement(D.a,{checkedChildren:"\u5f00",unCheckedChildren:"\u5173",onChange:function(e){return t.setState({loop:e})}})))),m=i.a.createElement("div",{className:R.a.volumePop},i.a.createElement(C.a,{className:R.a.slider,vertical:!0,value:r,onChange:this.onVolumeChange}));return i.a.createElement("div",{className:R.a.audioControl},i.a.createElement(L.a,{content:u,placement:"bottomLeft",onVisibleChange:function(e){return t.setState({extendVisible:e})}},i.a.createElement(O.a,{className:R.a.interface,style:{boxShadow:l?"0 0 5px #e5ce00":"none"}},i.a.createElement("audio",{id:"audioTag",src:s}),i.a.createElement("div",{className:R.a.item},i.a.createElement(_.a,{shape:"circle",onClick:this.onPlay,size:"small",disabled:!s,icon:a?i.a.createElement(j.a,null):i.a.createElement(P.a,null)})),i.a.createElement("div",{className:R.a.item},U(o,"seconds"),"/",U(n,"seconds")),i.a.createElement("div",{className:R.a.progressBar},i.a.createElement("div",{id:"progressBar",className:R.a.current},i.a.createElement("div",{id:"currentProgressBar",className:R.a.progress,style:{width:Math.round(100*o/n,0)+"%"||!1}}))),i.a.createElement("div",{className:R.a.item},i.a.createElement(L.a,{placement:"bottom",content:m},i.a.createElement(x.a,{style:{cursor:"pointer"}}))),i.a.createElement("div",{className:R.a.item},i.a.createElement(S.a,{overlay:d,visible:c,onVisibleChange:function(e){return t.setState({actMenuVisible:e})}},i.a.createElement(_.a,{size:"small"},"\u66f4\u591a"))))))}}]),a}(n.Component),V=(a(109),a(67)),J=function(){return{defaultCurrent:1,defaultPageSize:10,hideOnSinglePage:!1,current:1,pageSize:10,pageSizeOptions:["10","20","50","100"],showSizeChanger:!0,showTotal:function(t,e){return"\u5171".concat(t,"\u6761")},total:0}},Y=(a(94),a(50)),q=a(398),W=a(399),Q=a(400),X=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={btnList:t.props.btnList||["play","add","download"]},t}return Object(h.a)(a,[{key:"componentDidUpdate",value:function(t,e,a){this.props.btnList!==t.btnList&&this.setState({btnList:this.props.btnList||["play","add","download"]})}},{key:"render",value:function(){var t=this.state.btnList;return i.a.createElement("div",null,t.indexOf("play")>=0&&i.a.createElement(Y.a,{title:"\u64ad\u653e"},i.a.createElement(q.a,{className:"link",onClick:this.props.onPlay})),t.indexOf("add")>=0&&i.a.createElement(Y.a,{title:"\u52a0\u5165\u6b4c\u5355"},i.a.createElement(W.a,{className:"link",onClick:this.props.onAddList})),t.indexOf("download")>=0&&i.a.createElement(Y.a,{title:"\u4e0b\u8f7d"},i.a.createElement(Q.a,{className:"link",onClick:this.props.onDownload})))}}]),a}(n.Component),F=a(37),G=a.n(F),Z=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={loading:!1,musicList:[],keyword:"",type:"net",audio:"",pagination:J(),audioData:{}},t.onSearch=function(e,a){t.setState({keyword:e,type:a,pagination:Object(k.a)(Object(k.a)({},t.state.pagination),{},{current:1})},(function(){t.fetchMusicList()})),t.props.onUpdate()},t.onAlbumClick=function(e){t.props.onAlbum(e)},t.onArtistClick=function(e){t.props.onArtist(e)},t.onPlay=function(e){t.props.onPlay(e.id,e)},t.onAddList=function(e){t.props.onAddList(e)},t.onDownload=function(e){t.props.onDownload(e.id,e)},t.fetchMusicList=function(){var e=t.state,a=e.pagination,n=e.keyword,i=e.type,o=a.pageSize,r=a.current;t.setState({loading:!0}),E.a.get("/search",{params:{source:i,keyword:n,limit:o,page:r}}).then((function(e){t.setState({loading:!1}),e.data.success?t.setState({musicList:e.data.songs,pagination:Object(k.a)(Object(k.a)({},a),{},{total:e.data.total})}):w.a.error({message:"\u7f51\u7edc\u9519\u8bef \u83b7\u53d6\u5931\u8d25",duration:null})}))},t}return Object(h.a)(a,[{key:"componentDidUpdate",value:function(t,e,a){this.props.searchMusic!==t.searchMusic&&this.props.searchMusic&&this.onSearch(this.props.searchMusic.searchKey,this.props.searchMusic.searchType)}},{key:"render",value:function(){var t=this,e=this.props.loading||this.state.loading,a=[{title:"\u6b4c\u66f2\u540d",dataIndex:"name",key:"name"},{title:"\u65f6\u957f",dataIndex:"duration",key:"duration",width:75,render:function(t){return i.a.createElement("div",null,U(t))}},{title:"\u6b4c\u624b",dataIndex:"artist",key:"artist",render:function(e,a){return i.a.createElement("span",{className:"link",onClick:function(){return t.onArtistClick(a)}},a.artist)}},{title:"\u4e13\u8f91",dataIndex:"album",key:"album",render:function(e,a){return i.a.createElement("span",{className:"link",onClick:function(){return t.onAlbumClick(a)}},"\u300a",a.album,"\u300b")}},{title:"\u64cd\u4f5c",dataIndex:"id",key:"action",width:150,render:function(e,a){return i.a.createElement(X,{onPlay:function(){t.onPlay(a)},onAddList:function(){t.onAddList(a)},onDownload:function(){return t.onDownload(a)}})}}];return i.a.createElement("div",{className:G.a.table},i.a.createElement(V.a,{dataSource:this.state.musicList,loading:e,pagination:this.state.pagination,onChange:function(e){t.setState({pagination:Object(k.a)(Object(k.a)({},t.state.pagination),{},{current:e.current,pageSize:e.pageSize})},(function(){t.fetchMusicList()}))},scroll:{y:window.innerHeight-268},size:"small",columns:a,rowKey:"id"}))}}]),a}(n.Component),$=Object(s.b)((function(t){return t}))(Z),tt=a(401),et=(a(163),a(120)),at=(a(127),a(63)),nt=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={loading:!0,imageErr:!1},t}return Object(h.a)(a,[{key:"componentDidUpdate",value:function(t,e,a){this.props.src!==t.src&&this.setState({loading:!0,imageErr:!1})}},{key:"render",value:function(){var t=this,e=this.state,a=e.loading,n=e.imageErr;return i.a.createElement("div",{style:{minHeight:this.props.minHeight||0,minWidth:this.props.minWIdth||0}},i.a.createElement(et.a,{style:{width:"100%",minHeight:this.props.minHeight||0},spinning:a},!1===n&&i.a.createElement("img",{src:this.props.src,alt:this.props.alt||"logo",style:{opacity:a?"0":"1",width:"100%"},onLoad:function(){t.setState({loading:!1})},onError:function(){return t.setState({imageErr:!0,loading:!1})},onDragStart:function(t){return t.preventDefault()}}),!0===n&&i.a.createElement(at.a,null)))}}]),a}(n.Component),it=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={loading:!1,pagination:J(),musicList:[],albumInfo:{}},t.onPlay=function(e){t.props.onPlay(e.id,e)},t.onAddList=function(e){t.props.onAddList(e)},t.onAddAlbum=function(){t.props.onAddAlbum(t.state.musicList)},t.onDownload=function(e){t.props.onDownload(e.id,e)},t.onArtistClick=function(e){t.props.onArtist(e)},t.fetchAlbumDetail=function(){t.setState({loading:!0,albumInfo:{}}),E.a.get("/albumMusic",{params:{id:t.props.album.albumId,source:t.props.album.source}}).then((function(e){t.setState({loading:!1}),e.data.success?t.setState({musicList:e.data.songs,albumInfo:e.data.album}):w.a.error({message:"\u7f51\u7edc\u9519\u8bef \u83b7\u53d6\u5931\u8d25",duration:null})}))},t}return Object(h.a)(a,[{key:"componentDidUpdate",value:function(t,e,a){this.props.album.albumId!==t.album.albumId&&this.fetchAlbumDetail()}},{key:"render",value:function(){var t=this,e=this.props.loading||this.state.loading,a=this.state.albumInfo,n=[{title:"\u6b4c\u66f2\u540d",dataIndex:"name",key:"name"},{title:"\u65f6\u957f",dataIndex:"duration",key:"duration",width:75,render:function(t){return i.a.createElement("div",null,U(t))}},{title:"\u6b4c\u624b",dataIndex:"artist",key:"artist",render:function(e,a){return i.a.createElement("span",{className:"link",onClick:function(){return t.onArtistClick(a)}},a.artist)}},{title:"\u64cd\u4f5c",dataIndex:"id",key:"action",width:150,render:function(e,a){return i.a.createElement(X,{onPlay:function(){t.onPlay(a)},onAddList:function(){t.onAddList(a)},onDownload:function(){return t.onDownload(a)}})}}];return i.a.createElement("div",{className:G.a.album},this.props.album.albumId&&i.a.createElement("div",{className:G.a.info},i.a.createElement(nt,{minHeight:100,src:a.img}),i.a.createElement("div",{className:G.a.emphasize},"\u300a",a.name,"\u300b"),i.a.createElement("div",null,"\u6b4c\u624b: ",a.artist),i.a.createElement("div",null,"\u516c\u53f8: ",a.company),i.a.createElement("div",null,"\u53d1\u884c\u65f6\u95f4: ",z()(a.publishTime).format("YYYY-MM-DD")),i.a.createElement(L.a,{content:i.a.createElement(Y.a,{title:"\u6dfb\u52a0\u4e13\u8f91\u4e2d\u7684\u6b4c\u66f2\u5230\u6b4c\u5355"},i.a.createElement(W.a,{className:"link",onClick:this.onAddAlbum}))},i.a.createElement(tt.a,{className:"link"}))),i.a.createElement(V.a,{dataSource:this.state.musicList,loading:e,pagination:this.state.pagination,onChange:function(e){t.setState({pagination:Object(k.a)(Object(k.a)({},t.state.pagination),{},{current:e.current,pageSize:e.pageSize})})},scroll:{y:window.innerHeight-268},size:"small",columns:n,rowKey:"id"}))}}]),a}(n.Component),ot=A.a.TabPane,rt=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={loading:!1,pagination:J(),hotList:[],albumList:[],artistInfo:{}},t.onPlay=function(e){t.props.onPlay(e.id,e)},t.onAddList=function(e){t.props.onAddList(e)},t.onDownload=function(e){t.props.onDownload(e.id,e)},t.onAlbumClick=function(e){t.props.onAlbum(e)},t.fetchArtistDetail=function(){t.setState({loading:!0,artistInfo:{}}),E.a.get("/artistMusic",{params:{id:t.props.artist.artistId,source:t.props.artist.source}}).then((function(e){t.setState({loading:!1}),e.data.success?t.setState({hotList:e.data.songs,artistInfo:e.data.artist}):w.a.error({message:"\u7f51\u7edc\u9519\u8bef \u83b7\u53d6\u6b4c\u624b\u4fe1\u606f\u5931\u8d25",duration:null})}))},t.fetchArtistAlbum=function(){var e=t.state.pagination,a=e.pageSize,n=e.current;t.setState({loading:!0}),E.a.get("/artistAlbum",{params:{id:t.props.artist.artistId,limit:a,page:n,source:t.props.artist.source}}).then((function(a){t.setState({loading:!1}),a.data.success?t.setState({albumList:a.data.albums,pagination:Object(k.a)(Object(k.a)({},e),{},{total:a.data.albumSize})}):w.a.error({message:"\u7f51\u7edc\u9519\u8bef \u83b7\u53d6\u6b4c\u624b\u4e13\u8f91\u5931\u8d25",duration:null})}))},t}return Object(h.a)(a,[{key:"componentDidUpdate",value:function(t,e,a){this.props.artist.artistId!==t.artist.artistId&&(this.fetchArtistDetail(),this.fetchArtistAlbum())}},{key:"render",value:function(){var t=this,e=this.props.loading||this.state.loading,a=this.state.artistInfo,n=[{title:"\u6b4c\u66f2\u540d",dataIndex:"name",key:"name"},{title:"\u65f6\u957f",dataIndex:"duration",key:"duration",width:75,render:function(t){return i.a.createElement("div",null,U(t))}},{title:"\u4e13\u8f91",dataIndex:"album",key:"album",render:function(e,a){return i.a.createElement("span",{className:"link",onClick:function(){return t.onAlbumClick(a)}},"\u300a",a.album,"\u300b")}},{title:"\u64cd\u4f5c",dataIndex:"id",key:"action",width:150,render:function(e,a){return i.a.createElement(X,{onPlay:function(){t.onPlay(a)},onAddList:function(){t.onAddList(a)},onDownload:function(){return t.onDownload(a)}})}}],o=[{title:"\u4e13\u8f91\u540d",dataIndex:"album",key:"album",render:function(e,a){return i.a.createElement("span",{className:"link",onClick:function(){return t.onAlbumClick(a)}},"\u300a",e,"\u300b")}},{title:"\u53d1\u884c\u65e5\u671f",dataIndex:"publishTime",key:"publishTime",render:function(t){return z()(t).format("YYYY-MM-DD")}},{title:"\u516c\u53f8",dataIndex:"company",key:"company"},{title:"\u6b4c\u66f2\u6570\u91cf",dataIndex:"size",key:"size"}];return i.a.createElement("div",{className:G.a.album},this.props.artist.artistId&&i.a.createElement("div",{className:G.a.info},i.a.createElement(nt,{minHeight:100,src:a.img}),i.a.createElement("div",{className:G.a.emphasize},a.name)),i.a.createElement(A.a,{type:"card",tabPosition:"left",size:"small"},i.a.createElement(ot,{tab:"Top50",key:"music"},i.a.createElement(V.a,{dataSource:this.state.hotList,loading:e,pagination:!1,scroll:{y:window.innerHeight-268},size:"small",columns:n,rowKey:"id"})),i.a.createElement(ot,{tab:"\u4e13\u8f91",key:"album"},i.a.createElement(V.a,{dataSource:this.state.albumList,loading:e,pagination:this.state.pagination,onChange:function(e){t.setState({pagination:Object(k.a)(Object(k.a)({},t.state.pagination),{},{current:e.current,pageSize:e.pageSize})},(function(){t.fetchArtistAlbum()}))},size:"small",scroll:{y:window.innerHeight-268},columns:o,rowKey:"albumId"}))))}}]),a}(n.Component),st=a(402),ct=a(403),lt=A.a.TabPane,ut=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={loading:!1,editMod:!1,listType:"customList"},t.onRemove=function(e){var a=t.state.listType;t.props.onUpdate(a,"remove",e)},t.onPlay=function(e){t.props.onPlay(e.id,e,t.state.listType)},t.onAddList=function(e){t.props.onAddList(e)},t.onDownload=function(e){t.props.onDownload(e.id,e)},t.onArtistClick=function(e){t.props.onArtist(e)},t.onModChange=function(e){t.props.onModChange(e)},t}return Object(h.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(t,e,a){}},{key:"render",value:function(){var t=this,e=this.props,a=e.customList,n=e.recentList,o=e.currentType,r=e.audioData,s=this.state,c=s.editMod,l=s.listType,u=this.props.loading||this.state.loading,d=[{title:"",dataIndex:"name",key:"remove",width:30,render:function(e,a){return i.a.createElement("div",null,c?i.a.createElement(st.a,{className:"link",onClick:function(){return t.onRemove([a])}}):"")}},{title:"",dataIndex:"name",key:"playing",width:30,render:function(t,e){return i.a.createElement("div",null,l===o&&e.id===r.id&&i.a.createElement(ct.a,{spin:!0,className:G.a.tableColIcon}))}},{title:"\u6b4c\u66f2\u540d",dataIndex:"name",key:"name"},{title:"\u65f6\u957f",dataIndex:"duration",key:"duration",width:75,render:function(t){return i.a.createElement("div",null,U(t))}},{title:"\u6b4c\u624b",dataIndex:"artist",key:"artist",render:function(e,a){return i.a.createElement("span",{className:"link",onClick:function(){return t.onArtistClick(a)}},a.artist)}},{title:"\u64cd\u4f5c",dataIndex:"id",key:"action",width:150,render:function(e,a){return i.a.createElement(X,{btnList:"customList"===l?["play","download"]:["play","add","download"],onPlay:function(){t.onPlay(a)},onAddList:function(){t.onAddList(a)},onDownload:function(){return t.onDownload(a)}})}}];return i.a.createElement("div",null,i.a.createElement("div",{className:G.a.header},i.a.createElement("div",{className:G.a.item},i.a.createElement("div",{className:G.a.text},"\u7f16\u8f91"),i.a.createElement(D.a,{size:"middle",onChange:function(e){return t.setState({editMod:e})}})),i.a.createElement("div",{className:G.a.item},i.a.createElement("div",{className:G.a.text},"\u5217\u8868\u64ad\u653e"),i.a.createElement(D.a,{size:"middle",onChange:function(e){return t.onModChange(e?"list":"solo")}}))),i.a.createElement(A.a,{type:"card",tabPosition:"left",size:"small",activeKey:this.state.listType,onChange:function(e){return t.setState({listType:e})}},i.a.createElement(lt,{tab:"\u6b4c\u5355",key:"customList"},i.a.createElement(V.a,{dataSource:a,loading:u,rowClassName:function(t){return l===o&&t.id===r.id?"highlightRow":""},scroll:{y:window.innerHeight-268},size:"small",columns:d,rowKey:"id"})),i.a.createElement(lt,{tab:"\u6700\u8fd1\u64ad\u653e",key:"recentList"},i.a.createElement(V.a,{dataSource:n,loading:u,rowClassName:function(t){return l===o&&t.id===r.id?"highlightRow":""},scroll:{y:window.innerHeight-268},size:"small",columns:d,rowKey:"id"}))))}}]),a}(n.Component),dt=A.a.TabPane,mt=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={tab:"music",loading:!1,audioSrc:"",audioData:{},album:{},artist:{},recentList:[],customList:[],currentPlayList:"recentList",playMod:"soloSingle",playingList:[]},t.updatePlayList=function(e,a,n){var i=JSON.parse(window.localStorage.getItem(e))||[],o={};n.forEach((function(t){var e=-1;switch(i.forEach((function(a,n){a.id===t.id&&(e=n)})),a){case"remove":e>=0&&i.splice(e,1);break;case"add":-1===e&&i.push(t);break;case"toTop":e>=0&&i.splice(e,1),i.splice(0,0,t)}})),window.localStorage.setItem(e,JSON.stringify(i)),o[e]=i,t.setState(Object(k.a)({},o))},t.onAlbum=function(e){t.setState({tab:"album",album:e})},t.onArtist=function(e){t.setState({tab:"artist",artist:e})},t.onPlay=function(e,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"recentList";t.updatePlayList("recentList","toTop",[a]),t.setState({currentPlayList:n}),t.fetchPlay(e,a)},t.onAddList=function(e){var a=t.state.customList,n=-1;a.forEach((function(t,a){t.id===e.id&&(n=a)})),n>=0?w.a.warning({message:"\u6b4c\u66f2\u5df2\u5728\u6b4c\u5355\u4e2d",duration:4}):(t.updatePlayList("customList","add",[e]),w.a.success({message:"\u6dfb\u52a0\u6210\u529f",duration:4}))},t.onAddAlbum=function(e){t.updatePlayList("customList","add",e),w.a.success({message:"\u6dfb\u52a0\u6210\u529f",duration:4})},t.onAudioEnd=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if("list"===t.state.playMod||0!==e){var a=JSON.parse(window.localStorage.getItem(t.state.currentPlayList))||[],n=-1;if(a.forEach((function(e,a){e.id===t.state.audioData.id&&(n=a)})),n>=0){(n+=e>=0?1:-1)>=a.length&&(n=0),n<0&&(n=Math.max(a.length-1,0));var i=a[n];i&&t.fetchPlay(i.id,i)}}},t.fetchPlay=function(e,a){t.setState({loading:!0,audioData:a}),E.a.get("/download",{params:{id:e,source:a.source},responseType:"blob"}).then((function(e){t.setState({loading:!1}),e.data.size>17?t.setState({audioSrc:e}):w.a.error({message:"\u7f51\u7edc\u9519\u8bef \u83b7\u53d6\u5931\u8d25",duration:null})}))},t.fetchDownload=function(e,a){t.setState({loading:!0}),E.a.get("/download",{params:{id:e,source:a.source},responseType:"blob"}).then((function(e){t.setState({loading:!1}),e.data.size>17?B(e,a.name+".mp3"):w.a.error({message:"\u7f51\u7edc\u9519\u8bef \u83b7\u53d6\u5931\u8d25",duration:null})}))},t}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.setState({recentList:JSON.parse(window.localStorage.getItem("recentList"))||[],customList:JSON.parse(window.localStorage.getItem("customList"))||[]})}},{key:"render",value:function(){var t=this,e=this.state,a=e.loading,n=e.playMod,o=e.recentList,r=e.customList,s=e.audioData,c=e.currentPlayList,l=i.a.createElement(H,{src:this.state.audioSrc,audioData:s,playMod:n,onAudioEnd:this.onAudioEnd});return i.a.createElement("div",{className:G.a.music},i.a.createElement(A.a,{activeKey:this.state.tab,tabBarExtraContent:l,onChange:function(e){return t.setState({tab:e})}},i.a.createElement(dt,{tab:"\u6b4c\u66f2",key:"music",forceRender:!0},i.a.createElement($,{loading:a,onUpdate:function(){return t.setState({tab:"music"})},onPlay:this.onPlay,onAddList:this.onAddList,onDownload:this.fetchDownload,onAlbum:this.onAlbum,onArtist:this.onArtist})),i.a.createElement(dt,{tab:"\u4e13\u8f91",key:"album",forceRender:!0},i.a.createElement(it,{loading:a,album:this.state.album,onPlay:this.onPlay,onAddList:this.onAddList,onDownload:this.fetchDownload,onArtist:this.onArtist,onAddAlbum:this.onAddAlbum})),i.a.createElement(dt,{tab:"\u6b4c\u624b",key:"artist",forceRender:!0},i.a.createElement(rt,{loading:a,artist:this.state.artist,onPlay:this.onPlay,onAddList:this.onAddList,onDownload:this.fetchDownload,onAlbum:this.onAlbum})),i.a.createElement(dt,{tab:"\u64ad\u653e\u5217\u8868",key:"play",forceRender:!0},i.a.createElement(ut,{loading:a,recentList:o,customList:r,currentType:c,audioData:s,onPlay:this.onPlay,onAddList:this.onAddList,onDownload:this.fetchDownload,onArtist:this.onArtist,onUpdate:this.updatePlayList,onModChange:function(e){return t.setState({playMod:e})}}))))}}]),a}(n.Component),pt=a(73),ht=a.n(pt),ft=b.a.Search,gt=y.a.Option,yt=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).state={keyword:"",searchType:"net"},t.onTest=function(){E.a.get("/test").then((function(t){console.log(t)}))},t.onSearch=function(){var e=t.state,a=e.keyword,n=e.searchType;t.props.dispatch(l(a,n))},t}return Object(h.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var t=this;return i.a.createElement("div",{className:ht.a.main},i.a.createElement("div",{className:ht.a.topBar},i.a.createElement("div",{className:ht.a.content},i.a.createElement("div",{className:ht.a.left},i.a.createElement("div",{className:ht.a.title},"AEON"),i.a.createElement(y.a,{defaultValue:"net",onChange:function(e){return t.setState({searchType:e})},className:ht.a.select},i.a.createElement(gt,{value:"net"},"\u7f51\u6613\u4e91"),i.a.createElement(gt,{value:"qq"},"qq\u97f3\u4e50")),i.a.createElement(ft,{onSearch:this.onSearch,value:this.state.keyword,onChange:function(e){return t.setState({keyword:e.target.value})}})))),i.a.createElement("div",{className:ht.a.container},i.a.createElement("div",{className:ht.a.content},i.a.createElement(mt,null))))}}]),a}(n.Component),bt=Object(s.b)((function(t){return t}))(yt),vt=a(191),Et=a(33);a(390);var wt=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(vt.a,null,i.a.createElement(Et.c,null,i.a.createElement(Et.a,{exact:!0,path:["/"],component:bt}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var kt=Object(c.c)(m);r.a.render(i.a.createElement(s.a,{store:kt},i.a.createElement(wt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},49:function(t,e,a){t.exports={audioControl:"AudioControl_audioControl__3PBFB",interface:"AudioControl_interface__1yWJv",progressBar:"AudioControl_progressBar__1aRaD",current:"AudioControl_current__3wQJK",progress:"AudioControl_progress__1eppT",item:"AudioControl_item__14sVw",extend:"AudioControl_extend__FOHUT",info:"AudioControl_info__1467a",action:"AudioControl_action__20Qtg",volumePop:"AudioControl_volumePop__3QILr",slider:"AudioControl_slider__35dJX"}},73:function(t,e,a){t.exports={main:"Main_main__QTuXY",topBar:"Main_topBar__2JKae",content:"Main_content__22KMh",left:"Main_left__xU9bH",select:"Main_select__2CJHC",title:"Main_title__3cw8a",container:"Main_container__1fmOv"}}},[[195,1,2]]]);
//# sourceMappingURL=main.e27ac3d8.chunk.js.map