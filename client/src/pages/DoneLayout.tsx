// @ts-nocheck
import styled from 'styled-components'
import {Button, Spin, Layout, Space, notification, Steps, Collapse} from 'antd'
import {useEffect, useState} from 'react'
import {ProfileFilled, CaretRightOutlined} from '@ant-design/icons'
import {useLocation, useNavigate} from 'react-router-dom'
import {
  postTemplateVersion,
  postTemplateVersionCloud,
} from '../features/templateVersion/templateVersionSlice'
import {useDispatch, useSelector} from 'react-redux'
import {postTemplateVersionImageVideoCloud} from '../features/Done/doneSlice'
import {useAppDispatch, useAppSelector} from '../store'
const {Panel} = Collapse
const LayoutStyled = styled(Layout)`
  width: 71.7em;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  display: flex;
  background: #fff;

  position: absolute;
  margin: 58.7px auto 0 auto;
  left: 0;
  right: 0;
`
const StepsStyled = styled(Steps)`
  width: 628px;
  &.ant-steps .ant-steps-item-container {
    align-items: center;
    display: flex;
  }
  &.ant-steps .ant-steps-item-process .ant-steps-item-icon {
    width: 27.6px;
    height: 27.6px;
    background-color: #1890ff;
    border-color: #1890ff;
  }
  &.ant-steps .ant-steps-item-wait .ant-steps-item-icon {
    width: 27.6px;
    height: 27.6px;
    background-color: #fff;
    border-color: rgba(0, 0, 0, 0.25);
  }
  &.ant-steps .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: #fff;
    font-weight: 400;
    font-size: 16px;
  }
  &.ant-steps .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
    color: rgba(0, 0, 0, 0.25);
    font-weight: 400;
    font-size: 16px;
  }
  &.ant-steps
    .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    font-size: 16px;
  }
  &.ant-steps
    .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: rgba(0, 0, 0, 0.45);
    font-weight: 400;
    font-size: 16px;
  }
  &.ant-steps
    .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-icon {
    border-color: #1890ff;
  }
  &.ant-steps
    .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-icon
    .ant-steps-icon {
    color: #1890ff;
  }
  &.ant-steps
    .ant-steps-item:not(.ant-steps-item-active)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-title {
    color: #1890ff;
  }
  &.ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: #1890ff;
    width: 27.6px;
    height: 27.6px;
  }
  &.ant-steps .ant-steps-item-icon .ant-steps-icon {
    top: -2px;
  }
  &.ant-steps .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #1890ff;
  }
`
const DivMenuStyled = styled.div`
  margin: 0 4px;
  float: left;
`
const DivMenuItemStyled = styled.div`
  width: 100%;
  display: flex;
  padding: 2.5px 10px;
  align-items: center;
  margin-bottom: 4px;
  margin-top: 4px;
  :hover {
    background-color: #1890ff !important;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
  }
`
const CollapseStyled = styled(Collapse)`
  background-color: #1890ff;
  border-color: #1890ff;
  &.ant-collapse>.ant-collapse-item: last-child>.ant-collapse-header {
    color: #fff;
    font-weight: bold;
  }
  &.ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
    margin-bottom: 1px;
  }
`
const ButtonDoneStyled = styled(Button)`
  background-color: #1890ff;
  &.ant-btn-primary:not(:disabled):hover {
    background-color: #1890ff;
    border-color: #1890ff;
  }
  &.ant-btn-primary:not(:disabled):focus {
    outline: none;
  }
  &.ant-btn:not(:disabled):focus-visible {
    outline: none;
  }
`
export default function DoneLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const dispatchv2 = useAppDispatch()
  const templateName: string = location.state.templateName
  const templates: any = location.state.templates
  const templateDefaultValues: any = location.state.templateDefaultValues
  const [possibleValues, setPossibleValues] = useState<any>([])
  const [currentStep, _] = useState<number>(2)
  const [templateIndex, setTemplateIndex] = useState<number>(0)
  const [imageVideoFiles, setImageVideoFiles] = useState<any>([])
  const {
    addTemplateVersion,
    isAddTemplateVersionSuccess,
    addSharedVariant,
    isAddTemplateVersionCloudSuccess,
    isAddTemplateVersionCloudError,
  } = useSelector((state: any) => state.templateVersion)
  const {
    templateVersionImageVideoCloud,
    isTemplateVersionImageVideoCloudSuccess,
    isTemplateVersionImageVideoCloudError,
  } = useAppSelector((state: any) => state.done)
  const [loading, setLoading] = useState<boolean>(false)
  const [_templates, _setTemplates] = useState<any>([])
  const [api, contextHolder] = notification.useNotification()
  useEffect(() => {
    if (
      typeof templates[templateIndex].possibleValues === 'object' &&
      templates[templateIndex].possibleValues !== null &&
      !Array.isArray(templates[templateIndex].possibleValues)
    ) {
      for (const [key, _] of Object.entries(templates[templateIndex].possibleValues)) {
        setPossibleValues((possibleValues) => [...possibleValues, key])
      }
    }
    if (
      Array.isArray(templates[templateIndex].possibleValues) &&
      templates[templateIndex].possibleValues.every(
        (item) => typeof item === 'object' && item !== null && !Array.isArray(item),
      )
    ) {
      for (const obj of templates[templateIndex].possibleValues) {
        const key = obj.key
        setPossibleValues((possibleValues) => [...possibleValues, key])
      }
    }
  }, [templateIndex])
  useEffect(() => {
    if (isAddTemplateVersionSuccess) {
      let templatesVersions = []
      addTemplateVersion.templatesVersions.map((templatesVersion: any, i: number) => {
        let data = {
          creativeId: templatesVersion._id,
          templateUrl: _templates[i].url,
        }
        templatesVersions.push(data)
      })
      dispatch(postTemplateVersionCloud(templatesVersions))
    }
  }, [isAddTemplateVersionSuccess, addTemplateVersion])
  useEffect(() => {
    if (isAddTemplateVersionCloudSuccess) {
      let files = []
      addTemplateVersion.templatesVersions.map((templatesVersion: any, i: number) => {
        if (_templates[i].defaultDynamicFieldsValuesFiles)
          files.push({
            creativeId: templatesVersion._id,
            files: _templates[i].defaultDynamicFieldsValuesFiles,
          })
      })
      const formData = new FormData()
      if (files.length > 0) {
        files.forEach((fileObject) => {
          formData.append(`files[${fileObject.creativeId}][creativeId]`, fileObject.creativeId)
          fileObject.files.forEach((nestedFile) => {
            formData.append(
              `files[${fileObject.creativeId}][files][${nestedFile.dynamicElementKey}][dynamicElementKey]`,
              nestedFile.dynamicElementKey,
            )
            formData.append(
              `files[${fileObject.creativeId}][files][${nestedFile.dynamicElementKey}][fileData]`,
              nestedFile.fileData,
              nestedFile.fileData.name,
            )
          })
        })
        setImageVideoFiles(files)
        dispatchv2(postTemplateVersionImageVideoCloud(formData))
      } else {
        const interval = setInterval(() => {
          navigate('/qa-tool-v2/concept_template_version', {
            state: {
              templateName: templateName,
              templates: templates,
              addTemplateVersion: addTemplateVersion,
              imageVideoFiles: imageVideoFiles,
            },
            replace: true,
          })
        }, 1000)
        return () => clearInterval(interval)
      }
      // let files = [{
      //   id: '1',
      //   files: [{
      //     id: 'logo',
      //     fileData: file
      //   }, {
      //     id: 'image',
      //     fileData: file
      //   }, {
      //     id: 'background',
      //     fileData: file
      //   }],
      // }, {
      //   id: '2',
      //   files: [{
      //     id: 'icon',
      //     fileData: file
      //   }, {
      //     id: 'photo',
      //     fileData: file
      //   }],
      // }];
      // const formData = new FormData();
      // files.forEach((fileObject) => {
      //   formData.append(`files[${fileObject.id}][id]`, fileObject.id);
      //   fileObject.files.forEach((nestedFile) => {
      //     formData.append(
      //       `files[${fileObject.id}][files][${nestedFile.id}][id]`,
      //       nestedFile.id
      //     );
      //     formData.append(
      //       `files[${fileObject.id}][files][${nestedFile.id}][file]`,
      //       nestedFile.fileData,
      //       nestedFile.fileData.name // Include the file name
      //     );
      //   });
      // });
    }
    if (isAddTemplateVersionCloudError) {
      api['error']({
        message: 'Done',
        description: 'Error Generating Templates, please try again!',
      })
      setLoading(false)
    }
  }, [addTemplateVersion, isAddTemplateVersionCloudSuccess, isAddTemplateVersionCloudError])
  useEffect(() => {
    if (isTemplateVersionImageVideoCloudSuccess) {
      const interval = setInterval(() => {
        navigate('/qa-tool-v2/concept_template_version', {
          state: {
            templateName: templateName,
            templates: templates,
            addTemplateVersion: addTemplateVersion,
            imageVideoFiles: imageVideoFiles,
          },
          replace: true,
        })
      }, 1000)
      return () => clearInterval(interval)
    }
    if (isTemplateVersionImageVideoCloudError) {
      api['error']({
        message: 'Done',
        description: 'Error Generating Templates Asset, please try again!',
      })
      setLoading(false)
    }
  }, [isTemplateVersionImageVideoCloudSuccess, isTemplateVersionImageVideoCloudError])
  const activeStyle = {
    backgroundColor: '#1890ff',
    borderRadius: 5,
    color: '#fff',
  }
  const onChangeSteps = (value: number) => {
    if (value === 1)
      navigate('/qa-tool-v2/configure/generate/elements', {
        state: {
          templateName: templateName,
          templates: location.state.templates,
          templateDefaultValues: templateDefaultValues,
          conceptLinkValue: location.state.conceptLinkValue,
          selectAll: location.state.selectAll,
          selectedValues: location.state.selectedValues,
          languageSelected: location.state !== null ? location.state.languageSelected : null,
        },
        replace: true,
      })
  }
  function isMediaType(value: string) {
    var imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i
    var videoExtensions = /\.(mp4|avi|mov|wmv|flv|mkv)$/i
    if (value.match(imageExtensions) || value.match(videoExtensions)) {
      return true
    }
  }
  function isColor(value: string) {
    function isRGBColor(value) {
      if (value.startsWith('rgb(') && value.endsWith(')')) {
        const values = value.substring(4, value.length - 1).split(',')
        if (values.length === 3) {
          const [r, g, b] = values.map(Number)
          return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255
        }
      }
      return false
    }
    function isRGBAColor(value) {
      if (value.startsWith('rgba(') && value.endsWith(')')) {
        const values = value.substring(5, value.length - 1).split(',')
        if (values.length === 4) {
          const [r, g, b, a] = values.map(Number)
          return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1
        }
      }
      return false
    }
    function isHexColor(value) {
      if (value.startsWith('#') && (value.length === 4 || value.length === 7)) {
        const hex = value.substring(1)
        return /^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{3}$/.test(hex)
      }
      return false
    }
    return isRGBColor(value) || isRGBAColor(value) || isHexColor(value)
  }
  function isURL(url: string) {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }
  function isNumberWithPercentage(value: string) {
    const regex = /^-?\d+(\.\d+)?%$/
    return regex.test(value)
  }
  const textHeadingLegalMaxValue = (content: any) => {
    let html = content
    let div = document.createElement('div')
    div.innerHTML = html
    let textHeadingLegal = div.textContent || div.innerText || ''
    return textHeadingLegal.length
  }
  const renderTemplateConfigurations = (template: any, possibleValues: any) => {
    return (
      <Space direction="vertical" style={{width: '100%', marginLeft: 18}}>
        <CollapseStyled
          expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          defaultActiveKey={['1']}
          accordion
        >
          <Panel header={template.dynamicElements.length + ' Dynamic Elements'} key={0}>
            {template.dynamicElements.map((dynamicElement) => (
              <Space.Compact block style={{fontWeight: 'bold', paddingLeft: 10, color: '#1890ff'}}>
                {dynamicElement}
              </Space.Compact>
            ))}
          </Panel>
        </CollapseStyled>
        {template.dynamicElements.map((dynamicElement, i) => {
          if (!possibleValues.includes(dynamicElement) || possibleValues.length === 0) {
            if (isMediaType(template.defaultDynamicFieldsValues[dynamicElement]))
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                  </Space>
                  <Space
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid #1890ff',
                      borderRadius: 5,
                      padding: 4,
                    }}
                  >
                    {template.defaultDynamicFieldsValues[dynamicElement]}
                  </Space>
                </Space>
              )
            else if (isColor(template.defaultDynamicFieldsValues[dynamicElement]))
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={
                        template.defaultDynamicFieldsValues[dynamicElement] ===
                          'rgb(255, 255, 255)' ||
                        template.defaultDynamicFieldsValues[dynamicElement] === '#fff' ||
                        template.defaultDynamicFieldsValues[dynamicElement] === '#ffffff' ||
                        template.defaultDynamicFieldsValues[dynamicElement] === '#FFFFFF' ||
                        template.defaultDynamicFieldsValues[dynamicElement] === '#FFF' ||
                        template.defaultDynamicFieldsValues[dynamicElement].toLowerCase() ===
                          'white'
                          ? {
                              background: '-webkit-linear-gradient(#eee, #333)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              border: '2px solid #1890ff',
                              borderRadius: 5,
                              padding: 4,
                            }
                          : {
                              color: template.defaultDynamicFieldsValues[dynamicElement],
                              border: '2px solid #1890ff',
                              borderRadius: 5,
                              padding: 4,
                            }
                      }
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                </Space>
              )
            else if (isURL(template.defaultDynamicFieldsValues[dynamicElement]))
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        border: '2px solid #1890ff',
                        borderRadius: 5,
                        padding: 4,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                </Space>
              )
            else if (/^-?\d*\.?\d+$/.test(template.defaultDynamicFieldsValues[dynamicElement]))
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        border: '2px solid #1890ff',
                        borderRadius: 5,
                        padding: 4,
                      }}
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                </Space>
              )
            else if (isNumberWithPercentage(template.defaultDynamicFieldsValues[dynamicElement]))
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        border: '2px solid #1890ff',
                        borderRadius: 5,
                        padding: 4,
                      }}
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                </Space>
              )
            else if (Number(template.defaultDynamicFieldsValues[dynamicElement]) > 0)
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                  </Space>
                  <Space
                    style={{
                      border: '2px solid #1890ff',
                      borderRadius: 5,
                      padding: 4,
                    }}
                  >
                    {template.defaultDynamicFieldsValues[dynamicElement]}
                  </Space>
                </Space>
              )
            else if (Number(template.defaultDynamicFieldsValues[dynamicElement]) < 0)
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                  </Space>
                  <Space
                    style={{
                      border: '2px solid #1890ff',
                      borderRadius: 5,
                      padding: 4,
                    }}
                  >
                    {template.defaultDynamicFieldsValues[dynamicElement]}
                  </Space>
                </Space>
              )
            else if (/^\d+(,\d+)*$/.test(template.defaultDynamicFieldsValues[dynamicElement]))
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        border: '2px solid #1890ff',
                        borderRadius: 5,
                        padding: 4,
                      }}
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                </Space>
              )
            else if (
              /^\((-?\d+(\.\d+)?|-\.\d+)\)$/.test(
                template.defaultDynamicFieldsValues[dynamicElement],
              )
            )
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        border: '2px solid #1890ff',
                        borderRadius: 5,
                        padding: 4,
                      }}
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                </Space>
              )
            else if (dynamicElement.includes('cssAttrib') || dynamicElement.includes('Variable'))
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        border: '2px solid #1890ff',
                        borderRadius: 5,
                        padding: 4,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                </Space>
              )
            else
              return (
                <Space
                  key={i}
                  direction="horizontal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20.4,
                    marginLeft: 15,
                  }}
                >
                  <Space>
                    <Space
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 132,
                        color: '#1890ff',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        border: '2px solid #1890ff',
                        borderRadius: 5,
                        padding: 4,
                      }}
                    >
                      {template.defaultDynamicFieldsValues[dynamicElement]}
                    </Space>
                  </Space>
                  <Space
                    style={{
                      border: '2px solid #1890ff',
                      borderRadius: 5,
                      padding: 4,
                    }}
                  >
                    {textHeadingLegalMaxValue(template.defaultDynamicFieldsValues[dynamicElement])}
                  </Space>
                </Space>
              )
          }
        })}
      </Space>
    )
  }
  return (
    <LayoutStyled>
      {contextHolder}
      {loading && (
        <Space
          style={{
            zIndex: 10,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Spin
            size="large"
            style={{
              top: '50%',
              left: '50%',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Space>
      )}
      <Space
        style={{
          justifyContent: 'center',
          marginTop: 42.1,
        }}
      >
        <StepsStyled
          current={currentStep}
          onChange={onChangeSteps}
          items={[
            {
              title: 'Configure',
            },
            {
              title: 'Generate',
            },
            {
              title: 'Done',
            },
          ]}
        />
      </Space>
      <div
        style={{
          marginTop: 42.4,
          color: '#000',
          marginBottom: 42.4,
          pointerEvents: loading ? 'none' : 'unset',
        }}
      >
        <DivMenuStyled style={{width: '20%'}}>
          {templates.map((template, i) => (
            <DivMenuItemStyled
              key={i}
              onClick={() => {
                setTemplateIndex(i)
              }}
              style={templateIndex === i ? activeStyle : {}}
            >
              <ProfileFilled style={{marginRight: 4, fontSize: '18px'}} />
              {template.size} - {template.name}
            </DivMenuItemStyled>
          ))}
        </DivMenuStyled>
        <div
          style={{
            float: 'left',
            width: '74%',
            borderLeft: '1px solid #F0F0F0',
          }}
        >
          {renderTemplateConfigurations(templates[templateIndex], possibleValues)}
        </div>
        <Space style={{width: '100%', justifyContent: 'right'}}>
          <Space style={{margin: '10px 20px 0 0'}}>
            <ButtonDoneStyled
              type="primary"
              onClick={() => {
                let _templatesVersions = []
                let __templates = []
                templates.map((template: any) => {
                  let templateVariants = []
                  if (template.hasOwnProperty('possibleValues')) {
                    let possibleValues = template.possibleValues
                    let possibleValuesKeys = Object.keys(possibleValues)
                    let possibleValuesRowLength = []
                    possibleValuesKeys.map((key, i) => {
                      if (i === 1)
                        if (i < possibleValuesKeys.length - 1)
                          possibleValuesRowLength.push(possibleValues[key].length)
                    })
                    if (possibleValuesKeys.length > 2) {
                      let g = 0
                      while (g < 2) {
                        let t = 0
                        while (t < possibleValues[possibleValuesKeys[0]].length) {
                          let i = 0
                          while (i < Math.max(...possibleValuesRowLength)) {
                            let n = 1
                            let variants_1 =
                              g === 1
                                ? 'MIN-' + possibleValues[possibleValuesKeys[0]][t]
                                : 'MAX-' + possibleValues[possibleValuesKeys[0]][t]
                            while (n < possibleValuesKeys.length - 1) {
                              if (possibleValues[possibleValuesKeys[n]][i] !== undefined) {
                                variants_1 += '-' + possibleValues[possibleValuesKeys[n]][i]
                              }
                              n++
                              if (n === possibleValuesKeys.length - 1) {
                                let e = 0
                                while (
                                  e <
                                  possibleValues[possibleValuesKeys[possibleValuesKeys.length - 1]]
                                    .length
                                ) {
                                  let variants_2 = ''
                                  variants_2 +=
                                    variants_1 + '-' + possibleValues[possibleValuesKeys[n]][e]
                                  if (variants_2.includes('MIN')) {
                                    let defaultValues = {}
                                    const defaultValuesTemplate = templateDefaultValues.find(
                                      (defaultValue: any) =>
                                        defaultValue.templateId === template._id,
                                    )
                                    for (const [key, value] of Object.entries(
                                      template.defaultDynamicFieldsValues,
                                    )) {
                                      delete defaultValuesTemplate.defaultValues[key]
                                      if (
                                        key.toLowerCase().includes('text') ||
                                        key.toLowerCase().includes('headline') ||
                                        key.toLowerCase().includes('legal') ||
                                        key.toLowerCase().includes('subheadline')
                                      ) {
                                        let html = `${value}`
                                        let div = document.createElement('div')
                                        div.innerHTML = html
                                        let textLegalHeading =
                                          div.textContent || div.innerText || ''
                                        defaultValues[key] = textLegalHeading.slice(
                                          0,
                                          Math.round(textLegalHeading.length / 2),
                                        )
                                      } else if (template.possibleValues.hasOwnProperty(key))
                                        defaultValues[key] =
                                          possibleValues[possibleValuesKeys[0]][t]
                                      else defaultValues[key] = value
                                    }
                                    templateVariants.push({
                                      variantName: variants_2,
                                      size: template.size,
                                      templateName: template.name,
                                      defaultValues: {
                                        ...defaultValues,
                                        ...defaultValuesTemplate.defaultValues,
                                      },
                                    })
                                  } else {
                                    let defaultValues = {}
                                    const defaultValuesTemplate = templateDefaultValues.find(
                                      (defaultValue: any) =>
                                        defaultValue.templateId === template._id,
                                    )
                                    for (const [key, value] of Object.entries(
                                      template.defaultDynamicFieldsValues,
                                    )) {
                                      delete defaultValuesTemplate.defaultValues[key]
                                      if (template.possibleValues.hasOwnProperty(key))
                                        defaultValues[key] =
                                          possibleValues[possibleValuesKeys[0]][t]
                                      else defaultValues[key] = value
                                    }
                                    templateVariants.push({
                                      variantName: variants_2,
                                      size: template.size,
                                      templateName: template.name,
                                      defaultValues: {
                                        ...defaultValues,
                                        ...defaultValuesTemplate.defaultValues,
                                      },
                                    })
                                  }
                                  e++
                                }
                              }
                            }
                            i++
                          }
                          t++
                        }
                        g++
                      }
                    } else {
                      let g = 0
                      while (g < 2) {
                        let t = 0
                        while (
                          t <
                          possibleValues[
                            possibleValuesKeys[
                              possibleValuesKeys.length - possibleValuesKeys.length
                            ]
                          ].length
                        ) {
                          let variants_1 = ''
                          if (possibleValuesKeys.length > 1) {
                            let i = 0
                            variants_1 +=
                              g === 1
                                ? 'MIN-' + possibleValues[possibleValuesKeys[0]][t]
                                : 'MAX-' + possibleValues[possibleValuesKeys[0]][t]
                            while (
                              i <
                              possibleValues[possibleValuesKeys[possibleValuesKeys.length - 1]]
                                .length
                            ) {
                              let variants_2 = ''
                              variants_2 +=
                                variants_1 +
                                '-' +
                                possibleValues[possibleValuesKeys[possibleValuesKeys.length - 1]][i]
                              if (variants_2.includes('MIN')) {
                                let defaultValues = {}
                                const defaultValuesTemplate = templateDefaultValues.find(
                                  (defaultValue: any) => defaultValue.templateId === template._id,
                                )
                                for (const [key, value] of Object.entries(
                                  template.defaultDynamicFieldsValues,
                                )) {
                                  delete defaultValuesTemplate.defaultValues[key]
                                  if (
                                    key.toLowerCase().includes('text') ||
                                    key.toLowerCase().includes('headline') ||
                                    key.toLowerCase().includes('legal') ||
                                    key.toLowerCase().includes('subheadline')
                                  ) {
                                    let html = `${value}`
                                    let div = document.createElement('div')
                                    div.innerHTML = html
                                    let textLegalHeading = div.textContent || div.innerText || ''
                                    defaultValues[key] = textLegalHeading.slice(
                                      0,
                                      Math.round(textLegalHeading.length / 2),
                                    )
                                  } else if (template.possibleValues.hasOwnProperty(key))
                                    defaultValues[key] = possibleValues[possibleValuesKeys[0]][t]
                                  else defaultValues[key] = value
                                }
                                templateVariants.push({
                                  variantName: variants_2,
                                  size: template.size,
                                  templateName: template.name,
                                  defaultValues: {
                                    ...defaultValues,
                                    ...defaultValuesTemplate.defaultValues,
                                  },
                                })
                              } else {
                                let defaultValues = {}
                                const defaultValuesTemplate = templateDefaultValues.find(
                                  (defaultValue: any) => defaultValue.templateId === template._id,
                                )
                                for (const [key, value] of Object.entries(
                                  template.defaultDynamicFieldsValues,
                                )) {
                                  delete defaultValuesTemplate.defaultValues[key]
                                  if (template.possibleValues.hasOwnProperty(key))
                                    defaultValues[key] = possibleValues[possibleValuesKeys[0]][t]
                                  else defaultValues[key] = value
                                }
                                templateVariants.push({
                                  variantName: variants_2,
                                  size: template.size,
                                  templateName: template.name,
                                  defaultValues: {
                                    ...defaultValues,
                                    ...defaultValuesTemplate.defaultValues,
                                  },
                                })
                              }
                              i++
                            }
                          } else {
                            variants_1 +=
                              g === 1
                                ? 'MIN-' + possibleValues[possibleValuesKeys[0]][t]
                                : 'MAX-' + possibleValues[possibleValuesKeys[0]][t]
                            if (variants_1.includes('MIN')) {
                              let defaultValues = {}
                              const defaultValuesTemplate = templateDefaultValues.find(
                                (defaultValue: any) => defaultValue.templateId === template._id,
                              )
                              for (const [key, value] of Object.entries(
                                template.defaultDynamicFieldsValues,
                              )) {
                                delete defaultValuesTemplate.defaultValues[key]
                                if (
                                  key.toLowerCase().includes('text') ||
                                  key.toLowerCase().includes('headline') ||
                                  key.toLowerCase().includes('legal') ||
                                  key.toLowerCase().includes('subheadline')
                                ) {
                                  let html = `${value}`
                                  let div = document.createElement('div')
                                  div.innerHTML = html
                                  let textLegalHeading = div.textContent || div.innerText || ''
                                  defaultValues[key] = textLegalHeading.slice(
                                    0,
                                    Math.round(textLegalHeading.length / 2),
                                  )
                                } else if (template.possibleValues.hasOwnProperty(key))
                                  defaultValues[key] = possibleValues[possibleValuesKeys[0]][t]
                                else defaultValues[key] = value
                              }
                              templateVariants.push({
                                variantName: variants_1,
                                size: template.size,
                                templateName: template.name,
                                defaultValues: {
                                  ...defaultValues,
                                  ...defaultValuesTemplate.defaultValues,
                                },
                              })
                            } else {
                              let defaultValues = {}
                              const defaultValuesTemplate = templateDefaultValues.find(
                                (defaultValue: any) => defaultValue.templateId === template._id,
                              )
                              for (const [key, value] of Object.entries(
                                template.defaultDynamicFieldsValues,
                              )) {
                                delete defaultValuesTemplate.defaultValues[key]
                                if (template.possibleValues.hasOwnProperty(key))
                                  defaultValues[key] = possibleValues[possibleValuesKeys[0]][t]
                                else defaultValues[key] = value
                              }
                              templateVariants.push({
                                variantName: variants_1,
                                size: template.size,
                                templateName: template.name,
                                defaultValues: {
                                  ...defaultValues,
                                  ...defaultValuesTemplate.defaultValues,
                                },
                              })
                            }
                          }
                          t++
                        }
                        g++
                      }
                    }
                    let templatesVersions = {
                      templateId: template._id,
                      variants: templateVariants,
                    }
                    _templatesVersions.push(templatesVersions)
                    __templates.push(template)
                  } else {
                    let variants = ['MAX', 'MIN']
                    variants.forEach((variant) => {
                      if (variant === 'MIN') {
                        let defaultValues = {}
                        const defaultValuesTemplate = templateDefaultValues.find(
                          (defaultValue: any) => defaultValue.templateId === template._id,
                        )
                        for (const [key, value] of Object.entries(
                          template.defaultDynamicFieldsValues,
                        )) {
                          delete defaultValuesTemplate.defaultValues[key]
                          if (
                            key.toLowerCase().includes('text') ||
                            key.toLowerCase().includes('headline') ||
                            key.toLowerCase().includes('legal') ||
                            key.toLowerCase().includes('subheadline')
                          ) {
                            let html = `${value}`
                            let div = document.createElement('div')
                            div.innerHTML = html
                            let textLegalHeading = div.textContent || div.innerText || ''
                            defaultValues[key] = textLegalHeading.slice(
                              0,
                              Math.round(textLegalHeading.length / 2),
                            )
                          } else defaultValues[key] = value
                        }
                        templateVariants.push({
                          variantName: variant,
                          size: template.size,
                          templateName: template.name,
                          defaultValues: {
                            ...defaultValues,
                            ...defaultValuesTemplate.defaultValues,
                          },
                        })
                      } else {
                        let defaultValues = {}
                        const defaultValuesTemplate = templateDefaultValues.find(
                          (defaultValue: any) => defaultValue.templateId === template._id,
                        )
                        for (const [key, value] of Object.entries(
                          template.defaultDynamicFieldsValues,
                        )) {
                          delete defaultValuesTemplate.defaultValues[key]
                          defaultValues[key] = value
                        }
                        templateVariants.push({
                          variantName: variant,
                          size: template.size,
                          templateName: template.name,
                          defaultValues: {
                            ...defaultValues,
                            ...defaultValuesTemplate.defaultValues,
                          },
                        })
                      }
                    })
                    let templatesVersions = {
                      templateId: template._id,
                      variants: templateVariants,
                    }
                    _templatesVersions.push(templatesVersions)
                    __templates.push(template)
                  }
                })
                setLoading(!loading)
                dispatch(postTemplateVersion(_templatesVersions))
                _setTemplates(__templates)
              }}
            >
              Done
            </ButtonDoneStyled>
          </Space>
        </Space>
      </div>
    </LayoutStyled>
  )
}
