import React from 'react';
import ReactDOM from 'react-dom';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import MobileList from './mobile_list'

export default class PCIndex extends React.Component {
    render() {
        const settings={
            dots:true,
            infinite:true,
            speed:500,
            sliderToShow:1,
            autoplay:true
        }
        const imgs=['carousel_1.jpg','carousel_2.jpg','carousel_3.jpg','carousel_4.jpg','carousel_5.jpg']
        return (
            <div>
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="军事" key="1">
                        <div class="carousel">
                            <Carousel {...settings}>
                                {
                                    imgs.map((item,index)=>{
                                        return <div key={index}><img src={`./src/images/${item}`}/></div>
                                    })
                                }
                            </Carousel>
                        </div>
                        <MobileList type="war" page={1} count={10}/>
                    </TabPane>
                    <TabPane tab="体育" key="2">
                        <MobileList type="sport" page={1} count={10}/>
                    </TabPane>
                    <TabPane tab="科技" key="3">
                        <MobileList type="tech" page={1} count={10}/>
                    </TabPane>
                    <TabPane tab="教育" key="4">
                        <MobileList type="edu" page={1} count={10}/>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileList type="ent" page={1} count={10}/>
                    </TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        );
    };
}