import React, {Component} from 'react';
import Axios from 'axios';
import AudioControl from "./AudioControl";
import MusicList from "./MusicList";
import AlbumList from "./AlbumList";
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
        albumId: '',
    };

    onAlbum = (id) => {
        this.setState({tab: 'album', albumId: id});
    };

    fetchPlay = (id, record) => {
        this.setState({loading: true, audioData: record});
        Axios.get('/download', {
            params: {id: id},
            responseType: 'blob'
        }).then(res => {
            this.setState({loading: false});
            if (res.data.size){
                this.setState({audio: res})
            } else {
                notification.error({message: '网络错误 获取失败', duration: null})
            }
        })
    };

    fetchDownload = (id, name) => {
        this.setState({loading: true});
        Axios.get('/download', {
            params: {id: id},
            responseType: 'blob'
        }).then(res => {
            this.setState({loading: false});
            if (res.data.size){
                DownloadBlob(res, name+'.mp3');
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
                <Tabs activeKey={this.state.tab} tabBarExtraContent={TabExtra} onChange={(v)=>this.setState({tab: v})}>
                    <TabPane tab="歌曲" key="music" forceRender>
                        <MusicList loading={loading}
                                   onPlay={this.fetchPlay} onDownload={this.fetchDownload} onAlbum={this.onAlbum}/>
                    </TabPane>
                    <TabPane tab="专辑" key="album" forceRender>
                        <AlbumList loading={loading}
                                   albumId={this.state.albumId}
                                   onPlay={this.fetchPlay}
                                   onDownload={this.fetchDownload} />
                    </TabPane>
                    <TabPane tab="作者" key="artist" forceRender>
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}