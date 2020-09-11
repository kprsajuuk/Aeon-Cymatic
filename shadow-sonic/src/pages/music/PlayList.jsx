import React, {Component} from 'react';
import { Table, Tabs, Switch } from 'antd';
import { CloseOutlined, SyncOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import Pagination from '@/settings/Pagination';
import MusicAction from "@/lib/MusicAction";
import { GetDuration } from "@/utils";
import style from './Music.module.scss';

const { TabPane } = Tabs;

export default class PlayList extends Component{
    state = {
        loading: false,
        editMod: false,
        listType: 'customList',
        customPagination: Pagination(),
        recentPagination: Pagination(),
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

    onPositionChange = (record, num) => {
        const { listType } = this.state;
        this.props.onUpdate(listType, 'move', record, num);
    }

    render() {
        const { customList, recentList, currentType, audioData } = this.props;
        const { editMod, listType } = this.state;
        const loading = this.props.loading || this.state.loading;
        const columns = [
            {title: '', dataIndex: 'name', key: 'remove', width: 64,
                render: (text, record) => (
                    <div>
                        {editMod && 
                            <div className={style.rowAct}>
                                <ArrowAction onArrow={(num)=>this.onPositionChange([record], num)}/>
                                <CloseOutlined className='link' onClick={()=>this.onRemove([record])}/>
                            </div>
                        }
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
            <div className={style.playList}>
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
                        <div className={style.table}>
                            <Table dataSource={customList}
                                   loading={loading}
                                   rowClassName={(record) => {
                                       return (listType === currentType && record.id === audioData.id) ? 'highlightRow' : ''
                                   }}
                                   pagination={this.state.customPagination}
                                   onChange={(pagination) => {
                                       this.setState({
                                           customPagination: {
                                               ...this.state.customPagination,
                                               current: pagination.current,
                                               pageSize: pagination.pageSize
                                           }
                                       })
                                   }}
                                   scroll={{y:window.innerHeight-268}}
                                   size='small'
                                   columns={columns} rowKey='id'/>
                        </div>
                    </TabPane>
                    <TabPane tab="最近播放" key="recentList">
                        <div className={style.table}>
                            <Table dataSource={recentList}
                                   loading={loading}
                                   rowClassName={(record) => {
                                       return (listType === currentType && record.id === audioData.id) ? 'highlightRow' : ''
                                   }}
                                   pagination={this.state.recentPagination}
                                   onChange={(pagination) => {
                                       this.setState({
                                           recentPagination: {
                                               ...this.state.recentPagination,
                                               current: pagination.current,
                                               pageSize: pagination.pageSize
                                           }
                                       })
                                   }}
                                   scroll={{y:window.innerHeight-268}}
                                   size='small'
                                   columns={columns} rowKey='id'/>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

class ArrowAction extends Component{
    state = {};
    render(){
        return (
            <div>
                <CaretUpOutlined onClick={()=>this.props.onArrow(-1)} className='link'/>
                <CaretDownOutlined onClick={()=>this.props.onArrow(1)} className={[style.arrow, 'link'].join(' ')}/>
            </div>
        )
    }
}