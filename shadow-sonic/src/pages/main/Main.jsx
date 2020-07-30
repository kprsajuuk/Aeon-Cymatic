import React, {Component} from 'react';
import Music from '@/pages/music/Music';
import style from './Main.module.scss';

export default class Main extends Component{
    state = {
    };

    render() {
        return (
            <div className={style.main}>
            	<div className={style.topBar}>
                    <div className={style.content}>
                        <div className={style.title}>AEON</div>
                    </div>
                </div>
            	<div className={style.container}>
                    <div className={style.content}>
                        <Music/>
                    </div>
            	</div>
            </div>
        )
    }
}