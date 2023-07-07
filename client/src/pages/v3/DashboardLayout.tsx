// @ts-nocheck
import {Layout, Row, Col, Space} from 'antd'
import {Outlet} from 'react-router-dom'
import Logo from '../components/Logo/Logo'
const {Header, Content} = Layout
export default function DashboardLayout() {
  return (
    <Layout>
      <Header>
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Space.Compact style={{display: 'flex', alignItems: 'center', height: '100%'}}>
              <Space>
                <Logo
                  logoStyles={{
                    left: 'unset',
                    right: 'unset',
                    marginLeft: 'unset',
                    marginRight: 'unset',
                    position: 'unset',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    height: '2em',
                    width: '12em',
                    top: 'unset',
                  }}
                />
              </Space>
            </Space.Compact>
          </Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            <Space
              direction="horizontal"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: 24,
                color: 'white',
                fontWeight: 700,
              }}
            >
              QA Tool
            </Space>
          </Col>
        </Row>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}
