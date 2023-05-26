// @ts-nocheck
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Layout, Divider, Space, Spin, Button, Select } from "antd";
import FloatLabel from "../components/FloatLabel/FloatLabel";
import { DeleteFilled } from "@ant-design/icons";
import apiService from "../api/apiService";
import { getTemplateSelectedVersion } from "../features/Configure/configureSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import Cookies from 'js-cookie';
import axios from "axios";
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
const ButtonAddDeleteStyled = styled(Button)`
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
  padding: 0;
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
  height: 28px;
  width: 85px;
`;
const ConfigureLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [conceptLinkValue, setConceptLinkValue] = useState<string>('');
  const [conceptLinkError, setConceptLinkError] = useState<boolean>(false);
  const [templateValue, setTemplateValue] = useState<string>('');
  const [defaultVersionValue, setDefaultVersionValue] = useState<string>('');
  const [templateName, setTemplateName] = useState<string>('');
  const [templates, setTemplates] = useState<any>([]);
  const [newVersionTemplate, setNewVersionTemplate] = useState<any>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [selectOptionVersions, setSelectOptionVersions] = useState<any>([]);
  const [platform, setPlatform] = useState<string>('');
  const [partnerId, setPartnerId] = useState<string>('');
  const [a, setA] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState(null);
  const {
    templateSelectedVersion,
    isTemplateSelectedVersionsSuccess,
  } = useAppSelector((state: any) => state.configure);
  useEffect(() => {
    const handleCookieChange = () => {
      const authToken = Cookies.get('session');
      setAuthToken(authToken);
    };
    window.addEventListener('load', handleCookieChange);
    window.addEventListener('cookiechange', handleCookieChange);
    return () => {
      window.removeEventListener('load', handleCookieChange);
      window.removeEventListener('cookiechange', handleCookieChange);
    };
  }, []);
  useEffect(() => {
    if (isTemplateSelectedVersionsSuccess) {
      setFetching(false);
      let templateSelectedVersionBody = null;
      templates.map((tmpl: any, i: number) => {
        if (tmpl._id === templateValue) {
          templateSelectedVersionBody = Object.assign({}, templateSelectedVersion.body, { templateVersion: tmpl.templateVersion });
          if (!a) {
            setNewVersionTemplate(templateSelectedVersionBody);
            let defaultVersionValue: any = [];
            templateSelectedVersionBody.templateVersion.map(templateVersion => {
              if (templateVersion.id === templateSelectedVersionBody._id)
                if (templateVersion.approvals[0]._id === templateSelectedVersionBody.approvals.users[0]._id)
                  defaultVersionValue.push({ 
                    value: templateSelectedVersionBody._id, 
                    label: (templateVersion.version + 1 === templateSelectedVersionBody.templateVersion.length) 
                      ? 'Version ' + (templateVersion.version + 1) + ' (latest)' 
                      : 'Version ' + (templateVersion.version + 1)
                  });
            });
            setDefaultVersionValue(defaultVersionValue);
          }
        }
      });
      if (a) setTemplates(templates => {
        return templates.map(template => {
          if (template._id === templateValue) {
            return templateSelectedVersionBody;
          }
          return template;
        });
      });
    }
  }, [
    isTemplateSelectedVersionsSuccess, 
    templateSelectedVersion
  ]);
  const adLibSmartlyIo = async (adLibSmartlyIoPayload: any) => {
    setFetching(true);
    const partner = await apiService.post(
      "/getPartnerId",
      adLibSmartlyIoPayload
    );
    adLibSmartlyIoPayload["partnerId"] = partner.data.body.partnerId;
    setPartnerId(partner.data.body.partnerId);
    const templates = await apiService.post(
      "/getTemplates",
      adLibSmartlyIoPayload
    );
    setTemplateName(templates.data.body.name);
    setTemplates(templates.data.body.templates);
    setFetching(false);
  };
  const addSelectTemplatesVersions = () => {
      setTemplates([
        ...templates,
        newVersionTemplate,
      ]);
  };
  const getSelectOptionTemplates = () => {
    let getSelectOptionTemplates = [];
    templates.map((template, index) =>
      getSelectOptionTemplates.push({
        value: template._id,
        label: template.size + "-" + template.name,
      })
    );
    return getSelectOptionTemplates;
  };
  const getSelectOptionVersions = (template) => {
    let getSelectOptionVersions = [];
    template.templateVersion.map((templateVersion, index) => {
      getSelectOptionVersions.push({
        value: templateVersion.id,
        label: (index + 1) === template.templateVersion.length 
          ? 'Version ' + (index + 1) + ' (latest)'  
          : 'Version ' + (index + 1),
      });
    });
    return getSelectOptionVersions;
  };
  const getSelectOptionVersionDefaultValue = (template) => {
    let defaultVersionValue = [];
    defaultVersionValue.push({
      value: template.templateVersion[template.version]?.id,
      label: (template.version + 1) === template.templateVersion.length ? 'Version ' + (template.version + 1) + ' (latest)'  : 'Version ' + (template.version + 1),
    });
    return defaultVersionValue;
  };
  const removeSelectTemplatesVersions = (index) => {
    let data = [...templates];
    data.splice(index, 1);
    setTemplates(data);
  };
  return (
    <LayoutStyled>
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
          1
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
      <div
        style={{
          // margin: "35.8px auto 0 auto",
          margin: "35.8px auto 36px auto",
        }}
      >
        {fetching && (
          <Space
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
        )}
        <Space.Compact
          block
          style={{
            marginBottom: conceptLinkError ? 0 : 16.1,
            marginTop: 5,
          }}
        >
          <FloatLabel
            style={{ width: 324.6 }}
            label="Concept Link"
            placeholder="Concept Link"
            name="conceptLink"
            onChange={(value) => {
              try {
                let conceptLink = value.target.value.split("/");
                let platform = conceptLink[2].split(".");
                setPlatform(platform[0]);
                let conceptId = conceptLink[4];
                if (conceptId === undefined) setConceptLinkError(true);
                else {
                  const adLibSmartlyIoPayload = {
                    platform: platform[0],
                    conceptId: conceptId,
                  };
                  adLibSmartlyIo(adLibSmartlyIoPayload);
                  setConceptLinkError(false);
                  value.target.blur();
                }
              } catch (error) {
                setConceptLinkError(true);
              }
              setConceptLinkValue(value);
            }}
            value={conceptLinkValue}
            input={true}
          />
        </Space.Compact>
        {conceptLinkError ? (
          <Space.Compact
            block
            style={{ color: "red", fontSize: 12, padding: "0 0 0 12px" }}
          >
            Invalid Concept Link
          </Space.Compact>
        ) : (
          <></>
        )}
        <div
          style={{ marginBottom: templates.length > 0 ? 25.6 : 0 }}
        >
          {templates.map((template, index) => {
            return (
              <div key={index} style={{ marginBottom: 16.1 }}>
                <Space>
                  <Space.Compact block>
                    <FloatLabel
                      style={{
                        width: 158.3,
                      }}
                      label="Template"
                      placeholder="Template"
                      name="template"
                      value={template.size + "-" + template.name}
                      select={true}
                      selectOptions={[]}
                      // showArrow={false}
                      // templateItem={true}
                    />
                  </Space.Compact>
                  <Space.Compact block>
                    <FloatLabel
                      style={{
                        width: 158.3,
                      }}
                      label="Version"
                      placeholder="Version"
                      name="version"
                      onChange={(value) => {
                        setA(!a);
                        setFetching(!fetching);
                        setTemplateValue(template._id);
                        let payload = {
                          platform: platform,
                          templateId: value,
                          partnerId: partnerId,
                        };
                        dispatch(getTemplateSelectedVersion(payload));
                      }}
                      value={getSelectOptionVersionDefaultValue(
                        template
                      )}
                      select={true}
                      selectOptions={getSelectOptionVersions(template)}
                      showArrow={true}
                    />
                  </Space.Compact>
                  <Space wrap>
                    <ButtonAddDeleteStyled
                      type="primary"
                      shape="circle"
                      danger
                      onClick={() => removeSelectTemplatesVersions(index)}
                      icon={<DeleteFilled />}
                    />
                  </Space>
                </Space>
              </div>
            );
          })}
        </div>
        <Space wrap style={{ marginBottom: 25.6 }}>
          <Space.Compact block>
            <FloatLabel
              style={{
                width: 158.3,
              }}
              label="Template"
              placeholder="Template"
              name="template"
              onChange={(value) => {
                setTemplateValue(value);
                let selectOptionVersions = [];
                let defaultVersionValue: any = [];
                templates.filter(template => template._id === value).map(template => {
                  template.templateVersion.map((templateVersion, index) => {
                    selectOptionVersions.push({
                      value: templateVersion.id,
                      label: (index + 1) === template.templateVersion.length 
                        ? 'Version ' + (index + 1) + ' (latest)'  
                        : 'Version ' + (index + 1),
                    });
                    if (template.version === index) 
                      defaultVersionValue.push({ 
                        value: templateVersion.id, 
                        label: (index + 1) === template.templateVersion.length 
                          ? 'Version ' + (index + 1) + ' (latest)' 
                          : 'Version ' + (index + 1) 
                      });
                  });
                  setSelectOptionVersions(selectOptionVersions);
                  setDefaultVersionValue(defaultVersionValue);
                });
              }}
              value={templateValue}
              select={true}
              selectOptions={getSelectOptionTemplates()}
              showArrow={true}
              templateItem={true}
            />
          </Space.Compact>
          <Space.Compact block>
            <FloatLabel
              style={{
                width: 158.3,
              }}
              label="Version"
              placeholder="Version"
              name="version"
              onChange={(value) => {
                setA(false);
                setFetching(!fetching);
                let payload = {
                  platform: platform,
                  templateId: value,
                  partnerId: partnerId,
                };
                dispatch(getTemplateSelectedVersion(payload));
              }}
              value={defaultVersionValue}
              select={true}
              selectOptions={selectOptionVersions}
              showArrow={true}
            />
          </Space.Compact>
          <Space wrap>
            <ButtonAddDeleteStyled
              type="primary"
              shape="circle"
              onClick={addSelectTemplatesVersions}
            >
              +
            </ButtonAddDeleteStyled>
          </Space>
        </Space>
        <Space.Compact block>
          <ButtonGenerateStyled
            type="primary"
            htmlType="submit"
            onClick={() => {
              navigate("/configure/generate/elements", {
                state: { templateName: templateName, templates: templates },
                replace: true,
              });
            }}
          >
            Generate
          </ButtonGenerateStyled>
        </Space.Compact>
      </div>
      {/* <Divider
        type="horizontal"
        style={{
          width: "100%",
          marginTop: 73.4,
          minWidth: "unset",
          marginBottom: 18,
        }}
      />
      <Space
        style={{
          width: "100%",
        }}
      >
        <Space
          size={0}
          direction="vertical"
          style={{ margin: "0 0 20.2px 48.4px" }}
        >
          <Space
            style={{
              fontWeight: 400,
              fontSize: 16,
              color: "rgba(0, 0, 0, 0.45)",
              marginBottom: 7.5,
            }}
          >
            Instructions
          </Space>
          <Space
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.45)",
            }}
          >
            Lorem ipsum dolor sit amet.
          </Space>
          <Space
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.45)",
              marginBottom: 7.4,
            }}
          >
            Lorem ipsum dolor sit amet. Vel officia consequatur sed porro
            tenetur nam dolore voluptas ut assumenda tempora!
          </Space>
          <Space
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.45)",
            }}
          >
            Lorem ipsum dolor sit amet.
          </Space>
          <Space
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.45)",
            }}
          >
            Lorem ipsum dolor sit amet. Vel officia consequatur sed porro
            tenetur nam dolore voluptas ut assumenda tempora!
          </Space>
        </Space>
      </Space> */}
    </LayoutStyled>
  );
};

export default ConfigureLayout;
