import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card, Space } from "antd";
import {
  EditOutlined,
  MessageOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  PlayCircleTwoTone,
  PauseCircleTwoTone,
  RedoOutlined,
} from "@ant-design/icons";
import Timer from "../../components/Timer";
import { useSelector } from "react-redux";
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
interface IFrameProps {
  variant: any;
  i: number;
  templates: any;
  templateId: string;
  variants: any;
}
const IFrameCard = (
    { 
        variant, 
        i, 
        templates, 
        templateId,
        variants,
    }: IFrameProps
    ) => {
    const iframeRefs = useRef<HTMLIFrameElement[]>([]);      
    const [refreshes, setRefreshes] = useState<{ refresh: number }[]>([]);
    const [switches, setSwitches] = useState<{ option: string }[]>([]);
    const [isPause, setPause] = useState<{ isPause: boolean }[]>([]);
    const [timers, setTimers] = useState<{ startTime: number; isPlaying: boolean }[]>([]);
    const { 
        isTemplatesVersionsSuccess, 
        templatesVersions
    } = useSelector(
        (state: any) => state.templateVersion
    );
    useEffect(() => {
        if (isTemplatesVersionsSuccess) {
            let switches = [];
            let refreshes = [];
            let isPause = [];
            let timers = [];
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
                isPause.push({
                    isPause: false
                });
                timers.push({
                     startTime: 0, 
                     isPlaying: false
                });
            });
            setSwitches(switches);
            setRefreshes(refreshes);
            setPause(isPause);
            setTimers(timers);
        }
    }, [
        templatesVersions,
        setPause,
        setTimers,
    ]);
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
    const handleChange = (i: number, val: string) => {
        let data = [...switches];
        data[i]["option"] = val;
        setSwitches(data);
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
    return (
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
                        {/* <DeleteOutlined
                            style={{
                                color: "#1890FF",
                                fontSize: 14.6,
                            }}
                        /> */}
                    </div>
                    <div style={{ clear: "both" }}></div>
                </div>
            }
            cover={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <iframe   
                        id="my-iframe"     
                        ref={ref => (iframeRefs.current[i] = ref)}           
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
                        onLoad={(e) => {
                            window.addEventListener(
                                "message",
                                (event) => {
                                    const iframeIndex = iframeRefs.current.findIndex((ref) => ref?.contentWindow === event.source);
                                    // if (iframeIndex >= 0 && event.data.type === 'SCREENSHOT_START') {
                                    //     setTimers((prevTimers) =>
                                    //         prevTimers.map((timer, i) => 
                                    //             i === iframeIndex ? { ...timer, isPlaying: true } : timer
                                    //         )
                                    //     );
                                    // }
                                    if (iframeIndex >= 0 && event.data.type === 'SCREENSHOT_STOP') {
                                        let dataIsPause = [...isPause];
                                        dataIsPause[iframeIndex]["isPause"] = true;
                                        setPause(dataIsPause);
                                        // setTimers((prevTimers) =>
                                        //     prevTimers.map((timer, i) =>
                                        //         i === iframeIndex ? { ...timer, isPlaying: false } : timer
                                        //     )
                                        // );
                                    }
                                },
                                false
                            );
                        }}
                        onError={(e) => console.log("zzzz", e)}
                    />
                </div>
            }
            // actions={[
            //     // <Timer 
            //     //     startTime={timers[i]?.startTime} 
            //     //     isPlaying={timers[i]?.isPlaying}
            //     // />,
            //     <EditOutlined
            //     style={{ color: "#1890FF", fontSize: 10 }}
            //     />,
            //     <div style={{ position: "relative" }}>
            //     <span
            //         style={{
            //             position: "absolute",
            //             top: -5.7,
            //             right: 12.7,
            //             borderRadius: 50,
            //             backgroundColor: "#FF4D4F",
            //             color: "#fff",
            //             fontWeight: "400",
            //             fontSize: 12,
            //             width: 21.8,
            //             height: 18,
            //         }}
            //     >
            //         11
            //     </span>
            //     <MessageOutlined
            //         style={{
            //             color: "#1890FF",
            //             fontSize: 10,
            //         }}
            //     />
            //     </div>,
            // ]}
            >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: 34.6,
                }}
            >
                {/* <DivStyled style={switchStyle(i)}>
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
                </DivStyled> */}
                <div style={{
                    width: 26,
                }}></div> 
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
                                iframeRefs.current[i].contentWindow.postMessage(
                                    {
                                    data,
                                    type: "setDefaultValues",
                                    },
                                    iframeRefs.current[i].src
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
                                iframeRefs.current[i].contentWindow.postMessage(
                                {
                                    data,
                                    type: "setDefaultValues",
                                },
                                iframeRefs.current[i].src
                                );
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
                        let dataIsPause = [...isPause];
                        dataIsPause[i]["isPause"] = false;
                        let dataTimers = [...timers];
                        dataTimers[i] = {
                            startTime: 0, 
                            isPlaying: false
                        };
                        setRefreshes(newRefreshes);
                        setPause(dataIsPause);
                        setTimers(dataTimers);
                    }}
                />
                </div>
            </div>
        </CardStyled>
    );
}

export default IFrameCard;