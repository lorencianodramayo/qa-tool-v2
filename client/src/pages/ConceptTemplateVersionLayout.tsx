// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  PlaySquareOutlined,
  PlusOutlined,
  EditOutlined,
  MessageOutlined,
  DesktopOutlined,
  ExpandOutlined,
  ShareAltOutlined,
  BarsOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  PlayCircleTwoTone,
  PauseCircleTwoTone,
  RedoOutlined,
  CaretRightOutlined,
  FileImageFilled,
  FileImageOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  PlayCircleFilled,
  PauseCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { Badge, Card, Col, Menu, Row, Space, Spin, Typography } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
const { Content, Sider } = Layout;
import { getTemplatesVersions } from "../features/templateVersion/templateVersionSlice";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Collapse } from "antd";
import Timer from "../components/Timer";
import { ThunkDispatch } from 'redux-thunk';
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
const CardStyled = styled(Card)`
  border-radius: unset;
  border: 0;
  &.ant-card .ant-card-extra {
    margin: 0;
    width: 100%;
    margin: 6px 0 4px 0;
  }
  &.ant-card .ant-card-head {
    padding: 0;
    min-height: unset;
    margin: 0 10.9px 0 11.3px;
    border-bottom: 0;
    border-radius: unset;
  }
  &.ant-card-bordered .ant-card-cover {
    margin: 0 10.9px 0 11.3px;
  }
  &.ant-card .ant-card-cover img {
    border-radius: 0;
  }
  &.ant-card .ant-card-body {
    padding: 0;
    margin: 0 10.9px 0 11.3px;
  }
  &.ant-card .ant-card-actions {
    padding: 8px 0;
    height: 40px;
    li {
      margin: 0;
    }
    li:first-child {
      width: 45.9999% !important;
    }
    li:nth-child(n + 2) {
      width: 25% !important;
    }
  }
`;
const SpaceCompactCardHeaderTitleStyled = styled(Space.Compact)`
  &::-webkit-scrollbar {
    display: none;
  }
`;
const DivStyled = styled.div`
  font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
  position: relative;
  height: 11.1px;
  width: 26px;
  background-color: red;
  border-radius: 16px;
  top: 50%;
  transform: translateY(-50%);
`;
const InputStyled = styled.input`
  display: none;
`;
const SpanStyled = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  left: 0px;
  width: 8.4px;
  height: 8.4px;
  background: #fff;
  border-radius: 16px;
  transition: left 0.25s ease-out;
