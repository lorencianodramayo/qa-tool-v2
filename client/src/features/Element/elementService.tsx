import apiService from '../../api/apiService'
const getLanguages = async (payload) => {
  const response = await apiService.get('/element/languages', {
    params: payload,
  })
  return response.data
}
const postUploadXlsx = async (payload) => {
  const response = await apiService.post('/element/upload/xlsx', payload)
  return response.data
}
const elementService = {
  getLanguages,
  postUploadXlsx,
}
export default elementService
