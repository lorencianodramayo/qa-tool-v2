// @ts-nocheck
import styled from 'styled-components'
import {useEffect, useState} from 'react'
import {
  Layout,
  Space,
  Divider,
  Spin,
  notification,
  Select,
  Checkbox,
  TreeSelect,
  Button,
  Steps,
} from 'antd'
import type {CheckboxChangeEvent} from 'antd/es/checkbox'
import FloatLabel from '../components/FloatLabel/FloatLabel'
import {DeleteFilled} from '@ant-design/icons'
import apiService from '../api/apiService'
import {getTemplateSelectedVersion} from '../features/Configure/configureSlice'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../store'
import Cookies from 'js-cookie'
import axios from 'axios'
const {TreeNode} = TreeSelect
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
    background-color: rgb(24, 144, 255);
    border-color: rgb(24, 144, 255);
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
    border-color: rgb(24, 144, 255);
  }
  &.ant-steps
    .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-icon
    .ant-steps-icon {
    color: rgb(24, 144, 255);
  }
  &.ant-steps
    .ant-steps-item:not(.ant-steps-item-active)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-title {
    color: rgb(24, 144, 255);
  }
  &.ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: rgb(24, 144, 255);
    width: 27.6px;
    height: 27.6px;
  }
  &.ant-steps .ant-steps-item-icon .ant-steps-icon {
    top: -2px;
  }
  &.ant-steps .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: rgb(24, 144, 255);
  }
`
const TreeSelectStyled = styled(TreeSelect)`
  &.ant-select-multiple .ant-select-selector {
    box-shadow: unset !important;
    border: 1px solid #d9d9d9 !important;
  }
`
const ButtonAddDeleteStyled = styled(Button)`
  padding: 4px 6.7px;
  background-color: #1890ff;
  border-color: transparent;
  font-weight: 400;
  font-size: 14px !important;
  &.ant-btn-primary:not(:disabled):hover {
    background-color: #1890ff;
    border-color: #1890ff;
  }
  &:focus {
    outline: none;
  }
  &.ant-btn-dangerous:not(:disabled):hover {
    background-color: #ff4d4f !important;
    border-color: #ff4d4f !important;
  }
`
const ButtonGenerateStyled = styled(Button)`
  padding: 0;
  background-color: #1890ff;
  border-color: transparent;
  font-weight: 400;
  font-size: 14px !important;
  &.ant-btn-primary:not(:disabled):hover {
    background-color: #1890ff;
    border-color: #1890ff;
  }
  &:focus {
    outline: none;
  }
  &.ant-btn-dangerous:not(:disabled):hover {
    background-color: #ff4d4f !important;
    border-color: #ff4d4f !important;
  }
  height: 28px;
  width: 85px;
