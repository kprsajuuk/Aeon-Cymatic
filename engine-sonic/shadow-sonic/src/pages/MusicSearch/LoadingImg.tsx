import React, {Component} from 'react';
import { Spin, Empty } from 'antd';

interface IProps { 
    src: any,
    minHeight: number,
    minWidth?: number,
    alt?: string,
};
interface IState { }

export default class LoadingImg extends Component<IProps, IState>{
    state = {
        loading: true,
        imageErr: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.src !== prevProps.src){
            this.setState({loading: true, imageErr: false})
        }
    }

    render() {
        const { loading, imageErr } = this.state;
        return (
            <div style={{minHeight: this.props.minHeight || 0, minWidth: this.props.minWidth || 0}}>
                <Spin style={{width: '100%', minHeight: this.props.minHeight || 0}} spinning={loading}>
                    {imageErr === false && 
                        <img src={this.props.src} alt={this.props.alt || 'logo'} 
                             style={{opacity: loading ? '0' : '1', width: "100%"}}
                             onLoad={()=>{this.setState({loading: false})}}
                             onError={()=>this.setState({imageErr: true, loading: false})}
                             onDragStart={e=>e.preventDefault()}
                             />}
                    {imageErr === true && <Empty />}
                </Spin>
            </div>
            
        )
    }
}