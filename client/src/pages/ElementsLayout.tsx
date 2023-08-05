// @ts-nocheck
import styled from 'styled-components'
import {
  Button,
  InputNumber,
  Layout,
  Space,
  FloatButton,
  Modal,
  Form,
  Input,
  notification,
  Spin,
  ColorPicker,
  Steps,
  Collapse,
} from 'antd'
import type {Color, ColorPickerProps} from 'antd/es/color-picker'
import FloatLabel from '../components/FloatLabel/FloatLabel'
import {useEffect, useRef, useState} from 'react'
import {
  CaretUpOutlined,
  CaretDownOutlined,
  UploadOutlined,
  CloseOutlined,
  ProfileFilled,
  CaretRightOutlined,
  LinkOutlined,
  WarningTwoTone,
} from '@ant-design/icons'
import {Upload} from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getLanguages, postUploadXlsx} from '../features/Element/elementSlice'
import apiService from '../api/apiService'
const {Panel} = Collapse
type LayoutType = Parameters<typeof Form>[0]['layout']
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
const InputStyled = styled(Input)`
  border-color: #d9d9d9;
  :hover,
  :focus-visible {
    border-color: #d9d9d9;
  }
`
const ButtonCaseStyled = styled(Button)`
  margin-right: 0.4px;
  &.ant-btn.ant-btn-lg {
    padding: 0;
    width: 27.2px;
    background-color: #fff;
    border-color: #000;
    font-weight: 600;
    font-size: 14px;
    height: 24px;
    border-radius: 5px;
  }
  .ant-btn-default:not(:disabled):hover,
  :focus,
  :hover,
  :focus-visible {
    background-color: #339af0 !important;
    color: #fff !important;
    outline: unset;
    border-color: #339af0 !important;
  }
`
const InputNumberStyled = styled(InputNumber)`
  &.ant-input-number {
    border-color: #339af0;
    height: 24px;
    width: 84.6px;
    border-radius: 8px;
  }
  &.ant-input-number .ant-input-number-input {
    vertical-align: text-top;
    height: 18px;
    font-size: 14px;
    font-weight: 400;
    padding: 1.9px 10.6px;
  }
  &.ant-input-number .ant-input-number-handler-wrap {
    opacity: unset !important;
  }
  &.ant-input-number .ant-input-number-handler-wrap .ant-input-number-handler {
    border-left-color: #339af0;
    border-right-color: #339af0;
    border-top-color: #339af0;
  }
  &.ant-input-number
    .ant-input-number-handler-wrap
    .ant-input-number-handler
    .ant-input-number-handler-up-inner {
    font-size: 10px !important;
  }
  &.ant-input-number
    .ant-input-number-handler-wrap
    .ant-input-number-handler
    .ant-input-number-handler-down-inner {
    font-size: 10px !important;
  }
`
const UploadStyledv2 = styled(Upload)`
  display: flex;
  &.ant-upload-wrapper .ant-upload-select {
    order: 2;
    Button {
      font-size: 12px;
      font-weight: 400;
      border-color: #d9d9d9;
      width: 84.8px;
      height: 24px;
      padding: 2.2px 13.5px;
      color: #000;
      border-radius: 0;
    }
    Button:focus {
      outline: unset;
    }
  }
  &.ant-upload-wrapper .ant-upload-list {
    order: 1;
    display: flex;
    width: 470px;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
    margin-top: unset;
    border-radius: 5px;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item-container {
    border: 1px solid #339af0;
    border-radius: 5px;
    width: 234px;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item .ant-upload-list-item-name {
    font-size: 12px;
    font-weight: 400;
    color: #339af0;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item .ant-upload-icon .anticon {
    display: none;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item:hover {
    background-color: #fff;
  }
  &.ant-upload-wrapper
    .ant-upload-list
    .ant-upload-list-item
    .ant-upload-list-item-actions
    .ant-upload-list-item-action {
    opacity: unset;
    height: unset;
    padding: unset;
    border-radius: unset;
    border: unset;
    background-color: unset;
    font-size: 12px;
  }
  &.ant-upload-wrapper
    .ant-upload-list
    .ant-upload-list-item
    .ant-upload-list-item-actions
    .anticon {
    color: #339af0;
  }
`
const FloatButtonStyled = styled(FloatButton)`
  &.ant-float-btn-primary:focus {
    outline: unset;
  }
  &.ant-float-btn-primary .ant-float-btn-body:hover {
    background: #1677ff;
  }
`
const ButtonStyled = styled(Button)`
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
const ColorPickerStyled = styled(ColorPicker)`
  border-color: #d9d9d9;
  &.ant-color-picker-trigger: hover {
    border-color: #d9d9d9;
  }
