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
            <Router history={history}>
                <div>
                    <MediaQuery query='(min-device-width: 1224px)'>
                        <Route path="/" component={PCIndex}/>
                        <Route path="/details/:id" component={PCNewsDetails}/>
                    </MediaQuery>
                    <MediaQuery query='(max-device-width: 1224px)'>
                        <MobileIndex/>
                    </MediaQuery>
                </div>
            </Router>
        );
    };
}
const Test = ({match}) => (
    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
)


ReactDOM.render(<Root/>, document.getElementById('app'));
