import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index'
import PCNewsDetails from './components/pc_news_details'
import MobileDetails from './components/mobile_news_details'
import 'antd/dist/antd.css';

class App extends React.Component {
    render() {
        return (
            //这里替换了之前的 Index，变成了程序的入口
            <Router>
                <div>
                    <MediaQuery query='(min-device-width: 1224px)'>
                        <Route exact={true} path="/" component={PCIndex}/>
                        <Route path="/details/:id" component={PCNewsDetails}/>
                    </MediaQuery>
                    <MediaQuery query='(max-device-width: 1224px)'>
                        <Route exact={true} path="/" component={MobileIndex}/>
                        <Route path="/details/:id" component={MobileDetails}/>
                    </MediaQuery>
                </div>
            </Router>
        );
    };
}

export default App