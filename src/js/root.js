import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index'
import PCNewsDetails from './components/pc_news_details'

import 'antd/dist/antd.css';

export default class Root extends React.Component {
    render() {
        return (
            //这里替换了之前的 Index，变成了程序的入口
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <PCIndex/>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <MobileIndex/>
                </MediaQuery>
                <Router history={history}>
                    <div>
                        <Route path="details/:id" component={PCNewsDetails}></Route>
                    </div>
                </Router>
            </div>
        );
    };
}

ReactDOM.render(<Root/>, document.getElementById('app'));
