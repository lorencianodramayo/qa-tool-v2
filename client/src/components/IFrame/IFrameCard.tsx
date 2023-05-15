//@ts-nocheck
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
import Timer from "../Timer";
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
interface IFrameCardProps {
variant: any;  
i: number;
//    
//   variant: any;
//   i: number;
//   templates: any;
//   templateId: string;
//   variants: any;
}
const IFrameCard = (
    { 
        variant,
        i,
        //
        // variant, 
        // i, 
        // templates, 
        // templateId,
        // variants,
    }: IFrameCardProps
    ) => {
    const iframeRefs = useRef<HTMLIFrameElement[]>([]);      
    const [refreshes, setRefreshes] = useState<{ refresh: number }[]>([]);
    const [switches, setSwitches] = useState<{ option: string }[]>([]);
    const [isPause, setPause] = useState<{ isPause: boolean }[]>([]);
    const [isDone, setDone] = useState<{ isDone: boolean }[]>([]);
    const [timers, setTimers] = useState<{ startTime: number; isPlaying: boolean }[]>([]);
    const { 
        isTemplatesVersionsSuccess, 
        templatesVersions
    } = useSelector(
        (state: any) => state.templateVersion
    );
    useEffect(() => {
        let refreshes = [];
        let isPause = [];
        variant.variants.map(variant => {
            refreshes.push({
                refresh: 0
            });
            isPause.push({
                isPause: false
            });
            isDone.push({
                isDone: false
            });
        });
        setRefreshes(refreshes);
        setPause(isPause);
        setDone(isDone);
    }, []);
    const onLoad = (e, data) => {
        e.preventDefault();
        window.addEventListener("message", (event) => {
            const iframeIndex = iframeRefs.current.findIndex((ref) => ref?.contentWindow === event.source);
            if (iframeIndex >= 0 && event.data.type === 'SCREENSHOT_STOP') {
                let dataIsDone = [...isDone];
                dataIsDone[iframeIndex]["isDone"] = true;
                setDone(dataIsDone);
            }
        }, false);
        e.target.contentWindow.postMessage(
            {
                data,
                type: 'setDefaultValues'
            },
            e.target.src
        );
    };
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
                            {variant.variants[i].variantName}
                        </SpaceCompactCardHeaderTitleStyled>
                    </div>
                    <div
                        style={{
                            display: "inline-block",
                            float: "right",
                        }}
                    >
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
                        style={{ border: 'unset' }}   
                        id="my-iframe"     
                        ref={ref => (iframeRefs.current[i] = ref)}
                        key={refreshes[i]?.refresh}
                        width={parseInt(variant.size.split("x")[0]) + 4}
                        height={parseInt(variant.size.split("x")[1]) + 4}
                        src={`https://storage.googleapis.com/creative-templates/${
                        variant._id
                        }/${
                        variant.size +
                        "-" +
                        variant.templateName
                        }/index.html`}
                        onLoad={(e) => {
                            onLoad(e, variant.variants[i].defaultValues);
                        }}
                    />
                </div>
            }>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: 34.6,
                }}
            >
                <div style={{
                    width: 26,
                }}></div> 
                <div>
                    {
                        !isDone[i]?.isDone 
                            ? 
                                isPause[i]?.isPause 
                                    ? 
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
                                        /> 
                                    :   <PauseCircleTwoTone
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
                            : <></>
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
                        let dataIsDone = [...isDone];
                        dataIsDone[i]["isDone"] = false;
                        setRefreshes(newRefreshes);
                        setPause(dataIsPause);
                        setDone(dataIsDone);
                    }}
                />
                </div>
            </div>
        </CardStyled>
    );
}

export default IFrameCard;