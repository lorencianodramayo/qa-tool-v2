import apiService from "../../api/apiService";
const postTemplateVersionImageVideoCloud = async (payload) => {
  const response = await apiService.post('/postTemplateVersionImageVideoCloud', payload);
  return response.data;
};
const configureService = {
  postTemplateVersionImageVideoCloud,
};
export default configureService;
