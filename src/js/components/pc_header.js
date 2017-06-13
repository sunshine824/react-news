/**
 * Created by Gatsby on 2017/6/13.
 */
import React from 'react';
import {Row, Col} from 'antd';
import ReactDOM from 'react-dom';

export default class PCHeader extends React.Component {
    render() {
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}