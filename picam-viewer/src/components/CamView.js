import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { isLoggedIn } from '../utils/AuthService';
import { getFoodData } from '../utils/chucknorris-api';


class CamView extends Component {

  constructor() {
    super()
  }

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">My app</h3>
      </div>
    );
  }
}

export default CamView;
