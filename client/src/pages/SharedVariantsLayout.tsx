//@ts-nocheck
import styled from 'styled-components'
import {Badge, Col, FloatButton, Layout, notification, Row, Space} from 'antd'
import {Content, Header} from 'antd/es/layout/layout'
import {DesktopOutlined, MobileOutlined} from '@ant-design/icons'
import LogoComponent from '../components/Logo'
import IFrameCard from '../components/IFrame/IFrameCard'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../store'
import {getSharedVariants} from '../features/SharedVariant/sharedVariantSlice'
const ContentStyled = styled(Content)`
  &::-webkit-scrollbar {
    display: none;
  }
`
const SpaceCompactStyled = styled(Space.Compact)`
  background: linear-gradient(90.03deg, #f22076 0.03%, #29125f 100.05%);
  padding: 0 0 3px 0;
  justify-content: space-evenly;
  margin-bottom: 5px;
  border-radius: 5px;
  @media (max-width: 768px) {
    display: block;
    div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 480px) {
    display: block;
    div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`
const RowStyled = styled(Row)`
  width: 100%;
  justify-content: center;
  @media (max-width: 768px) {
    margin: 0;
  }
  @media (max-width: 480px) {
    margin: 0 !important;
  }
`
const SharedVariantsLayout: React.FC = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const {sharedVariant, isSharedVariantError, isSharedVariantSuccess, sharedVariantMessage} =
    useAppSelector((state: any) => state.sharedVariant)
  const [api, contextHolder] = notification.useNotification()
  const [mobile, setMobile] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [variantName, setVariantName] = useState<string>('')
  const [variants, setVariants] = useState<any>([])
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth <= 768
      setMobile(isMobileDevice)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  useEffect(() => {
    setLoading(!loading)
    dispatch(getSharedVariants(params.sharedVariantsId))
  }, [])
  useEffect(() => {
    if (isSharedVariantSuccess) {
      if (sharedVariant.sharedVariants === null)
        api['info']({
          message: 'Shared Variants Info',
          description: 'No Shared Variants Available',
        })
      else {
        let filterVariants = []
        let i = 0
        setVariantName(sharedVariant.sharedVariants.variantsName)
        sharedVariant.sharedVariants.sharedVariants.map((templateVersion) => {
          let combinations = 0
          templateVersion.variants.map((variant) => {
            combinations += 1
            const variantSizeExist = filterVariants.some((el) => el.size === variant.size)
            if (!variantSizeExist) {
              filterVariants.push({
                _id: templateVersion._id,
                templateName: variant.templateName,
                size: variant.size,
                combinations: combinations,
                variants: [
                  {
                    variantName: variant.variantName,
                    defaultValues: variant.defaultValues,
                  },
                ],
              })
              i++
            } else {
              filterVariants[i - 1]['combinations'] = combinations
              filterVariants[i - 1].variants = [
                ...filterVariants[i - 1].variants,
                {
                  variantName: variant.variantName,
                  defaultValues: variant.defaultValues,
                },
              ]
            }
          })
        })
        setVariants(filterVariants)
      }
      setLoading(false)
    }
    if (isSharedVariantError) {
      api['error']({
        message: 'Shared Variants Error',
        description: sharedVariantMessage.response.data.message,
      })
      setLoading(false)
    }
  }, [isSharedVariantSuccess, isSharedVariantError])
  return (
    <Layout style={{height: '100vh', color: '#000'}}>
      {contextHolder}
      {!mobile && (
        <FloatButton
          type="primary"
          icon={!isMobile ? <MobileOutlined /> : <DesktopOutlined />}
          tooltip={<Space>{!isMobile ? 'Mobile' : 'Desktop'} View</Space>}
          onClick={() => setIsMobile(!isMobile)}
        />
      )}
      <Header>
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Space.Compact style={{display: 'flex', alignItems: 'center', height: '100%'}}>
              <Space>
                <LogoComponent
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
      <Space.Compact
        block
        style={{
          background: 'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
          padding: '0 0 3px 0',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        <Space>{variantName}</Space>
      </Space.Compact>
      <ContentStyled
        style={{
          margin: 5,
          overflowY: 'scroll',
        }}
      >
        {variants.map((variant) => (
          <>
            {isMobile ? (
              <>
                <div
                  style={{
                    background: 'linear-gradient(90.03deg, #f22076 0.03%, #29125f 100.05%)',
                    padding: '0 0 3px 0',
                    justifyContent: 'space-evenly',
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                >
                  <Space.Compact
                    block
                    style={{
                      fontStyle: 'normal',
                      color: '#fff',
                      fontWeight: 'bold',
                      justifyContent: 'center',
                    }}
                  >
                    {variant.templateName} {variant.size}
                  </Space.Compact>
                  <Space.Compact
                    block
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Badge
                      count={variant.combinations}
                      overflowCount={variant.combinations}
                      color="#6F7782"
                      style={{
                        fontStyle: 'normal',
                        fontWeight: 400,
                        color: '#fff',
                        borderRadius: 5,
                        padding: 0,
                      }}
                    />
                    <Space
                      style={{
                        fontStyle: 'normal',
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: 8,
                      }}
                    >
                      Combinations
                    </Space>
                  </Space.Compact>
                </div>
                <Col>
                  {variant.variants.map((_: any, i: any) => (
                    <Col style={{marginBottom: 8}}>
                      <Space.Compact
                        block
                        style={{
                          background: 'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
                          borderTopLeftRadius: '5px',
                          borderTopRightRadius: '5px',
                          height: '5px',
                        }}
                      >
                        {' '}
                      </Space.Compact>
                      <IFrameCard isMobile={isMobile} variant={variant} i={i} />
                    </Col>
                  ))}
                </Col>
              </>
            ) : (
              <>
                <SpaceCompactStyled block>
                  <Space
                    style={{
                      fontStyle: 'normal',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  >
                    {variant.templateName} {variant.size}
                  </Space>
                  <Space>
                    <Badge
                      count={variant.combinations}
                      overflowCount={variant.combinations}
                      color="#6F7782"
                      style={{
                        fontStyle: 'normal',
                        fontWeight: 400,
                        color: '#fff',
                        borderRadius: 5,
                        padding: 0,
                      }}
                    />
                    <Space
                      style={{
                        fontStyle: 'normal',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    >
                      Combinations
                    </Space>
                  </Space>
                </SpaceCompactStyled>
                <RowStyled gutter={[15.9, 22.4]}>
                  {variant.variants.map((_: any, i: any) => (
                    <Col>
                      <Space.Compact
                        block
                        style={{
                          background: 'linear-gradient(90.03deg, #F22076 0.03%, #29125F 100.05%)',
                          borderTopLeftRadius: '5px',
                          borderTopRightRadius: '5px',
                          height: '5px',
                        }}
                      >
                        {' '}
                      </Space.Compact>
                      <IFrameCard isMobile={isMobile} variant={variant} i={i} />
                    </Col>
                  ))}
                </RowStyled>
              </>
            )}
          </>
        ))}
      </ContentStyled>
    </Layout>
  )
}
export default SharedVariantsLayout
