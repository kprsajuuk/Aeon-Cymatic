import React, {Component} from 'react';
import { Button, Table, notification, Tabs } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import Pagination from '@/settings/Pagination';
import LoadingImg from '@/lib/LoadingImg';
import { GetDuration } from "@/utils";
import style from "./Music.module.scss";

const { TabPane } = Tabs;

export default class PlayList extends Component{
    state = {
        loading: false,
        pagination: Pagination(),
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.recentList !== prevProps.recentList){
            this.resetPlayList();
        }
    }

    onPlay = (record) => {
        this.props.onPlay(record.id, record)
    };

    onDownload = (record) => {
        this.props.onDownload(record.id, record)
    };

    resetPlayList = () => {

    }

    onArtistClick = (record) => {
        this.props.onArtist(record);
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
                render: (text, record) => (
                    <div>
                        <Button type='link' onClick={()=>{this.onPlay(record)}}>播放</Button>
                        <Button type='link' onClick={()=>this.onDownload(record)}>下载</Button>
                    </div>
                )},
        ];

        return (
            <Tabs type="card" tabPosition='left' size='small'>
                <TabPane tab="最近播放" key="music">
                    <Table dataSource={this.state.hotList}
                           loading={loading}
                           pagination={false}
                           scroll={{y:window.innerHeight-268}}
                           size='small'
                           columns={musicColumns} rowKey='id'/>
                </TabPane>
                <TabPane tab="sth else" key="album">
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
        )
    }
}