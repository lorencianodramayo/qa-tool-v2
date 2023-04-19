// @ts-nocheck
import { Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

const ButtonContainer = styled(Button)`
  border-radius: 20px;
  bottom: ${(props: any) =>
    props.title === "Sign in with Google" ? "unset" : "35px"};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  width: 50%;
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

export default function ButtonComponent({ title, icon }: any) {
  const navigate = useNavigate();
  const fetchAuthUser = async () => {
    const response = await apiService.get("/auth/user").catch((err) => {
      console.log("Not properly authenticated");
    });
    if (response && response.data) {
      console.log("User: ", response.data);
      navigate("/");
    }
  };
  const onClick = async (title: any) => {
    if (title === "Sign Up") navigate("/signup", { replace: true });
    else if (title === "Sign In") navigate("/signin", { replace: true });
    else {
      let timer: NodeJS.Timeout | null = null;
      const googleLoginURL = "http://localhost:5000/api/v1/login/google";
      const newWindow = window.open(
        googleLoginURL,
        "_blank",
        "width=500,height=600"
      );
      if (newWindow) {
        timer = setInterval(() => {
          if (newWindow.closed) {
            console.log("Yay we're authenticated");
            fetchAuthUser();
            if (timer) clearInterval(timer);
          }
        }, 500);
      }
    }
  };

  return (
    <ButtonContainer
      type="primary"
      title={title}
      icon={icon}
      onClick={() => onClick(title)}
    >
      {title}
    </ButtonContainer>
  );
}
