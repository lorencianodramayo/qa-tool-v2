// @ts-nocheck
import { Layout, Form, Button, Input, Checkbox, notification } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  signIn, 
  authUser,
} from "../../../features/auth/authSlice";
const LayoutStyled = styled(Layout)`
  background: transparent;
`;
const FormItemStyled = styled(Form.Item)`
  &:last-child {
    margin-bottom: 5px;
  }
`;
const MailOutlinedStyled = styled(MailOutlined)`
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
const InputStyled = styled(Input)`
  &.ant-input-affix-wrapper {
    border-color: transparent;
  }
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: transparent !important;
  }
`;
const CheckboxStyled = styled(Checkbox)`
  color: #fff;
  &.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner {
    border-color: transparent !important;
  }
  &.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: transparent !important;
  }
  &.ant-checkbox:hover,
  .ant-checkbox:hover:focus,
  .ant-checkbox:focus-visible,
  .ant-checkbox-checked:after,
  .ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
    border-color: transparent !important;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background: linear-gradient(
      90deg,
      rgba(203, 43, 134, 1) 0%,
      rgba(155, 30, 124, 1) 35%,
      rgba(99, 16, 105, 1) 100%
    );
    border-color: transparent;
  }
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
const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    user, 
    isError, 
    isSuccess, 
    message,
    userAuthenticated,
    isUserAuthenticatedSuccess,
  } = useSelector(
    (state: any) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  // useEffect(() => {
  //   dispatch(authUser());
  // }, []);
  // useEffect(() => {
  //   if (isUserAuthenticatedSuccess)
  //     if (userAuthenticated !== "Unauthenticated") navigate("/configure/generate");
  // }, [
  //   userAuthenticated, 
  //   isUserAuthenticatedSuccess, 
  // ]);
  useEffect(() => {
    if (isSuccess) {
      api["success"]({
        message: "Sign In Successfully",
        description: "You are successfully sign in!",
      });
      navigate("/configure/generate");
    }
    if (isError)
      api["error"]({
        message: message,
        description: message,
      });
  }, [
    user, 
    isError, 
    isSuccess, 
    message
  ]);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const onFinish = (values: any) => {
    // @ts-ignore
    dispatch(signIn(values));
  };
  return (
    <LayoutStyled>
      {contextHolder}
      <Form
        name="Sign In"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
      >
        <FormItemStyled
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
        </FormItemStyled>
        <FormItemStyled
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
        </FormItemStyled>
        <FormItemStyled>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <CheckboxStyled>Remember me</CheckboxStyled>
          </Form.Item>
        </FormItemStyled>
        <FormItemStyled>
          <ButtonStyled type="primary" htmlType="submit">
            Sign In
          </ButtonStyled>
        </FormItemStyled>
      </Form>
    </LayoutStyled>
  );
};

export default SignInForm;
