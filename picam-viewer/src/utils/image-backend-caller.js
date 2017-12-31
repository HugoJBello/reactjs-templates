import axios from 'axios';
import { getAccessToken } from './AuthService';

//const BASE_URL = 'http://192.168.1.34:3333';
const BASE_URL = 'http://localhost:3333';

export {getListImages, last_images_base64, queryImagesBase64,
      queryImagesBase64Today, queryImagesBase64Date,
      queryImagesBase64DatePaged,queryImagesBase64Paged};

function getListImages() {
  const url = `${BASE_URL}/get_list_images`;
  return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
function last_images_base64() {
  const url = `${BASE_URL}/images_base64/limit=10/skip=0`;
  return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
function queryImagesBase64(limit,skip) {
  const url = `${BASE_URL}/images_base64/limit=${limit}/skip=${skip}`;
  return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
function queryImagesBase64Today(limit,skip) {
  const url = `${BASE_URL}/images_base64_today/limit=${limit}/skip=${skip}`;
  return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
function queryImagesBase64Date(limit,skip,date) {
  const url = `${BASE_URL}/images_base64_date/limit=${limit}/skip=${skip}/day=${date}`;
  return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
function queryImagesBase64DatePaged(page,date) {
  const url = `${BASE_URL}/images_base64_date_paged/day=${date}/page=${page}`;
  console.log(url);
  return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
function queryImagesBase64Paged(page) {
  const url = `${BASE_URL}/images_base64_paged/page=${page}`;
  console.log(url);
  return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
