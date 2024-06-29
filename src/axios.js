import axios from 'axios';

const authToken = localStorage.getItem("accessToken");

// if (!authToken && window.location.pathname !== "/login" && !window.location.pathname.startsWith("/resetpassword")) {
//   window.location.href = "/login";
// }

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/',
  headers: {
    'authorization': `Bearer ${authToken}`
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  }
)

api.interceptors.response.use(
  response => {
    return response;
  }
  , error => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    return error;
  }
)

export default api;
