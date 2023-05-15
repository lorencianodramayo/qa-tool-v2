//@ts-nocheck
import styled from "styled-components";
import { Badge, Col, Layout, notification, Row, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getSharedVariants } from "../features/SharedVariant/sharedVariantSlice";
import LogoComponent from "../components/Logo";
import IFrameCard from "../components/IFrame/IFrameCard";
const ContentStyled = styled(Content)`
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SharedVariantsLayout: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {
    sharedVariant,
    isSharedVariantError,
    isSharedVariantSuccess,
    sharedVariantMessage,
  } = useAppSelector((state: any) => state.sharedVariant);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [variantName, setVariantName] = useState<string>("");
  const [combinations, setCombinations] = useState<number>(0);
  const [variants, setVariants] = useState<any>([]);
  useEffect(() => {
    setLoading(!loading);
    dispatch(getSharedVariants(params.sharedVariantsId));
  }, []);
  useEffect(() => {
    if (isSharedVariantSuccess) {
      if (sharedVariant.sharedVariants === null) api["info"]({
          message: "Shared Variants Info",
          description: "No Shared Variants Available",
        });
      else {
        let combinations = 0;
        let filterVariants = [];
        let i = 0;
        setVariantName(sharedVariant.sharedVariants.variantsName);
        sharedVariant.sharedVariants.sharedVariants.map(templateVersion => {
          templateVersion.variants.map(variant => {
            combinations += 1;
            const variantSizeExist = filterVariants.some(el => el.size === variant.size);
            if (!variantSizeExist) {
              filterVariants.push({
                _id: templateVersion._id,
                templateName: variant.templateName,
                size: variant.size,
                variants: [{
                  variantName: variant.variantName,
                  defaultValues: variant.defaultValues,
                }]
              });
              i++;
            } else {
              filterVariants[i - 1].variants = [...filterVariants[i - 1].variants, { 
                variantName: variant.variantName,
                defaultValues: variant.defaultValues,
              }];
            }
          });
        });
        setCombinations(combinations);
        setVariants(filterVariants);
      }
      setLoading(false);  
    }
    if (isSharedVariantError) {
      api["error"]({
        message: "Shared Variants Error",
        description: sharedVariantMessage.response.data.message,
      });
      setLoading(false);
    }
  }, [
    isSharedVariantSuccess,
    isSharedVariantError
  ]);
  return (
    <Layout style={{ height: "100vh", color: '#000' }}>
      {contextHolder}
      <Header>
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Space.Compact
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <Space>
                <LogoComponent
                  logoStyles={{
                    left: "unset",
                    right: "unset",
                    marginLeft: "unset",
                    marginRight: "unset",
                    position: "unset",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    height: "2em",
                    width: "12em",
                    top: "unset",
                  }}
                />
              </Space>
            </Space.Compact>
          </Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            <Space
              direction="horizontal"
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: 24,
                color: "white",
                fontWeight: 700,
              }}
            >
              QA Tool
            </Space>
          </Col>
        </Row>
      </Header>
      <Space.Compact block style={{
        background: "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
        padding: "0 0 3px 0",
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#fff',
      }}>
        <Space>
          { variantName }
        </Space>
      </Space.Compact>
      <Space.Compact block style={{
        background: "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",
        padding: "0 0 3px 0",
      }}>
        <Space.Compact block style={{
          marginRight: 15.8,
          justifyContent: 'right',
        }}>
          <Space>
            <Badge
              count={
                combinations
              }
              overflowCount={combinations}
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
      <ContentStyled
          style={{
            margin: 5,
            overflowY: 'scroll',
          }}
        >
          {
            variants.map(variant => <>
              <Space.Compact block style={{marginBottom: 5}}>
                <Space.Compact block style={{
                  justifyContent: 'center',
                  background:
                            "linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)",   
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: 5,                 
                }}>{variant.templateName} {variant.size}</Space.Compact>
              </Space.Compact>
              <Row gutter={[15.9, 22.4]} style={{ width: "100%", justifyContent: 'center' }}>
                {
                  variant.variants.map((defaultValue, i) => 
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
                        // 
                        // variant={variant} 
                        // i={i} 
                        // templates={templates}
                        // templateId={templateId}
                        // variants={variants}
                      />
                    </Col>
                  )
                }
              </Row>
            </>)
          }
        </ContentStyled>
    </Layout>
  );
};
export default SharedVariantsLayout;
