import React from 'react';
import {Card} from 'antd'
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'

export default class PCNewsBlock extends React.Component {
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
                //console.log(err.message)
            })
    }

    render() {
        const {news} = this.state;
        const newsList = news.size
            ?
            news.list.map((newItem, index) => {
                //console.log(newItem)
                return <li key={index}>
                            <Link to={`/details/${newItem.id}`} target="_blank">
                                {newItem.title}
                            </Link>
                        </li>
            })
            :
            '没有加载到数据';
        return (
            <Router>
                <div className="topNewsList">
                    <Card>
                        <ul>
                            {newsList}
                        </ul>
                    </Card>
                </div>
            </Router>
        );
    };
}