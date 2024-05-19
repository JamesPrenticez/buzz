import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  mockUsers,
  mockUserTasks,
} from '@mocks';
import { getUserId } from './getUserId';
import { ACCESS_TOKEN } from '@constant';
import * as jose from 'jose';
import { filterTasksByDate } from '@SQL';

const useMockData = false; //import.meta.env.VITE_ENV === "development" ? true : false;
const log = false;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // this enables us to send a HTTPOnly cookie automagically for JWT authentication
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
  console.log("using mock data")
  const mockAxiosInstance = new MockAdapter(axiosInstance, { delayResponse: 1500 });
  const user_id = getUserId();

  const mockAccessToken = await new jose.SignJWT({ "token_type": "access", "email": "jamesprenticez@gmail.com", "user_id": user_id})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('30m')
    .sign(new TextEncoder().encode('your_secret_key_goes_here'))
  
  const mockRefreshToken = await new jose.SignJWT({ "token_type": "refresh", "email": "jamesprenticez@gmail.com", "user_id": user_id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode('your_secret_key_goes_here'))
  
  // console.log(mockAccessToken, jose.decodeJwt(mockAccessToken))
  // console.log(mockRefreshToken, jose.decodeJwt(mockRefreshToken))

  //============================================
  // GET
  //============================================
  // User Details
  mockAxiosInstance.onGet('user/details').reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})
    console.log("calling api/user/details")

    // Rip the user email from access token
    // find user based on that

    return [200, { 
      data: {
        data: mockUsers[0]
      }
    }]
  });

  mockAxiosInstance.onGet('user/tasks').reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})
    console.log("calling api/user/tasks")

    const startDate = new Date('1993-07-01').toISOString();
    const endDate = new Date('1993-07-30').toISOString();
    const filteredTasks = filterTasksByDate(mockUserTasks, startDate, endDate);

    return [200, { 
      data: {
        data: filteredTasks
      }
    }]
  });



  //============================================
  // POST
  //============================================
  // LOGIN
  mockAxiosInstance.onPost('/login').reply((config) => {
    console.log(`Request to /api/login request made with ${config.data}! (aka Login)`)

    if(JSON.parse(config.data).email !== "jamesprenticez@gmail.com") {
      return [401, {message: "invalid credentials"}]
    }

    return [200, {
      data: {
        data: mockUsers[0],
        refreshToken: mockRefreshToken,
        accessToken: mockAccessToken
      }
    }];
  })

  mockAxiosInstance.onPost('/token/refresh').reply((config) => {
    console.log(`Request to /api/token/refresh request made with ${config.data}!`)

    if(JSON.parse(config.data).refresh !== mockRefreshToken){
      return [401, {message: "refresh token invalid"}]
    }

    return [200, {
      data: {
        access: mockAccessToken
      }
    }];
  })

  // Register
  mockAxiosInstance.onPost('/register').reply((config) => {
    console.log(`Register request made with ${config.data}!`)
    return [200, { message: "success" }];
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
