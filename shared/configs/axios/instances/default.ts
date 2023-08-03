import { userService } from '@/shared/services/user/UserService';
import axios from 'axios';

const customInstance = axios.create({
  baseURL: '',
  timeout: 10000,
});

const requestHandler = (request: any) => {
  console.log('requestHandler', userService.getAuthToken());
  request.headers = {
    Authorization: `Bearer ${userService.getAuthToken()}`,
    'Content-Type': 'Application/json',
  };

  return request;
};

const responseHandler = (response: any) => {
  if (response.status === 401) {
    console.error('UNAUTHENTICATED');
  }

  return response;
};

const errorHandler = (error: any) => {
  if (error.response.status === 401) {
    console.error('UNAUTHENTICATED');
  }
  return Promise.reject(error);
};

customInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customInstance;
