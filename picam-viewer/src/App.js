
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tab2 from './components/Tab2';
import CamView from './components/CamView';
import Callback from './components/Callback';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';

class App extends Component {

  constructor() {
    super()
  }

  render() {
    return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={CamView}/>
        <Route path="/special" component={Tab2} onEnter={requireAuth} />
        <Route path="/callback" component={Callback} />
      </Router>
    </div>
    );
  }
}

export default App;
