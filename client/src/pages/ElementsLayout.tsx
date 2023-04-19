import styled from "styled-components";
import {
  Button,
  Divider,
  InputNumber,
  Layout,
  Space,
  FloatButton,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import FloatLabel from "../components/FloatLabel/FloatLabel";
import { useEffect, useState } from "react";
import {
  CheckOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  UploadOutlined,
  CloseOutlined,
  ProfileFilled,
  TranslationOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, postLanguage } from "../features/language/languageSlice";
import apiService from "../api/apiService";
type LayoutType = Parameters<typeof Form>[0]["layout"];
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
    height: unset;
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
    left: -470px;
    top: 0;
    overflow-x: auto;
    display: flex;
    width: 482px;
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
    opacity: unset;
    background: #fff;
    border-width: 0;
    height: 0;
    width: 100%;
    border-radius: 5px;
    padding-right: 4.6px !important;
    padding-top: 0 !important;
    padding-bottom: 0px !important;
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
const FormItemStyled = styled(Form.Item)`
  .ant-input:hover,
  .ant-input:focus,
  .ant-input:active {
    z-index: unset;
    border-color: #d9d9d9;
    box-shadow: unset;
    border-color: #d9d9d9;
  }
`;
const FloatButtonStyled = styled(FloatButton)`
  &.ant-float-btn-primary:focus {
    outline: unset;
  }
  &.ant-float-btn-primary .ant-float-btn-body:hover {
    background: #1677ff;
  }
`;
const ButtonAddLanguageStyled = styled(Button)`
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
`;
const ButtonGenerateStyled = styled(Button)`
  &.ant-btn-primary:not(:disabled):hover {
    background: #1677ff;
  }
  &.ant-btn-primary:not(:disabled):focus {
    outline: none;
  }
  &.ant-btn:not(:disabled):focus-visible {
    outline: none;
  }
`;
export default function ElementsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { languages, isLanguagesSuccess, addLanguage, isAddLanguageSuccess } =
    useSelector((state: any) => state.language);
  const [languagesList, setLanguagesList] = useState<any>([]);
  const [templates, setTemplates] = useState(location.state.templates);
  const [templateIndex, setTemplateIndex] = useState<number>(0);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const formLayout: LayoutType = "inline";
  const [api, contextHolder] = notification.useNotification();
  const [replicates, setReplicates] = useState<any>([]);
  useEffect(() => {
    if (!isLanguagesSuccess) dispatch(getLanguages());
    let lang = [];
    languages?.map((language) => {
      lang.push({
        value: language.language,
        label: `${titleCase(language.language)}`,
      });
    });
    setLanguagesList(lang);
  }, [dispatch, languages, isLanguagesSuccess]);
  useEffect(() => {
    if (isAddLanguageSuccess) {
      dispatch(getLanguages());
      api["success"]({
        message: `${addLanguage.language.language
          .charAt(0)
          .toUpperCase()}${addLanguage.language.language
          ?.slice(1)
          .toLowerCase()} Language Added Sucessfully`,
        description: `${addLanguage.language.language
          .charAt(0)
          .toUpperCase()}${addLanguage.language.language
          ?.slice(1)
          .toLowerCase()} Language Added Sucessfully!`,
      });
    }
  }, [dispatch, addLanguage, isAddLanguageSuccess]);
  useEffect(() => {
    let replicate = [];
    replicate.push({
      value: 0,
      label: "All Template",
    });
    templates
      .filter((template, i) => {
        if (i !== templateIndex) return template;
      })
      .map((template) =>
        replicate.push({
          value: template._id,
          label: template.size + " - " + template.name,
        })
      );
    setReplicates(replicate);
  }, [templateIndex]);
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
                      onChange={(e) => {
                        let defaultDynamicFieldsValues = [];
                        const newDefaultDynamicFieldsValues = {
                          [dynamicElement]: e.target.value,
                        };
                        defaultDynamicFieldsValues = {
                          ...template.defaultDynamicFieldsValues,
                          ...newDefaultDynamicFieldsValues,
                        };
                        const newState = templates.map((template, i) => {
                          if (templateIndex === i) {
                            return {
                              ...template,
                              ...{
                                ["defaultDynamicFieldsValues"]:
                                  defaultDynamicFieldsValues,
                              },
                            };
                          }
                          return template;
                        });
                        setTemplates(newState);
                      }}
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
                        onClick={() => {
                          let dynamicElementsStyles = [];
                          let defaultDynamicFieldsValues = [];
                          if (
                            template.hasOwnProperty("dynamicElementsStyles")
                          ) {
                            let dynamicElementsStylesExists =
                              template.dynamicElementsStyles.filter(
                                (dynamicElementStyle) => {
                                  return dynamicElementStyle.hasOwnProperty(
                                    dynamicElement
                                  );
                                }
                              ).length > 0;
                            if (dynamicElementsStylesExists) {
                              const newDynamicElementsStylesState =
                                template.dynamicElementsStyles.map(
                                  (dynamicElementStyle) => {
                                    if (
                                      dynamicElementStyle.hasOwnProperty(
                                        dynamicElement
                                      )
                                    )
                                      return {
                                        ...dynamicElementStyle,
                                        [dynamicElement]: {
                                          case: buttonCase.value,
                                          number:
                                            dynamicElementStyle[dynamicElement]
                                              .number,
                                        },
                                      };
                                    return dynamicElementStyle;
                                  }
                                );
                              newDynamicElementsStylesState.map(
                                (newDynamicElementStyleState) =>
                                  dynamicElementsStyles.push(
                                    newDynamicElementStyleState
                                  )
                              );
                            } else
                              dynamicElementsStyles.push(
                                ...template.dynamicElementsStyles,
                                {
                                  [dynamicElement]: {
                                    case: buttonCase.value,
                                    number: 0,
                                  },
                                }
                              );
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: textHeadingLegalCase(
                                template.defaultDynamicFieldsValues[
                                  dynamicElement
                                ],
                                buttonCase.value
                              ),
                            };
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            };
                          } else {
                            dynamicElementsStyles.push({
                              [dynamicElement]: {
                                case: buttonCase.value,
                                number: 0,
                              },
                            });
                            const newDefaultDynamicFieldsValues = {
                              [dynamicElement]: textHeadingLegalCase(
                                template.defaultDynamicFieldsValues[
                                  dynamicElement
                                ],
                                buttonCase.value
                              ),
                            };
                            defaultDynamicFieldsValues = {
                              ...template.defaultDynamicFieldsValues,
                              ...newDefaultDynamicFieldsValues,
                            };
                          }
                          const newState = templates.map((template, i) => {
                            if (templateIndex === i) {
                              return {
                                ...template,
                                dynamicElementsStyles,
                                ...{
                                  ["defaultDynamicFieldsValues"]:
                                    defaultDynamicFieldsValues,
                                },
                              };
                            }
                            return template;
                          });
                          setTemplates(newState);
                        }}
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
                    onChange={() => {
                      let newTextLegalHeading = "";
                      let html =
                        template.defaultDynamicFieldsValues[dynamicElement];
                      let div = document.createElement("div");
                      div.innerHTML = html;
                      let text = div.textContent || div.innerText || "";
                      newTextLegalHeading = text.substring(0, text.length - 1);
                      let defaultDynamicFieldsValues =
                        templates[templateIndex].defaultDynamicFieldsValues;
                      const newDefaultDynamicFieldsValues = {
                        [dynamicElement]: newTextLegalHeading,
                      };
                      defaultDynamicFieldsValues = {
                        ...defaultDynamicFieldsValues,
                        ...newDefaultDynamicFieldsValues,
                      };
                      const newState = templates.map((template, i) => {
                        if (templateIndex === i) {
                          return {
                            ...template,
                            ...{
                              ["defaultDynamicFieldsValues"]:
                                defaultDynamicFieldsValues,
                            },
                          };
                        }
                        return template;
                      });
                      setTemplates(newState);
                    }}
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
                    onChange={(files) => {
                      let dynamicElementsStyles = [];
                      if (template.hasOwnProperty("dynamicElementsStyles")) {
                        let dynamicElementsStylesExists =
                          template.dynamicElementsStyles.filter(
                            (dynamicElementStyle) => {
                              return dynamicElementStyle.hasOwnProperty(
                                dynamicElement
                              );
                            }
                          ).length > 0;
                        if (dynamicElementsStylesExists) {
                          const newDynamicElementsStylesState =
                            template.dynamicElementsStyles.map(
                              (dynamicElementStyle) => {
                                if (
                                  dynamicElementStyle.hasOwnProperty(
                                    dynamicElement
                                  )
                                )
                                  return {
                                    ...dynamicElementStyle,
                                    [dynamicElement]: {
                                      files: files.fileList,
                                    },
                                  };
                                return dynamicElementStyle;
                              }
                            );
                          newDynamicElementsStylesState.map(
                            (newDynamicElementStyleState) =>
                              dynamicElementsStyles.push(
                                newDynamicElementStyleState
                              )
                          );
                        } else
                          dynamicElementsStyles.push(
                            ...template.dynamicElementsStyles,
                            {
                              [dynamicElement]: {
                                files: files.fileList,
                              },
                            }
                          );
                      } else
                        dynamicElementsStyles.push({
                          [dynamicElement]: {
                            files: files.fileList,
                          },
                        });
                      const newState = templates.map((template, i) => {
                        if (templateIndex === i) {
                          return { ...template, dynamicElementsStyles };
                        }
                        return template;
                      });
                      setTemplates(newState);
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </UploadStyled>
                </Space.Compact>
              </Space>
            );
        })}
      </Space>
    );
  };
  const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };
  const replaceBulk = (str, findArray, replaceArray) => {
    let i,
      regex = [],
      map = {};
    for (i = 0; i < findArray.length; i++) {
      regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, "\\$1"));
      map[findArray[i]] = replaceArray[i];
    }
    regex = regex.join("|");
    str = str.replace(new RegExp(regex, "g"), (matched) => {
      return map[matched];
    });
    return str;
  };
  const translateTextHeadlineLegal = async (language, textHeadlineLegal) => {
    let html = textHeadlineLegal;
    let div = document.createElement("div");
    div.innerHTML = html;
    let _textHeadlineLegal = div.textContent || div.innerText || "";
    let payload = {
      language: language,
      textHeadlineLegal: _textHeadlineLegal,
    };
    const response = await apiService.post("/translate", payload);
    return response.data;
  };
  const textHeadingLegalCase = (text, textCase) => {
    let textHeadingLegalCaseText = "";
    let html = `${text}`;
    let div = document.createElement("div");
    div.innerHTML = html;
    if (div.querySelectorAll("*").length > 0) {
      let findArrayOne = [],
        replaceArrayOne = [];
      Array.from(div.querySelectorAll("*")).map((tag, i) => {
        findArrayOne.push(tag.localName.toString());
        replaceArrayOne.push("");
      });
      let findArrayTwo = [],
        replaceArrayTwo = [];
      replaceBulk(
        replaceBulk(text, findArrayOne, replaceArrayOne),
        ["</>"],
        ["<>"]
      )
        .split("<>")
        .map((word, i) => {
          if (word !== "") {
            findArrayTwo.push(word);
            if (textCase === "Capitalize") {
              let tempText = word.toLowerCase().split(" ");
              for (let i = 0; i < tempText.length; i++) {
                if (tempText[i] !== "") {
                  let _bool = true,
                    n = 0,
                    c = "";
                  while (_bool) {
                    if (
                      /[`0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
                        tempText[i][n]
                      )
                    ) {
                      c += tempText[i].charAt(n);
                      n++;
                    } else {
                      tempText[i] =
                        c +
                        tempText[i][n].toUpperCase() +
                        tempText[i].slice(n + 1);
                      _bool = false;
                    }
                  }
                }
              }
              replaceArrayTwo.push(tempText.join(" "));
            } else if (textCase === "Lowercase")
              replaceArrayTwo.push(word.toLowerCase());
            else if (textCase === "Uppercase")
              replaceArrayTwo.push(word.toUpperCase());
            else replaceArrayTwo.push(word);
          }
        });
      textHeadingLegalCaseText = replaceBulk(
        text,
        findArrayTwo,
        replaceArrayTwo
      );
    } else {
      if (textCase === "Capitalize") {
        let tempText = text.toLowerCase().split(" ");
        for (let i = 0; i < tempText.length; i++) {
          if (tempText[i] !== "") {
            let _bool = true,
              n = 0,
              c = "";
            while (_bool) {
              if (
                /[`0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
                  tempText[i][n]
                )
              ) {
                c += tempText[i].charAt(n);
                n++;
              } else {
                tempText[i] =
                  c + tempText[i][n].toUpperCase() + tempText[i].slice(n + 1);
                _bool = false;
              }
            }
          }
        }
        textHeadingLegalCaseText = tempText.join(" ");
      } else if (textCase === "Lowercase")
        textHeadingLegalCaseText = text.toLowerCase();
      else if (textCase === "Uppercase")
        textHeadingLegalCaseText = text.toUpperCase();
      else textHeadingLegalCaseText = text;
    }
    return textHeadingLegalCaseText;
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
  const onFinish = (values) => {
    dispatch(postLanguage(values));
    form.resetFields();
    setShowLanguageModal(!showLanguageModal);
  };
  return (
    <LayoutStyled>
      {contextHolder}
      <FloatButtonStyled
        type="primary"
        icon={<TranslationOutlined />}
        tooltip={<Space>Languages</Space>}
        onClick={() => setShowLanguageModal(!showLanguageModal)}
      />
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 42.1,
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
          2
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
            height: "27.6px",
            width: "27.6px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(0, 0, 0, 0.25)",
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
      <div>
        <Space style={{ float: "right", marginRight: 44 }}>
          <FloatLabel
            style={{
              width: 157.3,
            }}
            label="Language"
            placeholder="Select a language"
            name="language"
            onChange={async (language) => {
              let defaultDynamicFieldsValues =
                templates[templateIndex].defaultDynamicFieldsValues;
              for (const [element, value] of Object.entries(
                templates[templateIndex].defaultDynamicFieldsValues
              )) {
                if (
                  element.includes("Text") ||
                  element.includes("Headline") ||
                  element.includes("legal")
                ) {
                  const { translate } = await translateTextHeadlineLegal(
                    language,
                    value
                  );
                  const newDefaultDynamicFieldsValues = {
                    [element]: translate,
                  };
                  defaultDynamicFieldsValues = {
                    ...defaultDynamicFieldsValues,
                    ...newDefaultDynamicFieldsValues,
                  };
                  const newState = templates.map((template, i) => {
                    if (templateIndex === i) {
                      return {
                        ...template,
                        ...{
                          ["defaultDynamicFieldsValues"]:
                            defaultDynamicFieldsValues,
                        },
                      };
                    }
                    return template;
                  });
                  setTemplates(newState);
                }
              }
            }}
            select={true}
            selectOptions={languagesList}
            showArrow={true}
          />
        </Space>
      </div>
      {!templates[templateIndex].replicated && (
        <div>
          <Space style={{ float: "right", marginRight: 44, marginTop: 11 }}>
            <FloatLabel
              style={{
                width: 157.3,
              }}
              label="Replicate"
              placeholder="Replicate To"
              name="replicate"
              select={true}
              selectOptions={replicates}
              showArrow={true}
              onChange={(value) => {
                let defaultDynamicFieldsValues =
                  templates[templateIndex].defaultDynamicFieldsValues;
                let dynamicElementsStyles =
                  templates[templateIndex].dynamicElementsStyles;
                let replicatedTemplates = [];
                if (value === 0) {
                  templates.map((template, i) => {
                    if (i !== templateIndex)
                      if (dynamicElementsStyles !== undefined)
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues:
                              defaultDynamicFieldsValues,
                            dynamicElementsStyles: dynamicElementsStyles,
                            replicated: true,
                          })
                        );
                      else
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues:
                              defaultDynamicFieldsValues,
                            replicated: true,
                          })
                        );
                    else replicatedTemplates.push(template);
                  });
                  setTemplates(replicatedTemplates);
                } else {
                  templates.map((template) => {
                    if (template._id === value)
                      if (dynamicElementsStyles !== undefined)
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues:
                              defaultDynamicFieldsValues,
                            dynamicElementsStyles: dynamicElementsStyles,
                            replicated: true,
                          })
                        );
                      else
                        replicatedTemplates.push(
                          Object.assign({}, template, {
                            defaultDynamicFieldsValues:
                              defaultDynamicFieldsValues,
                            replicated: true,
                          })
                        );
                    else replicatedTemplates.push(template);
                  });
                  setTemplates(replicatedTemplates);
                }
              }}
            />
          </Space>
        </div>
      )}
      <div
        style={{
          marginTop: 42.4,
          color: "#000",
          marginBottom: 42.4,
        }}
      >
        <DivMenuStyled>
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
        <Space
          style={{
            float: "left",
            width: "76%",
            borderLeft: "1px solid #F0F0F0",
          }}
        >
          {renderTemplateConfigurations(templates[templateIndex])}
        </Space>
        <Space style={{ width: "100%", justifyContent: "right" }}>
          <Space style={{ margin: "10px 20px 0 0" }}>
            <ButtonGenerateStyled
              type="primary"
              onClick={() => {
                navigate("/configure/generate/elements/done", {
                  state: { templates: templates },
                  replace: true,
                });
              }}
            >
              Generate
            </ButtonGenerateStyled>
          </Space>
        </Space>
      </div>
      <Modal
        title="Language Setting"
        open={showLanguageModal}
        mask={true}
        maskClosable={true}
        closable={false}
        footer={null}
        width={628}
        centered
        onOk={() => setShowLanguageModal(!showLanguageModal)}
        onCancel={() => setShowLanguageModal(!showLanguageModal)}
      >
        <Form layout={formLayout} form={form} onFinish={onFinish}>
          <FormItemStyled
            name="language"
            rules={[
              {
                required: true,
                message: "Please input language!",
              },
            ]}
          >
            <FloatLabel
              style={{ width: 150 }}
              label="Language"
              placeholder="Language"
              name="language"
              input={true}
            />
          </FormItemStyled>
          <FormItemStyled
            name="content"
            rules={[
              {
                required: true,
                message: "Please input content!",
              },
            ]}
          >
            <FloatLabel
              style={{ width: 350 }}
              label="Content"
              placeholder="Content"
              name="content"
              rows={6}
              textArea={true}
            />
          </FormItemStyled>
          <FormItemStyled>
            <ButtonAddLanguageStyled
              htmlType="submit"
              type="primary"
              shape="circle"
            >
              +
            </ButtonAddLanguageStyled>
          </FormItemStyled>
        </Form>
      </Modal>
    </LayoutStyled>
  );
}
