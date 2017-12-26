import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { last_images_base64,getListImages } from '../utils/image-backend-caller';

class CamView extends Component {

  constructor() {
    super();
    this.state = { images: [] };
  }

  getData() {
    last_images_base64().then((images) => {
      this.setState({ images });
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    const { images } = this.state;
    console.log("----" + images)
    return (
      <div>
        <Nav />
        <h3 className="text-center">Privileged Chuck Norris Celebrity Jokes</h3>
        <hr/>

        { images.map((image, index) => (
              <div className="col-sm-6" key={index}>
                <div className="panel panel-danger">
                  <div className="panel-heading">
                    <h3 className="panel-title"><span className="btn">#{ image.filename }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> image </p>
                    <img src={ "data:image/png;base64,"+image.base64 }>
                    </img>
                  </div>
                </div>
              </div>
          ))}

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>View Food Jokes</h2>
            <Link className="btn btn-lg btn-success" to='/'>Chuck Norris Food Jokes </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CamView;
