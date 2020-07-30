import React, {Component} from 'react';
import { Button, Table, notification } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import Pagination from '@/settings/Pagination';
import LoadingImg from '@/lib/LoadingImg';
import { GetDuration } from "@/utils";
import style from "./Music.module.scss";

export default class AlbumList extends Component{
    state = {
        loading: false,
        pagination: Pagination(),
        musicList: [],
        albumInfo: {},
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.albumId !== prevProps.albumId){
            this.fetchAlbumDetail();
        }
    }

    onPlay = (record) => {
        this.props.onPlay(record.id, record)
    };

    onDownload = (record) => {
        console.log(record);
        this.props.onDownload(record.id, record.name)
    };

    onArtistClick = (id) => {
        this.props.onArtist(id);
    };

    fetchAlbumDetail = () => {
        this.setState({loading: true, albumInfo: {}});
        Axios.get('/albumMusic', {params: {id: this.props.albumId}})
            .then(res => {
                this.setState({loading: false});
                if (res.data.success){
                    this.setState({
                        musicList: res.data.songs,
                        albumInfo: res.data.album,
                    })
                } else {
                    notification.error({message: '网络错误 获取失败', duration: null})
                }
            })
    };

    render() {
        const loading = this.props.loading || this.state.loading;
        const { albumInfo } = this.state;
        const columns = [
            {title: '歌曲名', dataIndex: 'name', key: 'name'},
            {title: '时长', dataIndex: 'dt', key: 'duration', width: 75, render: (text) => (<div>{GetDuration(text)}</div>)},
            {title: '作者', dataIndex: 'artist', key: 'artist', 
                render: (text, record) => (
                    <span className='link' onClick={()=>this.onArtistClick(record.ar[0].id)}>{record.ar[0].name}</span>
                )},
            {title: '操作', dataIndex: 'id', key: 'action', width: 150,
                render: (text, record) => (
                    <div>
                        <Button type='link' onClick={()=>{this.onPlay(record)}}>播放</Button>
                        <Button type='link' onClick={()=>this.onDownload(record)}>下载</Button>
                    </div>
                )},
        ];

        return (
            <div className={style.album}>
                {this.props.albumId && <div className={style.info}>
                    <LoadingImg minHeight={100} src={albumInfo.blurPicUrl}/>
                    <div className={style.emphasize}>《{albumInfo.name}》</div>
                    <div>歌手: {albumInfo.artist ? albumInfo.artist.name : ''}</div>
                    <div>公司: {albumInfo.company}</div>
                    <div>发行时间: {moment(albumInfo.publishTime).format('YYYY-MM-DD')}</div>
                </div>}
                <Table dataSource={this.state.musicList}
                       loading={loading}
                       pagination={this.state.pagination}
                       onChange={(pagination) => {
                           this.setState({
                               pagination: {
                                   ...this.state.pagination,
                                   current: pagination.current,
                                   pageSize: pagination.pageSize
                               }
                           })
                       }}
                       scroll={{y:window.innerHeight-268}}
                       size='small'
                       columns={columns} rowKey='id'/>
            </div>
        )
    }
}