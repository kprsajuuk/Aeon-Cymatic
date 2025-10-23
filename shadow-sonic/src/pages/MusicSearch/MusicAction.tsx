import React, {Component} from 'react';
import { Tooltip } from 'antd';
import { PlusCircleOutlined, PlayCircleOutlined, CloudDownloadOutlined  } from '@ant-design/icons';

interface IProps { 
    btnList?: any,
    onPlay: () => void,
    onAddList: () => void,
    onDownload: () => void,
};
interface IState { }

export default class MusicAction extends Component<IProps, IState>{
    state = {
        btnList: this.props.btnList || ['play', 'add', 'download']
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.btnList !== prevProps.btnList){
            this.setState({btnList: this.props.btnList || ['play', 'add', 'download']})
        }
    }

    render() {
        const { btnList } = this.state;
        return (
            <div>
                {btnList.indexOf('play') >= 0 && <Tooltip title='播放'>
                    <PlayCircleOutlined className='link' onClick={this.props.onPlay}/>
                </Tooltip>}
                {btnList.indexOf('add') >= 0 && <Tooltip title='加入歌单'>
                    <PlusCircleOutlined className='link' onClick={this.props.onAddList}/>
                </Tooltip>}
                {btnList.indexOf('download') >= 0 && <Tooltip title='下载'>
                    <CloudDownloadOutlined className='link' onClick={this.props.onDownload}/>
                </Tooltip>}
            </div>

        )
    }
}