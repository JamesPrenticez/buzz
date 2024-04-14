import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  mockUsers,
} from '@mocks';
import { getUserId } from './getUserId';
import { ACCESS_TOKEN } from '@constant';

const useMockData = true //import.meta.env.VITE_ENV === "development" ? true : false;
const log = false;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // this enables us to send a HTTPOnly cookie automagically for JWT authentication
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

if (useMockData) {
  const mockAxiosInstance = new MockAdapter(axiosInstance, { delayResponse: 1500 });
  const userId = getUserId();

  //============================================
  // GET
  //============================================
  // User Details
  mockAxiosInstance.onGet(`user/${userId}`).reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})
    return [200, {data: mockUsers[0]}]
  });

  //============================================
  // POST
  //============================================
  mockAxiosInstance.onPost('/login').reply((config) => {
    console.log(`Login request made with ${config.data}!`)
    return [200, {data: mockUsers[0]}];
  })

  mockAxiosInstance.onPost('/register').reply((config) => {
    console.log(`Register request made with ${config.data}!`)
    return [200, {data: mockUsers[0]}];
  })

  mockAxiosInstance.onPost('/user').reply((config) => {
    console.log("mock POST request made!")
    return [200, { message: "success" }];
  })

  //============================================
  // PUT
  //============================================
  mockAxiosInstance.onPut('/user').reply((config) => {
    console.log("mock PUT request made!")
    return [200, { message: "success" }];
  })
}
