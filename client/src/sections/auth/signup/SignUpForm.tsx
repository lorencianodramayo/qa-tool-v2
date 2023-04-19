// @ts-nocheck
import { Layout, Form, Button, Input, notification } from "antd";
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import apiService from "../../../api/apiService";
const LayoutStyled = styled(Layout)`
  background: transparent;
  width: 50%;
  height: auto;
  margin: 25vh auto;
  padding: 10px;
`;
const InputStyled = styled(Input)`
  &.ant-input-affix-wrapper {
    border-color: transparent;
  }
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: transparent !important;
  }
`;
const MailOutlinedStyled = styled(MailOutlined)`
  color: rgba(203, 43, 134, 1);
`;
const UserOutlinedStyled = styled(UserOutlined)`
  color: rgba(203, 43, 134, 1);
`;
const LockOutlinedStyled = styled(LockOutlined)`
  color: rgba(203, 43, 134, 1);
`;
const EyeOutlinedStyled = styled(EyeOutlined)`
  color: rgba(203, 43, 134, 1);
`;
const EyeInvisibleOutlinedStyled = styled(EyeInvisibleOutlined)`
  color: rgba(203, 43, 134, 1);
`;
const ButtonStyled = styled(Button)`
  width: 100%;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(203, 43, 134, 1) 0%,
    rgba(155, 30, 124, 1) 35%,
    rgba(99, 16, 105, 1) 100%
  );
  &:hover {
    border-color: transparent;
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: none !important;
    outline-offset: unset !important;
    transition: none !important;
  }
`;
export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const onFinish = async (values:any) => {
    try {
      const request = await apiService.post("/signup", values);
      if (request.data.success)
        api["success"]({
          message: "Sign Up Successfully",
          description: "You are successfully sign up!",
        });
    } catch (error) {
      api["error"]({
        message: "Sign Up Failed",
        // @ts-ignore
        description: error.response.data.error,
      });
    }
  };
  return (
    <LayoutStyled>
      {contextHolder}
      <Form
        name="Sign Up"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "The input is not valid Email!",
            },
          ]}
        >
          <InputStyled
            prefix={<MailOutlinedStyled />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <InputStyled
            prefix={<UserOutlinedStyled />}
            placeholder="Full Name"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <InputStyled
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            prefix={<LockOutlinedStyled />}
            suffix={
              showPassword ? (
                <EyeOutlinedStyled onClick={handleShowPassword} />
              ) : (
                <EyeInvisibleOutlinedStyled
                  onClick={handleShowPassword}
                />
              )
            }
          />
        </Form.Item>
        <Form.Item>
          <ButtonStyled type="primary" htmlType="submit">
            Sign Up
          </ButtonStyled>
        </Form.Item>
      </Form>
    </LayoutStyled>
  );
}
