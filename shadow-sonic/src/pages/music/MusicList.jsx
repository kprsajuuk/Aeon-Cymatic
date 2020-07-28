import React, {Component} from 'react';
import Axios from 'axios';
import moment from 'moment';
import Pagination from '@/settings/Pagination';
import { Button, Input, Table } from 'antd';
import { DownloadBlob } from "@/utils";
import style from './MusicList.module.scss';

const { Search } = Input;

export default class MusicList extends Component{
    state = {
        musicList: [],
        loading: false,
        keyword: '',
        pagination: Pagination(),
        audio: '',
    };

    getDuration = (str) => {
        let duration = moment.duration(str);
        let hour = duration.hours() > 1 ? duration.hours() + 'h' : '';
        let minute = duration.minutes() + ':';
        let second = duration.seconds().toString();
        if (minute.length < 3){minute = '0' + minute}
        if (second.length < 2){second = '0' + second}
        return hour + minute + second;
    };

    onSearch = (keyword) => {
        console.log(window.innerHeight);
        console.log(window.innerHeight-152);
        this.setState({keyword: keyword}, () => {
            this.fetchMusicList();
        })
    }

    fetchMusicList = () => {
        const { pagination, keyword } = this.state;
        let limit = pagination.pageSize;
        let offset = (pagination.current - 1) * limit;
        this.setState({loading: true})
        Axios.get('/search', {params: {keyword: keyword, limit: limit, offset: offset}})
            .then(res => {
                this.setState({
                    musicList: res.data.result.songs,
                    pagination: {...this.state.pagination, total: res.data.result.songCount},
                    loading: false,
                })

            })
    };

    fetchPlay = (id) => {
        this.setState({loading: true})
        Axios.get('/download', {
            params: {id: id},
            responseType: 'blob'
        }).then(res => {
            let blob = new Blob([res.data]);
            let objectUrl = URL.createObjectURL(blob);
            this.setState({audio: objectUrl, loading: false})
        })
    };

    fetchDownload = (id, name) => {
        this.setState({loading: true})
        Axios.get('/download', {
            params: {id: id},
            responseType: 'blob'
        }).then(res => {
            this.setState({loading: false})
            DownloadBlob(res, name+'.mp3');
        })
    };

    render() {
        const columns = [
            {title: '标题', dataIndex: 'name', key: 'name'},
            {title: '时长', dataIndex: 'duration', key: 'duration', width: 75, render: (text) => (<div>{this.getDuration(text)}</div>)},
            {title: '作者', dataIndex: 'artist', key: 'artist', render: (text, record) => (<div>{record.artists[0].name}</div>)},
            {title: '专辑', dataIndex: 'album', key: 'album', render: (text, record) => (<div>《{record.album.name}》</div>)},
            {title: '操作', dataIndex: 'id', key: 'action', width: 150,
                render: (text, record) => (
                    <div>
                        <Button type='link' onClick={()=>this.fetchPlay(record.id)}>播放</Button>
                        <Button type='link' onClick={()=>this.fetchDownload(record.id, record.name)}>下载</Button>
                    </div>
                )},
        ];
        return (
            <div className={style.musicList}>
                <div className={style.search}>
                    <Search className={style.input} onSearch={this.onSearch}/>
                </div>
                <div className={style.table}>
                    <Table dataSource={this.state.musicList}
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
                <div className={style.player}>
                    <audio src={this.state.audio} type="audio/mpeg" controls="controls"></audio>
                </div>
            </div>
        )
    }
}