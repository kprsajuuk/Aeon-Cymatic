import React, {Component} from 'react';
import { Table, notification } from 'antd';
import Axios from 'axios';
import { Pagination, PaginationType } from '@/common/Pagination';
import MusicAction from "./MusicAction";
import { GetDuration } from "@/common/utils";
import style from './Music.module.scss';

interface IProps { 
    loading: boolean,
    searchMusic: any,
    onUpdate: () => void,
    onAlbum: (record) => void,
    onArtist: (record) => void,
    onPlay: (id, record) => void,
    onAddList: (record) => void,
    onDownload: (id, record) => void,
};
interface IState { 
    keyword: string,
    type: string,
    loading: boolean,
    musicList: any[],
    pagination: PaginationType;
 }

class MusicList extends Component<IProps, IState>{
    state = {
        loading: false,
        musicList: [],
        keyword: '',
        type: 'net',
        audio: '',
        pagination: Pagination(),
        audioData: {},
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchMusic !== prevProps.searchMusic && this.props.searchMusic){
            this.onSearch(this.props.searchMusic.searchKey, this.props.searchMusic.searchType);
        }
    }

    onSearch = (keyword, type) => {
        this.setState({
            keyword: keyword,
            type: type,
            pagination: {...this.state.pagination, current: 1}
        }, () => {this.fetchMusicList()});
        this.props.onUpdate();
    };

    onAlbumClick = (record) => {
        this.props.onAlbum(record);
    };

    onArtistClick = (record) => {
        this.props.onArtist(record);
    };

    onPlay = (record) => {
        this.props.onPlay(record.id, record)
    };

    onAddList = (record) => {
        this.props.onAddList(record);
    };

    onDownload = (record) => {
        this.props.onDownload(record.id, record)
    };

    fetchMusicList = () => {
        const { pagination, keyword, type } = this.state;
        let limit = pagination.pageSize;
        let page = pagination.current;
        this.setState({loading: true});
        Axios.get('/search', {params: {source: type, keyword: keyword, limit: limit, page: page}})
            .then(res => { 
                this.setState({loading: false});
                if (res.data.success){
                    this.setState({
                        musicList: res.data.songs,
                        pagination: {...pagination, total: res.data.total},
                    })
                } else {
                    notification.error({message: '网络错误 获取失败', duration: null})
                }
            })
    };

    render() {
        const loading = this.props.loading || this.state.loading;
        const columns = [
            {title: '歌曲名', dataIndex: 'name', key: 'name'},
            {title: '时长', dataIndex: 'duration', key: 'duration', width: 75, render: (text) => (<div>{GetDuration(text)}</div>)},
            {title: '歌手', dataIndex: 'artist', key: 'artist', 
                render: (text, record) => (
                    <span className='link' onClick={()=>this.onArtistClick(record)}>
                        {record.artist}</span>
                )},
            {title: '专辑', dataIndex: 'album', key: 'album', 
                render: (text, record) => (
                    <span className='link' onClick={()=>this.onAlbumClick(record)}>
                        《{record.album}》</span>
                )},
            {title: '操作', dataIndex: 'id', key: 'action', width: 150,
                render: (text, record) => (<MusicAction onPlay={()=>{this.onPlay(record)}}
                                                        onAddList={()=>{this.onAddList(record)}}
                                                        onDownload={()=>this.onDownload(record)}/>
                )},
        ];
        return (
            <div className={style.table}>
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
                           }, () => {this.fetchMusicList()})
                       }}
                       scroll={{y:window.innerHeight-268}}
                       size='small'
                       columns={columns} rowKey='id'/>
            </div>
        )
    }
}

export default MusicList