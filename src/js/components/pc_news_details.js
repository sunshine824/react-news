import React from 'react';
import {Row, Col} from 'antd'

export default class PCNewsDetails extends React.Component {
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
                4545455
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} class="container">
                        <div class="articleContainer" dangerouslySetInnerHTML={self.createMarkup()}></div>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}