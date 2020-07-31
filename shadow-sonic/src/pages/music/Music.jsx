import React, {Component} from 'react';
import Axios from 'axios';
import AudioControl from "./AudioControl";
import MusicList from "./MusicList";
import AlbumList from "./AlbumList";
import ArtistList from "./ArtistList";
import { notification, Tabs } from 'antd';
import { DownloadBlob } from "@/utils";
import style from './Music.module.scss';

const { TabPane } = Tabs;

export default class Music extends Component{
    state = {
        tab: 'music',
        loading: false,
        audio: '',
        audioData: {},
        album: {},
        artist: {},
        recentList: [],
    };

    componentDidMount(){
        this.setState({
            recentList: window.localStorage.getItem('recentList') || []
        })
    }

    updateRecentList = (record) => {
        const { recentList } = this.state;
        recentList.push(record);
        if (recentList.length > 50){
            recentList.shift();
        }
        this.setState({recentList}, () => {
            window.localStorage.setItem('recentList', recentList)
        })
    }

    onAlbum = (album) => {
        this.setState({tab: 'album', album: album});
    };

    onArtist = (artist) => {
        this.setState({tab: 'artist', artist: artist})
    }

    onPlay = (id, record) => {
        this.updateRecentList(record);
        this.fetchPlay(id, record);
    }

    fetchPlay = (id, record) => {
        this.setState({loading: true, audioData: record});
        Axios.get('/download', {
            params: {id: id, source: record.source},
            responseType: 'blob'
        }).then(res => {
            this.setState({loading: false});
            if (res.data.size > 17){
                this.setState({audio: res})
            } else {
                notification.error({message: '网络错误 获取失败', duration: null})
            }
        })
    };

    fetchDownload = (id, record) => {
        this.setState({loading: true});
        Axios.get('/download', {
            params: {id: id, source: record.source},
            responseType: 'blob'
        }).then(res => {
            this.setState({loading: false});
            if (res.data.size > 17){
                DownloadBlob(res, record.name+'.mp3');
            } else {
                notification.error({message: '网络错误 获取失败', duration: null})
            }
        })
    };

    render() {
        const { loading } = this.state;
        const TabExtra = (
            <AudioControl src={this.state.audio} audioData={this.state.audioData}/>
        );
        return (
            <div className={style.music}>
                <Tabs activeKey={this.state.tab} tabBarExtraContent={TabExtra} 
                        onChange={(v)=>this.setState({tab: v})}>
                    <TabPane tab="歌曲" key="music" forceRender>
                        <MusicList loading={loading}
                                   onUpdate={()=>this.setState({tab: 'music'})}
                                   onPlay={this.onPlay} onDownload={this.fetchDownload} 
                                   onAlbum={this.onAlbum} onArtist={this.onArtist}/>
                    </TabPane>
                    <TabPane tab="专辑" key="album" forceRender>
                        <AlbumList loading={loading}
                                   album={this.state.album}
                                   onPlay={this.onPlay}
                                   onDownload={this.fetchDownload} onArtist={this.onArtist}/>
                    </TabPane>
                    <TabPane tab="歌手" key="artist" forceRender>
                        <ArtistList loading={loading} 
                                    artist={this.state.artist}
                                    onPlay={this.onPlay} onDownload={this.fetchDownload}
                                    onAlbum={this.onAlbum}/>
                    </TabPane>
                    <TabPane tab="播放列表" key="play" forceRender>
                        播放列表
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
