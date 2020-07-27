import React, {Component} from 'react';
import Axios from 'axios';
import moment from 'moment';
import { Button, Input, Table } from 'antd';
import { DownloadBlob } from "@/utils";
import style from './MusicList.module.scss';

const { Search } = Input;

export default class MusicList extends Component{
    state = {
        musicList: [],
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

    fetchMusicList = (keyword) => {
        Axios.get('http://localhost:3333/search', {params: {keyword: keyword}})
            .then(res => {
                this.setState({
                    musicList: res.data.result.songs,
                })
            })
    };

    fetchDownload = (id, name) => {
        Axios.get('http://localhost:3333/download', {
            params: {id: id},
            responseType: 'blob'
        }).then(res => {
            DownloadBlob(res, name+'.mp3');
        })
    };

    render() {
        const columns = [
            {title: '标题', dataIndex: 'name', key: 'name'},
            {title: '时长', dataIndex: 'duration', key: 'duration', render: (text) => (<div>{this.getDuration(text)}</div>)},
            {title: '作者', dataIndex: 'artist', key: 'artist', render: (text, record) => (<div>{record.artists[0].name}</div>)},
            {title: '专辑', dataIndex: 'album', key: 'album', render: (text, record) => (<div>《{record.album.name}》</div>)},
            {title: '操作', dataIndex: 'id', key: 'action',
                render: (text, record) => (<Button type='link' onClick={()=>this.fetchDownload(record.id, record.name)}>下载</Button>)},
        ];
        return (
            <div className={style.musicList}>
                <div className={style.topBar}></div>
                <div className='flexColumn' style={{width: '80%', margin: '0 auto'}}>
                    <div className={style.search}>
                        <Search className={style.input} onSearch={this.fetchMusicList}/>
                    </div>
                    <div className={style.table}>
                        <Table size='small'
                               dataSource={this.state.musicList}
                               columns={columns} rowKey='id'/>
                    </div>
                </div>
            </div>
        )
    }
}