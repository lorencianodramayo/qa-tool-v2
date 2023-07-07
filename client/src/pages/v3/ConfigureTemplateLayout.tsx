import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import {useAppDispatch, useAppSelector} from '../../store'
import {useParams} from 'react-router-dom'
import {useOnMount, useOnMountv2} from '../../hooks'
import {getTemplate, postUpload} from '../../features/v3/Template/templateSlice'
import _ from 'lodash'
import {
  Button,
  Divider,
  Drawer,
  FloatButton,
  Input,
  Layout,
  Modal,
  Select,
  Space,
  Form,
  notification,
  ColorPicker,
  InputNumber,
} from 'antd'
const {Sider, Content} = Layout
import type {Color, ColorPickerProps} from 'antd/es/color-picker'
import Typography from 'antd/es/typography/Typography'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TranslationOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import Frame from '../../components/v3/Frame/Frame'
import SubmitButton from '../../components/v3/SubmitButton/SubmitButton'
import {
  fetchLanguages,
  addLanguage,
  fetchLanguage,
  updateLanguage,
  destroyLanguage,
} from '../../features/v3/Language/languageSlice'
import InfiniteScroll from '../../components/v3/InfiniteScroll/InfiniteScroll'
import apiService from '../../api/apiService'
import Loader from '../../components/v3/Loader/Loader'
import UploadFile from '../../components/v3/Uploadv2/Uploadv2'
const LayoutStyled = styled(Layout)`
  background: #fff;
`
const ConfigureTemplateLayout: React.FC<any> = ({}) => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const {template, upload, isUploadLoading, isUploadSuccess} = useAppSelector(
    (state) => state.template,
  )
  const {
    getLanguages,
    getLanguage,
    isGetLanguageLoading,
    isGetLanguageSuccess,
    postLanguage,
    isPostLanguageSuccess,
    putLanguage,
    isPutLanguageSuccess,
    deleteLanguage,
    isDeleteLanguageSuccess,
  } = useAppSelector((state) => state.languagev3)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [_template, setTemplate] = useState<any>(template)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('')
  const [dynamicElement, setDynamicElement] = useState<any>(null)
  const [formatHex] = useState<ColorPickerProps['format']>('hex')
  const [formatRgb] = useState<ColorPickerProps['format']>('rgb')
  const drawerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()
  const [refresh, setRefresh] = useState<number>(0)
  useOnMount(() => {
    dispatch(fetchLanguages())
    dispatch(getTemplate(params.uploadID))
  })
  useOnMountv2(() => {
    setTemplate(template)
  }, [template])
  useOnMountv2(() => {
    if (isPostLanguageSuccess) {
      if (postLanguage?.success) {
        api['success']({
          message: `${postLanguage.language.language
            .charAt(0)
            .toUpperCase()}${postLanguage.language.language
            ?.slice(1)
            .toLowerCase()} Language Added Sucessfully`,
          description: `${postLanguage.language.language
            .charAt(0)
            .toUpperCase()}${postLanguage.language.language
            ?.slice(1)
            .toLowerCase()} Language Added Sucessfully!`,
        })
        dispatch(fetchLanguages())
        setIsModalOpen(!isModalOpen)
      } else
        api['error']({
          message: `${postLanguage.language.language
            .charAt(0)
            .toUpperCase()}${postLanguage.language.language
            ?.slice(1)
            .toLowerCase()} Language Added Sucessfully`,
          description: `${postLanguage.language.language
            .charAt(0)
            .toUpperCase()}${postLanguage.language.language
            ?.slice(1)
            .toLowerCase()} Language Added Sucessfully!`,
        })
    }
  }, [postLanguage])
  useOnMountv2(() => {
    if (isGetLanguageSuccess) {
      if (isUpdate) {
        setIsModalOpen(!isModalOpen)
        form.setFieldsValue({
          language: getLanguage[0].language,
          content: getLanguage[0].content,
        })
      } else setIsDeleteModalOpen(!isDeleteModalOpen)
    }
  }, [getLanguage])
  useOnMountv2(() => {
    if (isPutLanguageSuccess) {
      api['success']({
        message: `${putLanguage.language.language
          .charAt(0)
          .toUpperCase()}${putLanguage.language.language
          ?.slice(1)
          .toLowerCase()} Language Updated Sucessfully`,
        description: `${putLanguage.language.language
          .charAt(0)
          .toUpperCase()}${putLanguage.language.language
          ?.slice(1)
          .toLowerCase()} Language Updated Sucessfully!`,
      })
      dispatch(fetchLanguages())
      setIsUpdate(!isUpdate)
      setIsModalOpen(!isModalOpen)
    }
  }, [putLanguage, isPutLanguageSuccess])
  useOnMountv2(() => {
    if (isDeleteLanguageSuccess) {
      setIsDeleteModalOpen(!isDeleteModalOpen)
      dispatch(fetchLanguages())
    }
  }, [deleteLanguage, isDeleteLanguageSuccess])
  useOnMountv2(() => {
    if (!isUploadLoading)
      if (isUploadSuccess) {
        let updatedTemplate = {
          ..._template,
          ['template']: {
            ..._template.template,
            ['elements']: {
              ..._template.template.elements,
              [dynamicElement]: {
                ..._template.template.elements[dynamicElement],
                ['image']: {
                  ['src']: upload,
                },
              },
            },
          },
        }
        setTemplate(updatedTemplate)
        setRefresh((prevRefresh) => prevRefresh + 1)
      }
  }, [isUploadLoading, isUploadSuccess, upload, dynamicElement])
  const buttonCases = [
    {
      value: 'Capitalize',
      label: 'Aa',
    },
    {value: 'Lowercase', label: 'aa'},
    {value: 'Uppercase', label: 'AA'},
  ]
  const textMaxValue = (text: string) => {
    let html = text
    let div = document.createElement('div')
    div.innerHTML = html
    let textHeadingLegal = div.textContent || div.innerText || ''
    return textHeadingLegal.length
  }
  const replaceBulk = (str: string, findArray: any, replaceArray: any) => {
    let i: number,
      regex: any = [],
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
  const textCase = (text: string, textCase: string) => {
    let caseText = ''
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
      caseText = replaceBulk(text, findArrayTwo, replaceArrayTwo)
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
        caseText = tempText.join(' ')
      } else if (textCase === 'Lowercase') caseText = text.toLowerCase()
      else if (textCase === 'Uppercase') caseText = text.toUpperCase()
      else caseText = text
    }
    return caseText
  }
  const isColor = (color: string) => {
    const colorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/
    return colorPattern.test(color)
  }
  const isRGBColor = (color: string) => {
    if (color.startsWith('rgb(') && color.endsWith(')')) {
      const values = color.substring(4, color.length - 1).split(',')
      if (values.length === 3) {
        const [r, g, b] = values.map(Number)
        return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255
      }
    }
    return false
  }
  const isRGBAColor = (color: string) => {
    if (color.startsWith('rgba(') && color.endsWith(')')) {
      const values = color.substring(5, color.length - 1).split(',')
      if (values.length === 4) {
        const [r, g, b, a] = values.map(Number)
        return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1
      }
    }
    return false
  }
  const isHexColor = (color: string) => {
    if (color.startsWith('#') && (color.length === 4 || color.length === 7)) {
      const hex = color.substring(1)
      return /^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{3}$/.test(hex)
    }
    return false
  }
  const handleUploadFile = (file: File) => {
    const formData = new FormData()
    formData.append('id', params.uploadID)
    formData.append('file', file)
    dispatch(postUpload(formData))
  }
  const showDrawer = () => {
    if (drawerRef.current) {
      const height = drawerRef.current.offsetHeight
      setHeight(height)
    }
    setOpen(!open)
  }
  const onClose = () => setOpen(!open)
  const showModal = () => {
    form.resetFields()
    setIsModalOpen(!isModalOpen)
  }
  const handleCancel = () => setIsModalOpen(!isModalOpen)
  const handleDeleteCancel = () => setIsDeleteModalOpen(!isDeleteModalOpen)
  const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 20},
  }
  const _getLanguage = (option: string, _id: string) => {
    if (option === 'edit') {
      setIsUpdate(true)
    }
    if (option === 'delete') {
      setIsUpdate(false)
    }
    form.setFieldsValue({
      language: '',
      content: '',
    })
    dispatch(fetchLanguage(_id))
  }
  const onFinish = (values: any) => {
    if (isUpdate) dispatch(updateLanguage({_id: getLanguage[0]._id, values}))
    else dispatch(addLanguage(values))
  }
  const containsHexColor = (value: string): boolean => {
    const pattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    const match = value.match(pattern)
    return match !== null
  }
  const onChangeLanguage = (language: string) => {
    setLanguage(language)
    const updatedTemplate = JSON.parse(JSON.stringify(_template))
    Object.keys(updatedTemplate?.template.elements).forEach(async (key) => {
      const element = updatedTemplate?.template.elements[key]
      if (element.reportingDimension && element.text)
        if (!containsHexColor(element.text.value)) {
          setIsLoading(!isLoading)
          const response = await apiService.post('/translate/v3', {
            language: language,
            text: element.text.value,
          })
          if (!_.isNil(response.data.data))
            element.text.value = !_.isUndefined(element.style.textTransform)
              ? textCase(
                  response.data.data,
                  element.style.textTransform.charAt(0).toUpperCase() +
                    element.style.textTransform.slice(1),
                )
              : response.data.data
          else element.text.value = 'Text Translation Failed'
          setIsLoading(false)
        }
    })
    setTimeout(() => {
      setTemplate(updatedTemplate)
      setRefresh((prevRefresh) => prevRefresh + 1)
    }, 1010)
  }
  return (
    <LayoutStyled>
      {contextHolder}
      {isLoading && <Loader />}
      <FloatButton
        type="primary"
        icon={<TranslationOutlined />}
        tooltip={<Space>Languages</Space>}
        onClick={showDrawer}
      />
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        theme="light"
        trigger={null}
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
        width={300}
      >
        <div style={{padding: '2em'}}>
          {!_.isNil(_template) &&
            Object.keys(_template.template.elements).map((data, index) => (
              <div key={index}>
                <Typography style={{fontWeight: 800}}>{data}</Typography>
                {Object.keys(_template.template.elements[data]).map((child, index) => (
                  <div key={index}>
                    {child === 'text' || child === 'url' ? (
                      _.isUndefined(_template.template.elements[data].enum) ? (
                        <>
                          {!isColor(_template.template.elements[data][child].value) ? (
                            <Input
                              value={_template.template.elements[data][child].value}
                              onChange={async (e) => {
                                let text = e.target.value
                                if (!_.isEmpty(language)) {
                                  const response = await apiService.post('/translate', {
                                    language: language,
                                    text: text,
                                  })
                                  text = response.data.data
                                }
                                if (
                                  !_.isUndefined(
                                    _template.template.elements[data].style.textTransform,
                                  )
                                )
                                  text = textCase(
                                    text,
                                    _template.template.elements[data].style.textTransform
                                      .charAt(0)
                                      .toUpperCase() +
                                      _template.template.elements[data].style.textTransform.slice(
                                        1,
                                      ),
                                  )
                                let updatedTemplate = {
                                  ..._template,
                                  ['template']: {
                                    ..._template.template,
                                    ['elements']: {
                                      ..._template.template.elements,
                                      [data]: {
                                        ..._template.template.elements[data],
                                        [child]: {
                                          ['value']: text,
                                        },
                                      },
                                    },
                                  },
                                }
                                setTemplate(updatedTemplate)
                                setRefresh((prevRefresh) => prevRefresh + 1)
                              }}
                            />
                          ) : (
                            <Input
                              value={_template.template.elements[data][child].value}
                              disabled={true}
                            />
                          )}
                          {child === 'text' &&
                            !isColor(_template.template.elements[data][child].value) && (
                              <Space style={{marginTop: 5}}>
                                {buttonCases.map((buttonCase) => (
                                  <Button
                                    style={{
                                      backgroundColor:
                                        _template.template.elements[data].style?.textTransform ===
                                        buttonCase.value.toLowerCase()
                                          ? '#339af0'
                                          : 'unset',
                                    }}
                                    size="small"
                                    onClick={() => {
                                      let updatedTemplate = {
                                        ..._template,
                                        ['template']: {
                                          ..._template.template,
                                          ['elements']: {
                                            ..._template.template.elements,
                                            [data]: {
                                              ..._template.template.elements[data],
                                              ['style']: {
                                                ..._template.template.elements[data]['style'],
                                                ['textTransform']:
                                                  buttonCase.value === 'Capitalize'
                                                    ? 'capitalize'
                                                    : buttonCase.value === 'Lowercase'
                                                    ? 'lowercase'
                                                    : buttonCase.value === 'Uppercase'
                                                    ? 'uppercase'
                                                    : 'capitalize',
                                              },
                                              ..._template.template.elements[data][child],
                                              [child]: {
                                                ['value']: textCase(
                                                  _template.template.elements[data][child].value,
                                                  buttonCase.value,
                                                ),
                                              },
                                            },
                                          },
                                        },
                                      }
                                      setTemplate(updatedTemplate)
                                      setRefresh((prevRefresh) => prevRefresh + 1)
                                    }}
                                  >
                                    {buttonCase.label}
                                  </Button>
                                ))}
                                <InputNumber
                                  controls={{
                                    upIcon: <CaretUpOutlined />,
                                    downIcon: <CaretDownOutlined />,
                                  }}
                                  bordered={true}
                                  defaultValue={textMaxValue(
                                    _template.template.elements[data][child].value,
                                  )}
                                  onStep={(value: number) => {
                                    if (value > 1000)
                                      api['warning']({
                                        message: `${_template.template.elements[data]['reportingDimension']}`,
                                        description: 'Character Limit Exceeds!',
                                      })
                                    const filteredLanguage = getLanguages.filter(
                                      (lang: {language: string}) => {
                                        if (_.isEmpty(language)) return lang.language === 'Latin'
                                        else return lang.language === language
                                      },
                                    )
                                    let updatedTemplate = {
                                      ..._template,
                                      ['template']: {
                                        ..._template.template,
                                        ['elements']: {
                                          ..._template.template.elements,
                                          [data]: {
                                            ..._template.template.elements[data],
                                            ['style']: {
                                              ..._template.template.elements[data]['style'],
                                              ['textTransform']: _template.template.elements[
                                                data
                                              ].style.hasOwnProperty('textTransform')
                                                ? _template.template.elements[data].style
                                                    .textTransform
                                                : '',
                                            },
                                            ..._template.template.elements[data][child],
                                            [child]: {
                                              ['value']: filteredLanguage[0].content.substring(
                                                0,
                                                value,
                                              ),
                                            },
                                          },
                                        },
                                      },
                                    }
                                    setTemplate(updatedTemplate)
                                    setRefresh((prevRefresh) => prevRefresh + 1)
                                  }}
                                  onChange={(value: number) => {
                                    if (value > 1000)
                                      api['warning']({
                                        message: `${_template.template.elements[data]['reportingDimension']}`,
                                        description: 'Character Limit Exceeds!',
                                      })
                                    const filteredLanguage = getLanguages.filter(
                                      (lang: {language: string}) => {
                                        if (_.isEmpty(language)) return lang.language === 'Latin'
                                        else return lang.language === language
                                      },
                                    )
                                    let updatedTemplate = {
                                      ..._template,
                                      ['template']: {
                                        ..._template.template,
                                        ['elements']: {
                                          ..._template.template.elements,
                                          [data]: {
                                            ..._template.template.elements[data],
                                            ['style']: {
                                              ..._template.template.elements[data]['style'],
                                              ['textTransform']: _template.template.elements[
                                                data
                                              ].style.hasOwnProperty('textTransform')
                                                ? _template.template.elements[data].style
                                                    .textTransform
                                                : '',
                                            },
                                            ..._template.template.elements[data],
                                            [child]: {
                                              ['value']: filteredLanguage[0].content.substring(
                                                0,
                                                value,
                                              ),
                                            },
                                          },
                                        },
                                      },
                                    }
                                    setTemplate(updatedTemplate)
                                    setRefresh((prevRefresh) => prevRefresh + 1)
                                  }}
                                />
                              </Space>
                            )}
                          {child === 'text' &&
                            isColor(_template.template.elements[data][child].value) && (
                              <Space.Compact block style={{marginTop: 5, color: '#000'}}>
                                <ColorPicker
                                  format={
                                    isRGBColor(_template.template.elements[data][child].value)
                                      ? formatRgb
                                      : isHexColor(_template.template.elements[data][child].value)
                                      ? formatHex
                                      : isRGBAColor(_template.template.elements[data][child].value)
                                      ? formatRgb
                                      : formatHex
                                  }
                                  value={_template.template.elements[data][child].value}
                                  onChange={(value: Color) => {
                                    let color: string =
                                      _template.template.elements[data][child].value
                                    if (isRGBColor(_template.template.elements[data][child].value))
                                      color = value.toRgbString()
                                    else if (
                                      isHexColor(_template.template.elements[data][child].value)
                                    )
                                      color = value.toHexString()
                                    else color = value.toRgbString()
                                    let updatedTemplate = {
                                      ..._template,
                                      ['template']: {
                                        ..._template.template,
                                        ['elements']: {
                                          ..._template.template.elements,
                                          [data]: {
                                            ..._template.template.elements[data],
                                            [child]: {
                                              ['value']: color,
                                            },
                                          },
                                        },
                                      },
                                    }
                                    setTemplate(updatedTemplate)
                                    setRefresh((prevRefresh) => prevRefresh + 1)
                                  }}
                                />
                              </Space.Compact>
                            )}
                          {child === 'url' && (
                            <Space style={{marginTop: 5, color: '#000'}}>
                              <Button
                                type="primary"
                                icon={<LinkOutlined />}
                                onClick={() => {
                                  let updatedTemplate = {
                                    ..._template,
                                    ['template']: {
                                      ..._template.template,
                                      ['elements']: {
                                        ..._template.template.elements,
                                        [data]: {
                                          ..._template.template.elements[data],
                                          [child]: {
                                            ['value']: 'https://www.google.com',
                                          },
                                        },
                                      },
                                    },
                                  }
                                  setTemplate(updatedTemplate)
                                  setRefresh((prevRefresh) => prevRefresh + 1)
                                }}
                              />
                            </Space>
                          )}
                        </>
                      ) : (
                        <Select
                          style={{width: '100%'}}
                          defaultValue={_template.template.elements[data][child].value}
                          options={_template.template.elements[data].enum}
                        />
                      )
                    ) : child === 'image' || child === 'video' ? (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px dashed #ececec',
                            padding: '0.5em',
                            borderRadius: '8px',
                          }}
                        >
                          <div
                            style={{
                              width: '80px',
                              height: '80px',
                              overflow: 'hidden',
                              borderRadius: '8px',
                              marginRight: '18px',
                              border: '1px solid #f1f1f1cc',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              src={
                                _template.template.elements[data][child].src.includes('http')
                                  ? _template.template.elements[data][child].src
                                  : `https://storage.googleapis.com/${_template.path}/${_template._id}/${_template.name}/${_template.template.elements[data][child].src}`
                              }
                              alt={data}
                              style={{
                                width: '-webkit-fill-available',
                                height: 'auto',
                              }}
                            />
                          </div>
                          <Typography>
                            {_template.template.elements[data][child].src.includes('http')
                              ? _template.template.elements[data][child].src.substring(
                                  _template.template.elements[data][child].src.indexOf('assets') +
                                    7,
                                )
                              : _template.template.elements[data][child].src}
                          </Typography>
                        </div>
                        <Space
                          style={{
                            marginTop: 5,
                          }}
                        >
                          <UploadFile
                            onFile={(file: File) => {
                              setDynamicElement(data)
                              handleUploadFile(file)
                            }}
                          />
                        </Space>
                      </>
                    ) : null}
                  </div>
                ))}
                <Divider />
              </div>
            ))}
        </div>
      </Sider>
      <div ref={drawerRef}>
        <Drawer title="Languages" placement="right" onClose={onClose} open={open}>
          <InfiniteScroll
            height={height}
            languages={getLanguages}
            _getLanguage={_getLanguage}
            onChangeLanguage={onChangeLanguage}
          />
          <Space.Compact block style={{marginTop: 10}}>
            <Button type="primary" onClick={showModal}>
              Add Language
            </Button>
          </Space.Compact>
        </Drawer>
      </div>
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 300,
        }}
      >
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              padding: '1em',
              background: '#fff',
              borderRadius: '8px',
              border: '1px solid #ececec',
              width: 'max-content',
            }}
          >
            <Frame
              refresh={refresh}
              width={_template?.template.width}
              height={_template?.template.height}
              bucketName={_template?.path}
              templateId={_template?._id}
              templateName={_template?.name}
              elements={_template?.template.elements}
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title="Language"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form {...layout} name="language" onFinish={onFinish} form={form} autoComplete="off">
          <Form.Item name="language" label="Language" rules={[{required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{required: true}]}>
            <Input.TextArea rows={18} />
          </Form.Item>
          <Form.Item wrapperCol={{...layout.wrapperCol, offset: 20}}>
            <SubmitButton form={form} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Language" open={isDeleteModalOpen} onCancel={handleDeleteCancel} footer={null}>
        <p>
          Are you sure you want to delete {!_.isNil(getLanguage) && getLanguage[0].language}{' '}
          language?
        </p>
        <div style={{textAlign: 'right'}}>
          <Button onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)} style={{marginRight: 8}}>
            No
          </Button>
          <Button onClick={() => dispatch(destroyLanguage({_id: getLanguage[0]._id}))}>Yes</Button>
        </div>
      </Modal>
    </LayoutStyled>
  )
}

export default ConfigureTemplateLayout
