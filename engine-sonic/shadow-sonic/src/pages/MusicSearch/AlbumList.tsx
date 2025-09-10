import React, {Component} from 'react';
import { Table, notification, Tooltip, Popover } from 'antd';
import { PlusCircleOutlined, DashOutlined } from '@ant-design/icons';
import Axios from 'axios';
import dayjs from 'dayjs';
import { Pagination, PaginationType } from '@/common/Pagination';
import LoadingImg from './LoadingImg';
import MusicAction from "./MusicAction";
import { GetDuration } from "@/common/utils";
import style from "./Music.module.scss";

interface IProps { 
    onPlay: (string, record) => void,
    album: any,
    onAddList: (record) => void,
    onDownload: (id, record) => void,
    onAddAlbum: (list) => void,
    onArtist: (record) => void,
    loading: boolean,
};
interface IState {
    loading: boolean,
    pagination: PaginationType,
    musicList: any[],
    albumInfo: any,
 }

export default class AlbumList extends Component<IProps, IState>{
    state = {
        loading: false,
        pagination: Pagination(),
        musicList: [],
        albumInfo: {
            img: "", name: "", artist: "", company: "", publishTime: ""
        },
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.album.albumId !== prevProps.album.albumId){
            this.fetchAlbumDetail();
        }
    }

    onPlay = (record) => {
        this.props.onPlay(record.id, record)
    };

    onAddList = (record) => {
        this.props.onAddList(record);
    };

    onAddAlbum = () => {
        this.props.onAddAlbum(this.state.musicList);
    };

    onDownload = (record) => {
        this.props.onDownload(record.id, record)
    };

    onArtistClick = (record) => {
        this.props.onArtist(record);
    };

    fetchAlbumDetail = () => {
        this.setState({loading: true, albumInfo: {}});
        Axios.get('/albumMusic', {params: {id: this.props.album.albumId, source: this.props.album.source}})
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
            {title: '时长', dataIndex: 'duration', key: 'duration', width: 75, render: (text) => (<div>{GetDuration(text)}</div>)},
            {title: '歌手', dataIndex: 'artist', key: 'artist', 
                render: (text, record) => (
                    <span className='link' onClick={()=>this.onArtistClick(record)}>{record.artist}</span>
                )},
            {title: '操作', dataIndex: 'id', key: 'action', width: 150,
                render: (text, record) => (<MusicAction onPlay={()=>{this.onPlay(record)}}
                                                        onAddList={()=>{this.onAddList(record)}}
                                                        onDownload={()=>this.onDownload(record)}/>
                )},
        ];

        return (
            <div className={style.album}>
                {this.props.album.albumId && <div className={style.info}>
                    <LoadingImg minHeight={100} src={albumInfo.img}/>
                    <div className={style.emphasize}>《{albumInfo.name}》</div>
                    <div>歌手: {albumInfo.artist}</div>
                    <div>公司: {albumInfo.company}</div>
                    <div>发行时间: {dayjs(albumInfo.publishTime).format('YYYY-MM-DD')}</div>
                    <Popover content={
                        <Tooltip title='添加专辑中的歌曲到歌单'>
                            <PlusCircleOutlined className='link' onClick={this.onAddAlbum}/>
                        </Tooltip>}>
                        <DashOutlined className='link'/>
                    </Popover>
                </div>}
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
                               })
                           }}
                           scroll={{y:window.innerHeight-268}}
                           size='small'
                           columns={columns} rowKey='id'/>
                </div>
            </div>
        )
    }
}