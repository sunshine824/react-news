/**
 * Created by Gatsby on 2017/6/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Tabs, Carousel} from 'antd';
const TabPane=Tabs.TabPane;
import PCNewsBlock from './pc_news_block'

export default class PCNewsContainer extends React.Component {
    render() {
        const settings={
            dots:true,
            infinite:true,
            speed:500,
            sliderToShow:1,
            autoplay:true
        }
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                    <div><img src="./src/images/carousel_5.jpg"/></div>
                                </Carousel>
                            </div>
                        </div>
                        <Tabs class="tabs_news">
                            <TabPane tab="军事" key="1">
                                <PCNewsBlock count={10} type="war" page={1} width="99%" />
                            </TabPane>
                            <TabPane tab="体育" key="2">
                                <PCNewsBlock count={10} type="sport" page={1} width="99%"/>
                            </TabPane>
                            <TabPane tab="科技" key="3">
                                <PCNewsBlock count={10} type="tech" page={1} width="99%" />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}