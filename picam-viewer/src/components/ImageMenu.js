import React,{ Component } from 'react';
import { last_images_base64,getListImages, queryImagesBase64 } from '../utils/image-backend-caller';
import ImageDisplayer from './ImageDisplayer';

class ImageMenu extends Component {
  constructor() {
    super();
    this.state = { images: [] };
    this.getLastImages();
    this.getLastImages = this.getLastImages.bind(this);
  }

  getLastImages() {
    last_images_base64().then((images) => {
      this.setState({ images });
    });
  }

  queryImages(limit,skip) {
    queryImagesBase64(limit,skip).then((images) => {
      this.setState({ images });
    });
  }

  render() {
     return (
        <div>
          <div className="rightMenu">
            <div id="recieve_last40">
              <a onClick={() => {this.getLastImages()}}>Show last 40 images </a>
            </div>
            <div id="query_images">
              <a onClick={() => {this.queryImages(2,0)}}>Show last 40 images </a>
            </div>
          </div>

          <ImageDisplayer images={this.state.images}/>
        </div>
    );
  }
}
export default ImageMenu;