`;
const LabelStyled = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  line-height: 11.1px;
  color: transparent;
  cursor: pointer;
  width: 8px;
  ${InputStyled}:checked + & {
    transition: 0.15s ease-out;
    color: #fff;
  }
`;
const { Panel } = Collapse;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const [variantsLoading, setVariantsLoading] = useState<{ loading: boolean }[]>([]);
  const iframeRef = useRef<HTMLIFrameElement[]>([]);
  const [templateId, setTemplateId] = useState<string>("");
  const [variants, setVariants] = useState<any>([]);
  const [switches, setSwitches] = useState<{ option: string }[]>([]);
  const [refreshes, setRefreshes] = useState<{ refresh: number }[]>([]);
  const [_PlayPause, setPlayPause] = useState<{ play: boolean, pause: boolean }[]>([]);
  const [isPause, setPause] = useState<{ isPause: boolean }[]>([]);
  const [isShowPlay, setShowPlay] = useState<{ isShowPlay: boolean }[]>([]);
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
      if (templatesVersions.length > 1)
        setVariants(
          templatesVersions.filter(
            (templateVersion: { templateId: string }) =>
              templateVersion.templateId === templates[0]._id
          )[0]?.variants
        );
      else setVariants(
          templatesVersions.filter(
            (templateVersion: { templateId: string }) =>
              templateVersion.templateId === templates[0]._id
          )[0]
        );
      let switches = [];
      let refreshes = [];
      templatesVersions.filter(
          (templateVersion: { templateId: string }) =>
            templateVersion.templateId === templates[0]._id
        )[0]?.variants.map((variant: any) => {
        switches.push({
          option: 'disable'
        });
        refreshes.push({
          refresh: 0
        });
      });
      setSwitches(switches);
      setRefreshes(refreshes);
      const interval = setInterval(() => {
        setLoading(false);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [
    templatesVersions,
    setPause,
    setShowPlay
  ]);
  useEffect(() => {
    if (isTemplatesVersionsSuccess) {
      let isPause = [];
      let isShowPlay = [];
      templatesVersions.filter(
          (templateVersion: { templateId: string }) =>
            templateVersion.templateId === templates[0]._id
        )[0]?.variants.map((variant: any) => {
        isPause.push({
          isPause: true
        });
        isShowPlay.push({
          isShowPlay: false
        });
      });
      setPause(isPause);
      setShowPlay(isShowPlay);
    }
  }, [
    templatesVersions,
    setPause,
    setShowPlay
  ]);
  const onClick: MenuProps["onClick"] = e => {
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
        isPause: true
      });
      isShowPlay.push({
        isShowPlay: false
      });
    });
    setSwitches(switches);
    setRefreshes(refreshes);
    setPause(isPause);
    setShowPlay(isShowPlay);
  };
  const handleChange = (i: number, val: string) => {
    let data = [...switches];
    data[i]["option"] = val;
    setSwitches(data);
  };
  const switchStyle = (i: number) => {
    return {
      backgroundColor: `${
        switches[i]?.option === "check"
          ? "#F22076"
          : switches[i]?.option === "disable"
          ? "#BFBFBF"
          : switches[i]?.option === "close"
          ? "#29125F"
          : "unset"
      }`,
    };
  };
  const switchCheckIconStyle = (i: number) => {
    return {
      color: `${
        switches[i]?.option === "close"
          ? "#fff"
          : switches[i]?.option === "check"
          ? "#F22076"
          : switches[i]?.option === "disable"
          ? "#BFBFBF"
          : "unset"
      }`,
      marginLeft: switches[i]?.option === "close" ? 4.8 : 0,
      fontSize: 8.8,
    };
  };
  const switchClosedIconStyle = (i: number) => {
    return {
      color: `${
        switches[i]?.option === "close"
          ? "#29125F"
          : switches[i]?.option === "check"
          ? "#fff"
          : switches[i]?.option === "disable"
          ? "#BFBFBF"
          : "unset"
      }`,
      marginLeft: switches[i]?.option === "check" ? 0.4 : 0,
      fontSize: 8.8,
    };
  };
  const selectionStyle = (i: number) => {
    return {
      top: 1.2,
      left:
        switches[i]?.option === "check"
          ? 2
          : switches[i]?.option === "disable"
          ? 9
          : switches[i]?.option === "close"
          ? 16
          : 0,
    };
  };
  const ClickableLabel: React.FunctionComponent<{ onChange: () => void }> = ({
    onChange,
  }) => (
    <LabelStyled onClick={onChange}>
      <Space.Compact block style={{ width: 7.9, height: 10.7 }}>
        &nbsp;
      </Space.Compact>
    </LabelStyled>
  );
  const onLoad = (e: any, i: number, data: any) => {
    e.preventDefault();
    let dataIsPause = [...isPause];
    let dataIsShowPlay = [...isShowPlay];
    window.addEventListener(
      "message",
      (event) => {
        switch (event?.data?.type) {
          case "SCREENSHOT_START":
          case "SCREENSHOT":
            dataIsShowPlay[i]["isShowPlay"] = true
            dataIsPause[i]["isPause"] = false;
            setShowPlay(dataIsShowPlay);
            setPause(dataIsPause);
            break;
          case "SCREENSHOT_STOP":
            dataIsShowPlay[i]["isShowPlay"] = false
            dataIsPause[i]["isPause"] = true;
            setShowPlay(dataIsShowPlay);
            setPause(dataIsPause);
            break;
          default:
            break;
        }
      },
      false
    );
    e.target.contentWindow.postMessage(
      {
        data,
        type: "setDefaultValues",
      },
      e.target.src
    );
    document.addEventListener("visibilitychange", () => {
      dataIsPause[i]["isPause"] = false;
      setPause(dataIsPause);
    });
  };
  return (
    <Layout style={{ height: "calc(100vh - 64px)" }}>
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
              <>
                <Space
                  style={{
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "rgba(0, 0, 0, 0.45)",
                    marginBottom: 8.7,
                    marginLeft: 15.8,
                    marginTop: 9.5,
                  }}
                >
                  Version
                  {templates.filter((template: { _id: string }) => {
                    return template._id === templateId;
                  })[0].defaultVersion + 1}
                </Space>
                <div style={{ marginLeft: 15.8, marginBottom: 47.5 }}>
                  <Space
                    style={{
                      float: "left",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: 20,
                      color: "#000",
                    }}
                  >
                    {templates.filter((template: { _id: string }) => {
                      return template._id === templateId;
                    })[0].size +
                      "-" +
                      templates.filter((template: { _id: string }) => {
                        return template._id === templateId;
                      })[0].name}
                  </Space>
                  {variants &&
                    <>
                      <Space
                        style={{
                          float: "right",
                          color: "#000",
                        }}
                        size={0}
                      >
                        {/* <Space
                          style={{
                            padding: "0 19.3px",
                          }}
                        >
                          <Badge
                            size="small"
                            count={11}
                            offset={[11, 1.5]}
                            style={{
                              padding: "0 5.7px",
                              fontWeight: "400",
                              fontSize: 12,
                            }}
                          >
                            <MessageOutlined
                              style={{ fontSize: 11.2, color: "#000" }}
                            />
                          </Badge>
                        </Space>
                        <Space
                          style={{
                            padding: "0 19.3px",
                            borderLeft: "1px solid #F0F0F0",
                            borderRight: "1px solid #F0F0F0",
                          }}
                        >
                          <DesktopOutlined
                            style={{ fontSize: 11.2, color: "#000" }}
                          />
                        </Space>
                        <Space
                          style={{
                            padding: "0 19.3px",
                            borderRight: "1px solid #F0F0F0",
                          }}
                        >
                          <ExpandOutlined
                            style={{ fontSize: 11.2, color: "#000" }}
                          />
                        </Space> */}
                        <Space
                          style={{
                            padding: "0 19.3px",
                          }}
                        >
                          <ShareAltOutlined
                            style={{ fontSize: 11.2, color: "#000" }}
                          />
                        </Space>
                      </Space>
                      <Space style={{ clear: "both" }}></Space>
                    </>
                  }
                </div>
              </>
            )
          }
        </Space>
        <>
          {!loading && variants?.variants && (
            <div
              style={{
                margin: "0 16px 0px",
                marginTop: 24.6,
              }}
            >
              <Space
                style={{
                  float: "left",
                }}
              >
                <Space
                  style={{
                    backgroundColor: "#1890FF",
                    height: 21,
                    width: 21,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BarsOutlined style={{ fontSize: 10.9, color: "#fff" }} />
                </Space>
              </Space>
              <Space
                size={0}
                style={{
                  float: "right",
                }}
              >
                <Space>
                  <Badge
                    count={
                      variants.variants?.length 
                    }
                    color="#6F7782"
                    style={{
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: 11,
                      color: "#fff",
                      borderRadius: 5,
                      padding: 0,
                    }}
                  />
                </Space>
                <Space
                  style={{
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 16,
                    color: "rgba(33, 37, 41, 0.5)",
                    marginLeft: 6.8,
                  }}
                >
                  Combinations
                </Space>
              </Space>
              <Space style={{ clear: "both" }}></Space>
            </div>
          )}
          <ContentStyled
            style={{
              margin: "24px 16px",
              overflowY: "scroll",
            }}
          >
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
                      <CardStyled
                        extra={
                          <div>
                            <div
                              style={{
                                display: "inline-block",
                                float: "left",
                              }}
                            >
                              <SpaceCompactCardHeaderTitleStyled
                                block
                                style={{
                                  fontWeight: "500",
                                  fontSize: 13,
                                  height: "20.42px",
                                  overflow: "auto",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {variant.variantName}
                              </SpaceCompactCardHeaderTitleStyled>
                            </div>
                            <div
                              style={{
                                display: "inline-block",
                                float: "right",
                              }}
                            >
                              <DeleteOutlined
                                style={{
                                  color: "#1890FF",
                                  fontSize: 14.6,
                                }}
                              />
                            </div>
                            <div style={{ clear: "both" }}></div>
                          </div>
                        }
                        cover={
                          <div>
                            <iframe
                              ref={ref => {
                                iframeRef.current[i] = ref
                              }}
                              key={refreshes[i]?.refresh}
                              width={
                                templates.filter(
                                  (template: { _id: string }) => {
                                    return (
                                      template._id === templateId
                                    );
                                  }
                                )[0].size.split("x")[0]
                              }
                              height={
                                templates.filter(
                                  (template: { _id: string }) => {
                                    return (
                                      template._id === templateId
                                    );
                                  }
                                )[0].size.split("x")[1]
                              }
                              src={`https://storage.googleapis.com/creative-templates/${
                                variants._id
                              }/${
                                templates.filter(
                                  (template: { _id: string }) => {
                                    return template._id === templateId;
                                  }
                                )[0].size +
                                "-" +
                                templates.filter(
                                  (template: { _id: string }) => {
                                    return template._id === templateId;
                                  }
                                )[0].name
                              }/index.html`}
                              style={{
                                border: 0
                              }}
                              onLoad={(e) => {
                                onLoad(e, i, variant.defaultValues)
                              }}
                            />
                          </div>
                        }
                        actions={[
                          <Timer />,
                          <EditOutlined
                            style={{ color: "#1890FF", fontSize: 10 }}
                          />,
                          <div style={{ position: "relative" }}>
                            <span
                              style={{
                                position: "absolute",
                                top: -5.7,
                                right: 12.7,
                                borderRadius: 50,
                                backgroundColor: "#FF4D4F",
                                color: "#fff",
                                fontWeight: "400",
                                fontSize: 12,
                                width: 21.8,
                                height: 18,
                              }}
                            >
                              11
                            </span>
                            <MessageOutlined
                              style={{
                                color: "#1890FF",
                                fontSize: 10,
                              }}
                            />
                          </div>,
                        ]}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            height: 34.6,
                          }}
                        >
                          <DivStyled style={switchStyle(i)}>
                            <Space.Compact
                              block
                              style={{
                                lineHeight: 0.8,
                                zIndex: 1,
                                position: "absolute",
                                alignItems: "center",
                              }}
                            >
                              <CheckOutlined
                                style={switchCheckIconStyle(i)}
                              />
                              <span>&nbsp;</span>
                              <CloseOutlined
                                style={switchClosedIconStyle(i)}
                              />
                            </Space.Compact>
                            {["check", "disable", "close"].map((val) => {
                              return (
                                <span>
                                  <ClickableLabel
                                    onChange={() => handleChange(i, val)}
                                  />
                                </span>
                              );
                            })}
                            <SpanStyled style={selectionStyle(i)} />
                          </DivStyled>
                          <div>
                            {
                              isPause[i]?.isPause ? 
                                <PlayCircleTwoTone
                                  twoToneColor="#1890FF"
                                  style={{
                                    fontSize: 18,
                                    position: "relative",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                  }}
                                  onClick={() => {
                                    let data = "play"
                                    let dataIsPause = [...isPause];
                                    dataIsPause[i]["isPause"] = data !== 'play';
                                    setPause(dataIsPause);
                                    iframeRef.current[i].contentWindow.postMessage(
                                      {
                                        data,
                                        type: "setDefaultValues",
                                      },
                                      iframeRef.current[i].src
                                    );
                                  }}
                                /> : <PauseCircleTwoTone
                                  twoToneColor="#1890FF"
                                    style={{
                                      fontSize: 18,
                                      position: "relative",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                    onClick={() => {
                                      let data = "pause"
                                      let dataIsPause = [...isPause];
                                      dataIsPause[i]["isPause"] = data !== 'play';
                                      setPause(dataIsPause);
                                      iframeRef.current[i].contentWindow.postMessage(
                                        {
                                          data,
                                          type: "setDefaultValues",
                                        },
                                        iframeRef.current[i].src
                                      );
                                      iframeRef.current[i].src;
                                    }}
                                />
                            }
                          </div>
                          <div>
                            <RedoOutlined
                              style={{
                                color: "#1890FF",
                                fontSize: 18,
                                position: "relative",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                              onClick={() => {
                                const newRefreshes = refreshes.map((variantRefresh, n) => {
                                  if (n === i) {
                                    return { ...variantRefresh, refresh: variantRefresh.refresh + 1 };
                                  } else {
                                    return variantRefresh;
                                  }
                                });
                                setRefreshes(newRefreshes);
                              }}
                            />
                          </div>
                        </div>
                      </CardStyled>
                    </Col>
                  )
                )}
            </Row>
          </ContentStyled>
        </>
      </Layout>
    </Layout>
  );
};

export default ConceptTemplateVersionLayout;
