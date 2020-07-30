import React, {Component} from 'react';
import { Input, Button, Space } from 'antd';
import Axios from 'axios';
import Music from '@/pages/music/Music';
import style from './Main.module.scss';

const { Search } = Input;

export default class Main extends Component{
    state = {
        keyword: '',
    };

    onTest = () => {
        Axios.get('/test')
            .then(res => { 
                console.log(res);
            })
    }

    onSearch = (keyword) => {
        this.props.history.push('?keyword='+keyword)
        this.setState({keyword: ''})
    }

    render() {
        return (
            <div className={style.main}>
            	<div className={style.topBar}>
                    <div className={style.content}>
                        <Space className={style.left}>
                            <div className={style.title}>AEON</div>
                            <Search onSearch={this.onSearch} value={this.state.keyword}
                                    onChange={(v)=>this.setState({keyword: v.target.value})}/>
                            <Button onClick={this.onTest}>test</Button>
                        </Space>
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