import React,{ Component } from 'react';
import { last_images_base64,getListImages, queryImagesBase64,
  queryImagesBase64Today, queryImagesBase64Date, queryImagesBase64DatePaged, queryImagesBase64Paged } from '../utils/image-backend-caller';
import ImageDisplayer from './ImageDisplayer';
import QueryImageMenu from './QueryImageMenu';
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

class ImageMenu extends Component {
  constructor() {
    super();
    this.state = { images: [],
                  limit: 30,
                  skip: 0,
                  date: moment(),
                  queryMode:"anyday",
                  showPicker:false,
                  pagedSearch:false,
                  numberOfPages:null,
                  numberOfItems:null,
                  entriesPerPage:null,
                  page:1,
                  dateFormated: this.formatDate(moment())
                };
    this.queryImages();
    this.queryImages = this.queryImages.bind(this);
    this.queryImagesDate = this.queryImagesDate.bind(this);
    this.handleChangeLimit = this.handleChangeLimit.bind(this);
    this.handleQueryMode = this.handleQueryMode.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDatePicker(date) {
      this.setState({ dateFormated: this.formatDate(date) });
      this.setState({date});
    }

  formatDate = (moment) => {
    var dateMiliseconds = moment.toDate();
    return dateMiliseconds.getFullYear() + '-' +(dateMiliseconds.getMonth() + 1) + '-' +  dateMiliseconds.getDate();
  }

  handleChangeLimit(event) {
    this.setState({ limit:event.target.value,
                    pagedSearch: (event.target.value=='all')});
    //event.preventDefault();
  }

  handleQueryMode(event) {
    event.preventDefault();
    this.setState({ queryMode:event.target.value });
    if (event.target.value!=="anyday"){
      this.setState({ showPicker:true });
    } else {
      this.setState({ showPicker:false });
    }
  }

  handleChangePage(pageNumber) {
    this.setState({ page:pageNumber }, function() {
      if (this.state.queryMode=="anyday"){
        this.queryImagesPaged();
      } else {
        this.queryImagesDatePaged();
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.queryMode =="anyday"){
      if(this.state.pagedSearch){
        this.queryImagesPaged();
      }else{
        this.queryImages();
      }
    } else {
      if(this.state.pagedSearch){
        this.queryImagesDatePaged();
      } else{
        this.queryImagesDate();
      }
    }
  }

  queryImages() {
    queryImagesBase64(this.state.limit,this.state.skip).then((images) => {
      this.setState({ images:images });
    });
  }

  queryImagesDate() {
    queryImagesBase64Date(this.state.limit,this.state.skip,this.state.dateFormated).then((images) => {
      this.setState({ images:images });
    });
  }

  queryImagesDatePaged() {
    queryImagesBase64DatePaged(this.state.page,this.state.dateFormated).then((response) => {
      this.setState({ images:response.images,
                      numberOfPages:response.numberOfPages,
                      numberOfItems:response.numberOfItems,
                      entriesPerPage:response.entriesPerPage });
    });
  }
  queryImagesPaged() {
    queryImagesBase64Paged(this.state.page).then((response) => {
      this.setState({ images:response.images,
                      numberOfPages:response.numberOfPages,
                      numberOfItems:response.numberOfItems,
                      entriesPerPage:response.entriesPerPage });
    });
  }

  render() {
     return (
        <div>
        <QueryImageMenu limit={this.state.limit} queryMode={this.state.queryMode} showPicker={this.state.showPicker} date={this.state.date}
        handleQueryMode={this.handleQueryMode} handleChangeDatePicker={this.handleChangeDatePicker} handleChangeLimit={this.handleChangeLimit} handleSubmit={this.handleSubmit}/>

        <ImageDisplayer images={this.state.images}
                        showPager={this.state.pagedSearch} numberOfItems={this.state.numberOfItems}
                        entriesPerPage={this.state.entriesPerPage} activePage={this.state.page} handler={this.handleChangePage}/>
      </div>
    );
  }
}
export default ImageMenu;
