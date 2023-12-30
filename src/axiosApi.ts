import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://js-well-default-rtdb.europe-west1.firebasedatabase.app/',

});

export default axiosApi;