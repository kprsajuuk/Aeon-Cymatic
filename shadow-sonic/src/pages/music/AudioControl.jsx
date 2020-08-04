import React, { Component } from "react";
import { Menu, Dropdown, Space, Popover, Slider, Switch, Button } from 'antd';
import { CaretRightOutlined, PauseOutlined, NotificationOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { GetDuration, DownloadBlob } from '@/utils'
import style from './AudioControl.module.scss';

export default class AudioControl extends Component{
    state = {
        audioSource: '',
        duration: '0:00',
        current: '0:00',
        paused: true,
        volume: 100,
        loop: false,
        actMenuVisible: false,
        extendVisible: false,
    };

    componentDidMount(){
        this.audio = document.getElementById('audioTag');
        this.progressBar = document.getElementById('progressBar');
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.src !== prevProps.src){
            this.initAudio();
        }
    }

    initAudio = () => {
        let blob = new Blob([this.props.src.data]);
        let source = URL.createObjectURL(blob);
        this.setState({audioSource: source}, () => {
            let interval = setInterval(()=>{
                if (!isNaN(this.audio.duration)){
                    clearInterval(interval);
                    this.audio.play();
                    this.setState({
                        duration: Math.floor(this.audio.duration),
                        paused: false
                    })
                }
            }, 100);
            this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
            this.audio.addEventListener('timeupdate', this.onTimeUpdate);
            this.progressBar.onmousedown = this.onDrageProgress;
            this.audio.removeEventListener('ended', this.onEndEvent);
            this.audio.addEventListener('ended', this.onEndEvent);
        })
    };

    onTimeUpdate = () => {
        let { current } = this.state;
        let newCurrent = Math.floor(this.audio.currentTime);
        if (newCurrent !== current){
            this.setState({current: newCurrent})
        }
    };

    onPlay = () => {
        if (this.audio.paused){
            this.audio.play();
        } else {
            this.audio.pause();
        }
        this.setState({paused: this.audio.paused});
    };

    onVolumeChange = (v) => {
        this.setState({volume: v}, () => {
            this.audio.volume = this.state.volume / 100;
        })
    };

    onDrageProgress = (event) => {
        event.preventDefault();
        let totalWidth = document.getElementById('progressBar').offsetWidth;

        this.audio.currentTime = this.audio.duration * event.offsetX / totalWidth;
        this.progressBar.onmousemove = (e => {
            this.audio.currentTime = this.audio.duration * e.offsetX / totalWidth
        });
        document.body.onmouseup = () => {
            this.progressBar.onmousemove = null;
            document.body.onmouseup = null;
        }
    };

    onEndEvent = () => {
        this.onAudioEnd(0);
    }

    onAudioEnd = (next = 0) => {
        console.log('end');
        this.audio.currentTime = 0;
        if (this.state.loop){
            this.audio.play();
        } else {
            this.audio.pause();
            this.setState({paused: true});
            this.props.onAudioEnd(next);
        }
    };

    onDownload = () => {
        DownloadBlob(this.props.src, this.props.audioData.name + '.mp3');
    };

    render() {
        const { paused, duration, current, volume, audioSource, actMenuVisible, extendVisible } = this.state;
        const extendAction = (
            <div className={style.extend}>
                <div className={[style.info, 'ellipsis'].join(' ')}>
                    当前播放: {this.props.audioData.name ? `${this.props.audioData.name} - ${this.props.audioData.artist}` : '无'}
                </div>
                <div className={style.action}>
                    <StepBackwardOutlined className='link' onClick={()=>this.onAudioEnd(-1)}/>
                    <StepForwardOutlined className='link' onClick={()=>this.onAudioEnd(1)}/>
                </div>
            </div>
        );
        const ActMenu = (
            <Menu onClick={(e)=>{if (e.key !== 'loopBtn'){this.setState({actMenuVisible: false})}}}>
                <Menu.Item key='downloadBtn' disabled={!audioSource} onClick={this.onDownload}>
                    下载
                </Menu.Item>
                <Menu.Item key='loopBtn'>
                    <Space>
                        循环<Switch checkedChildren="开" unCheckedChildren="关"
                                    onChange={(v)=>this.setState({loop: v})}/>
                    </Space>
                </Menu.Item>
            </Menu>
        );
        const Volume = (
            <div className={style.volumePop}>
                <Slider className={style.slider} vertical value={volume} onChange={this.onVolumeChange}/>
            </div>
        );

        return (
            <div className={style.audioControl}>
                <Popover content={extendAction} placement="bottomLeft"
                          onVisibleChange={(v)=>this.setState({extendVisible: v})}>
                    <Space className={style.interface} style={{boxShadow: extendVisible ? '0 0 5px #e5ce00' : 'none'}}>
                        <audio id="audioTag" src={audioSource}></audio>
                        <div className={style.item}>
                            <Button shape="circle" onClick={this.onPlay} size='small' disabled={!audioSource}
                                    icon={paused ? <CaretRightOutlined /> : <PauseOutlined />} />
                        </div>
                        <div className={style.item}>{GetDuration(current, 'seconds')}/{GetDuration(duration, 'seconds')}</div>
                        <div className={style.progressBar}>
                            <div id='progressBar' className={style.current}>
                                <div id='currentProgressBar' className={style.progress}
                                    style={{width: Math.round(100*current/duration, 0)+'%' || '0%'}}>
                                </div>
                            </div>
                        </div>
                        <div className={style.item}>
                            <Popover placement="bottom" content={Volume}>
                                <NotificationOutlined style={{cursor: 'pointer'}}/>
                            </Popover>
                        </div>
                        <div className={style.item}>
                            <Dropdown overlay={ActMenu} visible={actMenuVisible}
                                    onVisibleChange={(v)=>this.setState({actMenuVisible: v})}>
                                <Button size='small'>更多</Button>
                            </Dropdown>
                        </div>
                    </Space>
                </Popover>
            </div>
        )
    }

}