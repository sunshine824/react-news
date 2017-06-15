import React from 'react';
import ReactDOM from 'react-dom';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import MobileList from './mobile_list'

export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="军事" key="1">
                        <MobileList type="war" page={1} count={22}/>
                    </TabPane>
                    <TabPane tab="社会" key="2">

                    </TabPane>
                    <TabPane tab="国内" key="3">

                    </TabPane>
                    <TabPane tab="国际" key="4">

                    </TabPane>
                    <TabPane tab="娱乐" key="5">

                    </TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        );
    };
}