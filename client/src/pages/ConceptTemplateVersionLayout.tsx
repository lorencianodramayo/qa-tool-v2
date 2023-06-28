// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {
  PlaySquareOutlined,
  PlusOutlined,
  EditOutlined,
  MessageOutlined,
  DesktopOutlined,
  ExpandOutlined,
  MobileOutlined,
  ShareAltOutlined,
  BarsOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  PlayCircleTwoTone,
  PauseCircleTwoTone,
  RedoOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Col,
  Row,
  Space,
  Spin,
  FloatButton,
  Select,
  Button,
  Modal,
  TreeSelect,
  Drawer,
  QRCode,
  Input,
  Checkbox,
} from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'
import {Layout} from 'antd'
const {Content} = Layout
import {
  getTemplatesVersions,
  postSharedVariants,
} from '../features/templateVersion/templateVersionSlice'
import {useSelector, useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import IFrameCard from '../components/IFrame/IFrameCard'
import RowComponent from '../components/Row/Row'
const {TreeNode} = TreeSelect
const ContentStyled = styled(Content)`
  &::-webkit-scrollbar {
    display: none;
  }
`
const ButtonMenuStyled = styled(Button)`
  color: #fff;
  border: unset;
  &.ant-btn-text:not(:disabled):hover {
    color: #fff;
    background-color: unset;
  }
  &.ant-btn-compact-item:focus,
  .ant-btn:not(:disabled):focus-visible {
    outline: unset;
  }
`
const DrawerStyled = styled(Drawer)`
  background: #001529 !important;
  .header {
    color: #fff !important;
  }
  .name {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
  .variant,
  .size {
    font-weight: bold;
  }
`
const FloatButtonMobileShareStyled = styled(FloatButton)`
  &.ant-float-btn-primary:focus {
    outline: unset;
  }
  &.ant-float-btn-primary .ant-float-btn-body:hover {
    background: #1677ff;
  }
`
const InputStyled = styled(Input)``
const TreeSelectStyled = styled(TreeSelect)`
  &.ant-select-multiple .ant-select-selector {
    box-shadow: unset !important;
    border: 1px solid #d9d9d9 !important;
  }
`
const ConceptTemplateVersionLayout: React.FC = () => {
  const location = useLocation()
  const templateName: string = location.state.templateName
  const imageVideoFiles: any = location.state.imageVideoFiles
  const dispatch: ThunkDispatch<undefined, undefined, undefined> = useDispatch()
  const {
    isTemplatesVersionsSuccess,
    templatesVersions,
    isAddSharedVariantSuccess,
    addSharedVariant,
  } = useSelector((state: any) => state.templateVersion)
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [variants, setVariants] = useState<any>([])
  const [combinations, setCombinations] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sharedLoading, setSharedLoading] = useState<boolean>(false)
  const sharedLinkRef = useRef<Input>(null)
  const placement: SelectCommonPlacement = 'bottomLeft'
  const [variantNameTreeData, setVariantNameTreeData] = useState<TreeNodeData[]>([])
  const [searchVariantNameValue, setSearchVariantNameValue] = useState<string>('')
  const [selectAllVariantNames, setSelectAllVariantNames] = useState<boolean>(true)
  const [selectedVariantNameValues, setSelectedVariantNameValues] = useState<string[]>([])
  const [variantSizeTreeData, setVariantSizeTreeData] = useState<TreeNodeData[]>([])
  const [searchVariantSizeValue, setSearchVariantSizeValue] = useState<string>('')
  const [selectAllVariantSizes, setSelectAllVariantSizes] = useState<boolean>(true)
  const [selectedVariantSizeValues, setSelectedVariantSizeValues] = useState<string[]>([])
  //
  const [shareVariantNameTreeData, setShareVariantNameTreeData] = useState<TreeNodeData[]>([])
  const [shareSearchVariantNameValue, setShareSearchVariantNameValue] = useState<string>('')
  const [shareSelectAllVariantNames, setShareSelectAllVariantNames] = useState<boolean>(true)
  const [shareSelectedVariantNameValues, setShareSelectedVariantNameValues] = useState<string[]>([])
  const [shareVariantSizeTreeData, setShareVariantSizeTreeData] = useState<TreeNodeData[]>([])
  const [shareSearchVariantSizeValue, setShareSearchVariantSizeValue] = useState<string>('')
  const [shareSelectAllVariantSizes, setShareSelectAllVariantSizes] = useState<boolean>(true)
  const [shareSelectedVariantSizeValues, setShareSelectedVariantSizeValues] = useState<string[]>([])
  useEffect(() => {
    setLoading(!loading)
    dispatch(getTemplatesVersions())
  }, [dispatch])
  useEffect(() => {
    if (isTemplatesVersionsSuccess) {
      const interval = setInterval(() => {
        let treeDataVariantNames: TreeNodeData[] = []
        let treeDataVariantSizes: TreeNodeData[] = []
        templatesVersions.map((templateVersion) => {
          templateVersion.variants.map((variantName) => {
            const variantNameExist = treeDataVariantNames.some(
              (el) => el.value === variantName.variantName,
            )
            const variantSizeExist = treeDataVariantSizes.some(
              (el) => el.value === variantName.size,
            )
            if (!variantNameExist)
              treeDataVariantNames.push({
                title: variantName.variantName,
                value: variantName.variantName,
              })
            if (!variantSizeExist)
              treeDataVariantSizes.push({
                title: variantName.size,
                value: variantName.size,
              })
          })
        })
        setVariantNameTreeData(treeDataVariantNames)
        if (selectAllVariantNames) {
          const filteredVariantNameValues = treeDataVariantNames
            .filter((node) => filterVariantTreeNode(searchVariantNameValue, node))
            .map((node) => node.value)
          setSelectedVariantNameValues(filteredVariantNameValues)
        }
        setVariantSizeTreeData(treeDataVariantSizes)
        if (selectAllVariantSizes) {
          const filteredVariantSizeValues = treeDataVariantSizes
            .filter((node) => filterVariantTreeNode(searchVariantSizeValue, node))
            .map((node) => node.value)
          setSelectedVariantSizeValues(filteredVariantSizeValues)
        }
        //
        setShareVariantNameTreeData(treeDataVariantNames)
        if (shareSelectAllVariantNames) {
          const filteredShareVariantNameValues = treeDataVariantNames
            .filter((node) => filterVariantTreeNode(shareSearchVariantNameValue, node))
            .map((node) => node.value)
          setShareSelectedVariantNameValues(filteredShareVariantNameValues)
        }
        setShareVariantSizeTreeData(treeDataVariantSizes)
        if (shareSelectAllVariantSizes) {
          const filteredShareVariantSizeValues = treeDataVariantSizes
            .filter((node) => filterVariantTreeNode(shareSearchVariantSizeValue, node))
            .map((node) => node.value)
          setShareSelectedVariantSizeValues(filteredShareVariantSizeValues)
        }
        let combinations = 0
        let filterVariants = []
        let i = 0
        templatesVersions.map((templateVersion) => {
          let updatedDefaultValues = {}
          let defaultValues = {}
          let variantDefaultValues = {}
          templateVersion.variants.map((variant) => {
            combinations += 1
            for (const [key, value] of Object.entries(variant.defaultValues)) {
              imageVideoFiles?.map((imageVideoFile) => {
                if (imageVideoFile.creativeId === templateVersion._id)
                  imageVideoFile.files.map((file) => {
                    if (file.dynamicElementKey === key)
                      updatedDefaultValues[
                        key
                      ] = `https://storage.googleapis.com/creative-templates/${imageVideoFile.creativeId}/asset/${file.dynamicElementKey}/${file.fileData.name}`
                  })
              })
              defaultValues[key] = value
            }
            variantDefaultValues = Object.assign(defaultValues, updatedDefaultValues)
            const variantSizeExist = filterVariants.some((el) => el.size === variant.size)
            if (!variantSizeExist) {
              filterVariants.push({
                _id: templateVersion._id,
                templateName: variant.templateName,
                size: variant.size,
                variants: [
                  {
                    variantName: variant.variantName,
                    defaultValues:
                      imageVideoFiles !== undefined ? variantDefaultValues : variant.defaultValues,
                  },
                ],
              })
              i++
            } else {
              filterVariants[i - 1].variants = [
                ...filterVariants[i - 1].variants,
                {
                  variantName: variant.variantName,
                  defaultValues:
                    imageVideoFiles !== undefined ? variantDefaultValues : variant.defaultValues,
                },
              ]
            }
          })
        })
        setCombinations(combinations)
        setVariants(filterVariants)
        setLoading(false)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [
    templatesVersions,
    selectAllVariantNames,
    selectAllVariantSizes,
    shareSelectAllVariantNames,
    shareSelectAllVariantSizes,
  ])
  // useEffect(() => {
  //   if (templatesVersions !== null) {
  //     let filterVariants = []
  //     let i = 0
  //     templatesVersions.map((templateVersion) => {
  //       let updatedDefaultValues = {}
  //       let defaultValues = {}
  //       let variantDefaultValues = {}
  //       templateVersion.variants.map((variant) => {
  //         for (const [key, value] of Object.entries(variant.defaultValues)) {
  //           imageVideoFiles?.map((imageVideoFile) => {
  //             if (imageVideoFile.creativeId === templateVersion._id)
  //               imageVideoFile.files.map((file) => {
  //                 if (file.dynamicElementKey === key)
  //                   updatedDefaultValues[
  //                     key
  //                   ] = `https://storage.googleapis.com/creative-templates/${imageVideoFile.creativeId}/asset/${file.dynamicElementKey}/${file.fileData.name}`
  //               })
  //           })
  //           defaultValues[key] = value
  //         }
  //         variantDefaultValues = Object.assign(defaultValues, updatedDefaultValues)
  //         if (selectedVariantNameValues.length === 0 && selectedVariantSizeValues.length === 0) {
  //           const variantSizeExist = filterVariants.some((el) => el.size === variant.size)
  //           if (!variantSizeExist) {
  //             filterVariants.push({
  //               _id: templateVersion._id,
  //               templateName: variant.templateName,
  //               size: variant.size,
  //               variants: [
  //                 {
  //                   variantName: variant.variantName,
  //                   defaultValues:
  //                     imageVideoFiles !== undefined ? variantDefaultValues : variant.defaultValues,
  //                 },
  //               ],
  //             })
  //             i++
  //           } else {
  //             filterVariants[i - 1].variants = [
  //               ...filterVariants[i - 1].variants,
  //               {
  //                 variantName: variant.variantName,
  //                 defaultValues:
  //                   imageVideoFiles !== undefined ? variantDefaultValues : variant.defaultValues,
  //               },
  //             ]
  //           }
  //         }
  //         if (selectedVariantNameValues.length > 0 && selectedVariantSizeValues.length > 0) {
  //           selectedVariantNameValues.map((selectedVariantName) =>
  //             selectedVariantSizeValues.map((selectedVariantSize) => {
  //               if (
  //                 variant.variantName === selectedVariantName &&
  //                 variant.size === selectedVariantSize
  //               ) {
  //                 const variantExist = filterVariants.some((el) => el.size === variant.size)
  //                 if (!variantExist) {
  //                   filterVariants.push({
  //                     _id: templateVersion._id,
  //                     templateName: variant.templateName,
  //                     size: variant.size,
  //                     variants: [
  //                       {
  //                         variantName: variant.variantName,
  //                         defaultValues:
  //                           imageVideoFiles !== undefined
  //                             ? variantDefaultValues
  //                             : variant.defaultValues,
  //                       },
  //                     ],
  //                   })
  //                   i++
  //                 } else {
  //                   filterVariants[i - 1].variants = [
  //                     ...filterVariants[i - 1].variants,
  //                     {
  //                       variantName: variant.variantName,
  //                       defaultValues:
  //                         imageVideoFiles !== undefined
  //                           ? variantDefaultValues
  //                           : variant.defaultValues,
  //                     },
  //                   ]
  //                 }
  //               }
  //             }),
  //           )
  //         }
  //         if (selectedVariantSizeValues.length === 0) {
  //           selectedVariantNameValues.map((selectedVariantName) => {
  //             if (variant.variantName === selectedVariantName) {
  //               const variantSizeExist = filterVariants.some((el) => el.size === variant.size)
  //               if (!variantSizeExist) {
  //                 filterVariants.push({
  //                   _id: templateVersion._id,
  //                   templateName: variant.templateName,
  //                   size: variant.size,
  //                   variants: [
  //                     {
  //                       variantName: variant.variantName,
  //                       defaultValues:
  //                         imageVideoFiles !== undefined
  //                           ? variantDefaultValues
  //                           : variant.defaultValues,
  //                     },
  //                   ],
  //                 })
  //                 i++
  //               } else {
  //                 filterVariants[i - 1].variants = [
  //                   ...filterVariants[i - 1].variants,
  //                   {
  //                     variantName: variant.variantName,
  //                     defaultValues:
  //                       imageVideoFiles !== undefined
  //                         ? variantDefaultValues
  //                         : variant.defaultValues,
  //                   },
  //                 ]
  //               }
  //             }
  //           })
  //         }
  //         if (selectedVariantNameValues.length === 0) {
  //           selectedVariantSizeValues.map((selectedVariantSize) => {
  //             if (variant.size === selectedVariantSize) {
  //               const variantSizeExist = filterVariants.some((el) => el.size === variant.size)
  //               if (!variantSizeExist) {
  //                 filterVariants.push({
  //                   _id: templateVersion._id,
  //                   templateName: variant.templateName,
  //                   size: variant.size,
  //                   variants: [
  //                     {
  //                       variantName: variant.variantName,
  //                       defaultValues:
  //                         imageVideoFiles !== undefined
  //                           ? variantDefaultValues
  //                           : variant.defaultValues,
  //                     },
  //                   ],
  //                 })
  //                 i++
  //               } else {
  //                 filterVariants[i - 1].variants = [
  //                   ...filterVariants[i - 1].variants,
  //                   {
  //                     variantName: variant.variantName,
  //                     defaultValues:
  //                       imageVideoFiles !== undefined
  //                         ? variantDefaultValues
  //                         : variant.defaultValues,
  //                   },
  //                 ]
  //               }
  //             }
  //           })
  //         }
  //       })
  //     })
  //     setVariants(filterVariants)
  //   }
  // }, [selectedVariantNameValues, selectedVariantSizeValues])
  useEffect(() => {
    if (isAddSharedVariantSuccess) setSharedLoading(false)
  }, [isAddSharedVariantSuccess])
  const handleSelectAllVariantNames = (e: CheckboxChangeEvent) => {
    setSelectAllVariantNames(e.target.checked)
    let filteredVariantNameValues = null
    if (searchVariantNameValue)
      filteredVariantNameValues = variantNameTreeData
        .filter((node) => node.title.toLowerCase().includes(searchVariantNameValue.toLowerCase()))
        .map((node) => node.value)
    else filteredVariantNameValues = variantNameTreeData.map((node) => node.value)
    if (selectedVariantNameValues.length === 0)
      setSelectedVariantNameValues(filteredVariantNameValues)
    else setSelectedVariantNameValues((prevValues) => [...prevValues, ...filteredVariantNameValues])
    let treeDataVariantNames: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantNameExist = treeDataVariantNames.some(
          (el) => el.value === variantName.variantName,
        )
        if (!variantNameExist)
          treeDataVariantNames.push({
            title: variantName.variantName,
            value: variantName.variantName,
          })
      })
    })
    setVariantNameTreeData(treeDataVariantNames)
  }
  const handleUnselectAllVariantNames = (e: CheckboxChangeEvent) => {
    setSelectAllVariantNames(e.target.checked)
    setSearchVariantNameValue('')
    setSelectedVariantNameValues([])
    let treeDataVariantNames: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantNameExist = treeDataVariantNames.some(
          (el) => el.value === variantName.variantName,
        )
        if (!variantNameExist)
          treeDataVariantNames.push({
            title: variantName.variantName,
            value: variantName.variantName,
          })
      })
    })
    setVariantNameTreeData(treeDataVariantNames)
  }
  const handleVariantNameChange = (selectedVariantNameValues: string[]) => {
    setSelectAllVariantNames(false)
    setSelectedVariantNameValues(selectedVariantNameValues)
  }
  const handleSelectAllVariantSizes = (e: CheckboxChangeEvent) => {
    setSelectAllVariantSizes(e.target.checked)
    let filteredVariantSizeValues = null
    if (searchVariantSizeValue)
      filteredVariantSizeValues = variantSizeTreeData
        .filter((node) => node.title.toLowerCase().includes(searchVariantSizeValue.toLowerCase()))
        .map((node) => node.value)
    else filteredVariantSizeValues = variantSizeTreeData.map((node) => node.value)
    if (selectedVariantSizeValues.length === 0)
      setSelectedVariantSizeValues(filteredVariantSizeValues)
    else setSelectedVariantSizeValues((prevValues) => [...prevValues, ...filteredVariantSizeValues])
    let treeDataVariantSizes: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantSizeExist = treeDataVariantSizes.some((el) => el.value === variantName.size)
        if (!variantSizeExist)
          treeDataVariantSizes.push({
            title: variantName.size,
            value: variantName.size,
          })
      })
    })
    setVariantSizeTreeData(treeDataVariantSizes)
  }
  const handleUnselectAllVariantSizes = (e: CheckboxChangeEvent) => {
    setSelectAllVariantSizes(e.target.checked)
    setSearchVariantSizeValue('')
    setSelectedVariantSizeValues([])
    let treeDataVariantSizes: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantSizeExist = treeDataVariantSizes.some((el) => el.value === variantName.size)
        if (!variantSizeExist)
          treeDataVariantSizes.push({
            title: variantName.size,
            value: variantName.size,
          })
      })
    })
    setVariantSizeTreeData(treeDataVariantSizes)
  }
  const handleVariantSizeChange = (selectedVariantSizeValues: string[]) => {
    setSelectAllVariantSizes(false)
    setSelectedVariantSizeValues(selectedVariantSizeValues)
  }
  const handleShareSelectAllVariantNames = (e: CheckboxChangeEvent) => {
    setShareSelectAllVariantNames(e.target.checked)
    let filteredShareVariantNameValues = null
    if (shareSearchVariantNameValue)
      filteredShareVariantNameValues = shareVariantNameTreeData
        .filter((node) =>
          node.title.toLowerCase().includes(shareSearchVariantNameValue.toLowerCase()),
        )
        .map((node) => node.value)
    else filteredShareVariantNameValues = shareVariantNameTreeData.map((node) => node.value)
    setShareSelectedVariantNameValues(filteredShareVariantNameValues)
    if (shareSelectedVariantNameValues.length === 0)
      setShareSelectedVariantNameValues(filteredShareVariantNameValues)
    else
      setShareSelectedVariantNameValues((prevValues) => [
        ...prevValues,
        ...filteredShareVariantNameValues,
      ])
    let treeDataVariantNames: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantNameExist = treeDataVariantNames.some(
          (el) => el.value === variantName.variantName,
        )
        if (!variantNameExist)
          treeDataVariantNames.push({
            title: variantName.variantName,
            value: variantName.variantName,
          })
      })
    })
    setShareVariantNameTreeData(treeDataVariantNames)
  }
  const handleShareUnselectAllVariantNames = (e: CheckboxChangeEvent) => {
    setShareSelectAllVariantNames(e.target.checked)
    setShareSearchVariantNameValue('')
    setShareSelectedVariantNameValues([])
    let treeDataVariantNames: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantNameExist = treeDataVariantNames.some(
          (el) => el.value === variantName.variantName,
        )
        if (!variantNameExist)
          treeDataVariantNames.push({
            title: variantName.variantName,
            value: variantName.variantName,
          })
      })
    })
    setShareVariantNameTreeData(treeDataVariantNames)
  }
  const handleShareVariantNameChange = (shareSelectedVariantNameValues: string[]) => {
    setShareSelectAllVariantNames(false)
    setShareSelectedVariantNameValues(shareSelectedVariantNameValues)
  }
  const handleShareSelectAllVariantSizes = (e: CheckboxChangeEvent) => {
    setShareSelectAllVariantSizes(e.target.checked)
    let filteredShareVariantSizeValues = null
    if (shareSearchVariantSizeValue)
      filteredShareVariantSizeValues = shareVariantSizeTreeData
        .filter((node) =>
          node.title.toLowerCase().includes(shareSearchVariantSizeValue.toLowerCase()),
        )
        .map((node) => node.value)
    else filteredShareVariantSizeValues = shareVariantSizeTreeData.map((node) => node.value)
    setShareSelectedVariantSizeValues(filteredShareVariantSizzeValues)
    if (shareSelectedVariantSizeValues.length === 0)
      setShareSelectedVariantSizeValues(filteredShareVariantSizeValues)
    else
      setShareSelectedVariantSizeValues((prevValues) => [
        ...prevValues,
        ...filteredShareVariantSizeValues,
      ])
    let treeDataVariantSizes: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantSizeExist = treeDataVariantSizes.some((el) => el.value === variantName.size)
        if (!variantSizeExist)
          treeDataVariantSizes.push({
            title: variantName.size,
            value: variantName.size,
          })
      })
    })
    setShareVariantSizeTreeData(treeDataVariantSizes)
  }
  const handleShareUnselectAllVariantSizes = (e: CheckboxChangeEvent) => {
    setShareSelectAllVariantSizes(e.target.checked)
    setShareSearchVariantSizeValue('')
    setShareSelectedVariantSizeValues([])
    let treeDataVariantSizes: TreeNodeData[] = []
    templatesVersions.map((templateVersion) => {
      templateVersion.variants.map((variantName) => {
        const variantSizeExist = treeDataVariantSizes.some((el) => el.value === variantName.size)
        if (!variantSizeExist)
          treeDataVariantSizes.push({
            title: variantName.size,
            value: variantName.size,
          })
      })
    })
    setShareVariantSizeTreeData(treeDataVariantSizes)
  }
  const handleShareVariantSizeChange = (shareSelectedVariantSizeValues: string[]) => {
    setShareSelectAllVariantSizes(false)
    setShareSelectedVariantSizeValues(shareSelectedVariantSizeValues)
  }
  const filterVariantTreeNode = (inputValue: string, treeNode: TreeNodeData) => {
    setSearchVariantNameValue(inputValue)
    setSearchVariantSizeValue(inputValue)
    return treeNode.title.includes(inputValue)
  }
  const renderTreeNodes = (data: TreeNodeData[]) => {
    return data.map((node) => <TreeNode title={node.title} value={node.value} key={node.value} />)
  }
  return (
    <Layout style={{height: 'calc(100vh - 64px)'}}>
      <FloatButton.Group shape="square">
        <FloatButtonMobileShareStyled
          type="primary"
          icon={!isMobile ? <MobileOutlined /> : <DesktopOutlined />}
          tooltip={<Space>{!isMobile ? 'Mobile' : 'Desktop'} View</Space>}
          onClick={() => setIsMobile(!isMobile)}
        />
        <FloatButtonMobileShareStyled
          type="primary"
          icon={<ShareAltOutlined />}
          tooltip={<Space>Share</Space>}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </FloatButton.Group>
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
      <DrawerStyled
        title={
          <Space.Compact block className="header">
            Filters{' '}
            <Space.Compact
              block
              style={{
                justifyContent: 'right',
                alignItems: 'center',
              }}
            >
              <MenuFoldOutlined onClick={() => setDrawerVisible(false)} />
            </Space.Compact>
          </Space.Compact>
        }
        placement="left"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Space.Compact block className="name">
          {templateName}
        </Space.Compact>
        <Space.Compact block className="variant">
          Variants
        </Space.Compact>
        {/* <Space>
          <Checkbox
            style={{color: '#fff'}}
            checked={selectAllVariantNames}
            onChange={
              selectAllVariantNames ? handleUnselectAllVariantNames : handleSelectAllVariantNames
            }
          >
            {selectAllVariantNames ? 'Unselect All' : 'Select All'}
          </Checkbox>
        </Space> */}
        <Space.Compact block>
          <TreeSelectStyled
            style={{
              width: 324.6,
            }}
            placeholder="Please select variant"
            maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} Templates ...`}
            maxTagCount={2}
            allowClear={true}
            value={selectedVariantNameValues}
            onChange={handleVariantNameChange}
            treeCheckable
            dropdownRender={(menu) => (
              <div>
                <Space
                  style={{
                    marginBottom: 4.1,
                  }}
                >
                  <Checkbox
                    style={{color: '#000'}}
                    checked={selectAllVariantNames}
                    onChange={
                      selectAllVariantNames
                        ? handleUnselectAllVariantNames
                        : handleSelectAllVariantNames
                    }
                  >
                    {selectAllVariantNames ? 'Unselect All' : 'Select All'}
                  </Checkbox>
                </Space>
                {menu}
              </div>
            )}
            onSearch={(value) => {
              if (!value) return
              setSearchVariantNameValue(value)
              setSelectAllVariantNames(false)
              let treeDataVariantNames: TreeNodeData[] = []
              templatesVersions.map((templateVersion) => {
                templateVersion.variants.map((variantName) => {
                  const variantNameExist = treeDataVariantNames.some(
                    (el) => el.value === variantName.variantName,
                  )
                  if (!variantNameExist)
                    treeDataVariantNames.push({
                      title: variantName.variantName,
                      value: variantName.variantName,
                    })
                })
              })
              setVariantNameTreeData(
                treeDataVariantNames.filter((data) =>
                  data.title.toLowerCase().includes(value.toLowerCase()),
                ),
              )
            }}
            onClear={() => {
              let treeDataVariantNames: TreeNodeData[] = []
              templatesVersions.map((templateVersion) => {
                templateVersion.variants.map((variantName) => {
                  const variantNameExist = treeDataVariantNames.some(
                    (el) => el.value === variantName.variantName,
                  )
                  if (!variantNameExist)
                    treeDataVariantNames.push({
                      title: variantName.variantName,
                      value: variantName.variantName,
                    })
                })
              })
              setVariantNameTreeData(treeDataVariantNames)
            }}
          >
            {renderTreeNodes(variantNameTreeData)}
          </TreeSelectStyled>
        </Space.Compact>
        <Space.Compact block className="size">
          Sizes
        </Space.Compact>
        {/* <Space>
          <Checkbox
            style={{color: '#fff'}}
            checked={selectAllVariantSizes}
            onChange={
              selectAllVariantSizes ? handleUnselectAllVariantSizes : handleSelectAllVariantSizes
            }
          >
            {selectAllVariantSizes ? 'Unselect All' : 'Select All'}
          </Checkbox>
        </Space> */}
        <Space.Compact block>
          <TreeSelectStyled
            style={{
              width: 324.6,
            }}
            placeholder="Please select size"
            maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} Sizes ...`}
            maxTagCount={2}
            allowClear={true}
            value={selectedVariantSizeValues}
            onChange={handleVariantSizeChange}
            treeCheckable
            dropdownRender={(menu) => (
              <div>
                <Space
                  style={{
                    marginBottom: 4.1,
                  }}
                >
                  <Checkbox
                    style={{color: '#000'}}
                    checked={selectAllVariantSizes}
                    onChange={
                      selectAllVariantSizes
                        ? handleUnselectAllVariantSizes
                        : handleSelectAllVariantSizes
                    }
                  >
                    {selectAllVariantSizes ? 'Unselect All' : 'Select All'}
                  </Checkbox>
                </Space>
                {menu}
              </div>
            )}
            onSearch={(value) => {
              if (!value) return
              setSearchVariantSizeValue(value)
              setSelectAllVariantSizes(false)
              let treeDataVariantSizes: TreeNodeData[] = []
              templatesVersions.map((templateVersion) => {
                templateVersion.variants.map((variantName) => {
                  const variantSizeExist = treeDataVariantSizes.some(
                    (el) => el.value === variantName.size,
                  )
                  if (!variantSizeExist)
                    treeDataVariantSizes.push({
                      title: variantName.size,
                      value: variantName.size,
                    })
                })
              })
              setVariantSizeTreeData(
                treeDataVariantSizes.filter((data) =>
                  data.title.toLowerCase().includes(value.toLowerCase()),
                ),
              )
            }}
            onClear={() => {
              let treeDataVariantSizes: TreeNodeData[] = []
              templatesVersions.map((templateVersion) => {
                templateVersion.variants.map((variantName) => {
                  const variantSizeExist = treeDataVariantSizes.some(
                    (el) => el.value === variantName.size,
                  )
                  if (!variantSizeExist)
                    treeDataVariantSizes.push({
                      title: variantName.size,
                      value: variantName.size,
                    })
                })
              })
              setVariantSizeTreeData(treeDataVariantSizes)
            }}
          >
            {renderTreeNodes(variantSizeTreeData)}
          </TreeSelectStyled>
        </Space.Compact>
      </DrawerStyled>
      <Layout
        style={{
          pointerEvents: loading ? 'none' : 'unset',
        }}
      >
        <Space direction="vertical" size={0} style={{backgroundColor: '#fff'}}>
          {
            // !loading && variants?.variants && (
            <Space.Compact
              block
              style={{
                background: 'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
                padding: '0 0 3px 0',
              }}
            >
              <ButtonMenuStyled
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setDrawerVisible(!drawerVisible)}
              />
              <Space.Compact
                block
                style={{
                  marginRight: 15.8,
                  justifyContent: 'right',
                }}
              >
                <Space>
                  <Badge
                    count={combinations}
                    overflowCount={combinations}
                    color="#6F7782"
                    style={{
                      fontStyle: 'normal',
                      fontWeight: 400,
                      color: '#fff',
                      borderRadius: 5,
                      padding: 0,
                    }}
                  />
                  <Space
                    style={{
                      fontStyle: 'normal',
                    }}
                  >
                    Combinations
                  </Space>
                </Space>
              </Space.Compact>
            </Space.Compact>
            // )
          }
        </Space>
        <ContentStyled
          style={{
            margin: 5,
            overflowY: 'scroll',
          }}
        >
          {isMobile
            ? variants
                .filter((variant) => selectedVariantSizeValues.includes(variant.size))
                .map((variant) => (
                  <>
                    <Space.Compact block style={{marginBottom: 5}}>
                      <Space.Compact
                        block
                        style={{
                          justifyContent: 'center',
                          background: 'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
                          color: '#fff',
                          fontWeight: 'bold',
                          borderRadius: 5,
                        }}
                      >
                        {variant.templateName} {variant.size}
                      </Space.Compact>
                    </Space.Compact>
                    {variant.variants
                      .filter((variant) => selectedVariantNameValues.includes(variant.variantName))
                      .map((defaultValue, i) => (
                        <Row
                          justify="center"
                          style={{
                            marginBottom: 10,
                          }}
                        >
                          <Col>
                            <Space.Compact
                              block
                              style={{
                                background:
                                  'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
                                borderTopLeftRadius: '5px',
                                borderTopRightRadius: '5px',
                                height: '5px',
                              }}
                            >
                              {' '}
                            </Space.Compact>
                            <IFrameCard variant={variant} i={i} />
                          </Col>
                        </Row>
                      ))}
                  </>
                ))
            : variants
                .filter((variant) => selectedVariantSizeValues.includes(variant.size))
                .map((variant) => (
                  <>
                    <Space.Compact block style={{marginBottom: 5}}>
                      <Space.Compact
                        block
                        style={{
                          justifyContent: 'center',
                          background: 'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
                          color: '#fff',
                          fontWeight: 'bold',
                          borderRadius: 5,
                        }}
                      >
                        {variant.templateName} {variant.size}
                      </Space.Compact>
                    </Space.Compact>
                    <RowComponent items={variant} containerWidth={1086.27} />
                    {/* <Row
                      gutter={[15.9, 22.4]}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      {variant.variants
                        .filter((variant) =>
                          selectedVariantNameValues.includes(variant.variantName),
                        )
                        .map((_: any, i: number) => (
                          <>
                            <Col>
                              <Space.Compact
                                block
                                style={{
                                  background:
                                    'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
                                  borderTopLeftRadius: '5px',
                                  borderTopRightRadius: '5px',
                                  height: '5px',
                                }}
                              >
                                {' '}
                              </Space.Compact>
                              <IFrameCard variant={variant} i={i} />
                            </Col>
                          </>
                        ))}
                    </Row> */}
                  </>
                ))}
        </ContentStyled>
      </Layout>
      <Modal
        title="Shared Variants"
        maskClosable={sharedLoading ? false : true}
        closable={sharedLoading ? false : true}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        okButtonProps={{style: {display: sharedLoading ? 'none' : 'unset'}}}
        onOk={() => {
          let filterVariants = []
          let i = 0
          templatesVersions.map((templateVersion) => {
            templateVersion.variants.map((variant) => {
              if (
                shareSelectedVariantNameValues.length === 0 &&
                shareSelectedVariantSizeValues.length === 0
              ) {
                const variantSizeExist = filterVariants.some(
                  (el) => el.variants[0].size === variant.size,
                )
                if (!variantSizeExist) {
                  filterVariants.push({
                    _id: templateVersion._id,
                    templateId: templateVersion.templateId,
                    variants: [
                      {
                        templateName: variant.templateName,
                        size: variant.size,
                        variantName: variant.variantName,
                        defaultValues: variant.defaultValues,
                      },
                    ],
                  })
                  i++
                } else {
                  filterVariants[i - 1].variants = [
                    ...filterVariants[i - 1].variants,
                    {
                      templateName: variant.templateName,
                      size: variant.size,
                      variantName: variant.variantName,
                      defaultValues: variant.defaultValues,
                    },
                  ]
                }
              }
              if (
                shareSelectedVariantNameValues.length > 0 &&
                shareSelectedVariantSizeValues.length > 0
              ) {
                shareSelectedVariantNameValues.map((selectedVariantName) =>
                  shareSelectedVariantSizeValues.map((selectedVariantSize) => {
                    if (
                      variant.variantName === selectedVariantName &&
                      variant.size === selectedVariantSize
                    ) {
                      const variantExist = filterVariants.some(
                        (el) => el.variants[0].size === variant.size,
                      )
                      if (!variantExist) {
                        filterVariants.push({
                          _id: templateVersion._id,
                          templateId: templateVersion.templateId,
                          variants: [
                            {
                              templateName: variant.templateName,
                              size: variant.size,
                              variantName: variant.variantName,
                              defaultValues: variant.defaultValues,
                            },
                          ],
                        })
                        i++
                      } else {
                        filterVariants[i - 1].variants = [
                          ...filterVariants[i - 1].variants,
                          {
                            templateName: variant.templateName,
                            size: variant.size,
                            variantName: variant.variantName,
                            defaultValues: variant.defaultValues,
                          },
                        ]
                      }
                    }
                  }),
                )
              }
              if (shareSelectedVariantSizeValues.length === 0) {
                shareSelectedVariantNameValues.map((selectedVariantName) => {
                  if (variant.variantName === selectedVariantName) {
                    const variantSizeExist = filterVariants.some(
                      (el) => el.variants[0].size === variant.size,
                    )
                    if (!variantSizeExist) {
                      filterVariants.push({
                        _id: templateVersion._id,
                        templateId: templateVersion.templateId,
                        variants: [
                          {
                            templateName: variant.templateName,
                            size: variant.size,
                            variantName: variant.variantName,
                            defaultValues: variant.defaultValues,
                          },
                        ],
                      })
                      i++
                    } else {
                      filterVariants[i - 1].variants = [
                        ...filterVariants[i - 1].variants,
                        {
                          templateName: variant.templateName,
                          size: variant.size,
                          variantName: variant.variantName,
                          defaultValues: variant.defaultValues,
                        },
                      ]
                    }
                  }
                })
              }
              if (shareSelectedVariantNameValues.length === 0) {
                shareSelectedVariantSizeValues.map((selectedVariantSize) => {
                  if (variant.size === selectedVariantSize) {
                    const variantSizeExist = filterVariants.some(
                      (el) => el.variants[0].size === variant.size,
                    )
                    if (!variantSizeExist) {
                      filterVariants.push({
                        _id: templateVersion._id,
                        templateId: templateVersion.templateId,
                        variants: [
                          {
                            templateName: variant.templateName,
                            size: variant.size,
                            variantName: variant.variantName,
                            defaultValues: variant.defaultValues,
                          },
                        ],
                      })
                      i++
                    } else {
                      filterVariants[i - 1].variants = [
                        ...filterVariants[i - 1].variants,
                        {
                          templateName: variant.templateName,
                          size: variant.size,
                          variantName: variant.variantName,
                          defaultValues: variant.defaultValues,
                        },
                      ]
                    }
                  }
                })
              }
            })
          })
          setSharedLoading(!sharedLoading)
          dispatch(
            postSharedVariants({
              templateName: templateName,
              templatesVersions: filterVariants,
            }),
          )
        }}
        cancelButtonProps={{style: {display: sharedLoading ? 'none' : 'unset'}}}
        onCancel={() => setIsModalOpen(false)}
      >
        {sharedLoading && (
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
        {addSharedVariant === null && (
          <>
            <Space.Compact block className="variant">
              Variants
            </Space.Compact>
            {/* <Space>
              <Checkbox
                checked={shareSelectAllVariantNames}
                onChange={
                  shareSelectAllVariantNames
                    ? handleShareUnselectAllVariantNames
                    : handleShareSelectAllVariantNames
                }
              >
                {shareSelectAllVariantNames ? 'Unselect All' : 'Select All'}
              </Checkbox>
            </Space> */}
            <Space.Compact block>
              <TreeSelectStyled
                style={{
                  width: 324.6,
                }}
                placeholder="Please select variant"
                maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} Templates ...`}
                maxTagCount={2}
                allowClear={true}
                value={shareSelectedVariantNameValues}
                onChange={handleShareVariantNameChange}
                treeCheckable
                dropdownRender={(menu) => (
                  <div>
                    <Space
                      style={{
                        marginBottom: 4.1,
                      }}
                    >
                      <Checkbox
                        checked={shareSelectAllVariantNames}
                        onChange={
                          shareSelectAllVariantNames
                            ? handleShareUnselectAllVariantNames
                            : handleShareSelectAllVariantNames
                        }
                      >
                        {shareSelectAllVariantNames ? 'Unselect All' : 'Select All'}
                      </Checkbox>
                    </Space>
                    {menu}
                  </div>
                )}
                onSearch={(value) => {
                  if (!value) return
                  setShareSearchVariantNameValue(value)
                  setShareSelectAllVariantNames(false)
                  let treeDataVariantNames: TreeNodeData[] = []
                  templatesVersions.map((templateVersion) => {
                    templateVersion.variants.map((variantName) => {
                      const variantNameExist = treeDataVariantNames.some(
                        (el) => el.value === variantName.variantName,
                      )
                      if (!variantNameExist)
                        treeDataVariantNames.push({
                          title: variantName.variantName,
                          value: variantName.variantName,
                        })
                    })
                  })
                  setShareVariantNameTreeData(
                    treeDataVariantNames.filter((data) =>
                      data.title.toLowerCase().includes(value.toLowerCase()),
                    ),
                  )
                }}
                onClear={() => {
                  let treeDataVariantNames: TreeNodeData[] = []
                  templatesVersions.map((templateVersion) => {
                    templateVersion.variants.map((variantName) => {
                      const variantNameExist = treeDataVariantNames.some(
                        (el) => el.value === variantName.variantName,
                      )
                      if (!variantNameExist)
                        treeDataVariantNames.push({
                          title: variantName.variantName,
                          value: variantName.variantName,
                        })
                    })
                  })
                  setShareVariantNameTreeData(treeDataVariantNames)
                }}
              >
                {renderTreeNodes(shareVariantNameTreeData)}
              </TreeSelectStyled>
            </Space.Compact>
            <Space.Compact block className="size">
              Sizes
            </Space.Compact>
            {/* <Space>
              <Checkbox
                checked={shareSelectAllVariantSizes}
                onChange={
                  shareSelectAllVariantSizes
                    ? handleShareUnselectAllVariantSizes
                    : handleShareSelectAllVariantSizes
                }
              >
                {shareSelectAllVariantSizes ? 'Unselect All' : 'Select All'}
              </Checkbox>
            </Space> */}
            <Space.Compact block>
              <TreeSelectStyled
                style={{
                  width: 324.6,
                }}
                placeholder="Please select size"
                maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} Sizes ...`}
                maxTagCount={2}
                allowClear={true}
                value={shareSelectedVariantSizeValues}
                onChange={handleShareVariantSizeChange}
                treeCheckable
                dropdownRender={(menu) => (
                  <div>
                    <Space
                      style={{
                        marginBottom: 4.1,
                      }}
                    >
                      <Checkbox
                        checked={shareSelectAllVariantSizes}
                        onChange={
                          shareSelectAllVariantSizes
                            ? handleShareUnselectAllVariantSizes
                            : handleShareSelectAllVariantSizes
                        }
                      >
                        {shareSelectAllVariantSizes ? 'Unselect All' : 'Select All'}
                      </Checkbox>
                    </Space>
                    {menu}
                  </div>
                )}
                onSearch={(value) => {
                  if (!value) return
                  setShareSearchVariantSizeValue(value)
                  setShareSelectAllVariantSizes(false)
                  let treeDataVariantSizes: TreeNodeData[] = []
                  templatesVersions.map((templateVersion) => {
                    templateVersion.variants.map((variantName) => {
                      const variantSizeExist = treeDataVariantSizes.some(
                        (el) => el.value === variantName.size,
                      )
                      if (!variantSizeExist)
                        treeDataVariantSizes.push({
                          title: variantName.size,
                          value: variantName.size,
                        })
                    })
                  })
                  setShareVariantSizeTreeData(
                    treeDataVariantSizes.filter((data) =>
                      data.title.toLowerCase().includes(value.toLowerCase()),
                    ),
                  )
                }}
                onClear={() => {
                  let treeDataVariantSizes: TreeNodeData[] = []
                  templatesVersions.map((templateVersion) => {
                    templateVersion.variants.map((variantName) => {
                      const variantSizeExist = treeDataVariantSizes.some(
                        (el) => el.value === variantName.size,
                      )
                      if (!variantSizeExist)
                        treeDataVariantSizes.push({
                          title: variantName.size,
                          value: variantName.size,
                        })
                    })
                  })
                  setShareVariantSizeTreeData(treeDataVariantSizes)
                }}
              >
                {renderTreeNodes(shareVariantSizeTreeData)}
              </TreeSelectStyled>
            </Space.Compact>
          </>
        )}
        {addSharedVariant !== null && (
          <>
            <Space style={{fontWeight: 'bold'}}>Link:</Space>{' '}
            {addSharedVariant !== null ? (
              <Space.Compact style={{width: '92%'}}>
                <InputStyled
                  ref={sharedLinkRef}
                  defaultValue={window.location.origin + '/' + addSharedVariant.sharedVariants._id}
                  readOnly
                />
                <Button
                  type="primary"
                  onClick={() => {
                    if (sharedLinkRef.current) {
                      sharedLinkRef.current.select()
                      document.execCommand('copy')
                    }
                  }}
                >
                  Copy
                </Button>
              </Space.Compact>
            ) : (
              'Not Generated'
            )}
            <Space.Compact
              block
              style={{
                fontWeight: 'bold',
                justifyContent: 'center',
              }}
            >
              QR
            </Space.Compact>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <QRCode value={window.location.origin + '/' + addSharedVariant.sharedVariants._id} />
            </Space>
          </>
        )}
      </Modal>
    </Layout>
  )
}
export default ConceptTemplateVersionLayout
