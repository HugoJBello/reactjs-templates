import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { last_images_base64,getListImages } from '../utils/image-backend-caller';
import ImageDisplayer from './ImageDisplayer';
import ImageMenu from './ImageMenu';


class CamView extends Component {

  constructor() {
    super();
    this.state = { images: [] };
  }

  // getData() {
  //   last_images_base64().then((images) => {
  //     this.setState({ images });
  //   });
  // }
  //
  // componentDidMount() {
  //   this.getData();
  // }

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Images</h3>
        <ImageMenu/>
        // <ImageDisplayer images={this.state.images} />
        </div>
    );
  }
}

export default CamView;
