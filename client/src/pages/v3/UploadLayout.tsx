import React, {useEffect} from 'react'
import {Layout, Space, Typography, Divider, Button} from 'antd'
import styled from 'styled-components'
import UploadFile from '../../components/v3/Upload/Upload'
import {useAppDispatch, useAppSelector} from '../../store'
import {useNavigate} from 'react-router-dom'
import _ from 'lodash'
import {uploadTemplate} from '../../features/v3/Upload/uploadSlice'
const {Title} = Typography
const LayoutStyled = styled(Layout)`
  width: 75%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const UploadLayout: React.FC<any> = ({}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [zipFile, setZipFile] = React.useState(null)
  const {upload, isUploadLoading} = useAppSelector((state) => state.upload)
  useEffect(() => {
    !_.isEmpty(upload) && navigate(`/qa-tool-v3/configure/template/${upload.data}`)
  }, [navigate, upload])
  const handleUploadFile = (file) => {
    setZipFile(file)
  }
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', zipFile)
    dispatch(uploadTemplate(formData))
  }
  return (
    <LayoutStyled>
      <Space
        style={{
          marginLeft: 20,
        }}
      >
        <Title className="mx-4" level={3}>
          Upload Template Zip
        </Title>
      </Space>
      <Divider />
      <div
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <UploadFile onFileDrag={handleUploadFile} />
      </div>
      <Divider />
      <Space
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 15,
          marginRight: 15,
        }}
      >
        <Button
          type="primary"
          disabled={_.isEmpty(zipFile)}
          loading={isUploadLoading}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Space>
    </LayoutStyled>
  )
}

export default UploadLayout
