import apiService from '../../../api/apiService'
const getLanguages = async () => {
  const response = await apiService.get('/languages/v3')
  return response.data
}
const getLanguage = async (_id: string) => {
  const response = await apiService.get(`/language/v3/${_id}`)
  return response.data
}
const postLanguage = async (payload: any) => {
  const response = await apiService.post('/language/v3', payload)
  return response.data
}
const putLanguage = async (payload: any) => {
  const response = await apiService.put(`/language/v3/${payload._id}`, payload.values)
  return response.data
}
const deleteLanguage = async (payload: any) => {
  const response = await apiService.delete(`/language/v3/${payload._id}`, payload.values)
  return response.data
}
const languageService = {
  getLanguages,
  getLanguage,
  postLanguage,
  putLanguage,
  deleteLanguage,
}
export default languageService
