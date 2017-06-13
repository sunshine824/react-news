import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()

import PCIndex from './components/pc_index'


import 'antd/dist/antd.css';

export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的 Index，变成了程序的入口
      <div>
        <PCIndex/>
      </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('app'));
