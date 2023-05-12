import apiService from "../../api/apiService";
const signIn = async (payload) => {
  const response = await apiService.post("/signin", payload);
  return response.data;
};
const authUser = async (payload) => {
  const response = await apiService.get("/auth/user", payload);
  if (!response) return "Unauthenticated";
  return response.data;
};
const authService = {
  signIn,
  authUser,
};
export default authService;
