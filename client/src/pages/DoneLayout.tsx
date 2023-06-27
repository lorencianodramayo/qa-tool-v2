// @ts-nocheck
import styled from 'styled-components'
import {
  Button,
  Divider,
  Input,
  InputNumber,
  Spin,
  Layout,
  Space,
  notification,
  Steps,
  Collapse,
} from 'antd'
import {useEffect, useState} from 'react'
import {
  CheckOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  CloseOutlined,
  ProfileFilled,
  CaretRightOutlined,
} from '@ant-design/icons'
import type {UploadProps} from 'antd'
import {message, Upload} from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'
import {
  postTemplateVersion,
  postSharedVariants,
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
  const [colorHex, setColorHex] = useState<Color[] | string[]>([])
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
      addTemplateVersion.templatesVersions.map((templatesVersion, i) => {
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
      addTemplateVersion.templatesVersions.map((templatesVersion, i) => {
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
      } else
        navigate('/concept_template_version', {
          state: {
            templateName: templateName,
            templates: templates,
            sharedVariants: addSharedVariant,
          },
          replace: true,
        })
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
    if (isTemplateVersionImageVideoCloudSuccess)
      navigate('/concept_template_version', {
        state: {
          templateName: templateName,
          templates: templates,
          sharedVariants: addSharedVariant,
          imageVideoFiles: imageVideoFiles,
        },
        replace: true,
      })
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
      navigate('/configure/generate/elements', {
        state: {
          templateName: templateName,
          templates: location.state.templates,
          conceptLinkValue: location.state.conceptLinkValue,
          selectAll: location.state.selectAll,
          selectedValues: location.state.selectedValues,
        },
        replace: true,
      })
  }
  function isMediaType(value) {
    var imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i
    var videoExtensions = /\.(mp4|avi|mov|wmv|flv|mkv)$/i
    if (value.match(imageExtensions) || value.match(videoExtensions)) {
      return true
    }
  }
  function isColor(value) {
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
  function isURL(url) {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }
  function isNumberWithPercentage(value) {
    const regex = /^-?\d+(\.\d+)?%$/
    return regex.test(value)
  }
  const renderTemplateConfigurations = (template, possibleValues) => {
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
                      }}
                    >
                      {dynamicElement}:
                    </Space>
                    <Space
                      style={{
                        color: template.defaultDynamicFieldsValues[dynamicElement],
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
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
          // if (
          //   dynamicElement.includes('Text') ||
          //   dynamicElement.includes('Headline') ||
          //   dynamicElement.includes('legal') ||
          //   dynamicElement.includes('Subheadline')
          // )
          //   return (
          //     <Space
          //       key={i}
          //       direction="horizontal"
          //       style={{
          //         display: 'flex',
          //         justifyContent: 'space-between',
          //         marginTop: 20.4,
          //         marginLeft: 15,
          //       }}
          //     >
          //       <Space>
          //         <Space
          //           style={{
          //             fontWeight: 400,
          //             fontSize: 14,
          //             width: 132,
          //             color: '#000',
          //             justifyContent: 'flex-end',
          //           }}
          //         >
          //           {dynamicElement}:
          //         </Space>
          //         <Space>
          //           <InputStyled
          //             style={{width: 356}}
          //             placeholder={`${dynamicElement}`}
          //             value={template.defaultDynamicFieldsValues[dynamicElement]}
          //           />
          //         </Space>
          //       </Space>
          //       <Space>
          //         <Space>
          //           {buttonCases.map((buttonCase) => (
          //             <ButtonCaseStyled
          //               style={
          //                 template.hasOwnProperty('dynamicElementsStyles')
          //                   ? template.dynamicElementsStyles.find((obj) => {
          //                       return obj[dynamicElement]
          //                     })
          //                     ? template.dynamicElementsStyles.find((obj) => {
          //                         return obj[dynamicElement]
          //                       })[dynamicElement].case === buttonCase.value
          //                       ? {
          //                           backgroundColor: '#339af0',
          //                           color: '#fff',
          //                           outline: 'unset',
          //                           borderColor: '#339af0',
          //                         }
          //                       : {}
          //                     : {}
          //                   : {}
          //               }
          //               size="large"
          //             >
          //               {buttonCase.label}
          //             </ButtonCaseStyled>
          //           ))}
          //         </Space>
          //         <InputNumberStyled
          //           style={{
          //             marginRight: 51.6,
          //           }}
          //           controls={{
          //             upIcon: <CaretUpOutlined style={{color: '#339AF0', fontSize: 10.8}} />,
          //             downIcon: <CaretDownOutlined style={{color: '#339AF0', fontSize: 10.8}} />,
          //           }}
          //           bordered={true}
          //           min={0}
          //           max={textHeadingLegalMaxValue(
          //             template.defaultDynamicFieldsValues[dynamicElement],
          //           )}
          //           value={textHeadingLegalMaxValue(
          //             template.defaultDynamicFieldsValues[dynamicElement],
          //           )}
          //         />
          //       </Space>
          //     </Space>
          //   )
          // else if (dynamicElement.includes('font') || dynamicElement.includes('Variable'))
          //   return (
          //     <Space
          //       key={i}
          //       direction="horizontal"
          //       style={{
          //         display: 'flex',
          //         justifyContent: 'space-between',
          //         marginTop: 20.4,
          //         marginLeft: 15,
          //       }}
          //     >
          //       <Space>
          //         <Space
          //           style={{
          //             fontWeight: 400,
          //             fontSize: 14,
          //             width: 132,
          //             color: '#000',
          //             justifyContent: 'flex-end',
          //           }}
          //         >
          //           {dynamicElement}:
          //         </Space>
          //       </Space>
          //       <Space>
          //         <InputNumberStyled
          //           style={{
          //             marginRight: 51.6,
          //           }}
          //           controls={{
          //             upIcon: <CaretUpOutlined style={{color: '#339AF0', fontSize: 10.8}} />,
          //             downIcon: <CaretDownOutlined style={{color: '#339AF0', fontSize: 10.8}} />,
          //           }}
          //           bordered={true}
          //           value={template.defaultDynamicFieldsValues[dynamicElement]}
          //         />
          //       </Space>
          //     </Space>
          //   )
          // else if (dynamicElement.includes('Element') || dynamicElement.includes('Color'))
          //   return (
          //     <Space
          //       key={i}
          //       direction="horizontal"
          //       style={{
          //         display: 'flex',
          //         justifyContent: 'space-between',
          //         marginTop: 20.4,
          //         marginLeft: 15,
          //       }}
          //     >
          //       <Space>
          //         <Space
          //           style={{
          //             fontWeight: 400,
          //             fontSize: 14,
          //             width: 132,
          //             color: '#000',
          //             justifyContent: 'flex-end',
          //           }}
          //         >
          //           {dynamicElement}:
          //         </Space>
          //         <Space
          //           style={{
          //             color:
          //               template.defaultDynamicFieldsValues[dynamicElement] === '#ffffff'
          //                 ? '#000000'
          //                 : template.defaultDynamicFieldsValues[dynamicElement],
          //           }}
          //         >
          //           {template.defaultDynamicFieldsValues[dynamicElement]}
          //         </Space>
          //       </Space>
          //     </Space>
          //   )
          // else if (
          //   dynamicElement.includes('logo') ||
          //   dynamicElement.includes('Background') ||
          //   dynamicElement.includes('Image') ||
          //   dynamicElement.includes('Video') ||
          //   dynamicElement.includes('Overlay') ||
          //   dynamicElement.includes('packshot')
          // )
          //   return (
          //     <Space
          //       key={i}
          //       direction="horizontal"
          //       style={{
          //         display: 'flex',
          //         // justifyContent: "space-between",
          //         marginTop: 20.4,
          //         marginLeft: 15,
          //       }}
          //     >
          //       <Space>
          //         <Space
          //           style={{
          //             fontWeight: 400,
          //             fontSize: 14,
          //             width: 132,
          //             color: '#000',
          //             justifyContent: 'flex-end',
          //           }}
          //         >
          //           {dynamicElement}:
          //         </Space>
          //       </Space>
          //       <Space
          //         style={{
          //           display: 'flex',
          //           alignItems: 'center',
          //         }}
          //       >
          //         {defaultFileList(template, dynamicElement)}
          //       </Space>
          //       {/* <Space.Compact block>
          //         <UploadStyled
          //           maxCount={1}
          //           fileList={
          //             template.hasOwnProperty("dynamicElementsStyles")
          //               ? template.dynamicElementsStyles.find((obj) => {
          //                   return obj[dynamicElement];
          //                 })
          //                 ? template.dynamicElementsStyles.find((obj) => {
          //                     return obj[dynamicElement];
          //                   })[dynamicElement].files
          //                 : []
          //               : []
          //           }
          //           beforeUpload={() => {
          //             return false;
          //           }}
          //           {...props}
          //         ></UploadStyled>
          //       </Space.Compact> */}
          //     </Space>
          //   )
        })}
      </Space>
    )
  }
  const textHeadingLegalMaxValue = (content) => {
    let html = content
    let div = document.createElement('div')
    div.innerHTML = html
    let textHeadingLegal = div.textContent || div.innerText || ''
    return textHeadingLegal.length
  }
  return (
    <>
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
        {/* <Space
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 42.1,
            pointerEvents: loading ? 'none' : 'unset',
          }}
        >
          <Space
            style={{
              border: '1px solid #1890FF',
              backgroundColor: '#FFF',
              height: '27.6px',
              width: '27.6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 6.6,
              color: '#1890FF',
            }}
          >
            <CheckOutlined />
          </Space>
          <Space
            style={{
              color: 'rgba(0, 0, 0, 0.85)',
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Configure
          </Space>
          <Divider
            type="horizontal"
            style={{
              width: '118.4px',
              margin: '0 14px 0 14px',
              minWidth: 'unset',
              backgroundColor: '#F0F0F0',
            }}
          />
          <Space
            style={{
              border: '1px solid #1890FF',
              backgroundColor: '#FFF',
              height: '27.6px',
              width: '27.6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 6.6,
              color: '#1890FF',
            }}
          >
            <CheckOutlined />
          </Space>
          <Space
            style={{
              color: 'rgba(0, 0, 0, 0.45)',
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Generate
          </Space>
          <Divider
            type="horizontal"
            style={{
              width: '118.4px',
              margin: '0 14px 0 14px',
              minWidth: 'unset',
              backgroundColor: '#F0F0F0',
            }}
          />
          <Space
            style={{
              backgroundColor: '#1890FF',
              height: '27.6px',
              width: '27.6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              marginRight: 6.6,
            }}
          >
            3
          </Space>
          <Space
            style={{
              color: 'rgba(0, 0, 0, 0.45)',
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Done
          </Space>
        </Space> */}
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
                  templates.map((template) => {
                    let templateVariants = []
                    if (template.hasOwnProperty('possibleValues')) {
                      // let possibleValues = {
                      //   trigger: ["4 Frames", "3 Frames", "2 Frames"],
                      //   trigger2: [
                      //     "logo",
                      //     "sublogo",
                      //     // , "logo logo"
                      //   ],
                      //   customValue: [
                      //     "with logo1",
                      //     "without logo1",
                      //     // "with logo1 logo1",
                      //   ],
                      //   customValue1: [
                      //     "with logo2",
                      //     "without logo2",
                      //     // "with logo2 logo2",
                      //   ],
                      //   customValue2: [
                      //     "with logo3",
                      //     "without logo3",
                      //     // "with logo3 logo3",
                      //   ],
                      // };
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
                                    possibleValues[
                                      possibleValuesKeys[possibleValuesKeys.length - 1]
                                    ].length
                                  ) {
                                    let variants_2 = ''
                                    variants_2 +=
                                      variants_1 + '-' + possibleValues[possibleValuesKeys[n]][e]
                                    if (variants_2.includes('MIN')) {
                                      template.defaultDynamicFieldsValues
                                      let defaultValues = {}
                                      for (const [key, value] of Object.entries(
                                        template.defaultDynamicFieldsValues,
                                      )) {
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
                                        } else defaultValues[key] = value
                                      }
                                      templateVariants.push({
                                        variantName: variants_2,
                                        size: template.size,
                                        templateName: template.name,
                                        defaultValues: {
                                          ...defaultValues,
                                          trigger: possibleValues[possibleValuesKeys[0]][t],
                                        },
                                      })
                                    } else
                                      templateVariants.push({
                                        variantName: variants_2,
                                        size: template.size,
                                        templateName: template.name,
                                        defaultValues: {
                                          ...template.defaultDynamicFieldsValues,
                                          trigger: possibleValues[possibleValuesKeys[0]][t],
                                        },
                                      })
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
                                  possibleValues[possibleValuesKeys[possibleValuesKeys.length - 1]][
                                    i
                                  ]
                                // templateVariants.push({
                                //   variantName: variants_2,
                                //   size: template.size,
                                //   templateName: template.name,
                                //   defaultValues: {
                                //     ...template.defaultDynamicFieldsValues,
                                //     trigger:
                                //       possibleValues[possibleValuesKeys[0]][t],
                                //   },
                                // });
                                if (variants_2.includes('MIN')) {
                                  template.defaultDynamicFieldsValues
                                  let defaultValues = {}
                                  for (const [key, value] of Object.entries(
                                    template.defaultDynamicFieldsValues,
                                  )) {
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
                                    variantName: variants_2,
                                    size: template.size,
                                    templateName: template.name,
                                    defaultValues: {
                                      ...defaultValues,
                                      trigger: possibleValues[possibleValuesKeys[0]][t],
                                    },
                                  })
                                } else
                                  templateVariants.push({
                                    variantName: variants_2,
                                    size: template.size,
                                    templateName: template.name,
                                    defaultValues: {
                                      ...template.defaultDynamicFieldsValues,
                                      trigger: possibleValues[possibleValuesKeys[0]][t],
                                    },
                                  })
                                i++
                              }
                            } else {
                              variants_1 +=
                                g === 1
                                  ? 'MIN-' + possibleValues[possibleValuesKeys[0]][t]
                                  : 'MAX-' + possibleValues[possibleValuesKeys[0]][t]
                              // templateVariants.push({
                              //   variantName: variants_1,
                              //   size: template.size,
                              //   templateName: template.name,
                              //   defaultValues: {
                              //     ...template.defaultDynamicFieldsValues,
                              //     trigger:
                              //       possibleValues[possibleValuesKeys[0]][t],
                              //   },
                              // });
                              if (variants_1.includes('MIN')) {
                                template.defaultDynamicFieldsValues
                                let defaultValues = {}
                                for (const [key, value] of Object.entries(
                                  template.defaultDynamicFieldsValues,
                                )) {
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
                                  variantName: variants_1,
                                  size: template.size,
                                  templateName: template.name,
                                  defaultValues: {
                                    ...defaultValues,
                                    trigger: possibleValues[possibleValuesKeys[0]][t],
                                  },
                                })
                              } else
                                templateVariants.push({
                                  variantName: variants_1,
                                  size: template.size,
                                  templateName: template.name,
                                  defaultValues: {
                                    ...template.defaultDynamicFieldsValues,
                                    trigger: possibleValues[possibleValuesKeys[0]][t],
                                  },
                                })
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
                          for (const [key, value] of Object.entries(
                            template.defaultDynamicFieldsValues,
                          )) {
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
                            },
                          })
                        } else
                          templateVariants.push({
                            variantName: variant,
                            size: template.size,
                            templateName: template.name,
                            defaultValues: {
                              ...template.defaultDynamicFieldsValues,
                            },
                          })
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
    </>
  )
}
