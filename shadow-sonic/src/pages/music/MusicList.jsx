import React, {Component} from 'react';
import Axios from 'axios';
import Pagination from '@/settings/Pagination';
import AudioControl from "./AudioControl";
import { Button, Input, Table, notification } from 'antd';
import { DownloadBlob, GetDuration } from "@/utils";
import style from './MusicList.module.scss';

const { Search } = Input;

export default class MusicList extends Component{
    state = {
        musicList: [],
        loading: false,
        keyword: '',
        pagination: Pagination(),
        audio: '',
        audioData: {},
    };

    onSearch = (keyword) => {
        this.setState({keyword: keyword}, () => {
            this.fetchMusicList();
        })
    }

    onAlbumClick = (id) => {

    }

    fetchMusicList = () => {
        const { pagination, keyword } = this.state;
        let limit = pagination.pageSize;
        let offset = (pagination.current - 1) * limit;
        this.setState({loading: true})
        Axios.get('/search', {params: {keyword: keyword, limit: limit, offset: offset}})
            .then(res => { 
                this.setState({loading: false})
                if (res.data.success){
                    this.setState({
                        musicList: res.data.result.songs,
                        pagination: {...this.state.pagination, total: res.data.result.songCount},
                    })
                } else {
                    notification.error({message: '网络错误 获取失败', duration: null})
                }
            })
    };

    fetchMusicByAlbum = () => {

    }

    fetchPlay = (id) => {
        this.setState({loading: true})
        Axios.get('/download', {
            params: {id: id},
            responseType: 'blob'
        }).then(res => { 
            this.setState({loading: false})
            if (res.data.size){
                this.setState({audio: res})
            } else {
                notification.error({message: '网络错误 获取失败', duration: null})
            }
        })
    };

    fetchDownload = (id, name) => {
        this.setState({loading: true})
        Axios.get('/download', {
            params: {id: id},
            responseType: 'blob'
        }).then(res => { 
            this.setState({loading: false})
            if (res.data.size){
                DownloadBlob(res, name+'.mp3');
            } else {
                notification.error({message: '网络错误 获取失败', duration: null})
            }
        })
    };

    render() {
        const columns = [
            {title: '标题', dataIndex: 'name', key: 'name'},
            {title: '时长', dataIndex: 'duration', key: 'duration', width: 75, render: (text) => (<div>{GetDuration(text)}</div>)},
            {title: '作者', dataIndex: 'artist', key: 'artist', render: (text, record) => (<div>{record.artists[0].name}</div>)},
            {title: '专辑', dataIndex: 'album', key: 'album', 
                render: (text, record) => (<div onClick={()=>this.onAlbumClick(record.album.id)}>《{record.album.name}》</div>)},
            {title: '操作', dataIndex: 'id', key: 'action', width: 150,
                render: (text, record) => (
                    <div>
                        <Button type='link' 
                                onClick={()=>{this.fetchPlay(record.id); this.setState({audioData: record})}}>
                                播放
                        </Button>
                        <Button type='link' onClick={()=>this.fetchDownload(record.id, record.name)}>下载</Button>
                    </div>
                )},
        ];
        return (
            <div className={style.musicList}>
                <div className={style.header}>
                    <Search className={style.input} onSearch={this.onSearch}/>
                    <div className={style.player}>
                        <AudioControl src={this.state.audio} audioData={this.state.audioData}/>
                    </div>
                </div>
                <div className={style.table}>
                    <Table dataSource={this.state.musicList}
                    id='musicListTable'
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    onChange={(pagination) => {
                        this.setState({
                            pagination: {
                                ...this.state.pagination, 
                                current: pagination.current, 
                                pageSize: pagination.pageSize
                            }
                        }, () => {this.fetchMusicList()})
                    }}
                    scroll={{y:window.innerHeight-268}}
                    size='middle'
                    columns={columns} rowKey='id'/>
                </div>
            </div>
        )
    }
}