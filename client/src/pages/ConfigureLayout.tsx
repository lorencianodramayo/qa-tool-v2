import styled from "styled-components";
import { useState } from "react";
import { Layout, Divider, Space, Spin, Button } from "antd";
import FloatLabel from "../components/FloatLabel/FloatLabel";
import { DeleteFilled } from "@ant-design/icons";
import apiService from "../api/apiService";
import { useNavigate } from "react-router-dom";
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
  const [conceptLinkValue, setConceptLinkValue] = useState<string>("");
  const [conceptLinkError, setConceptLinkError] = useState<boolean>(false);
  const [templateValue, setTemplateValue] = useState<string>("");
  const [versionValue, setVersionValue] = useState<string>("");
  const [loadTemplatesVersions, setLoadTemplatesVersions] = useState([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [selectOptionTemplateVersions, setSelectOptionTemplateVersions] =
    useState([]);
  const adLibSmartlyIo = async (adLibSmartlyIoPayload) => {
    setFetching(true);
    const partner = await apiService.post(
      "/getPartnerId",
      adLibSmartlyIoPayload
    );
    adLibSmartlyIoPayload["partnerId"] = partner.data.body.partnerId;
    const templates = await apiService.post(
      "/getTemplates",
      adLibSmartlyIoPayload
    );
    let newTemplates = [];
    templates.data.body.templates.map((template) => {
      template["defaultVersion"] = template.templateVersion.length - 1;
      newTemplates.push(template);
    });
    setLoadTemplatesVersions(newTemplates);
    setFetching(false);
  };
  const addSelectTemplatesVersions = () => {
    let addTemplatesVersions = {};
    if (templateValue !== "") {
      loadTemplatesVersions.map((templateVersion, i) => {
        if (templateVersion.size + "-" + templateVersion.name === templateValue)
          addTemplatesVersions = {
            ...templateVersion,
            defaultVersion: parseInt(versionValue.match(/\d/g)) - 1,
          };
      });

      setLoadTemplatesVersions([
        ...loadTemplatesVersions,
        addTemplatesVersions,
      ]);
    }
  };
  const getSelectOptionTemplates = () => {
    let getSelectOptionTemplates = [];
    const newLoadTemplatesVersions = Array.from(
      new Set(loadTemplatesVersions.map((el) => el))
    );
    newLoadTemplatesVersions.map((templateVersion, index) =>
      getSelectOptionTemplates.push({
        key: templateVersion._id,
        value: templateVersion.size + "-" + templateVersion.name,
        label: templateVersion.size + "-" + templateVersion.name,
      })
    );
    return getSelectOptionTemplates;
  };
  const getSelectOptionVersions = (template) => {
    let getSelectOptionVersions = [];
    template.templateVersion.map((version, index) =>
      getSelectOptionVersions.push({
        key: version._id,
        value:
          index === template.templateVersion.length - 1
            ? "Version " + (index + 1) + " (latest)"
            : "Version " + (index + 1) + "",
        label:
          index === template.templateVersion.length - 1
            ? "Version " + (index + 1) + " (latest)"
            : "Version " + (index + 1) + "",
        approvals: version.approvals ? true : false,
      })
    );
    return getSelectOptionVersions;
  };
  const getSelectOptionVersionDefaultValue = (index, defaultVersion) => {
    let versionDefaultValue = null;
    if (
      loadTemplatesVersions[index].templateVersion.length - 1 ===
      defaultVersion
    )
      versionDefaultValue = "Version " + (defaultVersion + 1) + " (latest)";
    else versionDefaultValue = "Version " + (defaultVersion + 1);

    return versionDefaultValue;
  };
  const removeSelectTemplatesVersions = (index) => {
    let data = [...loadTemplatesVersions];
    data.splice(index, 1);
    setLoadTemplatesVersions(data);
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
          margin: "35.8px auto 0 auto",
        }}
      >
        {fetching && (
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
                loadTemplatesVersions.map((templateVersion) => {
                  let selectOptionVersions = [];
                  if (
                    templateVersion.size + "-" + templateVersion.name ===
                    value
                  ) {
                    templateVersion.templateVersion.map((version, index) =>
                      selectOptionVersions.push({
                        key: version._id,
                        value:
                          index === templateVersion.templateVersion.length - 1
                            ? "Version " + (index + 1) + " (latest)"
                            : "Version " + (index + 1) + "",
                        label:
                          index === templateVersion.templateVersion.length - 1
                            ? "Version " + (index + 1) + " (latest)"
                            : "Version " + (index + 1) + "",
                        approvals: version.approvals ? true : false,
                      })
                    );
                    setSelectOptionTemplateVersions(selectOptionVersions);
                  }
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
              onChange={(value) => setVersionValue(value)}
              value={versionValue}
              select={true}
              selectOptions={selectOptionTemplateVersions}
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
        <div
          style={{ marginBottom: loadTemplatesVersions.length > 0 ? 25.6 : 0 }}
        >
          {loadTemplatesVersions.map((templateVersion, index) => {
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
                      value={templateVersion.size + "-" + templateVersion.name}
                      select={true}
                      selectOptions={getSelectOptionTemplates()}
                      showArrow={false}
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
                      value={getSelectOptionVersionDefaultValue(
                        index,
                        templateVersion.defaultVersion
                      )}
                      select={true}
                      selectOptions={getSelectOptionVersions(templateVersion)}
                      showArrow={false}
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
        <Space.Compact block>
          <ButtonGenerateStyled
            type="primary"
            htmlType="submit"
            onClick={() => {
              navigate("/configure/generate/elements", {
                state: { templates: loadTemplatesVersions },
                replace: true,
              });
            }}
          >
            Generate
          </ButtonGenerateStyled>
        </Space.Compact>
      </div>
      <Divider
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
      </Space>
    </LayoutStyled>
  );
};

export default ConfigureLayout;
