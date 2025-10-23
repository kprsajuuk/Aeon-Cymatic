import React, {Component} from 'react';
import { Table, notification, Tabs } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import Pagination from '@/settings/Pagination';
import LoadingImg from '@/lib/LoadingImg';
import MusicAction from "@/lib/MusicAction";
import { GetDuration } from "@/utils";
import style from "./Music.module.scss";

const { TabPane } = Tabs;

export default class artistList extends Component{
    state = {
        loading: false,
        pagination: Pagination(),
        hotList: [],
        albumList: [],
        artistInfo: {},
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.artist.artistId !== prevProps.artist.artistId){
            this.fetchArtistDetail();
            this.fetchArtistAlbum();
        }
    }

    onPlay = (record) => {
        this.props.onPlay(record.id, record)
    };

    onAddList = (record) => {
        this.props.onAddList(record);
    };

    onDownload = (record) => {
        this.props.onDownload(record.id, record)
    };

    onAlbumClick = (record) => {
    	this.props.onAlbum(record);
    };

    fetchArtistDetail = () => {
        this.setState({loading: true, artistInfo: {}});
        Axios.get('/artistMusic', {params: {id: this.props.artist.artistId, source: this.props.artist.source}})
            .then(res => {
                this.setState({loading: false});
                if (res.data.success){
                   	this.setState({
                   		hotList: res.data.songs,
                   		artistInfo: res.data.artist,
                   	})
                } else {
                    notification.error({message: '网络错误 获取歌手信息失败', duration: null})
                }
            })
    };

    fetchArtistAlbum = () => {
    	const { pagination } = this.state;
    	let limit = pagination.pageSize;
    	let page = pagination.current;
        this.setState({loading: true});
        Axios.get('/artistAlbum', {params: {id: this.props.artist.artistId, limit: limit, page: page, source: this.props.artist.source}})
            .then(res => {
                this.setState({loading: false});
                if (res.data.success){
                   	this.setState({
                   		albumList: res.data.albums,
                   		pagination: {...pagination, total: res.data.albumSize}
                   	})
                } else {
                    notification.error({message: '网络错误 获取歌手专辑失败', duration: null})
                }
            })
    };

    render() {
        const loading = this.props.loading || this.state.loading;
        const { artistInfo } = this.state;
        const musicColumns = [
            {title: '歌曲名', dataIndex: 'name', key: 'name'},
            {title: '时长', dataIndex: 'duration', key: 'duration', width: 75, render: (text) => (<div>{GetDuration(text)}</div>)},
            {title: '专辑', dataIndex: 'album', key: 'album', 
            	render: (text, record) => (
            		<span className='link' onClick={()=>this.onAlbumClick(record)}>《{record.album}》</span>
            	)},
            {title: '操作', dataIndex: 'id', key: 'action', width: 150,
                render: (text, record) => (<MusicAction onPlay={()=>{this.onPlay(record)}}
                                                        onAddList={()=>{this.onAddList(record)}}
                                                        onDownload={()=>this.onDownload(record)}/>
                )},
        ];

        const albumColumns = [
            {title: '专辑名', dataIndex: 'album', key: 'album', 
            	render: (text, record) => (
            		<span className='link' onClick={()=>this.onAlbumClick(record)}>《{text}》</span>
            	)},
            {title: '发行日期', dataIndex: 'publishTime', key: 'publishTime', render: (text) => (moment(text).format('YYYY-MM-DD'))},
            {title: '公司', dataIndex: 'company', key: 'company'},
            {title: '歌曲数量', dataIndex: 'size', key: 'size'},
        ];

        return (
            <div className={style.album}>
                {this.props.artist.artistId && <div className={style.info}>
                	<LoadingImg minHeight={100} src={artistInfo.img}/>
                    <div className={style.emphasize}>{artistInfo.name}</div>
                </div>}
                <Tabs type="card" tabPosition='left' size='small'>
		          	<TabPane tab="Top50" key="music">
		            	<Table dataSource={this.state.hotList}
		                       loading={loading}
		                       pagination={false}
		                       scroll={{y:window.innerHeight-268}}
		                       size='small'
		                       columns={musicColumns} rowKey='id'/>
		          	</TabPane>
		          	<TabPane tab="专辑" key="album">
		          	  	<Table dataSource={this.state.albumList}
		                       loading={loading}
		                       pagination={this.state.pagination}
		                       onChange={(pagination) => {
		                            this.setState({
		                                pagination: {
		                                    ...this.state.pagination,
		                                    current: pagination.current,
		                                    pageSize: pagination.pageSize
		                                }
		                            }, () => {this.fetchArtistAlbum()})
		                       }}
		                       size='small'
		                       scroll={{y:window.innerHeight-268}}
		                       columns={albumColumns} rowKey='albumId'/>
		         	</TabPane>
		        </Tabs>
            </div>
        )
    }
}