import axios from 'axios';
axios.defaults.baseURL = process.env.BASEURL || 'http://localhost:5000'
const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
