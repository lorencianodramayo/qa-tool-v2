import apiService from "../../api/apiService";

const getTemplatesVersions = async (payload) => {
  const response = await apiService.get("/getTemplatesVersions", payload);
  return response.data;
};

const postTemplateVersion = async (payload) => {
  const response = await apiService.post("/postTemplateVersion", payload);
  return response.data;
};

const postTemplateVersionCloud = async (payload) => {
  const response = await apiService.post("/postTemplateVersionCloud", payload);
  return response.data;
};

const templateVersionService = {
  getTemplatesVersions,
  postTemplateVersion,
  postTemplateVersionCloud,
};

export default templateVersionService;
