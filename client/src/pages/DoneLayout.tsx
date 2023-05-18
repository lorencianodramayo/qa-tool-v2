// @ts-nocheck
import styled from "styled-components";
import { Button, Divider, Input, InputNumber, Spin, Layout, Space, notification } from "antd";
import { useEffect, useState } from "react";
import {
  CheckOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  CloseOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  postTemplateVersion,
  postSharedVariants,
  postTemplateVersionCloud,
} from "../features/templateVersion/templateVersionSlice";
import { useDispatch, useSelector } from "react-redux";
const LayoutStyled = styled(Layout)`
  width: 71.7em;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  display: flex;
  background: #fff;

  position: absolute;
  margin: 58.7px auto 0 auto;
  left: 0;
  right: 0;
`;
const DivMenuStyled = styled.div`
  margin: 0 4px;
  float: left;
`;
const DivMenuItemStyled = styled.div`
  width: 100%;
  display: flex;
  padding: 2.5px 10px;
  align-items: center;
  margin-bottom: 4px;
  margin-top: 4px;
  :hover {
    background: #1890ff;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
  }
`;
const InputStyled = styled(Input)`
  border-color: #d9d9d9;
  :hover,
  :focus-visible {
    border-color: #d9d9d9;
  }
`;
const ButtonCaseStyled = styled(Button)`
  margin-right: 0.4px;
  &.ant-btn.ant-btn-lg {
    padding: 0;
    width: 27.2px;
    background-color: #fff;
    border-color: #000;
    font-weight: 600;
    font-size: 14px;
    height: 24px;
    border-radius: 5px;
  }
  .ant-btn-default:not(:disabled):hover,
  :focus,
  :hover,
  :focus-visible {
    background-color: #339af0 !important;
    color: #fff !important;
    outline: unset;
    border-color: #339af0 !important;
  }
`;
const InputNumberStyled = styled(InputNumber)`
  &.ant-input-number {
    border-color: #339af0;
    height: 24px;
    width: 84.6px;
    border-radius: 8px;
  }
  &.ant-input-number .ant-input-number-input {
    vertical-align: text-top;
    height: 18px;
    font-size: 14px;
    font-weight: 400;
    padding: 1.9px 10.6px;
  }
  &.ant-input-number .ant-input-number-handler-wrap {
    opacity: unset !important;
  }
  &.ant-input-number .ant-input-number-handler-wrap .ant-input-number-handler {
    border-left-color: #339af0;
    border-right-color: #339af0;
    border-top-color: #339af0;
  }
  &.ant-input-number
    .ant-input-number-handler-wrap
    .ant-input-number-handler
    .ant-input-number-handler-up-inner {
    font-size: 10px !important;
  }
  &.ant-input-number
    .ant-input-number-handler-wrap
    .ant-input-number-handler
    .ant-input-number-handler-down-inner {
    font-size: 10px !important;
  }
`;
const UploadStyled = styled(Upload)`
  margin-right: 51.6px;
  &.ant-upload-wrapper {
    position: relative;
  }
  &.ant-upload-wrapper .ant-upload-list {
    position: absolute;
    left: -555px;
    top: -12px;
    overflow-x: auto;
    display: flex;
    width: 554px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item-container {
    width: 96px;
    margin-right: 4px;
    transition: unset;
  }
  &.ant-upload-wrapper
    .ant-upload-list
    .ant-upload-list-item
    .ant-upload-list-item-name {
    font-size: 12px;
    font-weight: 400;
    color: #339af0;
    padding-left: 4px;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item .ant-upload-icon {
    display: none;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
    background: #fff;
    margin-top: 0;
    border: 1px solid #339af0;
    border-radius: 5px;
    height: 24px;
  }
  &.ant-upload-wrapper
    .ant-upload-list
    .ant-upload-list-item
    .ant-upload-list-item-actions
    .ant-upload-list-item-action {
    display: none;
  }
  Button {
    font-size: 12px;
    font-weight: 400;
    border-color: #d9d9d9;
    width: 84.8px;
    height: 24px;
    padding: 2.2px 13.5px !important;
    :hover,
    :active {
      border-color: #d9d9d9 !important;
      color: #000 !important;
    }
    :focus-visible,
    :focus {
      outline: unset !important;
      outline-offset: unset !important;
      transition: unset !important;
    }
  }
`;
const ButtonDoneStyled = styled(Button)`
  background-color: rgb(24, 144, 255);
  box-shadow: unset;
  &:active {
    background-color: rgb(24, 144, 255) !important;
  }
  &:focus {
    outline: unset;
  }
  &:hover {
    background-color: rgb(24, 144, 255) !important;
    border-color: rgb(24, 144, 255);
  }
`;
export default function DoneLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const templateName:string = location.state.templateName;
  const templates:any = location.state.templates;
  const [templateIndex, setTemplateIndex] = useState<number>(0);
  const {
    addTemplateVersion,
    isAddTemplateVersionSuccess,
    addSharedVariant,
    isAddTemplateVersionCloudSuccess,
    isAddTemplateVersionCloudError,
  } = useSelector((state: any) => state.templateVersion);
  const [loading, setLoading] = useState<boolean>(false);
  const [_templates, _setTemplates] = useState<any>([]);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (isAddTemplateVersionSuccess) {
      let templatesVersions = [];
      addTemplateVersion.templatesVersions.map((templatesVersion, i) => {
        let data = {
          creativeId: templatesVersion._id,
          templateUrl: _templates[i].url,
        }
        templatesVersions.push(data);
      });
      // dispatch(
      //   postSharedVariants({
      //     templateName: templateName,
      //     templatesVersions: addTemplateVersion.templatesVersions,
      //   })
      // );
      dispatch(
        postTemplateVersionCloud(templatesVersions)
      );
    }
  }, [
    isAddTemplateVersionSuccess, 
    addTemplateVersion,
  ]);
  useEffect(() => {
    if (isAddTemplateVersionCloudSuccess) {
      navigate("/concept_template_version", {
        state: { 
          templateName: templateName, 
          templates: templates,
          sharedVariants: addSharedVariant, 
        },
        replace: true,
      });
    }
    if (isAddTemplateVersionCloudError) {
      api["error"]({
        message: "Done",
        description: "Error Generating Templates, please try again!",
      });
      setLoading(false);
    }
  }, [
    isAddTemplateVersionCloudSuccess,
    isAddTemplateVersionCloudError
  ]);
  const activeStyle = {
    backgroundColor: "#1890ff",
    borderRadius: 5,
    color: "#fff",
  };
  const renderTemplateConfigurations = (template) => {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {template.dynamicElements.map((dynamicElement, i) => {
          const buttonCases = [
            {
              value: "Capitalize",
              label: "Aa",
            },
            { value: "Lowercase", label: "aa" },
            { value: "Uppercase", label: "AA" },
          ];
          if (
            dynamicElement.includes("Text") ||
            dynamicElement.includes("Headline") ||
            dynamicElement.includes("legal")
          )
            return (
              <Space
                key={i}
                direction="horizontal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 20.4,
                  marginLeft: 15,
                }}
              >
                <Space>
                  <Space
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 132,
                      color: "#000",
                      justifyContent: "flex-end",
                    }}
                  >
                    {dynamicElement}:
                  </Space>
                  <Space>
                    <InputStyled
                      style={{ width: 356 }}
                      placeholder={`${dynamicElement}`}
                      value={
                        template.defaultDynamicFieldsValues[dynamicElement]
                      }
                    />
                  </Space>
                </Space>
                <Space>
                  <Space>
                    {buttonCases.map((buttonCase) => (
                      <ButtonCaseStyled
                        style={
                          template.hasOwnProperty("dynamicElementsStyles")
                            ? template.dynamicElementsStyles.find((obj) => {
                                return obj[dynamicElement];
                              })
                              ? template.dynamicElementsStyles.find((obj) => {
                                  return obj[dynamicElement];
                                })[dynamicElement].case === buttonCase.value
                                ? {
                                    backgroundColor: "#339af0",
                                    color: "#fff",
                                    outline: "unset",
                                    borderColor: "#339af0",
                                  }
                                : {}
                              : {}
                            : {}
                        }
                        size="large"
                      >
                        {buttonCase.label}
                      </ButtonCaseStyled>
                    ))}
                  </Space>
                  <InputNumberStyled
                    style={{
                      marginRight: 51.6,
                    }}
                    controls={{
                      upIcon: (
                        <CaretUpOutlined
                          style={{ color: "#339AF0", fontSize: 10.8 }}
                        />
                      ),
                      downIcon: (
                        <CaretDownOutlined
                          style={{ color: "#339AF0", fontSize: 10.8 }}
                        />
                      ),
                    }}
                    bordered={true}
                    min={0}
                    max={textHeadingLegalMaxValue(
                      template.defaultDynamicFieldsValues[dynamicElement]
                    )}
                    value={textHeadingLegalMaxValue(
                      template.defaultDynamicFieldsValues[dynamicElement]
                    )}
                  />
                </Space>
              </Space>
            );
          else if (
            dynamicElement.includes("logo") ||
            dynamicElement.includes("Background") ||
            dynamicElement.includes("Image")
          )
            return (
              <Space
                key={i}
                direction="horizontal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 20.4,
                  marginLeft: 15,
                }}
              >
                <Space>
                  <Space
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 132,
                      color: "#000",
                      justifyContent: "flex-end",
                    }}
                  >
                    {dynamicElement}:
                  </Space>
                  <Space></Space>
                </Space>
                <Space.Compact block>
                  <UploadStyled
                    maxCount={1}
                    fileList={
                      template.hasOwnProperty("dynamicElementsStyles")
                        ? template.dynamicElementsStyles.find((obj) => {
                            return obj[dynamicElement];
                          })
                          ? template.dynamicElementsStyles.find((obj) => {
                              return obj[dynamicElement];
                            })[dynamicElement].files
                          : []
                        : []
                    }
                    beforeUpload={() => {
                      return false;
                    }}
                    {...props}
                  ></UploadStyled>
                </Space.Compact>
              </Space>
            );
        })}
      </Space>
    );
  };
  const textHeadingLegalMaxValue = (content) => {
    let html = content;
    let div = document.createElement("div");
    div.innerHTML = html;
    let textHeadingLegal = div.textContent || div.innerText || "";
    return textHeadingLegal.length;
  };
  const props: UploadProps = {
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <CloseOutlined style={{ color: "#339AF0", fontSize: 10 }} />,
    },
  };
  return (
    <>
      <LayoutStyled>
        {contextHolder}
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
        <Space
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 42.1,
            pointerEvents: loading ? 'none' : 'unset',
          }}
        >
          <Space
            style={{
              border: "1px solid #1890FF",
              backgroundColor: "#FFF",
              height: "27.6px",
              width: "27.6px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 6.6,
              color: "#1890FF",
            }}
          >
            <CheckOutlined />
          </Space>
          <Space
            style={{
              color: "rgba(0, 0, 0, 0.85)",
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Configure
          </Space>
          <Divider
            type="horizontal"
            style={{
              width: "118.4px",
              margin: "0 14px 0 14px",
              minWidth: "unset",
              backgroundColor: "#F0F0F0",
            }}
          />
          <Space
            style={{
              border: "1px solid #1890FF",
              backgroundColor: "#FFF",
              height: "27.6px",
              width: "27.6px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 6.6,
              color: "#1890FF",
            }}
          >
            <CheckOutlined />
          </Space>
          <Space
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Generate
          </Space>
          <Divider
            type="horizontal"
            style={{
              width: "118.4px",
              margin: "0 14px 0 14px",
              minWidth: "unset",
              backgroundColor: "#F0F0F0",
            }}
          />
          <Space
            style={{
              backgroundColor: "#1890FF",
              height: "27.6px",
              width: "27.6px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              marginRight: 6.6,
            }}
          >
            3
          </Space>
          <Space
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Done
          </Space>
        </Space>
        <div
          style={{
            marginTop: 42.4,
            color: "#000",
            marginBottom: 42.4,
            pointerEvents: loading ? 'none' : 'unset',
          }}
        >
          <DivMenuStyled style={{ width: "20%" }}>
            {templates.map((template, i) => (
              <DivMenuItemStyled
                key={i}
                onClick={() => setTemplateIndex(i)}
                style={templateIndex === i ? activeStyle : {}}
              >
                <ProfileFilled style={{ marginRight: 4, fontSize: "18px" }} />
                {template.size} - {template.name}
              </DivMenuItemStyled>
            ))}
          </DivMenuStyled>
          <div
            style={{
              float: "left",
              width: "76%",
              borderLeft: "1px solid #F0F0F0",
            }}
          >
            {renderTemplateConfigurations(templates[templateIndex])}
          </div>
          <Space style={{ width: "100%", justifyContent: "right" }}>
            <Space style={{ margin: "10px 20px 0 0" }}>
              <ButtonDoneStyled
                type="primary"
                onClick={() => {
                  let _templatesVersions = [];
                  let __templates = [];
                  templates.map((template) => {
                    let templateVariants = [];
                    if (template.hasOwnProperty("possibleValues")) {
                      // let possibleValues = {
                      //   trigger: ["4 Frames", "3 Frames", "2 Frames"],
                      //   trigger2: [
                      //     "logo",
                      //     "sublogo",
                      //     // , "logo logo"
                      //   ],
                      //   customValue: [
                      //     "with logo1",
                      //     "without logo1",
                      //     // "with logo1 logo1",
                      //   ],
                      //   customValue1: [
                      //     "with logo2",
                      //     "without logo2",
                      //     // "with logo2 logo2",
                      //   ],
                      //   customValue2: [
                      //     "with logo3",
                      //     "without logo3",
                      //     // "with logo3 logo3",
                      //   ],
                      // };
                      let possibleValues = template.possibleValues;
                      let possibleValuesKeys = Object.keys(possibleValues);
                      let possibleValuesRowLength = [];
                      possibleValuesKeys.map((key, i) => {
                        if (i === 1)
                          if (i < possibleValuesKeys.length - 1)
                            possibleValuesRowLength.push(
                              possibleValues[key].length
                            );
                      });
                      if (possibleValuesKeys.length > 2) {
                        let g = 0;
                        while (g < 2) {
                          let t = 0;
                          while (
                            t < possibleValues[possibleValuesKeys[0]].length
                          ) {
                            let i = 0;
                            while (i < Math.max(...possibleValuesRowLength)) {
                              let n = 1;
                              let variants_1 =
                                g === 1
                                  ? "MIN-" +
                                    possibleValues[possibleValuesKeys[0]][t]
                                  : "MAX-" +
                                    possibleValues[possibleValuesKeys[0]][t];
                              while (n < possibleValuesKeys.length - 1) {
                                if (
                                  possibleValues[possibleValuesKeys[n]][i] !==
                                  undefined
                                ) {
                                  variants_1 +=
                                    "-" +
                                    possibleValues[possibleValuesKeys[n]][i];
                                }
                                n++;
                                if (n === possibleValuesKeys.length - 1) {
                                  let e = 0;
                                  while (
                                    e <
                                    possibleValues[
                                      possibleValuesKeys[
                                        possibleValuesKeys.length - 1
                                      ]
                                    ].length
                                  ) {
                                    let variants_2 = "";
                                    variants_2 +=
                                      variants_1 +
                                      "-" +
                                      possibleValues[possibleValuesKeys[n]][e];
                                    if (variants_2.includes("MIN")) {
                                      template.defaultDynamicFieldsValues;
                                      let defaultValues = {};
                                      for (const [key, value] of Object.entries(
                                        template.defaultDynamicFieldsValues
                                      )) {
                                        if (
                                          key.toLowerCase().includes("text") ||
                                          key
                                            .toLowerCase()
                                            .includes("headline") ||
                                          key.toLowerCase().includes("legal")
                                        ) {
                                          let html = `${value}`;
                                          let div = document.createElement("div");
                                          div.innerHTML = html;
                                          let textLegalHeading =
                                            div.textContent ||
                                            div.innerText ||
                                            "";
                                          defaultValues[key] =
                                            textLegalHeading.slice(
                                              0,
                                              Math.round(
                                                textLegalHeading.length / 2
                                              )
                                            );
                                        } else defaultValues[key] = value;
                                      }
                                      templateVariants.push({
                                        variantName: variants_2,
                                        size: template.size,
                                        templateName: template.name,
                                        defaultValues: {
                                          ...defaultValues,
                                          trigger:
                                            possibleValues[possibleValuesKeys[0]][
                                              t
                                            ],
                                        },
                                      });
                                    } else
                                      templateVariants.push({
                                        variantName: variants_2,
                                        size: template.size,
                                        templateName: template.name,
                                        defaultValues: {
                                          ...template.defaultDynamicFieldsValues,
                                          trigger:
                                            possibleValues[possibleValuesKeys[0]][
                                              t
                                            ],
                                        },
                                      });
                                    e++;
                                  }
                                }
                              }
                              i++;
                            }
                            t++;
                          }
                          g++;
                        }
                      } else {
                        let g = 0;
                        while (g < 2) {
                          let t = 0;
                          while (
                            t <
                            possibleValues[
                              possibleValuesKeys[possibleValuesKeys.length - 1]
                            ].length
                          ) {
                            let variants_1 = "";
                            if (possibleValuesKeys.length > 1) {
                              let i = 0;
                              variants_1 +=
                                g === 1
                                  ? "MIN-" +
                                    possibleValues[possibleValuesKeys[0]][t]
                                  : "MAX-" +
                                    possibleValues[possibleValuesKeys[0]][t];
                              while (
                                i <
                                possibleValues[
                                  possibleValuesKeys[
                                    possibleValuesKeys.length - 1
                                  ]
                                ].length
                              ) {
                                let variants_2 = "";
                                variants_2 +=
                                  variants_1 +
                                  "-" +
                                  possibleValues[
                                    possibleValuesKeys[
                                      possibleValuesKeys.length - 1
                                    ]
                                  ][i];
                                // templateVariants.push({
                                //   variantName: variants_2,
                                //   size: template.size,
                                //   templateName: template.name,
                                //   defaultValues: {
                                //     ...template.defaultDynamicFieldsValues,
                                //     trigger:
                                //       possibleValues[possibleValuesKeys[0]][t],
                                //   },
                                // });
                                if (variants_2.includes("MIN")) {
                                  template.defaultDynamicFieldsValues;
                                  let defaultValues = {};
                                  for (const [key, value] of Object.entries(
                                    template.defaultDynamicFieldsValues
                                  )) {
                                    if (
                                      key.toLowerCase().includes("text") ||
                                      key.toLowerCase().includes("headline") ||
                                      key.toLowerCase().includes("legal")
                                    ) {
                                      let html = `${value}`;
                                      let div = document.createElement("div");
                                      div.innerHTML = html;
                                      let textLegalHeading =
                                        div.textContent || div.innerText || "";
                                      defaultValues[key] = textLegalHeading.slice(
                                        0,
                                        Math.round(textLegalHeading.length / 2)
                                      );
                                    } else defaultValues[key] = value;
                                  }
                                  templateVariants.push({
                                    variantName: variants_2,
                                    size: template.size,
                                    templateName: template.name,
                                    defaultValues: {
                                      ...defaultValues,
                                      trigger:
                                        possibleValues[possibleValuesKeys[0]][t],
                                    },
                                  });
                                } else
                                  templateVariants.push({
                                    variantName: variants_2,
                                    size: template.size,
                                    templateName: template.name,
                                    defaultValues: {
                                      ...template.defaultDynamicFieldsValues,
                                      trigger:
                                        possibleValues[possibleValuesKeys[0]][t],
                                    },
                                  });
                                i++;
                              }
                            } else {
                              variants_1 +=
                                g === 1
                                  ? "MIN-" +
                                    possibleValues[possibleValuesKeys[0]][t]
                                  : "MAX-" +
                                    possibleValues[possibleValuesKeys[0]][t];
                              // templateVariants.push({
                              //   variantName: variants_1,
                              //   size: template.size,
                              //   templateName: template.name,
                              //   defaultValues: {
                              //     ...template.defaultDynamicFieldsValues,
                              //     trigger:
                              //       possibleValues[possibleValuesKeys[0]][t],
                              //   },
                              // });
                              if (variants_1.includes("MIN")) {
                                template.defaultDynamicFieldsValues;
                                let defaultValues = {};
                                for (const [key, value] of Object.entries(
                                  template.defaultDynamicFieldsValues
                                )) {
                                  if (
                                    key.toLowerCase().includes("text") ||
                                    key.toLowerCase().includes("headline") ||
                                    key.toLowerCase().includes("legal")
                                  ) {
                                    let html = `${value}`;
                                    let div = document.createElement("div");
                                    div.innerHTML = html;
                                    let textLegalHeading =
                                      div.textContent || div.innerText || "";
                                    defaultValues[key] = textLegalHeading.slice(
                                      0,
                                      Math.round(textLegalHeading.length / 2)
                                    );
                                  } else defaultValues[key] = value;
                                }
                                templateVariants.push({
                                  variantName: variants_1,
                                  size: template.size,
                                  templateName: template.name,
                                  defaultValues: {
                                    ...defaultValues,
                                    trigger:
                                      possibleValues[possibleValuesKeys[0]][t],
                                  },
                                });
                              } else
                                templateVariants.push({
                                  variantName: variants_1,
                                  size: template.size,
                                  templateName: template.name,
                                  defaultValues: {
                                    ...template.defaultDynamicFieldsValues,
                                    trigger:
                                      possibleValues[possibleValuesKeys[0]][t],
                                  },
                                });
                            }
                            t++;
                          }
                          g++;
                        }
                      }
                      let templatesVersions = {
                        templateId: template._id,
                        variants: templateVariants,
                      };
                      _templatesVersions.push(templatesVersions);
                      __templates.push(template);
                    }
                  });
                  setLoading(!loading);
                  dispatch(postTemplateVersion(_templatesVersions));
                  _setTemplates(__templates);
                }}
              >
                Done
              </ButtonDoneStyled>
            </Space>
          </Space>
        </div>
      </LayoutStyled>
    </>
  );
}
