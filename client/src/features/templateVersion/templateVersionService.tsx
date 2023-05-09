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
const postShareTemplateVersion = async (payload) => {
  const response = await apiService.post("/postShareTemplateVersion", payload);
  return response.data;
};
const getShareTemplateVersionTempUrl = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/v1/getShareTemplateVersionTempUrl/${id}`);
  return response.data;
};
const postTemplateVersionCloud = async (payload) => {
  const response = await apiService.post("/postTemplateVersionCloud", payload);
  return response.data;
};
const templateVersionService = {
  getTemplatesVersions,
  postTemplateVersion,
  postShareTemplateVersion,
  getShareTemplateVersionTempUrl,
  postTemplateVersionCloud,
};
export default templateVersionService;
