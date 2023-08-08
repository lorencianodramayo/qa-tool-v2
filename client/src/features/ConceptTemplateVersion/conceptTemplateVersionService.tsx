import apiService from '../../api/apiService'
const getVariants = async () => {
  const response = await apiService.get('/getVariants')
  return response.data
}
const conceptTemplateVersionService = {
  getVariants,
}
export default conceptTemplateVersionService