`
const ConfigureLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [api, contextHolder] = notification.useNotification()
  const [conceptLinkValue, setConceptLinkValue] = useState<string>(
    location.state === null ? '' : location.state.conceptLinkValue,
  )
  const [conceptLinkError, setConceptLinkError] = useState<boolean>(false)
  // const [templateValue, setTemplateValue] = useState<string>('')
  // const [defaultVersionValue, setDefaultVersionValue] = useState<string>('')
  const [templateName, setTemplateName] = useState<string>('')
  const [templates, setTemplates] = useState<any>([])
  const [newVersionTemplate, setNewVersionTemplate] = useState<any>([])
  const [fetching, setFetching] = useState<boolean>(false)
  // const [selectOptionVersions, setSelectOptionVersions] = useState<any>([])
  const [platform, setPlatform] = useState<string>('')
  const [partnerId, setPartnerId] = useState<string>('')
  const [singleTemplateSelection, setSingleTemplateSelection] = useState<string>('')
  const [singleVersionSelection, setSingleVersionSelection] = useState<boolean>(false)
  const [multipleTemplateSelection, setMultipleTemplateSelection] = useState<string>('')
  const [multipleVersionSelection, setMultipleVersionSelection] = useState<boolean>(false)
  // const [treeValues, setTreeValues] = useState<string[]>([])
  // const [newTemplates, setNewTemplates] = useState<any>([])
  interface TreeNodeData {
    title: string
    value: string
  }
  const [treeData, setTreeData] = useState<TreeNodeData[]>([])
  // const [authToken, setAuthToken] = useState(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectAll, setSelectAll] = useState<boolean>(
    location.state === null ? false : location.state.selectAll,
  )
  const [placement, setPlacement] = useState<SelectCommonPlacement>('bottomLeft')
  const [selectedValues, setSelectedValues] = useState<string[]>(
    location.state === null ? [] : location.state.selectedValues,
  )
  const {templateSelectedVersion, isTemplateSelectedVersionsSuccess} = useAppSelector(
    (state: any) => state.configure,
  )
  // useEffect(() => {
  //   const handleCookieChange = () => {
  //     const authToken = Cookies.get('session')
  //     setAuthToken(authToken)
  //   }
  //   window.addEventListener('load', handleCookieChange)
  //   window.addEventListener('cookiechange', handleCookieChange)
  //   return () => {
  //     window.removeEventListener('load', handleCookieChange)
  //     window.removeEventListener('cookiechange', handleCookieChange)
  //   }
  // }, [])
  useEffect(() => {
    if (location.state !== null) {
      let conceptLink = location.state.conceptLinkValue.split('/')
      let platform = conceptLink[2].split('.')
      setPlatform(platform[0])
      let conceptId = conceptLink[4]
      if (conceptId === undefined) setConceptLinkError(true)
      else {
        const adLibSmartlyIoPayload = {
          platform: platform[0],
          conceptId: conceptId,
        }
        adLibSmartlyIo(adLibSmartlyIoPayload)
      }
    }
  }, [])
  useEffect(() => {
    if (isTemplateSelectedVersionsSuccess) {
      let templateSelectedVersionBody = null
      templates.map((tmpl: any, i: number) => {
        if (tmpl._id === singleTemplateSelection) {
          templateSelectedVersionBody = Object.assign({}, templateSelectedVersion.body, {
            templateVersion: tmpl.templateVersion,
          })
          if (singleVersionSelection) {
            setNewVersionTemplate(templateSelectedVersionBody)
            setDefaultVersionValue({
              value: templateSelectedVersionBody._id,
              label:
                templateSelectedVersionBody.version + 1 ===
                templateSelectedVersionBody.templateVersion.length
                  ? 'Version ' +
                    (templateSelectedVersionBody.templateVersion[
                      templateSelectedVersionBody.version
                    ].version +
                      1) +
                    ' (latest)'
                  : 'Version ' +
                    (templateSelectedVersionBody.templateVersion[
                      templateSelectedVersionBody.version
                    ].version +
                      1),
            })
          }
        }
      })
      if (multipleVersionSelection)
        setTemplates((templates) => {
          return templates.map((template) => {
            templateSelectedVersionBody = Object.assign({}, templateSelectedVersion.body, {
              templateVersion: template.templateVersion,
            })
            if (template._id === multipleTemplateSelection) {
              return templateSelectedVersionBody
            }
            return template
          })
        })
      setFetching(false)
      setMultipleVersionSelection(false)
      setSingleVersionSelection(false)
    }
  }, [isTemplateSelectedVersionsSuccess, templateSelectedVersion])
  useEffect(() => {
    if (templates.length > 0) {
      let treeData: TreeNodeData[] = []
      templates.map((template) =>
        treeData.push({
          title: template.size + ' ' + template.name,
          value: template.size + ' ' + template.name,
        }),
      )
      setTreeData(treeData)
    }
  }, [templates])
  const onChangeSteps = (value: number) => {
    if (conceptLinkError || conceptLinkValue === '')
      api.error({
        message: 'Configure',
        description: 'Invalid Concept Link!',
      })
    else if (selectedValues.length === 0)
      api.info({
        message: 'Configure',
        description: 'Please Select or Add Template!',
      })
    else
      navigate('/configure/generate/elements', {
        state: {
          templateName: templateName,
          templates: templates.filter((tmpl) =>
            selectedValues.includes(tmpl.size + ' ' + tmpl.name),
          ),
          conceptLinkValue: conceptLinkValue,
          selectAll: selectAll,
          selectedValues: selectedValues.length > 0 ? selectedValues : [],
        },
        replace: true,
      })
  }
  const adLibSmartlyIo = async (adLibSmartlyIoPayload: any) => {
    setFetching(true)
    const partner = await apiService.post('/getPartnerId', adLibSmartlyIoPayload)
    adLibSmartlyIoPayload['partnerId'] = partner.data.body.partnerId
    setPartnerId(partner.data.body.partnerId)
    const templates = await apiService.post('/getTemplates', adLibSmartlyIoPayload)
    setTemplateName(templates.data.body.name)
    if (location.state !== null)
      setTemplates(
        templates.data.body.templates.map((originalObj) => {
          const newObj = location.state.templates.find((newObj) => newObj._id === originalObj._id)
          return newObj ? {...originalObj, ...newObj} : originalObj
        }),
      )
    else setTemplates(templates.data.body.templates)
    setFetching(false)
  }
  const handleChange = (selectedValues: string[]) => {
    setSelectAll(false)
    setSelectedValues(selectedValues)
  }
  const handleSelectAll = (e: CheckboxChangeEvent) => {
    setSelectAll(e.target.checked)
    const filteredValues = treeData
      .filter((node) => filterTreeNode(searchValue, node))
      .map((node) => node.value)
    setSelectedValues(filteredValues)
  }
  const handleUnselectAll = (e: CheckboxChangeEvent) => {
    setSelectAll(e.target.checked)
    setSearchValue('')
    setSelectedValues([])
  }
  const filterTreeNode = (inputValue: string, treeNode: TreeNodeData) => {
    setSearchValue(inputValue)
    return treeNode.title.toLowerCase().includes(inputValue.toLowerCase())
  }
  const renderTreeNodes = (data: TreeNodeData[]) => {
    return data.map((node) => <TreeNode title={node.title} value={node.value} key={node.value} />)
  }
  const getSelectOptionTemplates = () => {
    let getSelectOptionTemplates = []
    templates.map((template, index) =>
      getSelectOptionTemplates.push({
        value: template._id,
        label: template.size + '-' + template.name,
      }),
    )
    return getSelectOptionTemplates
  }
  const addSelectTemplatesVersions = () => {
    let template = []
    templates.map((tmpl) => {
      if (tmpl._id === singleTemplateSelection) template.push(tmpl)
    })
    setTemplates([
      ...templates,
      typeof newVersionTemplate === 'object' && newVersionTemplate.length !== 0
        ? newVersionTemplate
        : template[0],
    ])
  }
  const getSelectOptionVersions = (template) => {
    let getSelectOptionVersions = []
    template.templateVersion.map((templateVersion, index) => {
      getSelectOptionVersions.push({
        value: templateVersion.id,
        label:
          index + 1 === template.templateVersion.length
            ? 'Version ' + (index + 1) + ' (latest)'
            : 'Version ' + (index + 1),
        approved: templateVersion.approvals !== undefined ? true : false,
      })
    })
    return getSelectOptionVersions
  }
  const getSelectOptionVersionDefaultValue = (template) => {
    let defaultVersionValue = []
    defaultVersionValue.push({
      value: template.templateVersion[template.version]?.id,
      label:
        template.version + 1 === template.templateVersion.length
          ? 'Version ' + (template.version + 1) + ' (latest)'
          : 'Version ' + (template.version + 1),
    })
    return defaultVersionValue
  }
  const removeSelectTemplatesVersions = (template) => {
    setSelectAll(false)
    setSelectedValues(selectedValues.filter((item) => item !== template.size + ' ' + template.name))
  }
  return (
    <LayoutStyled>
      {contextHolder}
      {/* <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 42.1,
        }}
      >
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
          1
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
            height: '27.6px',
            width: '27.6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0, 0, 0, 0.25)',
            marginRight: 6.6,
          }}
        >
          2
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
            height: '27.6px',
            width: '27.6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0, 0, 0, 0.25)',
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
          margin: '35.8px auto 36px auto',
        }}
      >
        {fetching && (
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
        <Space.Compact
          block
          style={{
            marginBottom: conceptLinkError ? 0 : 4.1,
            marginTop: 5,
          }}
        >
          <FloatLabel
            style={{width: 324.6}}
            label="Concept Link"
            placeholder="Concept Link"
            name="conceptLink"
            onChange={(value) => {
              try {
                let conceptLink = value.target.value.split('/')
                let platform = conceptLink[2].split('.')
                setPlatform(platform[0])
                let conceptId = conceptLink[4]
                if (conceptId === undefined) setConceptLinkError(true)
                else {
                  const adLibSmartlyIoPayload = {
                    platform: platform[0],
                    conceptId: conceptId,
                  }
                  adLibSmartlyIo(adLibSmartlyIoPayload)
                  setConceptLinkError(false)
                  value.target.blur()
                }
              } catch (error) {
                setConceptLinkError(true)
              }
              setConceptLinkValue(value.target.value)
              setSelectedValues([])
              setTreeData([])
              setTemplates([])
            }}
            value={conceptLinkValue}
            input={true}
          />
        </Space.Compact>
        {conceptLinkError && (
          <Space.Compact block style={{color: 'red', fontSize: 12, padding: '0 0 0 12px'}}>
            Invalid Concept Link
          </Space.Compact>
        )}
        {treeData.length > 1 && (
          <>
            <Space
              style={{
                marginBottom: 4.1,
              }}
            >
              <Checkbox
                checked={selectAll}
                onChange={selectAll ? handleUnselectAll : handleSelectAll}
              >
                {selectAll ? 'Unselect All' : 'Select All'}
              </Checkbox>
            </Space>
            <Space.Compact
              block
              style={{
                marginBottom: 15,
              }}
            >
              <TreeSelectStyled
                style={{
                  width: 324.6,
                }}
                placeholder="Please select template"
                maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} Templates ...`}
                maxTagCount={2}
                allowClear={true}
                value={selectedValues}
                onChange={handleChange}
                treeNodeFilterProp="title"
                treeDefaultExpandAll
                treeCheckable
                showCheckedStrategy={TreeSelect.SHOW_ALL}
                filterTreeNode={filterTreeNode}
                placement={placement}
              >
                {renderTreeNodes(treeData)}
              </TreeSelectStyled>
            </Space.Compact>
          </>
        )}
        <div>
          {templates
            .filter((tmpl) => selectedValues.includes(tmpl.size + ' ' + tmpl.name))
            .map((template, index) => {
              return (
                <div key={index} style={{marginBottom: 16.1}}>
                  <Space>
                    <Space.Compact block>
                      <FloatLabel
                        style={{
                          width: 324.6,
                        }}
                        label="Template"
                        placeholder="Template"
                        name="template"
                        value={template.size + '-' + template.name}
                        select={true}
                        selectOptions={[]}
                        // showArrow={false}
                        // templateItem={true}
                      />
                    </Space.Compact>
                    <Space.Compact block>
                      <FloatLabel
                        style={{
                          width: 158.3,
                        }}
                        label="Version"
                        placeholder="Version"
                        name="version"
                        onChange={(value) => {
                          setMultipleVersionSelection(!multipleVersionSelection)
                          setFetching(!fetching)
                          setMultipleTemplateSelection(template._id)
                          let payload = {
                            platform: platform,
                            templateId: value,
                            partnerId: partnerId,
                          }
                          dispatch(getTemplateSelectedVersion(payload))
                        }}
                        value={getSelectOptionVersionDefaultValue(template)}
                        select={true}
                        selectOptions={getSelectOptionVersions(template)}
                        showArrow={true}
                      />
                    </Space.Compact>
                    <Space
                      wrap
                      style={{
                        pointerEvents: fetching ? 'none' : 'unset',
                      }}
                    >
                      <ButtonAddDeleteStyled
                        type="primary"
                        shape="circle"
                        danger
                        onClick={() => removeSelectTemplatesVersions(template)}
                        icon={<DeleteFilled />}
                      />
                    </Space>
                  </Space>
                </div>
              )
            })}
        </div>
        {/* {treeData.length > 1 && (
          <Space wrap style={{marginBottom: 25.6}}>
            <Space.Compact block>
              <FloatLabel
                style={{
                  width: 250,
                }}
                label="Template"
                placeholder="Template"
                name="template"
                onChange={(value) => {
                  setSingleTemplateSelection(value)
                  let selectOptionVersions = []
                  let defaultVersionValue: any = []
                  templates
                    .filter((template) => template._id === value)
                    .map((template) => {
                      template.templateVersion.map((templateVersion, index) => {
                        selectOptionVersions.push({
                          value: templateVersion.id,
                          label:
                            index + 1 === template.templateVersion.length
                              ? 'Version ' + (index + 1) + ' (latest)'
                              : 'Version ' + (index + 1),
                          approved: templateVersion.approvals !== undefined ? true : false,
                        })
                        if (template.version === index)
                          defaultVersionValue.push({
                            value: templateVersion.id,
                            label:
                              index + 1 === template.templateVersion.length
                                ? 'Version ' + (index + 1) + ' (latest)'
                                : 'Version ' + (index + 1),
                          })
                      })
                      setSelectOptionVersions(selectOptionVersions)
                      setDefaultVersionValue(defaultVersionValue)
                    })
                }}
                value={singleTemplateSelection}
                select={true}
                selectOptions={getSelectOptionTemplates()}
                showArrow={true}
                templateItem={true}
              />
            </Space.Compact>
            <Space.Compact block>
              <FloatLabel
                style={{
                  width: 158.3,
                }}
                label="Version"
                placeholder="Version"
                name="version"
                onChange={(value) => {
                  setSingleVersionSelection(!singleVersionSelection)
                  setFetching(!fetching)
                  let payload = {
                    platform: platform,
                    templateId: value,
                    partnerId: partnerId,
                  }
                  dispatch(getTemplateSelectedVersion(payload))
                }}
                value={defaultVersionValue}
                select={true}
                selectOptions={selectOptionVersions}
                showArrow={true}
              />
            </Space.Compact>
            {singleTemplateSelection !== '' && (
              <Space wrap>
                <ButtonAddDeleteStyled
                  type="primary"
                  shape="circle"
                  onClick={addSelectTemplatesVersions}
                >
                  +
                </ButtonAddDeleteStyled>
              </Space>
            )}
          </Space>
        )} */}
        {templates.length > 0 && (
          <Space.Compact block>
            <ButtonGenerateStyled
              type="primary"
              htmlType="submit"
              onClick={() => {
                if (selectedValues.length === 0)
                  api.info({
                    message: 'Configure',
                    description: 'Please Select or Add Template!',
                  })
                else
                  navigate('/configure/generate/elements', {
                    state: {
                      templateName: templateName,
                      templates: templates.filter((tmpl) =>
                        selectedValues.includes(tmpl.size + ' ' + tmpl.name),
                      ),
                      conceptLinkValue: conceptLinkValue,
                      selectAll: selectAll,
                      selectedValues: selectedValues.length > 0 ? selectedValues : [],
                    },
                    replace: true,
                  })
              }}
            >
              Generate
            </ButtonGenerateStyled>
          </Space.Compact>
        )}
      </div>
    </LayoutStyled>
  )
}

export default ConfigureLayout
