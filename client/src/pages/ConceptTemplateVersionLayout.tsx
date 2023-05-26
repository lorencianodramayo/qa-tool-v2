// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
} from "@ant-design/icons";
import { Badge, Card, Col, Menu, Row, Space, Spin, Typography, FloatButton, Select, Button, Modal, Drawer, QRCode, Input, } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
import { 
  getTemplatesVersions, 
  postSharedVariants
} from "../features/templateVersion/templateVersionSlice";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from "antd";
import { ThunkDispatch } from 'redux-thunk';
import IFrameCard from "../components/IFrame/IFrameCard";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const ContentStyled = styled(Content)`
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SiderStyled = styled(Sider)`
  background: #fff !important;
  border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
`;
interface MenuStyledProps {
  windowinnerheight?: number;
}
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
`;
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
  .variant, .size {
    font-weight: bold;
  }
`;
// const MenuStyled = styled(Menu)<MenuStyledProps>`
//   &.ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
//     overflow-y: scroll;
//     height: calc(${props => props.windowinnerheight} - 64)px;
//   }
//   &.ant-menu-inline {
//     border-inline-end: unset !important;
//   }
//   &.ant-menu-inline .ant-menu-submenu {
//     & .ant-menu-submenu-title {
//       margin: 0;
//       width: 100%;
//       border-radius: 0;
//       color: unset;
//       span,
//       i {
//         font-weight: 700;
//         font-size: 14px !important;
//       }
//       &:hover {
//         background-color: #fff;
//       }
//     }
//     li {
//       background-color: #fff !important;
//       color: unset;
//       margin: 0;
//       width: 100%;
//       border-radius: 0;
//       span {
//         font-weight: 400;
//         font-size: 14px !important;
//       }
//     }
//     li:hover {
//       background-color: #e6f7ff !important;
//       color: #1890ff !important;
//       border-right: 2px solid #1890ff;
//     }
//     & .ant-menu-item-selected {
//       background-color: #e6f7ff !important;
//       color: #1890ff !important;
//       border-right: 2px solid #1890ff;
//     }
//   }
//   li:last-child,
//   li:last-child:hover {
//     background-color: #fff !important;
//     color: unset;
//     margin: 0;
//     width: 100%;
//     border-radius: 0;
//     span {
//       font-weight: 400;
//       font-size: 14px !important;
//     }
//   }
// `;
// const CollapseStyled = styled(Collapse)`
//   &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
//     border-radius: 8px 8px 0 0;
//     background: linear-gradient(
//       90.03deg,
//       rgb(242, 32, 118) 0.03%,
//       rgb(41, 18, 95) 100.05%
//     );
//   }
// `;
//
// const MenuStyled = styled(Menu)<MenuStyledProps>`
//   &.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline li {
//     height: 72px;
//     padding-left: 0 !important;
//     padding-right: 0;
//     :active {
//       background-color: unset;
//     }
//     span > div > div:nth-child(1) {
//       font-weight: bold;
//     }
//   }
//   &.ant-menu-dark .ant-menu-item-selected {
//     background-color: unset;
//   }
// `;
const ButtonStyled = styled(Button)`
  border: unset;
  :focus {
    outline: unset;
    border: unset;
  }
  &.ant-btn-text:not(:disabled):hover {
    border: unset;
  }
  &.ant-btn:not(:disabled):focus-visible {
    outline: unset;
  }
`;
const FloatButtonMobileShareStyled = styled(FloatButton)`
  &.ant-float-btn-primary:focus {
    outline: unset;
  }
  &.ant-float-btn-primary .ant-float-btn-body:hover {
    background: #1677ff;
  }
`;
const InputStyled = styled(Input)`
`;
const ConceptTemplateVersionLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const templateName:string = location.state.templateName;
  // const templates:any = location.state.templates;
  const dispatch: ThunkDispatch<undefined, undefined, undefined> = useDispatch();
  const { 
    isTemplatesVersionsSuccess, 
    templatesVersions,
    isAddSharedVariantSuccess,
    addSharedVariant,
  } = useSelector(
    (state: any) => state.templateVersion
  );
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  //
  // const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [mode, setMode] = useState<"vertical" | "inline">("inline");
  // const [theme, setTheme] = useState<MenuTheme>("light");
  const [templateId, setTemplateId] = useState<string>("");
  const [variants, setVariants] = useState<any>([]);
  const [combinations, setCombinations] = useState<number>(0);
  const [variantsName, setVariantsName] = useState<any>([]);
  const [variantSizes, setVariantSizes] = useState<any>([]);
  const [selectedVariantNames, setSelectedVariantNames] = useState<any>([]);
  const filteredOptionsVariantsName = variantsName.filter((o) => !selectedVariantNames.includes(o.value));
  const [selectedVariantSizes, setSelectedVariantSizes] = useState<any>([]);
  const filteredOptionsVariantSizes = variantSizes.filter((o) => !selectedVariantSizes.includes(o.value));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSharedVariantNames, setSelectedSharedVariantNames] = useState<any>([]);
  const [selectedSharedVariantSizes, setSelectedSharedVariantSizes] = useState<any>([]);
  const [sharedLoading, setSharedLoading] = useState<boolean>(false);
  const sharedLinkRef = useRef<Input>(null);
  // const [variantsRefreshes, setVariantsRefreshes] = useState<{ refresh: number }[]>([]);
  // const [variantPlay, setVarianPlay] = useState<any>({});
  // const [_play, _setPlay] = useState<boolean>(false);
  // const [_pause, _setPause] = useState<boolean>(false);
  // const [_replay, _setReplay] = useState<boolean>(false);
  useEffect(() => {
    setLoading(!loading);
    dispatch(getTemplatesVersions());
  }, [
    dispatch,
  ]);
  useEffect(() => {
    if (isTemplatesVersionsSuccess) {
      let _variantsName = []; 
      let _variantSizes = [];
      templatesVersions.map(templateVersion => {
        templateVersion.variants.map(variantName => {
          const variantNameExist = _variantsName.some(el => el.value === variantName.variantName);
          const variantSizeExist = _variantSizes.some(el => el.value === variantName.size);
          if (!variantNameExist) _variantsName.push({
            label: variantName.variantName,
            value: variantName.variantName,
          });
          if (!variantSizeExist) _variantSizes.push({
            label: variantName.size,
            value: variantName.size,
          });
        });
      });
      setVariantsName(_variantsName);
      setVariantSizes(_variantSizes);
      let combinations = 0;
      let filterVariants = [];
      let i = 0;
      templatesVersions.map(templateVersion => {
        templateVersion.variants.map(variant => {
          combinations += 1;
          const variantSizeExist = filterVariants.some(el => el.size === variant.size);
          if (!variantSizeExist) {
            filterVariants.push({
              _id: templateVersion._id,
              templateName: variant.templateName,
              size: variant.size,
              variants: [{
                variantName: variant.variantName,
                defaultValues: variant.defaultValues,
              }]
            });
            i++;
          } else {
            filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, { 
              variantName: variant.variantName,
              defaultValues: variant.defaultValues,
            }];
          }
        });
      });
      setCombinations(combinations);
      setVariants(filterVariants);
      //
      // setTemplateId(templates[0]._id);
      // setVariants(
      //   templatesVersions.filter(
      //     (templateVersion: { templateId: string }) =>
      //       templateVersion.templateId === templates[0]._id
      //   )[0]
      // );
      const interval = setInterval(() => {
        setLoading(false);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [
    templatesVersions,
  ]);
  const items: MenuProps['items'] = [
    getItem(<Space>{templateName}</Space>, 'sub1', <PlaySquareOutlined />,
      [
        getItem(<div style={{
        }}>
          <div>Variants</div>
          <div>
            <Select
              size="small"
              mode="multiple"
              allowClear
              style={{ width: '100%', padding: 4 }}
              value={selectedVariantNames}
              onChange={setSelectedVariantNames}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              options={filteredOptionsVariantsName}
            />
          </div>
        </div>, '1'),
        getItem(<div style={{
        }}>
          <div>Sizes</div>
          <div>
            <Select
              size="small"
              mode="multiple"
              allowClear
              style={{ width: '100%', padding: 4 }}
              value={selectedVariantSizes}
              onChange={setSelectedVariantSizes}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              options={filteredOptionsVariantSizes}
            />
          </div>
        </div>, '2'),
      ]
      //
      // templates.map(
      //   (template: {
      //     size: string;
      //     name: string;
      //     _id: React.Key | null | undefined;
      //   }, i: number) => getItem(template.size + "-" + template.name, template._id)
      // ),    
    ),
    getItem(<Space>Add New</Space>, "", <PlusOutlined />),
  ];
  useEffect(() => {
    if (templatesVersions !== null) {
      let filterVariants = [];
      let i = 0;
      templatesVersions.map(templateVersion => {
        templateVersion.variants.map(variant => {
          if (selectedVariantNames.length === 0 && selectedVariantSizes.length === 0) {
            const variantSizeExist = filterVariants.some(el => el.size === variant.size);
            if (!variantSizeExist) {
              filterVariants.push({
                _id: templateVersion._id,
                templateName: variant.templateName,
                size: variant.size,
                variants: [{
                  variantName: variant.variantName,
                  defaultValues: variant.defaultValues,
                }]
              });
              i++;
            } else {
              filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, { 
                variantName: variant.variantName,
                defaultValues: variant.defaultValues,
              }];
            }
          }
          if (selectedVariantNames.length > 0 && selectedVariantSizes.length > 0) {
            selectedVariantNames.map(selectedVariantName =>
              selectedVariantSizes.map(selectedVariantSize => {
                if (variant.variantName === selectedVariantName && variant.size === selectedVariantSize) {
                  const variantExist = filterVariants.some(el => el.size === variant.size);
                  if (!variantExist) {
                    filterVariants.push({
                      _id: templateVersion._id,
                      templateName: variant.templateName,
                      size: variant.size,
                      variants: [{
                        variantName: variant.variantName,
                        defaultValues: variant.defaultValues,
                      }]
                    });
                    i++;
                  } else {
                    filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, { 
                      variantName: variant.variantName,
                      defaultValues: variant.defaultValues,
                    }];
                  }
                }
              })
            );
          }
          if (selectedVariantSizes.length === 0) {
            selectedVariantNames.map(selectedVariantName => {
              if (variant.variantName === selectedVariantName) {
                const variantSizeExist = filterVariants.some(el => el.size === variant.size);
                if (!variantSizeExist) {
                  filterVariants.push({
                    _id: templateVersion._id,
                    templateName: variant.templateName,
                    size: variant.size,
                    variants: [{
                      variantName: variant.variantName,
                      defaultValues: variant.defaultValues,
                    }]
                  });
                  i++;
                } else {
                  filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, { 
                    variantName: variant.variantName,
                    defaultValues: variant.defaultValues,
                  }];
                }
              }
            });
          }
          if (selectedVariantNames.length === 0) {
            selectedVariantSizes.map(selectedVariantSize => {
              if (variant.size === selectedVariantSize) {
                const variantSizeExist = filterVariants.some(el => el.size === variant.size);
                if (!variantSizeExist) {
                  filterVariants.push({
                    _id: templateVersion._id,
                    templateName: variant.templateName,
                    size: variant.size,
                    variants: [{
                      variantName: variant.variantName,
                      defaultValues: variant.defaultValues,
                    }]
                  });
                  i++;
                } else {
                  filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, { 
                    variantName: variant.variantName,
                    defaultValues: variant.defaultValues,
                  }];
                }
              }
            });
          }
        });
      });
      setVariants(filterVariants);
    }
  }, [
    selectedVariantNames, 
    selectedVariantSizes,
  ]);
  useEffect(() => {
    if (isAddSharedVariantSuccess) setSharedLoading(false);
  }, [isAddSharedVariantSuccess]);
  console.log("asdf", addSharedVariant);
  const onClick: MenuProps["onClick"] = e => {
    setLoading(!loading);
    setTemplateId(e.key);
    setVariants(
        templatesVersions.filter(
          (templateVersion: { templateId: string }) =>
            templateVersion.templateId === e.key
        )[0]
      );
    let switches = [];
    let refreshes = [];
    let isPause = [];
    let isShowPlay = [];
    templatesVersions.filter(
        (templateVersion: { templateId: string }) =>
          templateVersion.templateId === e.key
      )[0]?.variants.map((variant: any) => {
      switches.push({
        option: 'disable'
      });
      refreshes.push({
        refresh: 0
      });
      isPause.push({
        isPause: false
      });
      // isShowPlay.push({
      //   isShowPlay: false
      // });
    });
    // setSwitches(switches);
    // setRefreshes(refreshes);
    // setPause(isPause);
    // setShowPlay(isShowPlay);
    const interval = setInterval(() => {
      setLoading(false);
    }, 2000);
    return () => clearInterval(interval);
  };
  const onLoad = (e: any) => {
    // e.preventDefault();
    // let dataIsPause = [...isPause];
    // let dataIsShowPlay = [...isShowPlay];
    // window.addEventListener(
    //   "message",
    //   (event) => {
    //     switch (event?.data?.type) {
    //       case "SCREENSHOT_START":
    //       case "SCREENSHOT":
    //         // dataIsShowPlay[i]["isShowPlay"] = true
    //         // dataIsPause[i]["isPause"] = false;
    //         // setShowPlay(dataIsShowPlay);
    //         // setPause(dataIsPause);
    //         break;
    //       case "SCREENSHOT_STOP":
    //         // dataIsShowPlay[i]["isShowPlay"] = false
    //         // dataIsPause[i]["isPause"] = true;
    //         // setShowPlay(dataIsShowPlay);
    //         // setPause(dataIsPause);
    //         break;
    //       default:
    //         break;
    //     }
    //   },
    //   false
    // );
    // // e.target.contentWindow.postMessage(
    // //   {
    // //     data,
    // //     type: "setDefaultValues",
    // //   },
    // //   e.target.src
    // // );
    // document.addEventListener("visibilitychange", () => {
    //   dataIsPause[i]["isPause"] = false;
    //   // setPause(dataIsPause);
    // });
  };
  return (
    <Layout style={{ height: "calc(100vh - 64px)" }}>
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
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Spin
            size="large"
            style={{
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Space>
      )}
      <DrawerStyled
        title={
          <Space.Compact block className="header">
            Filters <Space.Compact block style={{
              justifyContent: 'right',
              alignItems: 'center',
            }}>
              <MenuFoldOutlined 
                onClick={() => setDrawerVisible(false)}
              />
            </Space.Compact>
          </Space.Compact>
        }
        placement="left"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Space.Compact block className="name">{templateName}</Space.Compact>
        <Space.Compact block className="variant">Variants</Space.Compact>
        <Space.Compact block>
          <Select
            className="selectVariants"
            size="small"
            mode="multiple"
            allowClear
            style={{ width: '100%', padding: 4 }}
            value={selectedVariantNames}
            onChange={setSelectedVariantNames}
            placeholder="Please select"
            options={filteredOptionsVariantsName}
          />
        </Space.Compact>
        <Space.Compact block className="size">Sizes</Space.Compact>
        <Space.Compact block>
          <Select
            className="selectSizes"
            size="small"
            mode="multiple"
            allowClear
            style={{ width: '100%', padding: 4 }}
            value={selectedVariantSizes}
            onChange={setSelectedVariantSizes}
            placeholder="Please select"
            options={filteredOptionsVariantSizes}
          />
        </Space.Compact>
      </DrawerStyled>
      {/*  */}
      {/* <SiderStyled
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   // console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   // console.log(collapsed, type);
        // }}
        style={{
          pointerEvents: loading ? 'none' : 'unset',
        }}
      >
        <MenuStyled
          windowinnerheight={window.innerHeight}
          theme="dark"
          mode="inline"
          defaultOpenKeys={['sub1']}
          defaultSelectedKeys={[templates[0]._id]}
          items={items}
          onClick={onClick}
        />
      </SiderStyled> */}
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <MenuStyled
          windowinnerheight={window.innerHeight - 64}
          theme="dark"
          mode="inline"
          defaultOpenKeys={['sub1']}
          items={items}
        />
      </Sider> */}
      {/* <Header style={{ padding: 0, background: '#001529', borderBottomRightRadius: 5, }}>
        <ButtonStyled
          type="text"
          // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          icon={<MenuUnfoldOutlined />}
          // onClick={() => setCollapsed(!collapsed)}
          style={{
            color: '#fff',
          }}
        />
      </Header> */}
      <Layout style={{
        pointerEvents: loading ? 'none' : 'unset',
      }}>
        <Space
          direction="vertical"
          size={0}
          style={{ backgroundColor: "#fff" }}
        >
          {
            // !loading && variants?.variants && (
              <Space.Compact block style={{
                background: "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
                padding: "0 0 3px 0",
              }}>
                <ButtonMenuStyled
                  type="text"
                  icon={<MenuUnfoldOutlined />}
                  onClick={() => setDrawerVisible(!drawerVisible)}
                />
                {/* <Space.Compact block style={{
                  marginLeft: 15.8,
                }}>
                  <Space style={{
                    fontStyle: "normal",
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>Version {templates.filter((template: { _id: string }) => {
                    return template._id === templateId;
                  })[0].defaultVersion + 1}</Space>
                  <Space style={{
                    fontStyle: "normal",
                    marginLeft: 4.8,
                  }}>{templates.filter((template: { _id: string }) => {
                      return template._id === templateId;
                    })[0].size + "-" +
                  templates.filter((template: { _id: string }) => {
                    return template._id === templateId;
                  })[0].name}</Space>
                </Space.Compact> */}
                <Space.Compact block style={{
                  marginRight: 15.8,
                  justifyContent: 'right',
                }}>
                  <Space>
                    <Badge
                      count={
                        combinations
                      }
                      overflowCount={combinations}
                      color="#6F7782"
                      style={{
                        fontStyle: "normal",
                        fontWeight: 400,
                        color: "#fff",
                        borderRadius: 5,
                        padding: 0,
                      }}
                    />
                    <Space
                      style={{
                        fontStyle: "normal",
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
          {
            isMobile
              ?
                variants.map(variant => <>
                  <Space.Compact block style={{marginBottom: 5}}>
                    <Space.Compact block style={{
                      justifyContent: 'center',
                      background:
                                "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",   
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: 5,                 
                    }}>{variant.templateName} {variant.size}</Space.Compact>
                  </Space.Compact>
                  {
                    variant.variants.map((defaultValue, i) => 
                      <Row justify="center" style={{
                        marginBottom: 10,
                      }}>
                        <Col>
                          <Space.Compact
                            block
                            style={{
                              background:
                                "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
                              borderTopLeftRadius: "5px",
                              borderTopRightRadius: "5px",
                              height: "5px",
                            }}
                          >
                            {" "}
                          </Space.Compact>
                          <IFrameCard
                            variant={variant}
                            i={i} 
                            // 
                            // variant={variant} 
                            // i={i} 
                            // templates={templates}
                            // templateId={templateId}
                            // variants={variants}
                          />
                        </Col>
                      </Row>
                    )
                  }
                </>)
              :
                variants.map(variant => <>
                  <Space.Compact block style={{marginBottom: 5}}>
                    <Space.Compact block style={{
                      justifyContent: 'center',
                      background:
                                "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",   
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: 5,                 
                    }}>{variant.templateName} {variant.size}</Space.Compact>
                  </Space.Compact>
                  <Row gutter={[15.9, 22.4]} style={{ width: "100%", justifyContent: 'center' }}>
                    {
                      variant.variants.map((defaultValue, i) => 
                        <Col>
                          <Space.Compact
                            block
                            style={{
                              background:
                                "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
                              borderTopLeftRadius: "5px",
                              borderTopRightRadius: "5px",
                              height: "5px",
                            }}
                          >
                            {" "}
                          </Space.Compact>
                          <IFrameCard
                            variant={variant}
                            i={i} 
                            // 
                            // variant={variant} 
                            // i={i} 
                            // templates={templates}
                            // templateId={templateId}
                            // variants={variants}
                          />
                        </Col>
                      )
                    }
                  </Row>
                </>)
          }
          {/*  */}
          {/* { isMobile 
              ? 
                <Col style={{ width: "100%", justifyContent: 'center' }}>
                  {!loading && variants?.variants &&
                    variants?.variants.map(
                      (variant: {
                        defaultValues(e: React.SyntheticEvent<HTMLIFrameElement, Event>, defaultValues: any, arg2: string, arg3: string, arg4: string): void; variantName: string 
      }, i: number) => (
                        <Col>
                          <Space.Compact
                            block
                            style={{
                              background:
                                "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
                              borderTopLeftRadius: "5px",
                              borderTopRightRadius: "5px",
                              height: "5px",
                            }}
                          >
                            {" "}
                          </Space.Compact>
                          <IFrameCard 
                            variant={variant} 
                            i={i} 
                            templates={templates}
                            templateId={templateId}
                            variants={variants}
                          />
                        </Col>
                      )
                    )}
                </Col>
              : 
                <Row gutter={[15.9, 22.4]} style={{ width: "100%", justifyContent: 'center' }}>
                  {!loading && variants?.variants &&
                    variants?.variants.map(
                      (variant: {
                        defaultValues(e: React.SyntheticEvent<HTMLIFrameElement, Event>, defaultValues: any, arg2: string, arg3: string, arg4: string): void; variantName: string 
      }, i: number) => (
                        <Col>
                          <Space.Compact
                            block
                            style={{
                              background:
                                "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
                              borderTopLeftRadius: "5px",
                              borderTopRightRadius: "5px",
                              height: "5px",
                            }}
                          >
                            {" "}
                          </Space.Compact>
                          <IFrameCard 
                            variant={variant} 
                            i={i} 
                            templates={templates}
                            templateId={templateId}
                            variants={variants}
                          />
                        </Col>
                      )
                    )}
                </Row>
          } */}
        </ContentStyled>
      </Layout>
      <Modal title="Shared Variants" 
        maskClosable={sharedLoading ? false : true}
        closable={sharedLoading ? false : true}
        open={isModalOpen}
        // onOk={() => setIsModalOpen(false)} 
        okButtonProps={{ style: { display: sharedLoading ? 'none' : 'unset' } }}
        onOk={() => {
          let filterVariants = [];
          let i = 0;
          templatesVersions.map(templateVersion => {
            templateVersion.variants.map(variant => {
              if (selectedSharedVariantNames.length === 0 && selectedSharedVariantSizes.length === 0) {
                const variantSizeExist = filterVariants.some(el => el.variants[0].size === variant.size);
                if (!variantSizeExist) {
                  filterVariants.push({
                    _id: templateVersion._id,
                    templateId: templateVersion.templateId,
                    variants: [{
                      templateName: variant.templateName,
                      size: variant.size,
                      variantName: variant.variantName,
                      defaultValues: variant.defaultValues,
                    }]
                  });
                  i++;
                } else {
                  filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, {
                    templateName: variant.templateName,
                    size: variant.size,
                    variantName: variant.variantName,
                    defaultValues: variant.defaultValues,
                  }];
                }
              }
              if (selectedSharedVariantNames.length > 0 && selectedSharedVariantSizes.length > 0) {
                selectedSharedVariantNames.map(selectedVariantName =>
                  selectedSharedVariantSizes.map(selectedVariantSize => {
                    if (variant.variantName === selectedVariantName && variant.size === selectedVariantSize) {
                      const variantExist = filterVariants.some(el => el.variants[0].size === variant.size);
                      if (!variantExist) {
                        filterVariants.push({
                          _id: templateVersion._id,
                          templateId: templateVersion.templateId,
                          variants: [{
                            templateName: variant.templateName,
                            size: variant.size,
                            variantName: variant.variantName,
                            defaultValues: variant.defaultValues,
                          }]
                        });
                        i++;
                      } else {
                        filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, {
                          templateName: variant.templateName,
                          size: variant.size,
                          variantName: variant.variantName,
                          defaultValues: variant.defaultValues,
                        }];
                      }
                    }
                  })
                );
              }
              if (selectedSharedVariantSizes.length === 0) {
                selectedSharedVariantNames.map(selectedVariantName => {
                  if (variant.variantName === selectedVariantName) {
                    const variantSizeExist = filterVariants.some(el => el.variants[0].size === variant.size);
                    if (!variantSizeExist) {
                      filterVariants.push({
                        _id: templateVersion._id,
                        templateId: templateVersion.templateId,
                        variants: [{
                          templateName: variant.templateName,
                          size: variant.size,
                          variantName: variant.variantName,
                          defaultValues: variant.defaultValues,
                        }]
                      });
                      i++;
                    } else {
                      filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, {
                        templateName: variant.templateName,
                        size: variant.size,
                        variantName: variant.variantName,
                        defaultValues: variant.defaultValues,
                      }];
                    }
                  }
                });
              }
              if (selectedSharedVariantNames.length === 0) {
                selectedSharedVariantSizes.map(selectedVariantSize => {
                  if (variant.size === selectedVariantSize) {
                    const variantSizeExist = filterVariants.some(el => el.variants[0].size === variant.size);
                    if (!variantSizeExist) {
                      filterVariants.push({
                        _id: templateVersion._id,
                        templateId: templateVersion.templateId,
                        variants: [{
                          templateName: variant.templateName,
                          size: variant.size,
                          variantName: variant.variantName,
                          defaultValues: variant.defaultValues,
                        }]
                      });
                      i++;
                    } else {
                      filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, {
                        templateName: variant.templateName,
                        size: variant.size,
                        variantName: variant.variantName,
                        defaultValues: variant.defaultValues,
                      }];
                    }
                  }
                });
              }
            });
          });
          setSharedLoading(!sharedLoading);
          dispatch(
            postSharedVariants({
              templateName: templateName,
              templatesVersions: filterVariants,
            })
          );
        }}
        cancelButtonProps={{ style: { display: sharedLoading ? 'none' : 'unset' } }}
        onCancel={() => setIsModalOpen(false)}
      >
        {
          sharedLoading && <Space
            style={{
              zIndex: 10,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Spin
              size="large"
              style={{
                top: "50%",
                left: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Space>
        }
        {
          addSharedVariant === null && (<>
            <Space.Compact block className="variant">Variants</Space.Compact>
            <Space.Compact block>
              <Select
                className="selectSharedVariants"
                size="small"
                mode="multiple"
                allowClear
                style={{ width: '100%', padding: 4 }}
                value={selectedSharedVariantNames}
                onChange={setSelectedSharedVariantNames}
                placeholder="Please select"
                options={filteredOptionsVariantsName}
              />
            </Space.Compact>
            <Space.Compact block className="size">Sizes</Space.Compact>
            <Space.Compact block>
              <Select
                className="selectSharedSizes"
                size="small"
                mode="multiple"
                allowClear
                style={{ width: '100%', padding: 4 }}
                value={selectedSharedVariantSizes}
                onChange={setSelectedSharedVariantSizes}
                placeholder="Please select"
                options={filteredOptionsVariantSizes}
              />
            </Space.Compact>
          </>)
        }
        {
          addSharedVariant !== null && (<>
            <Space style={{fontWeight: 'bold'}}>Link:</Space>
            {' '}
            {
              addSharedVariant !== null 
                ?
                  <Space.Compact style={{ width: '92%' }}>
                    <InputStyled ref={sharedLinkRef} defaultValue={window.location.origin + "/" + addSharedVariant.sharedVariants._id} readOnly />
                    <Button type="primary" onClick={() => {
                      if (sharedLinkRef.current) {
                        sharedLinkRef.current.select();
                        document.execCommand('copy');
                      }
                    }}>Copy</Button>
                  </Space.Compact>
                : "Not Generated"
            }
            <Space.Compact block style={{
              fontWeight: 'bold',
              justifyContent: 'center',
            }}>QR</Space.Compact>
            <Space style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <QRCode value={window.location.origin + '/' + addSharedVariant.sharedVariants._id} />
            </Space>
          </>)
        }
      </Modal>
    </Layout>
  );
};
export default ConceptTemplateVersionLayout;
