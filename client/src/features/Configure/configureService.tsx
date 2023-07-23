import apiService from '../../api/apiService'
const postTemplateDefaultValues = async (payload) => {
  const response = await apiService.post('/template/defaultValues', payload)
  return response.data
}
const getTemplateSelectedVersion = async (payload) => {
  const response = await apiService.get('/getTemplateSelectedVersion', {
    params: payload,
  })
  return response.data
}
const configureService = {
  postTemplateDefaultValues,
  getTemplateSelectedVersion,
}
export default configureService
