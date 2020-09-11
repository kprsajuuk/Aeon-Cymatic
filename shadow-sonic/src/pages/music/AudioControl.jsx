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
        visual: false,
        actMenuVisible: false,
        extendVisible: false,
    };

    componentDidMount(){
        this.audio = document.getElementById('audioTag');
        this.progressBar = document.getElementById('progressBar');
        this.animationEnded = true;

        this.canvas = document.getElementById('audioCanvas');
        let container = document.getElementById('canvasContainer');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'rgba(229, 206, 0, 0.3)';
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.src !== prevProps.src){
            this.initAudio();
        }
    }

    initAudio = () => {
        let blob = new Blob([this.props.src.data]);
        if (!this.audioCtx){
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.audioSource = this.audioCtx.createMediaElementSource(document.querySelector('audio'));
            this.analyser = this.audioCtx.createAnalyser();
            this.analyser.fftSize = 256;
            this.audioSource.connect(this.analyser);
            this.analyser.connect(this.audioCtx.destination);
        }
        let source = URL.createObjectURL(blob);
        this.setState({audioSource: source}, () => {
            let interval = setInterval(()=>{
                if (!isNaN(this.audio.duration)){
                    clearInterval(interval);
                    this.playMusic();
                    this.setState({
                        duration: Math.floor(this.audio.duration),
                    })
                }
            }, 100);
            this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
            this.audio.addEventListener('timeupdate', this.onTimeUpdate);
            this.progressBar.onmousedown = this.onDragProgress;
            this.audio.removeEventListener('ended', this.onEndEvent);
            this.audio.addEventListener('ended', this.onEndEvent);
        })
    };

    drawVisualEffect = () => {
        let array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(array);
        let c_width = this.canvas.width;
        let c_height = this.canvas.height;

        this.ctx.clearRect(0, 0, c_width, c_height);
        if (this.state.visual){
            let rec_width = c_width / 2 / array.length;
            for (let i=0; i<array.length; i++){
                let rec_height = (array[i]/256 * c_height) * 0.3;
                this.ctx.fillRect(rec_width * i, c_height - rec_height, rec_width * 0.7, rec_height)
                this.ctx.fillRect(c_width - rec_width * i, c_height - rec_height, rec_width * 0.7, rec_height)
            }
            if (!this.animationEnd){
                window.requestAnimationFrame(this.drawVisualEffect);
            } else {
                this.animationEnded = true;
                this.ctx.clearRect(0, 0, c_width, c_height);
            }
        }
    };

    playMusic = () => {
        clearTimeout(this.animationEndTimer);
        this.animationEnd = false;
        this.audio.play();
        this.setState({paused: false});
        if (this.animationEnded){
            this.animationEnded = false;
            window.requestAnimationFrame(this.drawVisualEffect);
        }
    };

    pauseMusic = () => {
        this.audio.pause();
        this.animationEndTimer = setTimeout(()=>this.animationEnd = true, 2000);
        this.setState({paused: true})
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
            this.playMusic();
        } else {
            this.pauseMusic();
        }
    };

    onVolumeChange = (v) => {
        this.setState({volume: v}, () => {
            this.audio.volume = this.state.volume / 100;
        })
    };

    onDragProgress = (event) => {
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
        this.audio.pause();
        this.onAudioEnd(0);
    };

    onAudioEnd = (next = 0) => {
        this.audio.currentTime = 0;
        if (this.state.loop){
            this.playMusic();
        } else {
            this.pauseMusic();
            this.setState({paused: true});
            this.props.onAudioEnd(next);
        }
    };

    onDownload = () => {
        let suffix = this.props.audioData.source === 'qq' ? '.m4a' : '.mp3';
        DownloadBlob(this.props.src, this.props.audioData.name + suffix);
    };

    onVisualChange = (v) => {
        this.setState({visual: v}, () => {
            if (v && !this.state.paused){
                window.requestAnimationFrame(this.drawVisualEffect);
            }
        })
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
            <Menu onClick={(e)=>{if (e.key === 'downloadBtn'){this.setState({actMenuVisible: false})}}}>
                <Menu.Item key='downloadBtn' disabled={!audioSource} onClick={this.onDownload}>
                    下载
                </Menu.Item>
                <Menu.Item key='loopBtn'>
                    <Space>
                        循环<Switch checkedChildren="开" unCheckedChildren="关"
                                  onChange={(v)=>this.setState({loop: v})}/>
                    </Space>
                </Menu.Item>
                <Menu.Item key='visualBtn'>
                    <Space>
                        效果<Switch checkedChildren="开" unCheckedChildren="关"
                                  onChange={this.onVisualChange}/>
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
                <div className={style.canvasContainer}>
                    <div id='canvasContainer' style={{height: '100%', width: '100%'}}>
                        <canvas id='audioCanvas'/>
                    </div>
                </div>
            </div>
        )
    }

}