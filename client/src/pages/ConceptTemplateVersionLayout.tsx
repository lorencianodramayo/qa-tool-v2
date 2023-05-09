// // @ts-nocheck
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
} from "@ant-design/icons";
import { Badge, Card, Col, Menu, Row, Space, Spin, Typography, FloatButton, } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
const { Content, Sider } = Layout;
import { getTemplatesVersions } from "../features/templateVersion/templateVersionSlice";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from "antd";
import { ThunkDispatch } from 'redux-thunk';
import IFrameCard from "../components/IFrame/IFrame";
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
const MenuStyled = styled(Menu)<MenuStyledProps>`
  &.ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
    overflow-y: scroll;
    height: calc(${props => props.windowinnerheight} - 64)px;
  }
  &.ant-menu-inline {
    border-inline-end: unset !important;
  }
  &.ant-menu-inline .ant-menu-submenu {
    & .ant-menu-submenu-title {
      margin: 0;
      width: 100%;
      border-radius: 0;
      color: unset;
      span,
      i {
        font-weight: 700;
        font-size: 14px !important;
      }
      &:hover {
        background-color: #fff;
      }
    }
    li {
      background-color: #fff !important;
      color: unset;
      margin: 0;
      width: 100%;
      border-radius: 0;
      span {
        font-weight: 400;
        font-size: 14px !important;
      }
    }
    li:hover {
      background-color: #e6f7ff !important;
      color: #1890ff !important;
      border-right: 2px solid #1890ff;
    }
    & .ant-menu-item-selected {
      background-color: #e6f7ff !important;
      color: #1890ff !important;
      border-right: 2px solid #1890ff;
    }
  }
  li:last-child,
  li:last-child:hover {
    background-color: #fff !important;
    color: unset;
    margin: 0;
    width: 100%;
    border-radius: 0;
    span {
      font-weight: 400;
      font-size: 14px !important;
    }
  }
`;
const CollapseStyled = styled(Collapse)`
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    border-radius: 8px 8px 0 0;
    background: linear-gradient(
      90.03deg,
      rgb(242, 32, 118) 0.03%,
      rgb(41, 18, 95) 100.05%
    );
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
const ConceptTemplateVersionLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const templateName:string = location.state.templateName;
  const templates:any = location.state.templates;
  const dispatch: ThunkDispatch<undefined, undefined, undefined> = useDispatch();
  const { 
    isTemplatesVersionsSuccess, 
    templatesVersions
  } = useSelector(
    (state: any) => state.templateVersion
  );
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const [templateId, setTemplateId] = useState<string>("");
  const [variants, setVariants] = useState<any>([]);
  // const [variantsRefreshes, setVariantsRefreshes] = useState<{ refresh: number }[]>([]);
  // const [variantPlay, setVarianPlay] = useState<any>({});
  // const [_play, _setPlay] = useState<boolean>(false);
  // const [_pause, _setPause] = useState<boolean>(false);
  // const [_replay, _setReplay] = useState<boolean>(false);
  const items: MenuProps['items'] = [
    getItem(<Space>{templateName}</Space>, 'sub1', <PlaySquareOutlined />, 
      templates.map(
        (template: {
          size: string;
          name: string;
          _id: React.Key | null | undefined;
        }, i: number) => getItem(template.size + "-" + template.name, template._id)
      ),    
    ),
    getItem(<Space>Add New</Space>, "", <PlusOutlined />),
  ];
  useEffect(() => {
    setLoading(!loading);
    dispatch(getTemplatesVersions());
  }, [
    dispatch,
  ]);
  useEffect(() => {
    if (isTemplatesVersionsSuccess) {
      setTemplateId(templates[0]._id);
      setVariants(
        templatesVersions.filter(
          (templateVersion: { templateId: string }) =>
            templateVersion.templateId === templates[0]._id
        )[0]
      );
      const interval = setInterval(() => {
        setLoading(false);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [
    templatesVersions,
  ]);
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
          icon={<MobileOutlined />}
          tooltip={<Space>Mobile View</Space>}
          onClick={() => setIsMobile(!isMobile)}
        />
        <FloatButtonMobileShareStyled
          type="primary"
          icon={<ShareAltOutlined />}
          tooltip={<Space>Share</Space>}
          // onClick={() => setShowLanguageModal(!showLanguageModal)}
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
      <SiderStyled
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
          theme={theme}
          mode={mode}
          defaultOpenKeys={['sub1']}
          defaultSelectedKeys={[templates[0]._id]}
          items={items}
          onClick={onClick}
        />
      </SiderStyled>
      <Layout style={{
        pointerEvents: loading ? 'none' : 'unset',
      }}>
        <Space
          direction="vertical"
          size={0}
          style={{ backgroundColor: "#fff" }}
        >
          {
            !loading && variants?.variants && (
              <Space.Compact block style={{
                background: "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
                padding: "0 0 3px 0",
              }}>
                <Space.Compact block style={{
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
                </Space.Compact>
                <Space.Compact block style={{
                  marginRight: 15.8,
                  justifyContent: 'right',
                }}>
                  <Space>
                    <Badge
                      count={
                        variants.variants?.length 
                      }
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
            )
          }
        </Space>
        <ContentStyled
          style={{
            margin: 5,
            overflowY: 'scroll',
          }}
        >
          { isMobile 
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
          }
        </ContentStyled>
      </Layout>
    </Layout>
  );
};

export default ConceptTemplateVersionLayout;
