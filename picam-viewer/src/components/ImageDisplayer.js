import React,{ Component } from 'react';
import { last_images_base64,getListImages } from '../utils/image-backend-caller';
import ImageGallery from 'react-image-gallery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageList from './ImageList';
import Pagination from 'react-js-pagination';

require('react-tabs/style/react-tabs.css');

class ImageDisplayer extends Component {
  constructor(props){
    super(props);
    this.state = {imagesBase64: [],
                  showGallery: false,
                  loading: true};
   this.handleOnLoad = this.handleOnLoad.bind(this);

  }
  componentDidMount= ()=> {
    this.state.loading=false;
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
  handleOnLoad(event){
    this.state.loading=false;
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
            { (this.state.loading) ? <div class="loader"></div> : null}
            { (this.props.images.length>0) ? <ImageGallery items={this.state.imagesBase64} onLoad={this.handleOnLoad}/> : null }
          </TabPanel>
          <TabPanel>
            <ImageList images={this.props.images}/>
          </TabPanel>
        </Tabs>
          { (this.props.showPager) ? <Pagination
                                    activePage={this.props.activePage}
                                    itemsCountPerPage={this.props.entriesPerPage}
                                    totalItemsCount={this.props.numberOfItems}
                                    pageRangeDisplayed={5}
                                    onChange={this.props.handler}
                                  />: null}
        </div>
    );
  }
}

export default ImageDisplayer;
