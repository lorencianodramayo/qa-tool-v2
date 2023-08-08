import apiService from '../../api/apiService'
import axios from 'axios'
const getTemplatesVersions = async () => {
  const response = await apiService.get('/getTemplatesVersions')
  return response.data
}
const postTemplateVersion = async (payload: any) => {
  const response = await apiService.post('/postTemplateVersion', payload)
  return response.data
}
const postSharedVariants = async (payload: any) => {
  const response = await apiService.post('/postSharedVariants', payload)
  return response.data
}
const postTemplateVersionCloud = async (payload: any) => {
  const response = await apiService.post('/postTemplateVersionCloud', payload)
  return response.data
}
const templateVersionService = {
  getTemplatesVersions,
  postTemplateVersion,
  postTemplateVersionCloud,
  postSharedVariants,
}
export default templateVersionService
