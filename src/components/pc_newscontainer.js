/**
 * Created by Gatsby on 2017/6/15.
 */
import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_img_block'
const TabPane=Tabs.TabPane;

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
                    <Col span={20} className="container">
                        <div className="leftContainer">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./images/carousel_1.jpg" alt=""/></div>
                                    <div><img src="./images/carousel_2.jpg" alt=""/></div>
                                    <div><img src="./images/carousel_3.jpg" alt=""/></div>
                                    <div><img src="./images/carousel_4.jpg" alt=""/></div>
                                    <div><img src="./images/carousel_5.jpg" alt=""/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="war" width="400px" cartTitle="军事新闻" imageWidth="112px" page={1}/>
                        </div>
                        <Tabs className="tabs_news" type="card">
                            <TabPane tab="军事" key="1">
                                <PCNewsBlock count={19} type="war" page={1} width="99%" />
                            </TabPane>
                            <TabPane tab="体育" key="2">
                                <PCNewsBlock count={19} type="sport" page={1} width="99%"/>
                            </TabPane>
                            <TabPane tab="科技" key="3">
                                <PCNewsBlock count={19} type="tech" page={1} width="99%" />
                            </TabPane>
                            <TabPane tab="教育" key="4">
                                <PCNewsBlock count={19} type="edu" page={1} width="99%" />
                            </TabPane>
                        </Tabs>
                        <PCNewsImageBlock count={12} type="ent" width="100%" cartTitle="娱乐新闻" imageWidth="112px" page={1}/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}