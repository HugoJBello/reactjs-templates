import React,{ Component } from 'react';
import { last_images_base64,getListImages } from '../utils/image-backend-caller';
import ImageGallery from 'react-image-gallery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageList from './ImageList';

require('react-tabs/style/react-tabs.css');

class ImageDisplayer extends Component {
  constructor(props){
    super(props);
    this.state = {imagesBase64: [],
                  showGallery: false};
  }

  
  extractBase64 = ()=>{
    const restResponseImages = this.props.images;
    const images = [];
    for (var i=0; i<restResponseImages.length;i++){
       var imageEntry ={original:"data:image/png;base64,"+restResponseImages[i].base64,
                        originalTitle:restResponseImages[i].filename}
       images.push(imageEntry);
    }
    this.state.imagesBase64=images;
  }

  render() {
    if (this.props.loading) {
      return <div>loading ...</div>;
    } else {
    this.extractBase64();
    return (
        <div className="imageContainer">
        <Tabs>
          <TabList>
            <Tab>Images</Tab>
            <Tab>List</Tab>
          </TabList>
          <TabPanel>
            { (this.props.images.length>0) ? <ImageGallery items={this.state.imagesBase64} /> : null }
          </TabPanel>
          <TabPanel>
            <ImageList images={this.props.images}/>
          </TabPanel>
        </Tabs>
        </div>
    );
  }
}
}
export default ImageDisplayer;
