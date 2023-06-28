import React, {FC} from 'react'
import PropTypes from 'prop-types'
import {InboxOutlined} from '@ant-design/icons'
import {Upload} from 'antd'
import {UploadFile as RcFile} from 'antd/lib/upload/interface'

const {Dragger} = Upload

type UploadFileProps = {
  onFileDrag: (file: RcFile | '') => void
}

const UploadFile: FC<UploadFileProps> = ({onFileDrag}) => {
  const props = {
    name: 'template',
    accept: 'application/zip',
    multiple: false,
    contentType: false,
    processData: false,
    beforeUpload: (file: RcFile) => {
      onFileDrag(file)
      return false
    },
    onRemove: () => {
      onFileDrag('')
    },
  }

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single upload. Strictly prohibited from uploading company data or other banned
        files.
      </p>
    </Dragger>
  )
}

UploadFile.propTypes = {
  onFileDrag: PropTypes.func,
}

export default UploadFile
