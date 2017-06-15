import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'antd'
import {Link} from 'react-router-dom'

export default class PCNewsImageBlock extends React.Component {
    constructor() {
        super()
        this.state = {
            news: ''
        };
    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch('http://wangyi.butterfly.mopaasapp.com/news/api?type=' + this.props.type + '&page=' + this.props.page + '&limit=' + this.props.count, myFetchOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                //console.log(json)
                this.setState({news: json})
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    render() {
        const styleImage={
            display:"block",
            width:this.props.imageWidth,
            height:"90px"
        }
        const styleH3={
            width:this.props.imageWidth,
            whiteSpace:"nowrap",
            overflow:'hidden',
            textOverflow:"ellipsis"
        }
        const {news} = this.state;
        const newsList = news.size
            ?
            news.list.map((newItem, index) => {
                //console.log(newItem)
                return <div key={index} class="imageblock">
                            <a href={`details/${newItem.id}`} target="_blank">
                                <div class="custom-image">
                                    <img alt="" src={newItem.imgurl} style={styleImage}/>
                                </div>
                                <div class="custom-card">
                                    <h3 style={styleH3}>{newItem.title}</h3>
                                </div>
                            </a>
                        </div>
            })
            :
            '没有加载到数据';
        return (
            <div class="topNewsList">
                <Card title={this.props.cartTitle} bordered={true} style={{width: this.props.width}}>
                    {newsList}
                </Card>
            </div>
        );
    };
}