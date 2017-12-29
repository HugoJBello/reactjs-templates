import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';

class Nav extends Component {

  render() {
    return (
      <div className="sidebar-nav">
      <div className="navbar navbar-default navbar-fixed-top">
      <button type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" class="navbar-toggle">
        <span className="sr-only">Toggle navigation</span><span class="icon-bar"></span>
        <span className="icon-bar"></span><span class="icon-bar"></span>
      </button>
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Home</Link>
        </div>
        <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
          <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {
             ( isLoggedIn() ) ? <Link to="/special">Cam Viewer</Link> :  ''
            }
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
           {
             (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
          </li>
        </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default Nav;
