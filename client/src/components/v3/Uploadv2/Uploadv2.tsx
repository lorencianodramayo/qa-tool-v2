import {FC, useState} from 'react'
import {UploadOutlined} from '@ant-design/icons'
import {Button, Upload} from 'antd'
type UploadFileProps = {
  onFile: (file: File | null) => void
}
const UploadFile: FC<UploadFileProps> = ({onFile}) => {
  const [uploadedFile, setUploadedFile] = useState<any | null>(null)
  const props = {
    name: 'template',
    accept: 'image/*,video/*',
    multiple: false,
    beforeUpload: (file: File) => {
      setUploadedFile(file)
      onFile(file)
      return false
    },
    onRemove: () => {
      setUploadedFile(null)
      onFile(null)
    },
  }
  return (
    <Upload {...props} fileList={uploadedFile ? [uploadedFile] : []}>
      <Button icon={<UploadOutlined />} />
    </Upload>
  )
}
export default UploadFile
