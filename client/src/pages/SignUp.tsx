// @ts-nocheck
import styled from "styled-components";
import backgroundImage from "../assets/backgroundOne.svg";
import { Col, Row, Layout } from "antd";
import Column from "../components/Column";
import Logo from "../components/Logo";
import Button from "../components/Button";
import SignUpForm from "../sections/auth/signup/SignUpForm";
const LayoutStyled = styled(Layout)`
  background-image: url(${backgroundImage});
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const DivStyled = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  align-self: center;
  width: 85%;
  height: 75vh;
`;
export default function SignUp() {
  return (
    <LayoutStyled>
      <DivStyled>
        <Row>
          <Col span={12}>
            <SignUpForm />
          </Col>
          <Col span={12}>
            <Column
              columnstyle={{
                position: "relative",
                height: "75vh",
                backgroundImage:
                  "https://app.ad-lib.io/static/media/login_bg.cc32e048.svg",
                backgroundSize: "cover",
                display: "flex",
                width: "100%",
                rightRadius: "10px",
                leftRadius: "unset",
              }}
            >
              <Logo
                logoStyles={{
                  left: 0,
                  right: 0,
                  marginLeft: "auto",
                  marginRight: "auto",
                  position: "absolute",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  height: "81.07px",
                  width: "254.84px",
                  top: "25%",
                }}
              />
              <Button title="Sign In" />
            </Column>
          </Col>
        </Row>
      </DivStyled>
    </LayoutStyled>
  );
}
