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
const templateService = {
  getTemplate,
  postUpload,
}
export default templateService
