import React, { Component } from "react";
import { Slider } from 'antd';
import style from './AudioControl.module.scss';

export default class AudioControl extends Component{
    state = {};

    render() {
        return (
            <div className={style.audioControl}>
                <audio id="audioTag" src="music/tonghuazhen.mp3"></audio>
                <div>播放</div>
                <div>00:00/00:00</div>
                <div>
                    <Slider style={{width: 200}}/>
                </div>
                <div>音量</div>
                <div>act</div>
            </div>
        )
    }

}