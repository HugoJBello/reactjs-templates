import React,{ Component } from 'react';
import { last_images_base64,getListImages } from '../utils/image-backend-caller';
import ImageGallery from 'react-image-gallery';

class ImageDisplayer extends Component {
  constructor(props){
    super(props);
    this.state = {imagesBase64: []}
  }

  componentDidMount() {
      this.extractBase64();
  }

  extractBase64 = ()=>{
    const restResponseImages = this.props.images;
    const images = [];
    for (var i=0; i<restResponseImages.length;i++){
       var imageEntry ={original:"data:image/png;base64,"+restResponseImages[i].base64}
       images.push(imageEntry);
    }
    this.state.imagesBase64=images;
  }

  render() {
    this.extractBase64();
    return (
        <div className="imageContainer">
        <ImageGallery items={this.state.imagesBase64} />
        </div>
    );
  }
}
export default ImageDisplayer;
