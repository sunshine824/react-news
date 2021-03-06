import React,{Component} from 'react';
import {Row, Col, BackTop} from 'antd'
import PCHeader from './pc_header'
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_img_block'

export default class PCNewsDetails extends Component {
    constructor() {
        super()
        this.state = {
            newsItem: ''
        };
    };

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        const {match} = this.props
        fetch('http://wangyi.butterfly.mopaasapp.com/detail/api?simpleId=' + match.params.id, myFetchOptions)
            .then(res => {
                return res.json()
            })
            .then(json => {
                this.setState({newsItem: json})
                document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台"
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    createMarkup() {
        return {__html: this.state.newsItem.content};
    };

    render() {
        const self = this
        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={self.createMarkup()}></div>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock type="war" count={10} page={1}  width="100%" cartTitle="军事新闻" imageWidth="150px" />
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter/>
                <BackTop/>
            </div>
        );
    };
}