import apiService from "../../api/apiService";

const signIn = async (payload) => {
  const response = await apiService.post("/signin", payload);
  return response.data;
};

const authService = {
  signIn,
};

export default authService;
