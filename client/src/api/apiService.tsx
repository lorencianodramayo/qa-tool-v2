import axios from "axios";
const token = localStorage.getItem("token");
const apiService = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: { Authorization: "Bearer " + token },
});
apiService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (403 === error.response.status) {
      window.location.href = "/unverified-email";
    }
    if (401 === error.response.status) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/") {
        // window.location.href = "/";
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiService;
