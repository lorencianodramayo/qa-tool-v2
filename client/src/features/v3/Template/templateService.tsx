import axios from 'axios'
import apiService from '../../../api/apiService'
const getTemplate = async (id: any) => {
  const response = await apiService.get('/template/', {
    params: {
      id,
    },
  })
  return response.data.data
}
const postUpload = async (payload: any) => {
  const response = await apiService.post('/template/upload', payload)
  return response.data.data
}
const postTemplateVersions = async (payload: any) => {
  const response = await apiService.post('/template/versions', payload)
  return response.data
}
const getTemplateVersion = async (id: string) => {
  const response = await apiService.get(`/template/versions/${id}`)
  return response.data.data
}
const templateService = {
  getTemplate,
  postUpload,
  postTemplateVersions,
  getTemplateVersion,
}
export default templateService
