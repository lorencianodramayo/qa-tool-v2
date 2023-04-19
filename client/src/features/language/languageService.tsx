import apiService from "../../api/apiService";

const getLanguages = async () => {
  const response = await apiService.get("/languages");
  return response.data;
};

// const detectLanguage = async (payload) => {
//   const response = await apiService.post("/detectLanguage", payload);
//   return response.data;
// };

const postLanguage = async (payload) => {
  const response = await apiService.post("/addLanguage", payload);
  return response.data;
};

const postTranslate = async (payload) => {
  const response = await apiService.post("/translate", payload);
  return response.data;
};

// const postTranslateText = async (payload) => {
//   const response = await apiService.post("/translateText", payload);
//   return response.data;
// };

const languageService = {
  // detectLanguage,
  getLanguages,
  // postTranslateText,
  postLanguage,
  postTranslate,
};

export default languageService;
