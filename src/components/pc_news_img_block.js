import React,{Component} from 'react';
import {Card} from 'antd'
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'

export default class PCNewsImageBlock extends Component {
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
                return <div key={index} className="imageblock">
                            <Link to={`details/${newItem.id}`} target="_blank">
                                <div className="custom-image">
                                    <img alt="" src={newItem.imgurl} style={styleImage}/>
                                </div>
                                <div className="custom-card">
                                    <h3 style={styleH3}>{newItem.title}</h3>
                                </div>
                            </Link>
                        </div>
            })
            :
            '没有加载到数据';
        return (
            <Router>
                <div className="topNewsList">
                    <Card title={this.props.cartTitle} bordered={true} style={{width: this.props.width}}>
                        {newsList}
                    </Card>
                </div>
            </Router>
        );
    };
}