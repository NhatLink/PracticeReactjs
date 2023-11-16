import axios from "axios";

const request = axios.create({
  baseURL: "https://reqres.in/api/",
});

// export const get = async (path, options = {}) => {
//   const response = await request.get(path, options);
//   return response.data;
// };

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    console.log("check response axios:", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default request;
