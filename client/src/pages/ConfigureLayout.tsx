// // @ts-nocheck
import styled from 'styled-components'
import {useEffect, useState} from 'react'
import {Layout, Space, Spin, notification, Checkbox, TreeSelect, Button, Steps} from 'antd'
import type {CheckboxChangeEvent} from 'antd/es/checkbox'
import FloatLabel from '../components/FloatLabel/FloatLabel'
import {DeleteFilled} from '@ant-design/icons'
import apiService from '../api/apiService'
import {
  getTemplateSelectedVersion,
  postTemplateDefaultValues,
} from '../features/Configure/configureSlice'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../store'
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
const ButtonDeleteStyled = styled(Button)`
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
  const [currentStep] = useState<number>(0)
  const [conceptLinkValue, setConceptLinkValue] = useState<string>(
    location.state === null ? '' : location.state.conceptLinkValue,
  )
  const [conceptLinkError, setConceptLinkError] = useState<boolean>(false)
  const [templateName, setTemplateName] = useState<string>('')
  const [templates, setTemplates] = useState<any>([])
  const [fetching, setFetching] = useState<boolean>(false)
  const [platform, setPlatform] = useState<string>('')
  const [partnerId, setPartnerId] = useState<string>('')
  const [multipleTemplateSelection, setMultipleTemplateSelection] = useState<string>('')
  const [multipleVersionSelection, setMultipleVersionSelection] = useState<boolean>(false)
  const [_templateDefaultValues, setTemplateDefaultValues] = useState<any>([])
  const [api, contextHolder] = notification.useNotification()
  interface TreeNodeData {
    title: string
    value: string
  }
  const [treeData, setTreeData] = useState<TreeNodeData[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectAll, setSelectAll] = useState<boolean>(
    location.state === null ? false : location.state.selectAll,
  )
  const [selectedValues, setSelectedValues] = useState<string[]>(
    location.state === null ? [] : location.state.selectedValues,
  )
  const {
    templateDefaultValues,
    isTemplateDefaultValuesLoading,
    isTemplateDefaultValuesSuccess,
    templateSelectedVersion,
    isTemplateSelectedVersionsSuccess,
  } = useAppSelector((state: any) => state.configure)
  useEffect(() => {
    if (location.state !== null) {
      setTemplateDefaultValues(location.state.templateDefaultValues)
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
  useEffect(() => {
    if (isTemplateDefaultValuesSuccess) {
      if (selectedValues.length === 0)
        api.info({
          message: 'Configure',
          description: 'Please Select or Add Template!',
        })
      else if (_templateDefaultValues.length === 0 && location.state === null) {
        navigate('/qa-tool-v2/configure/generate/elements', {
          state: {
            templateName: templateName,
            templates: templates.filter((tmpl: any) =>
              selectedValues.includes(tmpl.size + ' ' + tmpl.name),
            ),
            templateDefaultValues: templateDefaultValues.data,
            conceptLinkValue: conceptLinkValue,
            selectAll: selectAll,
            selectedValues: selectedValues.length > 0 ? selectedValues : [],
            languageSelected: location.state !== null ? location.state.languageSelected : null,
          },
          replace: true,
        })
      }
    }
  }, [templateDefaultValues, isTemplateDefaultValuesLoading, isTemplateDefaultValuesSuccess])
  const onChangeSteps = () => {
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
    else if (_templateDefaultValues.length === 0)
      api.info({
        message: 'Configure',
        description: 'Please Generate!',
      })
    else
      navigate('/qa-tool-v2/configure/generate/elements', {
        state: {
          templateName: templateName,
          templates: templates.filter((tmpl) =>
            selectedValues.includes(tmpl.size + ' ' + tmpl.name),
          ),
          templateDefaultValues: _templateDefaultValues,
          conceptLinkValue: conceptLinkValue,
          selectAll: selectAll,
          selectedValues: selectedValues.length > 0 ? selectedValues : [],
          languageSelected: location.state !== null ? location.state.languageSelected : null,
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
        templates.data.body.templates.map((originalObj: any) => {
          const newObj = location.state.templates.find(
            (newObj: any) => newObj._id === originalObj._id,
          )
          return newObj ? {...originalObj, ...newObj} : originalObj
        }),
      )
    else setTemplates(templates.data.body.templates)
    setFetching(false)
  }
  const handleSelectAll = (e: CheckboxChangeEvent) => {
    setSelectAll(e.target.checked)
    let filteredSelectedValues = null
    if (searchValue)
      filteredSelectedValues = treeData
        .filter((node) => node.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((node) => node.value)
    else filteredSelectedValues = treeData.map((node) => node.value)
    if (selectedValues.length === 0) setSelectedValues(filteredSelectedValues)
    else setSelectedValues((prevValues) => [...prevValues, ...filteredSelectedValues])
    let treeDataOrig: TreeNodeData[] = []
    templates.map((template) =>
      treeDataOrig.push({
        title: template.size + ' ' + template.name,
        value: template.size + ' ' + template.name,
      }),
    )
    setTreeData(treeDataOrig)
  }
  const handleUnselectAll = (e: CheckboxChangeEvent) => {
    setSelectAll(e.target.checked)
    setSearchValue('')
    setSelectedValues([])
    let treeData: TreeNodeData[] = []
    templates.map((template) =>
      treeData.push({
        title: template.size + ' ' + template.name,
        value: template.size + ' ' + template.name,
      }),
    )
    setTreeData(treeData)
  }
  const handleChange = (selectedValues: string[]) => {
    setSelectAll(false)
    setSelectedValues(selectedValues)
  }
  const renderTreeNodes = (data: TreeNodeData[]) => {
    return data.map((node) => <TreeNode title={node.title} value={node.value} key={node.value} />)
  }
  const getSelectOptionVersions = (template: any) => {
    let getSelectOptionVersions = []
    template.templateVersion.map((templateVersion, index) => {
      getSelectOptionVersions.push({
        value: templateVersion.id,
        label:
          index + 1 === template.templateVersion.length
            ? 'Version ' +
              (templateVersion.versionName === null
                ? templateVersion.version + 1
                : templateVersion.versionName) +
              ' (latest)'
            : 'Version ' +
              (templateVersion.versionName === null
                ? templateVersion.version + 1
                : templateVersion.versionName),
        approved: templateVersion.approvals !== undefined ? true : false,
      })
    })
    return getSelectOptionVersions
  }
  const getSelectOptionVersionDefaultValue = (template: any) => {
    let defaultVersion: any = template.templateVersion.filter(
      (tmplVersion: any) => tmplVersion.id === template._id,
    )[0]
    let lastItem: boolean =
      template.templateVersion.indexOf(defaultVersion) === template.templateVersion.length - 1
    return {
      value: template.templateVersion.filter(
        (tmplVersion: any) => tmplVersion.id === template._id,
      )[0].id,
      label:
        template.templateVersion.filter((tmplVersion: any) => tmplVersion.id === template._id)[0]
          .versionName === null
          ? defaultVersion.version + 1 + `${lastItem ? ' (latest)' : ''}`
          : defaultVersion.versionName + `${lastItem ? ' (latest)' : ''}`,
    }
  }
  const removeSelectTemplatesVersions = (template: any) => {
    setSelectAll(false)
    setSelectedValues(selectedValues.filter((item) => item !== template.size + ' ' + template.name))
  }
  return (
    <LayoutStyled>
      {contextHolder}
      {isTemplateDefaultValuesLoading && (
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
          pointerEvents: isTemplateDefaultValuesLoading ? 'none' : 'unset',
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
          pointerEvents: isTemplateDefaultValuesLoading ? 'none' : 'unset',
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
        {treeData.length > 0 && (
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
              showSearch
              placeholder="Please select template"
              maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} Templates ...`}
              maxTagCount={2}
              allowClear={true}
              value={selectedValues}
              onChange={handleChange}
              treeCheckable
              dropdownRender={(menu) => (
                <div>
                  <Space
                    style={{
                      marginBottom: 4.1,
                    }}
                  >
                    {treeData.length !== 0 && (
                      <Checkbox
                        checked={selectAll}
                        onChange={selectAll ? handleUnselectAll : handleSelectAll}
                      >
                        {selectAll ? 'Unselect All' : 'Select All'}
                      </Checkbox>
                    )}
                  </Space>
                  {menu}
                </div>
              )}
              onSearch={(value) => {
                if (!value) return
                setSearchValue(value)
                setSelectAll(false)
                let treeData: TreeNodeData[] = []
                templates.map((template) =>
                  treeData.push({
                    title: template.size + ' ' + template.name,
                    value: template.size + ' ' + template.name,
                  }),
                )
                setTreeData(
                  treeData.filter((data) => data.title.toLowerCase().includes(value.toLowerCase())),
                )
              }}
              onClear={() => {
                let treeData: TreeNodeData[] = []
                templates.map((template) =>
                  treeData.push({
                    title: template.size + ' ' + template.name,
                    value: template.size + ' ' + template.name,
                  }),
                )
                setTreeData(treeData)
              }}
            >
              {renderTreeNodes(treeData)}
            </TreeSelectStyled>
          </Space.Compact>
        )}
        <div>
          {templates
            .filter((tmpl: any) => selectedValues.includes(tmpl.size + ' ' + tmpl.name))
            .map((template: any, index: number) => {
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
                        onChange={(value: string) => {
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
                      <ButtonDeleteStyled
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
        {selectedValues.length > 0 && (
          <Space.Compact block>
            <ButtonGenerateStyled
              type="primary"
              htmlType="submit"
              onClick={() => {
                if (_templateDefaultValues.length === 0)
                  dispatch(
                    postTemplateDefaultValues(
                      templates.filter((tmpl: any) =>
                        selectedValues.includes(tmpl.size + ' ' + tmpl.name),
                      ),
                    ),
                  )
                else
                  navigate('/qa-tool-v2/configure/generate/elements', {
                    state: {
                      templateName: templateName,
                      templates: templates.filter((tmpl: any) =>
                        selectedValues.includes(tmpl.size + ' ' + tmpl.name),
                      ),
                      templateDefaultValues: _templateDefaultValues,
                      conceptLinkValue: conceptLinkValue,
                      selectAll: selectAll,
                      selectedValues: selectedValues.length > 0 ? selectedValues : [],
                      languageSelected:
                        location.state !== null ? location.state.languageSelected : null,
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
