import apiService from "../../api/apiService";
const getSharedVariants = async (id) => {
  const response = await apiService.get(`/getSharedVariants/${id}`);
  return response.data;
};
const shareVariantService = {
  getSharedVariants,
};
export default shareVariantService;
