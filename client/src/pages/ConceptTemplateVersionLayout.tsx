import React, { useEffect, useRef, useState } from "react";
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
import { Badge, Card, Col, Menu, Row, Space, Typography } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
const { Content, Sider } = Layout;
import { getTemplatesVersions } from "../features/templateVersion/templateVersionSlice";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Collapse } from "antd";
import Timer from "../components/Timer";
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
const MenuStyled = styled(Menu)`
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
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
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
const ConceptTemplateVersionLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState(location.state.templates);
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const [variants, setVariants] = useState<any>([]);
  const [selected, setSelected] = useState<{ option: string }[]>([]);
  const { templatesVersions } = useSelector(
    (state: any) => state.templateVersion
  );
  const [templateId, setTemplateId] = useState<string>("");
  const [play, setPlay] = useState<boolean>(false);
  const [variantPlay, setVarianPlay] = useState<any>({});
  const [refresh, setRefresh] = useState<number>(0);
  const [isPause, setPause] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const items: MenuItem[] = [
    getItem(
      <Space>Pame Brilliance</Space>,
      "sub2",
      <PlaySquareOutlined />,
      templates.map(
        (template: {
          size: string;
          name: string;
          _id: React.Key | null | undefined;
        }) => getItem(template.size + "-" + template.name, template._id)
      )
    ),
    getItem(<Space>Add New</Space>, "", <PlusOutlined />),
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key !== "") {
      setTemplateId(e.key);
      setVariants(
        templatesVersions.filter(
          (templateVersion: { templateId: string }) =>
            templateVersion.templateId === e.key
        )[0]
      );
      setPlay(false);
    }
  };
  useEffect(() => {
    // @ts-ignore
    dispatch(getTemplatesVersions());
  }, [dispatch]);
  useEffect(() => {
    if (variants !== undefined) {
      let newOption: { option: string }[] = [];
      variants.variants?.forEach(() => {
        newOption.push({ option: "check" });
      });
      setSelected(newOption);
    }
  }, [variants]);
  const handleChange = (i: number, val: string) => {
    let data = [...selected];
    data[i]["option"] = val;
    setSelected(data);
  };
  const handleClickPlay = (i: number, variants: any) => {
    setVarianPlay({
      variantIndex: i,
      variants: variants,
    });
    setPlay(!play);
  };
  const switchStyle = (i: number) => {
    return {
      backgroundColor: `${
        selected[i]?.option === "check"
          ? "#F22076"
          : selected[i]?.option === "disable"
          ? "#BFBFBF"
          : selected[i]?.option === "close"
          ? "#29125F"
          : "unset"
      }`,
    };
  };
  const switchCheckIconStyle = (i: number) => {
    return {
      color: `${
        selected[i]?.option === "close"
          ? "#fff"
          : selected[i]?.option === "check"
          ? "#F22076"
          : selected[i]?.option === "disable"
          ? "#BFBFBF"
          : "unset"
      }`,
      marginLeft: selected[i]?.option === "close" ? 4.8 : 0,
      fontSize: 8.8,
    };
  };
  const switchClosedIconStyle = (i: number) => {
    return {
      color: `${
        selected[i]?.option === "close"
          ? "#29125F"
          : selected[i]?.option === "check"
          ? "#fff"
          : selected[i]?.option === "disable"
          ? "#BFBFBF"
          : "unset"
      }`,
      marginLeft: selected[i]?.option === "check" ? 0.4 : 0,
      fontSize: 8.8,
    };
  };
  const selectionStyle = (i: number) => {
    return {
      top: 1.2,
      left:
        selected[i]?.option === "check"
          ? 2
          : selected[i]?.option === "disable"
          ? 9
          : selected[i]?.option === "close"
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
  const onLoad = (e: any, data: any) => {
    e.preventDefault();
    window.addEventListener(
      "message",
      (event) => {
        switch (event?.data?.type) {
          case "SCREENSHOT_START":
            console.log("DEBUG SCREENSHOT_START");
            break;
          case "SCREENSHOT":
            console.log("DEBUG SCREENSHOT");
            break;
          case "SCREENSHOT_STOP":
            console.log("DEBUG SCREENSHOT_STOP");
            break;
          default:
            console.log("DEBUG default", event?.data?.type);
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
      console.log("");
    });
  };
  return (
    <Layout style={{ height: "calc(100vh - 64px)" }}>
      <SiderStyled
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   // console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   // console.log(collapsed, type);
        // }}
      >
        <MenuStyled
          theme={theme}
          mode={mode}
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={onClick}
        />
      </SiderStyled>
      {templateId !== "" ? (
        <Layout>
          <Space
            direction="vertical"
            size={0}
            style={{ backgroundColor: "#fff" }}
          >
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
                // (play ? (
                //   <></>
                // ) : (
                  <>
                    <Space
                      style={{
                        float: "right",
                        color: "#000",
                      }}
                      size={0}
                    >
                      <Space
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
                      </Space>
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
                // ))
                }
            </div>
          </Space>
          {play ? (
            <AnimatePresence>
              {play && (
                <motion.aside
                  initial={{ width: 0 }}
                  animate={{
                    width: "100%",
                  }}
                  exit={{
                    width: 0,
                    transition: { delay: 0.7, duration: 0.3 },
                  }}
                >
                  <motion.div
                    style={{
                      color: "#000",
                      backgroundColor: "#fff",
                      height: "calc(100vh - 154px)",
                    }}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={{
                      closed: {
                        transition: {
                          staggerChildren: 0.2,
                          staggerDirection: -1,
                        },
                      },
                      open: {
                        transition: {
                          staggerChildren: 0.2,
                          staggerDirection: 1,
                        },
                      },
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        overflow: "scroll",
                      }}
                    >
                      <div style={{
                        borderRadius: "8px 8px 0 0",
                        background: "linear-gradient( 90.03deg, rgb(242,32,118) 0.03%, rgb(41,18,95) 100.05% )",
                        display: "flex",
                        justifyContent: "center",
                        margin: "0px 20px 24px"
                      }}>
                        <Space style={{color: "#FFF"}}>
                          {variantPlay.variants.variants[variantPlay.variantIndex].variantName}
                        </Space>
                      </div>
                      <Space
                        style={{
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <iframe
                          ref={iframeRef}
                          key={refresh}
                          width={variantPlay.variants.variants[variantPlay.variantIndex].size.split("x")[0]}
                          height={variantPlay.variants.variants[variantPlay.variantIndex].size.split("x")[1]}
                          src={`https://storage.googleapis.com/creative-templates/${variantPlay.variants._id}/${variantPlay.variants.variants[variantPlay.variantIndex].size}-${variantPlay.variants.variants[variantPlay.variantIndex]?.templateName}/index.html`}
                          // title={name}
                          onLoad={(e) =>
                            onLoad(e, variantPlay.variants.variants[variantPlay.variantIndex].defaultValues)
                          }
                        />
                      </Space>
                      <Space.Compact
                        block
                        style={{
                          margin: "20px 0",
                          justifyContent: "center",
                        }}
                      >
                        <Space
                        >
                          <PlayCircleFilled style={{
                            color: "rgb(242,32,118)",
                            fontSize: 24
                          }} onClick={() => {
                            let data = "play";
                              const iframe = iframeRef.current;
                              if (iframe) {
                                 iframe?.contentWindow?.postMessage(
                                  {
                                    data,
                                    type: "setDefaultValues",
                                  },
                                  iframe.src
                                );
                              }
                          }} />
                          <PauseCircleFilled style={{
                            color: "rgb(242,32,118)",
                            fontSize: 24
                          }} onClick={() => {
                              let data = "pause";
                              const iframe = iframeRef.current;
                              if (iframe) {
                                 iframe?.contentWindow?.postMessage(
                                  {
                                    data,
                                    type: "setDefaultValues",
                                  },
                                  iframe.src
                                );
                              }
                          }} />
                          <ReloadOutlined style={{
                            color: "rgb(242,32,118)",
                            fontSize: 24
                          }} onClick={() => setRefresh(refresh + 1)} />
                        </Space>
                      </Space.Compact>
                      <div style={{ margin: "0 20px", marginBottom: 24 }}>
                        <CollapseStyled
                          bordered={false}
                          defaultActiveKey={["1"]}
                          expandIcon={({ isActive }) => (
                            <>
                              <CaretRightOutlined rotate={isActive ? 90 : 0} />
                              <FileImageFilled
                                style={{ fontSize: 30, marginLeft: 10 }}
                              />
                            </>
                          )}
                        >
                          <Panel
                            header={
                              <Typography.Text
                                strong={true}
                                style={{ fontSize: 16 }}
                              >
                                Preview
                              </Typography.Text>
                            }
                            key="1"
                          >
                            <Collapse
                              bordered={false}
                              defaultActiveKey={["1"]}
                              expandIcon={({ isActive }) => (
                                <CaretRightOutlined
                                  rotate={isActive ? 90 : 0}
                                />
                              )}
                            >
                              <Panel
                                header={
                                  <Typography.Text
                                    strong={true}
                                    style={{ fontSize: 16 }}
                                  >
                                    {
                                      Object.keys(
                                        variantPlay.variants.variants[variantPlay.variantIndex].defaultValues
                                      ).length
                                    }{" "}
                                    Dynamic elements
                                  </Typography.Text>
                                }
                                key="1"
                              >
                                <>
                                  {Object.entries(
                                    variantPlay.variants.variants[variantPlay.variantIndex].defaultValues
                                  )
                                    .sort()
                                    .map(([key, value]: any) => (
                                      <Space.Compact block>
                                        <Space>
                                          {key.includes("logo") ||
                                          key.includes("Background") ||
                                          key.includes("Image") ||
                                          key.includes("roundel") ||
                                          key.includes("packshot") ? (
                                            <FileImageOutlined
                                              style={{ fontSize: 16 }}
                                            />
                                          ) : key.includes("Headline") ||
                                            key.includes("Text") ||
                                            key.includes("legal") ||
                                            key.includes("Subheadline") ? (
                                            <FontSizeOutlined
                                              style={{ fontSize: 16 }}
                                            />
                                          ) : key.includes("Color") ||
                                            key.includes("Element") ? (
                                            <BgColorsOutlined
                                              style={{ fontSize: 16 }}
                                            />
                                          ) : (
                                            <></>
                                          )}
                                          <Typography.Text
                                            strong={true}
                                            style={{ fontSize: 16 }}
                                          >
                                            {key}
                                          </Typography.Text>
                                        </Space>
                                        <Space>: {value}</Space>
                                      </Space.Compact>
                                    ))}
                                </>
                              </Panel>
                            </Collapse>
                          </Panel>
                        </CollapseStyled>
                      </div>
                    </div>
                  </motion.div>
                </motion.aside>
              )}
            </AnimatePresence>
          ) : (
            variants && (
              <>
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
                        count={40}
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
                <ContentStyled
                  style={{
                    margin: "24px 16px",
                    overflowY: "scroll",
                  }}
                >
                  <Row gutter={[15.9, 22.4]} style={{ width: "100%" }}>
                    {variants &&
                      variants.variants?.map(
                        (variant: { variantName: string }, i: number) => (
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
                                      width: 218,
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
                                // <div
                                //   style={{
                                //     height: 210,
                                //     overflow: "hidden",
                                //     position: "relative",
                                //     background:
                                //       "linear-gradient(90.03deg, rgb(242, 32, 118) 0.03%, rgb(41, 18, 95) 100.05%)",
                                //   }}
                                // >
                                //   <iframe
                                //     width={
                                //       templates
                                //         .filter((template: { _id: string }) => {
                                //           return template._id === templateId;
                                //         })[0]
                                //         .size.split("x")[0] > 464
                                //         ? 464
                                //         : templates
                                //             .filter(
                                //               (template: { _id: string }) => {
                                //                 return (
                                //                   template._id === templateId
                                //                 );
                                //               }
                                //             )[0]
                                //             .size.split("x")[0]
                                //     }
                                //     height={420}
                                //     src={`https://storage.googleapis.com/creative-templates/${
                                //       variants?._id
                                //     }/${
                                //       templates.filter(
                                //         (template: { _id: string }) => {
                                //           return template._id === templateId;
                                //         }
                                //       )[0].size +
                                //       "-" +
                                //       templates.filter(
                                //         (template: { _id: string }) => {
                                //           return template._id === templateId;
                                //         }
                                //       )[0].name
                                //     }/index.html`}
                                //     style={{
                                //       transform:
                                //         "scale(0.5) translate(-50%, -50%)",
                                //       position: "absolute",
                                //       top: "50%",
                                //       left: "50%",
                                //       transformOrigin: "0 0",
                                //     }}
                                //   />
                                // </div>
                                <div style={{
                                  height: 210,
                                  overflow: "hidden",
                                  background: "linear-gradient(90.03deg, rgb(242, 32, 118) 0.03%, rgb(41, 18, 95) 100.05%)",
                                  position: "relative",
                                }}>
                                  <iframe
                                    width={
                                      templates
                                        .filter((template: { _id: string }) => {
                                          return template._id === templateId;
                                        })[0]
                                        .size.split("x")[0] > 464
                                        ? 464
                                        : templates
                                            .filter(
                                              (template: { _id: string }) => {
                                                return (
                                                  template._id === templateId
                                                );
                                              }
                                            )[0]
                                            .size.split("x")[0]
                                    }
                                    height={
                                      templates
                                        .filter((template: { _id: string }) => {
                                          return template._id === templateId;
                                        })[0]
                                        .size.split("x")[0] > 464
                                        ? 464
                                        : templates
                                            .filter(
                                              (template: { _id: string }) => {
                                                return (
                                                  template._id === templateId
                                                );
                                              }
                                            )[0]
                                            .size.split("x")[1]
                                    }
                                    src={`https://storage.googleapis.com/creative-templates/${
                                      variants?._id
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
                                      transform:
                                        "scale(0.5) translate(-50%, -50%)",
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transformOrigin: "0 0",
                                    }}
                                  />
                                </div>
                              }
                              actions={[
                                // <Space
                                //   style={{
                                //     fontWeight: "400",
                                //     fontSize: 16,
                                //   }}
                                // >
                                  <Timer />,
                                // </Space>,
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
                                  <PlayCircleTwoTone
                                    twoToneColor="#1890FF"
                                    style={{
                                      fontSize: 18,
                                      position: "relative",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                    onClick={() => handleClickPlay(i, variants)}
                                  />
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
            )
          )}
        </Layout>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default ConceptTemplateVersionLayout;
