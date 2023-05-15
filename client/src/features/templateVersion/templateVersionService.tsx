import apiService from "../../api/apiService";
import axios from "axios";
const getTemplatesVersions = async (payload) => {
  const response = await apiService.get("/getTemplatesVersions", payload);
  return response.data;
};
const postTemplateVersion = async (payload) => {
  const response = await apiService.post("/postTemplateVersion", payload);
  return response.data;
};
const postSharedVariants = async (payload) => {
  const response = await apiService.post("/postSharedVariants", payload);
  return response.data;
};
const postTemplateVersionCloud = async (payload) => {
  const response = await apiService.post("/postTemplateVersionCloud", payload);
  return response.data;
};
const templateVersionService = {
  getTemplatesVersions,
  postTemplateVersion,
  postSharedVariants,
  postTemplateVersionCloud,
};
export default templateVersionService;
