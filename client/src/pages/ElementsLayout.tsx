// @ts-nocheck
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
  Spin,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [languagesList, setLanguagesList] = useState<any>([]);
  const templateName:string = location.state.templateName;
  const [templates, setTemplates] = useState<any>(location.state.templates);
  const [templateIndex, setTemplateIndex] = useState<number>(0);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const formLayout: LayoutType = "inline";
  const [api, contextHolder] = notification.useNotification();
  const [replicates, setReplicates] = useState<any>([]);
  const [inputString, setInputString] = useState<string[]>([]);
  const [removedCharacter, setRemovedCharacter] = useState<string[]>([]);
  const [numToRemove, setNumToRemove] = useState<number[]>([]);
  const [numToAdd, setNumToAdd] = useState<number[]>([]);
  const [language, setLanguage] = useState<string>('');
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
  useEffect(() => {
    let inputString: string[] = [];
    let removedCharacter: string[] = [];
    let numToRemove: number[] = [];
    let numToAdd: number[] = [];
    templates[templateIndex]['dynamicElements'].map(async (dynamicElement) => {
      let html =
      templates[templateIndex]['defaultDynamicFieldsValues'][dynamicElement];
      let div = document.createElement("div");
      div.innerHTML = html;
      let text = div.textContent || div.innerText || "";
      let payload = {
        language: language,
        textHeadlineLegal: text,
      };
      if (language !== '') {
        setLoading(!loading);
        const response = await apiService.post("/translate", payload);
        text = response.data.translate;
      }
      inputString.push(text);
      removedCharacter.push("");
      numToRemove.push(1);
      numToAdd.push(1);
    });
    setInputString(inputString);
    setRemovedCharacter(removedCharacter);
    setNumToRemove(numToRemove);
    setNumToAdd(numToAdd);
  }, [language]);
  const activeStyle = {
    backgroundColor: "#1890ff",
    borderRadius: 5,
    color: "#fff",
  };
  const renderTemplateConfigurations = (template) => {
    return (
      <Space direction='vertical' style={{ marginLeft: 4 }}>
        {template.dynamicElements.map((dynamicElement, i) => {
          const buttonCases = [
            {
              value: 'Capitalize',
              label: 'Aa',
            },
            { value: 'Lowercase', label: 'aa' },
            { value: 'Uppercase', label: 'AA' },
          ];
          if (
            dynamicElement.includes('Text') ||
            dynamicElement.includes('Headline') ||
            dynamicElement.includes('legal') ||
            dynamicElement.includes('Subheadline')
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
                    defaultValue={textHeadingLegalMaxValue(
                      template.defaultDynamicFieldsValues[dynamicElement]
                    )}
                    onStep={(value, type) => {
                      // let dataInputString = [...inputString];
                      // let dataRemovedCharacter = [...removedCharacter]
                      // if (type.type === 'down') {
                      //   const numToRemoveValidated = Math.min(numToRemove[i], inputString[i].length);
                      //   // if (numToRemoveValidated > 0) {
                      //     const removed = inputString[i].slice(-numToRemoveValidated);
                      //     const newInputString = inputString[i].slice(0, -numToRemoveValidated);
                      //     dataInputString[i] = newInputString;
                      //     dataRemovedCharacter[i] = removed + removedCharacter[i];
                      //     setInputString(dataInputString);
                      //     setRemovedCharacter(dataRemovedCharacter);
                      //   // }
                      // } else {
                      //   if (removedCharacter[i].length === 0) {
                      //     let characters = null;
                      //     if (language !== '') {
                      //       const filteredLanguage = languages.filter(lang => {
                      //         return lang.language === language;
                      //       });
                      //       filteredLanguage.map(language => characters = language.content.split(''));
                      //     } else characters = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non velit a dolor euismod sollicitudin eu eget dolor. Mauris nec risus sed libero sagittis porta et ut massa. Nulla vel ipsum vehicula, varius lectus vel, varius neque. Phasellus id diam magna. Integer pellentesque semper purus. Cras consequat lacinia est nec lacinia. Cras massa sapien, fermentum sit amet orci sed, imperdiet tempus quam. Duis tincidunt sem a finibus faucibus. Duis id leo vel velit imperdiet imperdiet ut nec metus. Nam aliquam ante vel vestibulum blandit. Suspendisse pharetra erat a lorem scelerisque convallis. Nam imperdiet tincidunt magna ac rutrum. Aliquam consectetur aliquam massa vitae hendrerit. Etiam imperdiet sed mauris vel iaculis. Etiam vitae arcu vitae ante pretium vehicula. Curabitur eget vulputate ipsum. Aliquam quis blandit dui. Vivamus placerat congue dolor vel convallis. Nunc neque nulla, convallis ac eros in, maximus varius odio. Morbi cursus nisi eget leo lobortis porttitor. Nam nibh sapien, mattis ut elementum porttitor, iaculis id enim. Quisque iaculis quam in diam maximus feugiat. Duis finibus dui ut dui posuere vestibulum. Sed porta viverra dolor, sed rutrum odio varius ornare. Donec ultricies pellentesque ligula. Aenean dictum ante quis sapien malesuada suscipit. Morbi metus massa, lacinia id aliquet vel, semper eget felis. Maecenas hendrerit rhoncus varius. Sed massa mi, blandit id tellus sed, aliquam viverra justo. Mauris rhoncus leo quis ullamcorper pellentesque. Nunc libero justo, laoreet hendrerit leo quis, facilisis facilisis massa. Aliquam sed erat mi. Duis ac imperdiet nibh. Ut eu dolor viverra, pulvinar ante ut, mattis dolor. Etiam volutpat dui at molestie ultrices. Mauris blandit, eros a convallis egestas, dolor augue convallis augue, vitae pretium massa purus nec mauris. Aenean eget hendrerit augue. Suspendisse hendrerit, dui in luctus lobortis, massa sapien blandit velit, vitae viverra diam sapien eget sapien. Proin pulvinar sollicitudin cursus. Phasellus ullamcorper ex a lorem fermentum maximus. Donec in ipsum non lectus convallis blandit. Sed lacus augue, cursus ut ipsum sed, posuere ultrices nunc. Suspendisse ac tincidunt velit, id tincidunt risus. Nam vulputate gravida cursus. Pellentesque et luctus arcu. Proin accumsan tortor sed lectus rutrum commodo eget ut eros. Duis neque lectus, aliquet sit amet tincidunt at, finibus at dui. Aliquam ultricies arcu lacinia massa pretium finibus. Proin mollis lobortis efficitur. Curabitur sollicitudin justo non diam tincidunt, nec consectetur lacus faucibus. Integer commodo quis tellus vitae vestibulum. Aliquam dictum turpis aliquam leo sagittis lacinia. Nulla dapibus sodales est, non feugiat dui fringilla ut. Proin convallis augue at magna luctus bibendum. Suspendisse et velit ipsum. Sed non magna tincidunt mauris pellentesque cursus. Phasellus libero massa, convallis volutpat elit sed, gravida imperdiet lectus. Vivamus non commodo lectus. Nunc a cursus arcu, vitae aliquet risus. Pellentesque ac dolor purus. Aliquam auctor felis malesuada neque tristique gravida. Vestibulum nibh nibh, volutpat at eros at, maximus mattis sapien. Integer consectetur ultricies urna vitae dictum. Nullam id quam a arcu varius ultrices nec sit amet nisl. Nulla porta nec lacus sed pellentesque.'.split('');
                      //     const index = Math.floor(Math.random() * characters.length) + 1;
                      //     dataInputString[i] = inputString[i] + characters[index];
                      //     setInputString(dataInputString);
                      //   } else {
                      //     const numToAddValidated = Math.min(numToAdd[i], removedCharacter[i].length);
                      //     // if (numToAddValidated > 0) {
                      //       const added = removedCharacter[i].slice(0, numToAddValidated);
                      //       const newRemovedCharacter = removedCharacter[i].slice(numToAddValidated);
                      //       dataInputString[i] = inputString[i] + added;
                      //       dataRemovedCharacter[i] = newRemovedCharacter;
                      //       setInputString(dataInputString);
                      //       setRemovedCharacter(dataRemovedCharacter);
                      //     // }
                      //   }
                      // }
                      if (value > 1000) api["warning"]({
                        message: `${dynamicElement}`,
                        description: 'Character Limit Exceeds!',
                      });
                      const filteredLanguage = languages.filter(lang => {
                        if (language === '') return lang.language === 'Latin';
                        else return lang.language === language;
                      });
                      let defaultDynamicFieldsValues =
                        templates[templateIndex].defaultDynamicFieldsValues;
                      const newDefaultDynamicFieldsValues = {
                        // [dynamicElement]: dataInputString[i],
                        [dynamicElement]: filteredLanguage[0].content.substring(0, value),
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
                    onChange={(value) => {
                      // let dataInputString = [...inputString];
                      // let dataRemovedCharacter = [...removedCharacter];
                      // // if (removedCharacter[i].length === 0) {
                      // //   // if (value < inputString[i].length) {
                      // //   //   const numToRemoveValidated = Math.min(value, inputString[i].length);
                      // //   //   if (numToRemoveValidated > 0) {
                      // //   //     const removed = inputString[i].slice(-numToRemoveValidated);
                      // //   //     const newInputString = inputString[i].slice(0, -numToRemoveValidated);
                      // //   //     dataInputString[i] = newInputString;
                      // //   //     dataRemovedCharacter[i] = removed + removedCharacter[i];
                      // //   //     setInputString(dataInputString);
                      // //   //     setRemovedCharacter(dataRemovedCharacter);
                      // //   //   }
                      // //   // }
                      // // } else {
                      //   if (value < inputString[i].length) {
                      //     const numToRemoveValidated = Math.min(value, inputString[i].length);
                      //     const removed = inputString[i].slice(-numToRemoveValidated);
                      //     const newInputString = inputString[i].slice(0, -numToRemoveValidated);
                      //     dataInputString[i] = newInputString;
                      //     dataRemovedCharacter[i] = removed + removedCharacter[i];
                      //     setInputString(dataInputString);
                      //     setRemovedCharacter(dataRemovedCharacter);
                      //   } else {
                      //     const numToAddValidated = Math.min(value, removedCharacter[i].length);
                      //     const added = removedCharacter[i].slice(0, numToAddValidated);
                      //     const newRemovedCharacter = removedCharacter[i].slice(numToAddValidated);
                      //     dataInputString[i] = inputString[i] + added;
                      //     dataRemovedCharacter[i] = newRemovedCharacter;
                      //     if (value !== dataInputString[i].length) {
                      //       let newDataInputString = dataInputString[i];
                      //       let characters = null;
                      //       let n = value - dataInputString[i].length;
                      //       for (let i = 0; i < n; i++) {
                      //         if (language !== '') {
                      //           const filteredLanguage = languages.filter(lang => {
                      //             return lang.language === language;
                      //           });
                      //           filteredLanguage.map(language => characters = language.content.split(''));
                      //         } else characters = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non velit a dolor euismod sollicitudin eu eget dolor. Mauris nec risus sed libero sagittis porta et ut massa. Nulla vel ipsum vehicula, varius lectus vel, varius neque. Phasellus id diam magna. Integer pellentesque semper purus. Cras consequat lacinia est nec lacinia. Cras massa sapien, fermentum sit amet orci sed, imperdiet tempus quam. Duis tincidunt sem a finibus faucibus. Duis id leo vel velit imperdiet imperdiet ut nec metus. Nam aliquam ante vel vestibulum blandit. Suspendisse pharetra erat a lorem scelerisque convallis. Nam imperdiet tincidunt magna ac rutrum. Aliquam consectetur aliquam massa vitae hendrerit. Etiam imperdiet sed mauris vel iaculis. Etiam vitae arcu vitae ante pretium vehicula. Curabitur eget vulputate ipsum. Aliquam quis blandit dui. Vivamus placerat congue dolor vel convallis. Nunc neque nulla, convallis ac eros in, maximus varius odio. Morbi cursus nisi eget leo lobortis porttitor. Nam nibh sapien, mattis ut elementum porttitor, iaculis id enim. Quisque iaculis quam in diam maximus feugiat. Duis finibus dui ut dui posuere vestibulum. Sed porta viverra dolor, sed rutrum odio varius ornare. Donec ultricies pellentesque ligula. Aenean dictum ante quis sapien malesuada suscipit. Morbi metus massa, lacinia id aliquet vel, semper eget felis. Maecenas hendrerit rhoncus varius. Sed massa mi, blandit id tellus sed, aliquam viverra justo. Mauris rhoncus leo quis ullamcorper pellentesque. Nunc libero justo, laoreet hendrerit leo quis, facilisis facilisis massa. Aliquam sed erat mi. Duis ac imperdiet nibh. Ut eu dolor viverra, pulvinar ante ut, mattis dolor. Etiam volutpat dui at molestie ultrices. Mauris blandit, eros a convallis egestas, dolor augue convallis augue, vitae pretium massa purus nec mauris. Aenean eget hendrerit augue. Suspendisse hendrerit, dui in luctus lobortis, massa sapien blandit velit, vitae viverra diam sapien eget sapien. Proin pulvinar sollicitudin cursus. Phasellus ullamcorper ex a lorem fermentum maximus. Donec in ipsum non lectus convallis blandit. Sed lacus augue, cursus ut ipsum sed, posuere ultrices nunc. Suspendisse ac tincidunt velit, id tincidunt risus. Nam vulputate gravida cursus. Pellentesque et luctus arcu. Proin accumsan tortor sed lectus rutrum commodo eget ut eros. Duis neque lectus, aliquet sit amet tincidunt at, finibus at dui. Aliquam ultricies arcu lacinia massa pretium finibus. Proin mollis lobortis efficitur. Curabitur sollicitudin justo non diam tincidunt, nec consectetur lacus faucibus. Integer commodo quis tellus vitae vestibulum. Aliquam dictum turpis aliquam leo sagittis lacinia. Nulla dapibus sodales est, non feugiat dui fringilla ut. Proin convallis augue at magna luctus bibendum. Suspendisse et velit ipsum. Sed non magna tincidunt mauris pellentesque cursus. Phasellus libero massa, convallis volutpat elit sed, gravida imperdiet lectus. Vivamus non commodo lectus. Nunc a cursus arcu, vitae aliquet risus. Pellentesque ac dolor purus. Aliquam auctor felis malesuada neque tristique gravida. Vestibulum nibh nibh, volutpat at eros at, maximus mattis sapien. Integer consectetur ultricies urna vitae dictum. Nullam id quam a arcu varius ultrices nec sit amet nisl. Nulla porta nec lacus sed pellentesque.'.split('');
                      //         const index = Math.floor(Math.random() * characters.length) + 1;
                      //         newDataInputString = newDataInputString + characters[index];
                      //       }
                      //       dataInputString[i] = newDataInputString;
                      //     }
                      //     setInputString(dataInputString);
                      //     setRemovedCharacter(dataRemovedCharacter);
                      //   }
                      // // }
                      if (value > 1000) api["warning"]({
                        message: `${dynamicElement}`,
                        description: 'Character Limit Exceeds!',
                      });
                      const filteredLanguage = languages.filter(lang => {
                        if (language === '') return lang.language === 'Latin';
                        else return lang.language === language;
                      });
                      let defaultDynamicFieldsValues =
                          templates[templateIndex].defaultDynamicFieldsValues;
                        const newDefaultDynamicFieldsValues = {
                          // [dynamicElement]: dataInputString[i],
                          [dynamicElement]: filteredLanguage[0].content.substring(0, value),
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
      {
        loading && <Space
          style={{
            zIndex: 99999,
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
      <FloatButtonStyled
        style={{ pointerEvents: loading ? 'none' : 'unset' }}
        type="primary"
        icon={<TranslationOutlined />}
        tooltip={<Space>Languages</Space>}
        onClick={() => setShowLanguageModal(!showLanguageModal)}
      />
      <Space
        style={{
          pointerEvents: loading ? 'none' : 'unset',
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
      <div style={{ pointerEvents: loading ? 'none' : 'unset' }}>
        <Space style={{ float: "right", marginRight: 44 }}>
          <FloatLabel
            style={{
              width: 157.3,
            }}
            label="Language"
            placeholder="Select a language"
            name="language"
            onChange={async (language) => {
              setLanguage(language);
              let defaultDynamicFieldsValues =
                templates[templateIndex].defaultDynamicFieldsValues;
              for (const [element, value] of Object.entries(
                templates[templateIndex].defaultDynamicFieldsValues
              )) {
                if (
                  element.includes('Text') ||
                  element.includes('Headline') ||
                  element.includes('legal') ||
                  element.includes('Subheadline')
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
              setLoading(false);
            }}
            value={language}
            select={true}
            selectOptions={languagesList}
            showArrow={true}
          />
        </Space>
      </div>
      {!templates[templateIndex].replicated && (
        <div style={{ pointerEvents: loading ? 'none' : 'unset' }}>
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
          pointerEvents: loading ? 'none' : 'unset',
          marginTop: 42.4,
          color: "#000",
          marginBottom: 42.4,
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
                  state: { 
                    templateName: templateName, 
                    templates: templates 
                  },
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
