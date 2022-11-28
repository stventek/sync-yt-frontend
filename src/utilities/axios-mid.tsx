import axios from 'axios';

axios.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken && request.headers){
      request.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
      return request;
  }
  return request;
});
