import React, {Component} from 'react';
import { Input, Select } from 'antd';
import { connect } from 'react-redux';
import { searchMusic } from "@/redux/action";
import Axios from 'axios';
import Music from '@/pages/music/Music';
import style from './Main.module.scss';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = state => {return state};

class Main extends Component{
    state = {
        keyword: '',
        searchType: 'net',
    };

    onTest = () => {
        Axios.get('/test')
            .then(res => { 
                console.log(res);
            })
    };

    componentDidMount() {
    }

    onSearch = () => {
        const { keyword, searchType } = this.state;
        this.props.dispatch(searchMusic(keyword, searchType))
    };

    render() {
        return (
            <div className={style.main}>
            	<div className={style.topBar}>
                    <div className={style.content}>
                        <div className={style.left}>
                            <div className={style.title}>AEON</div>
                            <Select defaultValue='net' onChange={(v)=>this.setState({searchType: v})} className={style.select}>
                                <Option value='net'>网易云</Option>
                                <Option value='qq'>qq音乐</Option>
                            </Select>
                            <Search onSearch={this.onSearch} value={this.state.keyword}
                                    onChange={(v)=>this.setState({keyword: v.target.value})}/>
                        </div>
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

export default connect(mapStateToProps)(Main)