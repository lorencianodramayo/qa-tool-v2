// @ts-nocheck
import styled from "styled-components";
import logo from "../assets/smartly.svg";

const LogoContainer = styled.div`
  left: ${(props) => props.logoStyles.left};
  right: ${(props) => props.logoStyles.right};
  margin-left: ${(props) => props.logoStyles.marginLeft};
  margin-right: ${(props) => props.logoStyles.marginRight};
  background-image: url(${logo}), none;
  position: ${(props) => props.logoStyles.position};
  background-repeat: ${(props) => props.logoStyles.backgroundRepeat};
  background-size: ${(props) => props.logoStyles.backgroundSize};
  height: ${(props) => props.logoStyles.height};
  width: ${(props) => props.logoStyles.width};
  top: ${(props) => props.logoStyles.top};
`;

export default function LogoComponent({ logoStyles }) {
  return <LogoContainer logoStyles={logoStyles} />;
}
