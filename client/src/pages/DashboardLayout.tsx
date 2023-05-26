// @ts-nocheck
import { Layout, Row, Col, Space, Avatar, Badge, notification } from "antd";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  authUser,
} from "../features/auth/authSlice";
const { Header, Content } = Layout;
export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userAuthenticated,
    isUserAuthenticatedSuccess,
  } = useSelector(
    (state: any) => state.auth
  );
  // useEffect(() => {
  //   dispatch(authUser());
  // }, []);
  // useEffect(() => {
  //   if (isUserAuthenticatedSuccess)
  //     if (userAuthenticated !== "Unauthenticated") navigate("/configure/generate");
  //     else {
  //       notification.error({
  //         message: 'Sign In Failed',
  //         description: 'Sign in first!',
  //       });
  //       navigate("/signin");
  //     }
  // }, [
  //   userAuthenticated, 
  //   isUserAuthenticatedSuccess, 
  // ]);
  return (
    <Layout>
      <Header>
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Space.Compact
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <Space>
                <Logo
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
          {/* <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Space
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Space.Compact style={{ alignItems: "center", display: "flex" }}>
                <Badge count={11} offset={[6, -4]} showZero>
                  <BellOutlined style={{ color: "#FFF", fontSize: 24 }} />
                </Badge>
              </Space.Compact>
              <Space
                style={{
                  alignItems: "center",
                  display: "flex",
                  paddingLeft: 24,
                }}
              >
                <Avatar
                  size={36}
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  icon={<UserOutlined />}
                />
              </Space>
              <Space
                style={{
                  alignItems: "center",
                  display: "flex",
                  paddingLeft: 10,
                }}
              >
                <Space
                  style={{ fontSize: 14, color: "white", fontWeight: 700 }}
                >
                  Dhen Mark
                </Space>
              </Space>
            </Space>
          </Col> */}
        </Row>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
