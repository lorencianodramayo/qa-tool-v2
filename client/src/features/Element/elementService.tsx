import apiService from "../../api/apiService";
const getLanguages = async (payload) => {
  const response = await apiService.get('/languages', {
    params: payload
  });
  return response.data;
};
const elementService = {
  getLanguages,
};
export default elementService;