`
export default function ElementsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [currentStep, _] = useState<number>(1)
  const {languages, isLanguagesSuccess, isUploadXlsxSuccess} = useSelector(
    (state: any) => state.element,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [languagesList, setLanguagesList] = useState<any>([])
  const templateName: string = location.state.templateName
  const [templates, setTemplates] = useState<any>(location.state.templates)
  const templateDefaultValues: any = location.state.templateDefaultValues
  const [possibleValues, setPossibleValues] = useState<any>([])
  const [templateIndex, setTemplateIndex] = useState<number>(0)
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(true)
  const [form] = Form.useForm()
  const formLayout: LayoutType = 'inline'
  const [api, contextHolder] = notification.useNotification()
  const [replicates, setReplicates] = useState<any>([])
  const [language, setLanguage] = useState<string>('')
  const filesRef = useRef<any>([])
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex')
  const [formatRgb, setFormatRgb] = useState<ColorPickerProps['format']>('rgb')
  const [languageLength, setLanguageLength] = useState<number>(0)
  const [languageSelected, setLanguageSelected] = useState<boolean>([])
  const [replicate, setReplicate] = useState<number>(null)
  useEffect(() => {
    if (!isLanguagesSuccess) dispatch(getLanguages())
    let lang = []
    languages?.map((language: {language: string; content: string}) => {
      lang.push({
        value: language.language,
        label: `${titleCase(language.language)}`,
      })
    })
    setLanguagesList(lang)
  }, [languages, isLanguagesSuccess])
  useEffect(() => {
    if (!isLanguagesSuccess) dispatch(getLanguages())
  }, [isUploadXlsxSuccess])
  useEffect(() => {
    let languageSelected = []
    let replicate = []
    replicate.push({
      value: 0,
      label: 'All Template',
    })
    templates
      .filter((template: any, i: number) => {
        if (i !== templateIndex) return template
      })
      .map((template: any) =>
        replicate.push({
          value: template._id,
          label: template.size + ' - ' + template.name,
        }),
      )
    setReplicates(replicate)
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
    templates.map(() => languageSelected.push(true))
    setLanguageSelected(languageSelected)
  }, [])
  useEffect(() => {
    templates[templateIndex]['dynamicElements'].map(async (dynamicElement: any) => {
      let html = templates[templateIndex]['defaultDynamicFieldsValues'][dynamicElement]
      let div = document.createElement('div')
      div.innerHTML = html
      let text = div.textContent || div.innerText || ''
      let payload = {
        language: language,
        textHeadlineLegal: text,
      }
      if (language !== '') {
        setLoading(!loading)
        const response = await apiService.post('/translate/v2', payload)
        text = response.data.translate
      }
    })
  }, [language])
  const activeStyle = {
    backgroundColor: '#1890ff',
    borderRadius: 5,
    color: '#fff',
  }
  const onChangeSteps = (value: number) => {
    if (value === 0)
      navigate('/qa-tool-v2/configure/generate', {
        state: {
          templateName: templateName,
          templates: location.state.templates.map((originalObj) => {
            const newObj = templates.find((newObj) => newObj._id === originalObj._id)
            return newObj ? {...originalObj, ...newObj} : originalObj
          }),
          templateDefaultValues: templateDefaultValues,
          conceptLinkValue: location.state.conceptLinkValue,
          selectAll: location.state.selectAll,
          selectedValues: location.state.selectedValues,
        },
        replace: true,
      })
    else
      navigate('/qa-tool-v2/configure/generate/elements/done', {
        state: {
          templateName: templateName,
          templates: location.state.templates.map((originalObj) => {
            const newObj = templates.find((newObj) => newObj._id === originalObj._id)
            return newObj ? {...originalObj, ...newObj} : originalObj
          }),
          templateDefaultValues: templateDefaultValues,
          conceptLinkValue: location.state.conceptLinkValue,
          selectAll: location.state.selectAll,
          selectedValues: location.state.selectedValues,
        },
        replace: true,
      })
  }
  function checkDynamicElementExists(defaultDynamicFieldsValuesFiles, dynamicElement) {
    for (let i = 0; i < defaultDynamicFieldsValuesFiles.length; i++) {
      if (defaultDynamicFieldsValuesFiles[i].dynamicElementKey === dynamicElement) {
        return defaultDynamicFieldsValuesFiles[i]
      }
    }
    return false
  }
  const defaultFileList = (template, dynamicElement) => {
    let fileList = []
    if (template.hasOwnProperty('defaultDynamicFieldsValuesFiles')) {
      if (!checkDynamicElementExists(template.defaultDynamicFieldsValuesFiles, dynamicElement))
        fileList.push({
          uid: '1',
          name: template.defaultDynamicFieldsValues[dynamicElement],
          status: 'done',
        })
      else
        fileList.push({
          uid: '1',
          name: checkDynamicElementExists(template.defaultDynamicFieldsValuesFiles, dynamicElement)
            .fileData.name,
          status: 'done',
        })
    } else {
      fileList.push({
        uid: '1',
        name: template.defaultDynamicFieldsValues[dynamicElement],
        status: 'done',
      })
    }
    return fileList
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
  const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }
  const replaceBulk = (str, findArray, replaceArray) => {
    let i,
      regex = [],
      map = {}
    for (i = 0; i < findArray.length; i++) {
      regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'))
      map[findArray[i]] = replaceArray[i]
    }
    regex = regex.join('|')
    str = str.replace(new RegExp(regex, 'g'), (matched) => {
      return map[matched]
    })
    return str
  }
  const translateTextHeadlineLegal = async (language, textHeadlineLegal) => {
    let html = textHeadlineLegal
    let div = document.createElement('div')
    div.innerHTML = html
    let _textHeadlineLegal = div.textContent || div.innerText || ''
    let payload = {
      language: language,
      textHeadlineLegal: _textHeadlineLegal,
    }
    const response = await apiService.post('/translate/v2', payload)
    return response.data
  }
  const textHeadingLegalCase = (text, textCase) => {
    let textHeadingLegalCaseText = ''
    let html = `${text}`
    let div = document.createElement('div')
    div.innerHTML = html
    if (div.querySelectorAll('*').length > 0) {
      let findArrayOne = [],
        replaceArrayOne = []
      Array.from(div.querySelectorAll('*')).map((tag, i) => {
        findArrayOne.push(tag.localName.toString())
        replaceArrayOne.push('')
      })
      let findArrayTwo = [],
        replaceArrayTwo = []
      replaceBulk(replaceBulk(text, findArrayOne, replaceArrayOne), ['</>'], ['<>'])
        .split('<>')
        .map((word, i) => {
          if (word !== '') {
            findArrayTwo.push(word)
            if (textCase === 'Capitalize') {
              let tempText = word.toLowerCase().split(' ')
              for (let i = 0; i < tempText.length; i++) {
                if (tempText[i] !== '') {
                  let _bool = true,
                    n = 0,
                    c = ''
                  while (_bool) {
                    if (/[`0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(tempText[i][n])) {
                      c += tempText[i].charAt(n)
                      n++
                    } else {
                      tempText[i] = c + tempText[i][n].toUpperCase() + tempText[i].slice(n + 1)
                      _bool = false
                    }
                  }
                }
              }
              replaceArrayTwo.push(tempText.join(' '))
            } else if (textCase === 'Lowercase') replaceArrayTwo.push(word.toLowerCase())
            else if (textCase === 'Uppercase') replaceArrayTwo.push(word.toUpperCase())
            else replaceArrayTwo.push(word)
          }
        })
      textHeadingLegalCaseText = replaceBulk(text, findArrayTwo, replaceArrayTwo)
    } else {
      if (textCase === 'Capitalize') {
        let tempText = text.toLowerCase().split(' ')
        for (let i = 0; i < tempText.length; i++) {
          if (tempText[i] !== '') {
            let _bool = true,
              n = 0,
              c = ''
            while (_bool) {
              if (/[`0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(tempText[i][n])) {
                c += tempText[i].charAt(n)
                n++
              } else {
                tempText[i] = c + tempText[i][n].toUpperCase() + tempText[i].slice(n + 1)
                _bool = false
              }
            }
          }
        }
        textHeadingLegalCaseText = tempText.join(' ')
      } else if (textCase === 'Lowercase') textHeadingLegalCaseText = text.toLowerCase()
      else if (textCase === 'Uppercase') textHeadingLegalCaseText = text.toUpperCase()
      else textHeadingLegalCaseText = text
    }
    return textHeadingLegalCaseText
  }
  const textHeadingLegalMaxValue = (content) => {
    let html = content
    let div = document.createElement('div')
    div.innerHTML = html
    let textHeadingLegal = div.textContent || div.innerText || ''
    return textHeadingLegal.length
  }
  const checkFileType = (file: File) => {
    const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if (!isXlsx) {
      api['error']({
        message: `${file.name} is not .xlsx file You can only upload .xlsx files!`,
        description: `${file.name} is not .xlsx file You can only upload .xlsx files!`,
      })
    }
    return false
  }
  const renderTemplateConfigurations = (template: any, possibleValues: any) => {
    return (
      <Space direction="vertical" style={{marginLeft: 4}}>
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
        {languageSelected[templateIndex] && (
          <Space
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'Orange',
              fontSize: 18,
            }}
          >
            <Space
              style={{padding: 8, borderRadius: 14, boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)'}}
            >
              <WarningTwoTone twoToneColor="Orange" />
              Please Select Language
            </Space>
          </Space>
        )}
        <div
          style={{
            pointerEvents: !languageSelected[templateIndex] ? 'unset' : 'none',
          }}
        >
          {template.dynamicElements.map((dynamicElement: any, i: number) => {
            const buttonCases = [
              {
                value: 'Capitalize',
                label: 'Aa',
              },
              {value: 'Lowercase', label: 'aa'},
              {value: 'Uppercase', label: 'AA'},
            ]
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                    </Space>
                    <Space
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <UploadStyledv2
                        maxCount={1}
                        fileList={defaultFileList(template, dynamicElement)}
                        showUploadList={{
                          showRemoveIcon: true,
                          removeIcon: (
                            <CloseOutlined
                              onClick={(e) => console.log(e, 'custom removeIcon event')}
                            />
                          ),
                        }}
                        customRequest={async ({onSuccess}) => {
                          setTimeout(() => {
                            onSuccess('ok')
                          }, 0)
                        }}
                        beforeUpload={(file) => {
                          const files = {
                            dynamicElementKey: dynamicElement,
                            fileData: file,
                          }
                          filesRef.current = [...filesRef.current, files]
                          let defaultDynamicFieldsValues = []
                          const newDefaultDynamicFieldsValues = {
                            [dynamicElement]: file.name,
                          }
                          defaultDynamicFieldsValues = {
                            ...template.defaultDynamicFieldsValues,
                            ...newDefaultDynamicFieldsValues,
                          }
                          const newState = templates.map((template, i) => {
                            if (templateIndex === i) {
                              return {
                                ...template,
                                ...{
                                  ['defaultDynamicFieldsValuesFiles']: filesRef.current,
                                },
                              }
                            }
                            return template
                          })
                          setTemplates(newState)
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </UploadStyledv2>
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
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
                              }
                            : {
                                color: template.defaultDynamicFieldsValues[dynamicElement],
                              }
                        }
                      >
                        {template.defaultDynamicFieldsValues[dynamicElement]}
                      </Space>
                    </Space>
                    <Space>
                      <ColorPickerStyled
                        style={{marginRight: 51.6}}
                        format={
                          isRGBColor(template.defaultDynamicFieldsValues[dynamicElement])
                            ? formatRgb
                            : isHexColor(template.defaultDynamicFieldsValues[dynamicElement])
                            ? formatHex
                            : isRGBAColor(template.defaultDynamicFieldsValues[dynamicElement])
                            ? formatRgb
                            : formatHex
                        }
                        value={template.defaultDynamicFieldsValues[dynamicElement]}
                        onChange={(value: Color) => {
                          let color: string = ''
                          if (isRGBColor(template.defaultDynamicFieldsValues[dynamicElement]))
                            color = value.toRgbString()
                          else if (isHexColor(template.defaultDynamicFieldsValues[dynamicElement]))
                            color = value.toHexString()
                          else color = value.toRgbString()
                          let defaultDynamicFieldsValues =
                            templates[templateIndex].defaultDynamicFieldsValues
                          const newDefaultDynamicFieldsValues = {
                            [dynamicElement]: color,
                          }
                          defaultDynamicFieldsValues = {
                            ...defaultDynamicFieldsValues,
                            ...newDefaultDynamicFieldsValues,
                          }
                          const newState = templates.map((template, i) => {
                            if (templateIndex === i) {
                              return {
                                ...template,
                                ...{
                                  ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                },
                              }
                            }
                            return template
                          })
                          setTemplates(newState)
                        }}
                        onFormatChange={
                          isRGBColor(template.defaultDynamicFieldsValues[dynamicElement])
                            ? setFormatRgb
                            : isHexColor(template.defaultDynamicFieldsValues[dynamicElement])
                            ? setFormatHex
                            : isRGBAColor(template.defaultDynamicFieldsValues[dynamicElement])
                            ? setFormatRgb
                            : setFormatHex
                        }
                      />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                      <Space>
                        <InputStyled
                          style={{width: 356}}
                          placeholder={`${dynamicElement}`}
                          value={template.defaultDynamicFieldsValues[dynamicElement]}
                          onChange={(e) => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: e.target.value,
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
                      </Space>
                    </Space>
                    <Space>
                      <Space style={{marginRight: 51.6}}>
                        <ButtonStyled
                          type="primary"
                          icon={<LinkOutlined />}
                          onClick={() => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: 'https://www.google.com',
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                      <Space>
                        <InputStyled
                          style={{width: 356}}
                          placeholder={`${dynamicElement}`}
                          value={template.defaultDynamicFieldsValues[dynamicElement]}
                          onChange={(e) => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: e.target.value,
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                      <Space>
                        <InputStyled
                          style={{width: 356}}
                          placeholder={`${dynamicElement}`}
                          value={template.defaultDynamicFieldsValues[dynamicElement]}
                          onChange={(e) => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: e.target.value,
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                    </Space>
                    <Space>
                      <InputNumberStyled
                        style={{
                          marginRight: 51.6,
                        }}
                        controls={{
                          upIcon: <CaretUpOutlined style={{color: '#339AF0', fontSize: 10.8}} />,
                          downIcon: (
                            <CaretDownOutlined style={{color: '#339AF0', fontSize: 10.8}} />
                          ),
                        }}
                        bordered={true}
                        defaultValue={template.defaultDynamicFieldsValues[dynamicElement]}
                        onChange={(value) => {
                          if (value > 0) {
                            let defaultDynamicFieldsValues =
                              templates[templateIndex].defaultDynamicFieldsValues
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: value.toString(),
                            }
                            defaultDynamicFieldsValues = {
                              ...defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }
                        }}
                      />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                    </Space>
                    <Space>
                      <InputNumberStyled
                        style={{
                          marginRight: 51.6,
                        }}
                        controls={{
                          upIcon: <CaretUpOutlined style={{color: '#339AF0', fontSize: 10.8}} />,
                          downIcon: (
                            <CaretDownOutlined style={{color: '#339AF0', fontSize: 10.8}} />
                          ),
                        }}
                        bordered={true}
                        defaultValue={template.defaultDynamicFieldsValues[dynamicElement]}
                        onChange={(value) => {
                          if (value > 0) {
                            let defaultDynamicFieldsValues =
                              templates[templateIndex].defaultDynamicFieldsValues
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: value.toString(),
                            }
                            defaultDynamicFieldsValues = {
                              ...defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }
                        }}
                      />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                      <Space>
                        <InputStyled
                          style={{width: 356}}
                          placeholder={`${dynamicElement}`}
                          value={template.defaultDynamicFieldsValues[dynamicElement]}
                          onChange={(e) => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: e.target.value,
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                      <Space>
                        <InputStyled
                          style={{width: 356}}
                          placeholder={`${dynamicElement}`}
                          value={template.defaultDynamicFieldsValues[dynamicElement]}
                          onChange={(e) => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: e.target.value,
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                      <Space>
                        <InputStyled
                          style={{width: 356}}
                          placeholder={`${dynamicElement}`}
                          value={template.defaultDynamicFieldsValues[dynamicElement]}
                          onChange={(e) => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: e.target.value,
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
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
                          fontWeight: 400,
                          fontSize: 14,
                          width: 132,
                          color: '#000',
                        }}
                      >
                        {dynamicElement}:
                      </Space>
                      <Space>
                        <InputStyled
                          style={{width: 356}}
                          placeholder={`${dynamicElement}`}
                          value={template.defaultDynamicFieldsValues[dynamicElement]}
                          onChange={(e) => {
                            let defaultDynamicFieldsValues = []
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: e.target.value,
                            }
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            }
                            const newState = templates.map((template, i) => {
                              if (templateIndex === i) {
                                return {
                                  ...template,
                                  ...{
                                    ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                  },
                                }
                              }
                              return template
                            })
                            setTemplates(newState)
                          }}
                        />
                      </Space>
                    </Space>
                    <Space>
                      <Space>
                        {buttonCases.map((buttonCase) => (
                          <ButtonCaseStyled
                            style={
                              template.hasOwnProperty('dynamicElementsStyles')
                                ? template.dynamicElementsStyles.find((obj) => {
                                    return obj[dynamicElement]
                                  })
                                  ? template.dynamicElementsStyles.find((obj) => {
                                      return obj[dynamicElement]
                                    })[dynamicElement].case === buttonCase.value
                                    ? {
                                        backgroundColor: '#339af0',
                                        color: '#fff',
                                        outline: 'unset',
                                        borderColor: '#339af0',
                                      }
                                    : {}
                                  : {}
                                : {}
                            }
                            size="large"
                            onClick={() => {
                              let dynamicElementsStyles = []
                              let defaultDynamicFieldsValues = []
                              if (template.hasOwnProperty('dynamicElementsStyles')) {
                                let dynamicElementsStylesExists =
                                  template.dynamicElementsStyles.filter((dynamicElementStyle) => {
                                    return dynamicElementStyle.hasOwnProperty(dynamicElement)
                                  }).length > 0
                                if (dynamicElementsStylesExists) {
                                  const newDynamicElementsStylesState =
                                    template.dynamicElementsStyles.map((dynamicElementStyle) => {
                                      if (dynamicElementStyle.hasOwnProperty(dynamicElement))
                                        return {
                                          ...dynamicElementStyle,
                                          [dynamicElement]: {
                                            case: buttonCase.value,
                                            number: dynamicElementStyle[dynamicElement].number,
                                          },
                                        }
                                      return dynamicElementStyle
                                    })
                                  newDynamicElementsStylesState.map((newDynamicElementStyleState) =>
                                    dynamicElementsStyles.push(newDynamicElementStyleState),
                                  )
                                } else
                                  dynamicElementsStyles.push(...template.dynamicElementsStyles, {
                                    [dynamicElement]: {
                                      case: buttonCase.value,
                                      number: 0,
                                    },
                                  })
                                const newDefaultDynamicFieldsValues = {
                                  [dynamicElement]: textHeadingLegalCase(
                                    template.defaultDynamicFieldsValues[dynamicElement],
                                    buttonCase.value,
                                  ),
                                }
                                defaultDynamicFieldsValues = {
                                  ...template.defaultDynamicFieldsValues,
                                  ...newDefaultDynamicFieldsValues,
                                }
                              } else {
                                dynamicElementsStyles.push({
                                  [dynamicElement]: {
                                    case: buttonCase.value,
                                    number: 0,
                                  },
                                })
                                const newDefaultDynamicFieldsValues = {
                                  [dynamicElement]: textHeadingLegalCase(
                                    template.defaultDynamicFieldsValues[dynamicElement],
                                    buttonCase.value,
                                  ),
                                }
                                defaultDynamicFieldsValues = {
                                  ...template.defaultDynamicFieldsValues,
                                  ...newDefaultDynamicFieldsValues,
                                }
                              }
                              const newState = templates.map((template, i) => {
                                if (templateIndex === i) {
                                  return {
                                    ...template,
                                    dynamicElementsStyles,
                                    ...{
                                      ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                    },
                                  }
                                }
                                return template
                              })
                              setTemplates(newState)
                            }}
                          >
                            {buttonCase.label}
                          </ButtonCaseStyled>
                        ))}
                      </Space>
                      <InputNumberStyled
                        style={{
                          marginRight: 51.6,
                        }}
                        controls={{
                          upIcon: <CaretUpOutlined style={{color: '#339AF0', fontSize: 10.8}} />,
                          downIcon: (
                            <CaretDownOutlined style={{color: '#339AF0', fontSize: 10.8}} />
                          ),
                        }}
                        bordered={true}
                        value={textHeadingLegalMaxValue(
                          template.defaultDynamicFieldsValues[dynamicElement],
                        )}
                        onStep={(value) => {
                          if (value > languageLength)
                            api['warning']({
                              message: `${dynamicElement}`,
                              description: 'Character Limit Exceeds!',
                            })
                          const filteredLanguage = languages.filter((lang) => {
                            if (language === '') return lang.language === 'Latin'
                            else return lang.language === language
                          })
                          let defaultDynamicFieldsValues =
                            templates[templateIndex].defaultDynamicFieldsValues
                          const newDefaultDynamicFieldsValues = {
                            [dynamicElement]: filteredLanguage[0].content.substring(0, value),
                          }
                          defaultDynamicFieldsValues = {
                            ...defaultDynamicFieldsValues,
                            ...newDefaultDynamicFieldsValues,
                          }
                          const newState = templates.map((template, i) => {
                            if (templateIndex === i) {
                              return {
                                ...template,
                                ...{
                                  ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                },
                              }
                            }
                            return template
                          })
                          setTemplates(newState)
                        }}
                        onChange={(value) => {
                          if (value > languageLength)
                            api['warning']({
                              message: `${dynamicElement}`,
                              description: 'Character Limit Exceeds!',
                            })
                          const filteredLanguage = languages.filter((lang) => {
                            if (language === '') return lang.language === 'Latin'
                            else return lang.language === language
                          })
                          let defaultDynamicFieldsValues =
                            templates[templateIndex].defaultDynamicFieldsValues
                          const newDefaultDynamicFieldsValues = {
                            [dynamicElement]: filteredLanguage[0].content.substring(0, value),
                          }
                          defaultDynamicFieldsValues = {
                            ...defaultDynamicFieldsValues,
                            ...newDefaultDynamicFieldsValues,
                          }
                          const newState = templates.map((template, i) => {
                            if (templateIndex === i) {
                              return {
                                ...template,
                                ...{
                                  ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                                },
                              }
                            }
                            return template
                          })
                          setTemplates(newState)
                        }}
                      />
                    </Space>
                  </Space>
                )
            }
          })}
        </div>
      </Space>
    )
  }
  return (
    <LayoutStyled>
      {contextHolder}
      {loading && (
        <Space
          style={{
            zIndex: 99999,
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
      <FloatButton.Group shape="circle">
        <Upload
          beforeUpload={checkFileType}
          showUploadList={false}
          accept=".xlsx"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const formData = new FormData()
            formData.append('file', e.file)
            dispatch(postUploadXlsx(formData))
          }}
        >
          <FloatButtonStyled
            type="primary"
            icon={<UploadOutlined />}
            tooltip={<Space>Upload Languages</Space>}
          />
        </Upload>
      </FloatButton.Group>
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
      <div style={{pointerEvents: loading ? 'none' : 'unset'}}>
        <Space style={{float: 'right', marginRight: 44}}>
          <FloatLabel
            style={{
              width: 157.3,
            }}
            label="Language"
            placeholder="Select a language"
            name="language"
            onChange={async (language: string) => {
              setLanguage(language)
              let defaultDynamicFieldsValues = templates[templateIndex].defaultDynamicFieldsValues
              for (const [element, value] of Object.entries(
                templates[templateIndex].defaultDynamicFieldsValues,
              )) {
                if (
                  element.includes('Text') ||
                  element.includes('Headline') ||
                  element.includes('legal') ||
                  element.includes('Subheadline')
                ) {
                  const {translate, length} = await translateTextHeadlineLegal(language, value)
                  setLanguageLength(length)
                  const newDefaultDynamicFieldsValues = {
                    [element]: translate,
                  }
                  defaultDynamicFieldsValues = {
                    ...defaultDynamicFieldsValues,
                    ...newDefaultDynamicFieldsValues,
                  }
                  const newState = templates.map((template: any, i: number) => {
                    if (templateIndex === i) {
                      return {
                        ...template,
                        ...{
                          ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                        },
                      }
                    }
                    return template
                  })
                  setTemplates(newState)
                }
              }
              let newLangaugesSelected = [...languageSelected]
              newLangaugesSelected[templateIndex] = false
              setLanguageSelected(newLangaugesSelected)
              setLoading(false)
            }}
            value={language}
            select={true}
            selectOptions={languagesList}
            showArrow={true}
          />
        </Space>
      </div>
      {templates.length > 1 && (
        <div style={{pointerEvents: loading ? 'none' : 'unset'}}>
          <Space style={{float: 'right', marginRight: 44, marginTop: 11}}>
            <FloatLabel
              style={{
                width: 157.3,
              }}
              label="Replicate"
              placeholder="Replicate To"
              name="replicate"
              select={true}
              selectOptions={replicates}
              showArrow={true}
              onChange={(value: number) => {
                setReplicate(value)
                let defaultDynamicFieldsValues = templates[templateIndex].defaultDynamicFieldsValues
                let dynamicElementsStyles = templates[templateIndex].dynamicElementsStyles
                let replicatedTemplates = []
                let newLangaugesSelected = [...languageSelected]
                if (value === 0) {
                  templates.map((template: any, i: number) => {
                    if (i !== templateIndex)
                      if (dynamicElementsStyles !== undefined)
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues: defaultDynamicFieldsValues,
                            dynamicElementsStyles: dynamicElementsStyles,
                          }),
                        )
                      else
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues: defaultDynamicFieldsValues,
                          }),
                        )
                    else replicatedTemplates.push(template)
                    newLangaugesSelected[i] = false
                  })
                  setLanguageSelected(newLangaugesSelected)
                  setTemplates(replicatedTemplates)
                } else {
                  templates.map((template: any, i: number) => {
                    if (template._id === value) {
                      newLangaugesSelected[i] = false
                      if (dynamicElementsStyles !== undefined)
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues: defaultDynamicFieldsValues,
                            dynamicElementsStyles: dynamicElementsStyles,
                          }),
                        )
                      else
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues: defaultDynamicFieldsValues,
                          }),
                        )
                    } else replicatedTemplates.push(template)
                  })
                  setLanguageSelected(newLangaugesSelected)
                  setTemplates(replicatedTemplates)
                }
              }}
              value={replicate}
            />
          </Space>
        </div>
      )}
      <div
        style={{
          pointerEvents: loading ? 'none' : 'unset',
          marginTop: 42.4,
          color: '#000',
          marginBottom: 42.4,
        }}
      >
        <DivMenuStyled style={{width: '20%'}}>
          {templates.map((template: any, i: number) => (
            <DivMenuItemStyled
              key={i}
              onClick={() => {
                setTemplateIndex(i)
                filesRef.current = []
                setReplicate(null)
              }}
              style={templateIndex === i ? activeStyle : {}}
            >
              <ProfileFilled style={{marginRight: 4, fontSize: '18px'}} />
              {template.size} - {template.name}
            </DivMenuItemStyled>
          ))}
        </DivMenuStyled>
        <Space
          style={{
            float: 'left',
            width: '76%',
            borderLeft: '1px solid #F0F0F0',
          }}
        >
          {renderTemplateConfigurations(templates[templateIndex], possibleValues)}
        </Space>
        <Space style={{width: '100%', justifyContent: 'right'}}>
          <Space style={{margin: '10px 20px 0 0'}}>
            <ButtonStyled
              style={{
                pointerEvents: !languageSelected[templateIndex] ? 'unset' : 'none',
              }}
              type="primary"
              onClick={() => {
                navigate('/qa-tool-v2/configure/generate/elements/done', {
                  state: {
                    templateName: templateName,
                    templates: location.state.templates.map((originalObj) => {
                      const newObj = templates.find((newObj) => newObj._id === originalObj._id)
                      return newObj ? {...originalObj, ...newObj} : originalObj
                    }),
                    templateDefaultValues: templateDefaultValues,
                    conceptLinkValue: location.state.conceptLinkValue,
                    selectAll: location.state.selectAll,
                    selectedValues: location.state.selectedValues,
                  },
                  replace: true,
                })
              }}
            >
              Generate
            </ButtonStyled>
          </Space>
        </Space>
      </div>
      <Modal
        title="Language Setting"
        open={showLanguageModal}
        mask={true}
        maskClosable={true}
        closable={false}
        footer={[
          <Button
            type="primary"
            key="cancel"
            onClick={() => setShowLanguageModal(!showLanguageModal)}
          >
            Close
          </Button>,
        ]}
        width={428}
        centered
        onOk={() => setShowLanguageModal(!showLanguageModal)}
        onCancel={() => setShowLanguageModal(!showLanguageModal)}
        maskStyle={{
          backgroundColor: 'transparent',
        }}
      >
        <Space
          style={{
            fontWeight: 'bold',
          }}
        >
          Please Select Language First
        </Space>
        <Space style={{marginLeft: 10}}>
          <FloatLabel
            style={{
              width: 157.3,
            }}
            label="Language"
            placeholder="Select a language"
            name="language"
            onChange={async (language: string) => {
              setLanguage(language)
              let defaultDynamicFieldsValues = templates[templateIndex].defaultDynamicFieldsValues
              for (const [element, value] of Object.entries(
                templates[templateIndex].defaultDynamicFieldsValues,
              )) {
                if (
                  element.includes('Text') ||
                  element.includes('Headline') ||
                  element.includes('legal') ||
                  element.includes('Subheadline')
                ) {
                  const {translate, length} = await translateTextHeadlineLegal(language, value)
                  setLanguageLength(length)
                  const newDefaultDynamicFieldsValues = {
                    [element]: translate,
                  }
                  defaultDynamicFieldsValues = {
                    ...defaultDynamicFieldsValues,
                    ...newDefaultDynamicFieldsValues,
                  }
                  const newState = templates.map((template, i) => {
                    if (templateIndex === i) {
                      return {
                        ...template,
                        ...{
                          ['defaultDynamicFieldsValues']: defaultDynamicFieldsValues,
                        },
                      }
                    }
                    return template
                  })
                  setTemplates(newState)
                }
              }
              let newLangaugesSelected = [...languageSelected]
              newLangaugesSelected[templateIndex] = false
              setLanguageSelected(newLangaugesSelected)
              setLoading(false)
              setShowLanguageModal(!showLanguageModal)
            }}
            value={language}
            select={true}
            selectOptions={languagesList}
            showArrow={true}
          />
        </Space>
      </Modal>
    </LayoutStyled>
  )
}
