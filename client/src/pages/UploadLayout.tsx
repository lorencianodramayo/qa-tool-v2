import React from 'react'
import {Layout, Space, Typography, Divider, Button} from 'antd'
import styled from 'styled-components'
import UploadFile from '../components/Upload'
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
  const handleUploadFile = (file) => {
    console.log(file)
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
        <Button type="primary">Upload</Button>
      </Space>
    </LayoutStyled>
  )
}

export default UploadLayout
