import React,{Component} from 'react';
import {Row, Col, BackTop} from 'antd'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer';

export default class MobileNewsDetails extends Component {
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
    };

    createMarkup() {
        return {__html: this.state.newsItem.content};
    };

    render() {
        const self = this
        return (
            <div id="mobileDetailsContainer">
                <MobileHeader/>
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={self.createMarkup()}></div>
                        </Col>
                    </Row>
                    <MobileFooter/>
                    <BackTop/>
                </div>
            </div>
        );
    };
}