import React,{ Component } from 'react';
import { last_images_base64,getListImages } from '../utils/image-backend-caller';
import ImageGallery from 'react-image-gallery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageList from './ImageList';

require('react-tabs/style/react-tabs.css');

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
       var imageEntry ={original:"data:image/png;base64,"+restResponseImages[i].base64,
                        originalTitle:restResponseImages[i].filename}
       images.push(imageEntry);
    }
    this.state.imagesBase64=images;
  }

  render() {
    this.extractBase64();
    return (
        <div className="imageContainer">
        <Tabs>
          <TabList>
            <Tab>Images</Tab>
            <Tab>List</Tab>
          </TabList>
          <TabPanel>
            <ImageGallery items={this.state.imagesBase64} />
          </TabPanel>
          <TabPanel>
            <ImageList images={this.props.images}/>
          </TabPanel>
        </Tabs>
        </div>
    );
  }
}
export default ImageDisplayer;
