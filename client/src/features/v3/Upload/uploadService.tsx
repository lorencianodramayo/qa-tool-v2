import apiService from '../../../api/apiService'
const uploadTemplate = async (payload: any) => {
  const response = await apiService.post('/upload', payload)
  return response.data
}
const uploadService = {
  uploadTemplate,
}
export default uploadService
