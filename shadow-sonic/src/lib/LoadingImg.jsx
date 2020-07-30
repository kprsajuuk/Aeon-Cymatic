import React, {Component} from 'react';
import { Spin } from 'antd';

export default class artistList extends Component{
    state = {
        loading: true,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.src !== prevProps.src){
            this.setState({loading: true})
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <div style={{minHeight: this.props.minHeight || 0, minWidth: this.props.minWIdth || 0}}>
                <Spin style={{width: '100%', minHeight: this.props.minHeight || 0}} spinning={loading}>
                    <img src={this.props.src} alt={this.props.alt || 'logo'} 
                         style={{opacity: loading ? '0' : '1', width: "100%"}}
                         onLoad={()=>this.setState({loading: false})}
                         onDragStart={e=>e.preventDefault()}
                         />
                </Spin>
            </div>
            
        )
    }
}