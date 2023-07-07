import React, {FC} from 'react'
import _ from 'lodash'
type FrameProps = {
  refresh?: number
  width?: number
  height?: number
  bucketName?: string
  templateName?: string
  templateId?: string
  elements?: any
}
const Frame: FC<FrameProps> = ({
  refresh,
  width,
  height,
  bucketName,
  templateName,
  templateId,
  elements,
}) => {
  const onLoad = (e: any, data: any) => {
    e.preventDefault()
    let defaultValues = {}
    Object.keys(data).map((_data, index) =>
      Object.keys(data[_data]).map((child) => {
        if (child === 'text' || child === 'url') defaultValues[_data] = data[_data][child].value
        else if (child === 'image' || child === 'video')
          defaultValues[_data] = data[_data][child].src
      }),
    )
    window.addEventListener(
      'message',
      (event) => {
        console.log(event)
        console.log(event?.data)
        switch (event?.data?.type) {
          case 'SCREENSHOT_START':
          case 'SCREENSHOT':
            break
          case 'SCREENSHOT_STOP':
            break
          case 'UPDATE_VALUES':
            break

          default:
            console.log(event?.data?.type)
            break
        }
      },
      false,
    )
    e.target.contentWindow.postMessage(
      {
        ...defaultValues,
        type: 'setDefaultValues',
      },
      e.target.src,
    )
    document.addEventListener('visibilitychange', () => console.log('visibilitychange'))
  }
  return (
    !_.isUndefined(elements) && (
      <iframe
        key={refresh}
        style={{border: 0}}
        width={width}
        height={height}
        src={`https://storage.googleapis.com/${bucketName}/${templateId}/${templateName}/index.html`}
        title={templateName}
        onLoad={(e) => onLoad(e, elements)}
      />
    )
  )
}
export default Frame
