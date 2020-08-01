import React, {Component} from 'react';
import { Table, Tabs, Switch } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import MusicAction from "@/lib/MusicAction";
import { GetDuration } from "@/utils";
import style from './Music.module.scss';

const { TabPane } = Tabs;

export default class PlayList extends Component{
    state = {
        loading: false,
        editMod: false,
        listType: 'customList',
    };

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    onRemove = (record) => {
        const { listType } = this.state;
        this.props.onUpdate(listType, 'remove', record);
    };

    onPlay = (record) => {
        this.props.onPlay(record.id, record, this.state.listType)
    };

    onAddList = (record) => {
        this.props.onAddList(record);
    };

    onDownload = (record) => {
        this.props.onDownload(record.id, record)
    };

    onArtistClick = (record) => {
        this.props.onArtist(record);
    };

    onModChange = (v) => {
        this.props.onModChange(v);
    };

    render() {
        const { customList, recentList, currentType, audioData } = this.props;
        const { editMod, listType } = this.state;
        const loading = this.props.loading || this.state.loading;
        const columns = [
            {title: '', dataIndex: 'name', key: 'remove', width: 30,
                render: (text, record) => (
                    <div>
                        {editMod ? <CloseOutlined className='link' onClick={()=>this.onRemove([record])}/> : ''}
                    </div>
                )},
            {title: '', dataIndex: 'name', key: 'playing', width: 30,
                render: (text, record) => (
                    <div>
                        {listType === currentType && record.id === audioData.id &&
                        <SyncOutlined spin className={style.tableColIcon}/>}
                    </div>
                )},
            {title: '歌曲名', dataIndex: 'name', key: 'name'},
            {title: '时长', dataIndex: 'duration', key: 'duration', width: 75, render: (text) => (<div>{GetDuration(text)}</div>)},
            {title: '歌手', dataIndex: 'artist', key: 'artist',
                render: (text, record) => (
                    <span className='link' onClick={()=>this.onArtistClick(record)}>{record.artist}</span>
                )},
            {title: '操作', dataIndex: 'id', key: 'action', width: 150,
                render: (text, record) => (
                    <MusicAction btnList={listType === 'customList' ? ['play', 'download'] : ['play', 'add', 'download']}
                                 onPlay={()=>{this.onPlay(record)}}
                                 onAddList={()=>{this.onAddList(record)}}
                                 onDownload={()=>this.onDownload(record)}/>
                )},
        ];

        return (
            <div>
                <div className={style.header}>
                    <div className={style.item}>
                        <div className={style.text}>编辑</div>
                        <Switch size='middle' onChange={(v)=>this.setState({editMod: v})}/>
                    </div>
                    <div className={style.item}>
                        <div className={style.text}>列表播放</div>
                        <Switch size='middle' onChange={(v)=>this.onModChange(v ? 'list' : 'solo')}/>
                    </div>
                </div>
                <Tabs type="card" tabPosition='left' size='small' activeKey={this.state.listType}
                      onChange={(v)=>this.setState({listType: v})}>
                    <TabPane tab="歌单" key="customList">
                        <Table dataSource={customList}
                               loading={loading}
                               rowClassName={(record) => {
                                   return (listType === currentType && record.id === audioData.id) ? 'highlightRow' : ''
                               }}
                               scroll={{y:window.innerHeight-268}}
                               size='small'
                               columns={columns} rowKey='id'/>
                    </TabPane>
                    <TabPane tab="最近播放" key="recentList">
                        <Table dataSource={recentList}
                               loading={loading}
                               rowClassName={(record) => {
                                   return (listType === currentType && record.id === audioData.id) ? 'highlightRow' : ''
                               }}
                               scroll={{y:window.innerHeight-268}}
                               size='small'
                               columns={columns} rowKey='id'/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}