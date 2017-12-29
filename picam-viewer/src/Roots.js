
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CamView from './components/CamView';
import Home from './components/Home';
import Callback from './components/Callback';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';

class Roots extends Component {

  constructor() {
    super()
  }

  render() {
    return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/special" component={CamView} onEnter={requireAuth} />
        <Route path="/callback" component={Callback} />
      </Router>
    </div>
    );
  }
}

export default Roots;
