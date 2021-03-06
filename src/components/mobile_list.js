import React,{Component} from 'react';
import {Row, Col} from 'antd'
import {
    Link
} from 'react-router-dom'

export default class MobileList extends Component {
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

    matchType(type) {
        switch (type) {
            case 'war':
                return '军事'
                break;
            case 'sport':
                return '体育'
                break;
            case 'tech':
                return '科技'
                break;
            case 'edu':
                return '教育'
                break;
            case 'ent':
                return '娱乐'
                break;
        }
    }

    render() {
        const self=this
        const {news} = this.state;
        const newsList = news.size
            ?
            news.list.map((newItem, index) => {
                //console.log(newItem)
                return <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`details/${newItem.id}`}>
                        <div className="m_article_img">
                            <img src={newItem.imgurl} alt={newItem.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newItem.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                            <span className="m_article_channel">
                                                {
                                                    self.matchType(newItem.channelname)
                                                }
                                            </span>
                                    <span className="m_article_time">
                                                {newItem.time}
                                            </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            })
            :
            '没有加载到数据';
        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        );
    };
}