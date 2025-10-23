import React, {Component} from 'react';
import Axios from 'axios';
import AudioControl from "./AudioControl";
import MusicList from "./MusicList";
import AlbumList from "./AlbumList";
import ArtistList from "./ArtistList";
import PlayList from "./PlayList";
import { notification, Tabs } from 'antd';
import { DownloadBlob } from "@/utils";
import style from './Music.module.scss';

const { TabPane } = Tabs;

export default class Music extends Component{
    state = {
        tab: 'music',
        loading: false,
        audioSrc: '',
        audioData: {},
        album: {},
        artist: {},
        recentList: [],
        customList: [],
        currentPlayList: 'recentList',
        playMod: 'soloSingle',
        playingList: [],
    };

    componentDidMount(){
        this.setState({
            recentList: JSON.parse(window.localStorage.getItem('recentList')) || [],
            customList: JSON.parse(window.localStorage.getItem('customList')) || [],
        })
    }

    updatePlayList = (listType, action, records, num=0, maxLength=-1) => {
        let list = JSON.parse(window.localStorage.getItem(listType)) || [];
        let result = {};
        records.forEach(record => {
            let index = -1;
            list.forEach((item, i) => {
                if (item.id === record.id){
                    index = i;
                }
            });
            switch (action) {
                case 'remove':
                    if (index >= 0){list.splice(index, 1)}
                    break;
                case 'add':
                    if (index === -1){list.push(record)}
                    break;
                case 'toTop':
                    if (index >= 0){
                        list.splice(index, 1)
                    }
                    list.splice(0, 0, record);
                    break;
                case 'move':
                    if (index >= 0){
                        list.splice(index, 1)
                        list.splice(index + num, 0, record);
                    }
                    break;
                default:
                    break;
            }
        });
        if (maxLength >= 0 && list.length > 0){
            while(list.length > maxLength){
                list.pop();
            }
        }
        window.localStorage.setItem(listType, JSON.stringify(list));
        result[listType] = list;
        this.setState({...result})
    };

    onAlbum = (album) => {
        this.setState({tab: 'album', album: album});
    };

    onArtist = (artist) => {
        this.setState({tab: 'artist', artist: artist})
    };

    onPlay = (id, record, listType='recentList') => {
        this.updatePlayList('recentList', 'toTop', [record], 0, 50);
        this.setState({currentPlayList: listType});
        this.fetchPlay(id, record);
    };

    onAddList = (record) => {
        const { customList } = this.state;
        let index = -1;
        customList.forEach((item, i) => {
            if (item.id === record.id){index = i}
        });
        if (index >= 0){
            notification.warning({message: '歌曲已在歌单中', duration: 4})
        } else {
            this.updatePlayList('customList', 'add', [record]);
            notification.success({message: '添加成功', duration: 4});
        }
    };

    onAddAlbum = (records) => {
        this.updatePlayList('customList', 'add', records);
        notification.success({message: '添加成功', duration: 4})
    };

    onAudioEnd = (next=0) => {
        if (this.state.playMod === 'list' || next !== 0){
            let list = JSON.parse(window.localStorage.getItem(this.state.currentPlayList)) || [];
            let index = -1;
            list.forEach((item, i) => {
                if (item.id === this.state.audioData.id){index = i}
            });
            if (index >= 0){
                index += next >= 0 ? 1 : -1;
                if (index >= list.length){index = 0}
                if (index < 0){index = Math.max(list.length - 1, 0)}
                let record = list[index];
                if (record){this.fetchPlay(record.id, record)}
            }
        }
    };

    fetchPlay = (id, record) => {
        this.setState({loading: true, audioData: record, audioSrc: ''});
        Axios.get('/download', {
            params: {id: id, source: record.source},
            responseType: 'blob'
        }).then(res => {
            this.setState({loading: false});
            if (res.data.size > 17){
                this.setState({audioSrc: res})
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
                let suffix = record.source === 'qq' ? '.m4a' : '.mp3';
                DownloadBlob(res, record.name+suffix);
            } else {
                notification.error({message: '网络错误 获取失败', duration: null})
            }
        })
    };

    render() {
        const { loading, playMod, recentList, customList, audioData, currentPlayList } = this.state;
        const TabExtra = (
            <AudioControl src={this.state.audioSrc} audioData={audioData} playMod={playMod}
                          onAudioEnd={this.onAudioEnd}/>
        );
        return (
            <div className={style.music}>
                <Tabs activeKey={this.state.tab} tabBarExtraContent={TabExtra}
                        onChange={(v)=>this.setState({tab: v})}>
                    <TabPane tab="歌曲" key="music" forceRender>
                        <MusicList loading={loading}
                                   onUpdate={()=>this.setState({tab: 'music'})}
                                   onPlay={this.onPlay} onAddList={this.onAddList} onDownload={this.fetchDownload}
                                   onAlbum={this.onAlbum} onArtist={this.onArtist}/>
                    </TabPane>
                    <TabPane tab="专辑" key="album" forceRender>
                        <AlbumList loading={loading}
                                   album={this.state.album}
                                   onPlay={this.onPlay} onAddList={this.onAddList} onDownload={this.fetchDownload}
                                   onArtist={this.onArtist} onAddAlbum={this.onAddAlbum}/>
                    </TabPane>
                    <TabPane tab="歌手" key="artist" forceRender>
                        <ArtistList loading={loading} 
                                    artist={this.state.artist}
                                    onPlay={this.onPlay} onAddList={this.onAddList} onDownload={this.fetchDownload}
                                    onAlbum={this.onAlbum}/>
                    </TabPane>
                    <TabPane tab="播放列表" key="play" forceRender>
                        <PlayList loading={loading}
                                  recentList={recentList}
                                  customList={customList}
                                  currentType={currentPlayList} audioData={audioData}
                                  onPlay={this.onPlay} onAddList={this.onAddList} onDownload={this.fetchDownload}
                                  onArtist={this.onArtist} onUpdate={this.updatePlayList}
                                  onModChange={(v)=>this.setState({playMod: v})}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
