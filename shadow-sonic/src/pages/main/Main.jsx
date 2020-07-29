import React, {Component} from 'react';
import MusicList from '@/pages/music/MusicList';
import style from './Main.module.scss';

export default class Main extends Component{
    state = {
    };

    render() {
        return (
            <div className={style.main}>
            	<div className={style.topBar}></div>
            	<div className={style.container}>
                    <div className={style.content}>
                        <MusicList/>
                    </div>
            	</div>
            </div>
        )
    }
}