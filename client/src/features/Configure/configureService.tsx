import apiService from "../../api/apiService";
const getTemplateSelectedVersion = async (payload) => {
  const response = await apiService.get('/getTemplateSelectedVersion', {
    params: payload
  });
  return response.data;
};
const configureService = {
  getTemplateSelectedVersion,
};
export default configureService;
