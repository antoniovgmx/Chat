var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  /* other custom settings */
});

module.exports.axiosConfig = axiosInstance;