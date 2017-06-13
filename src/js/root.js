import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()

export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的 Index，变成了程序的入口
      <Router history={history}>
        <div>
            123
        </div>
      </Router>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('app'));
