// @ts-nocheck
import { Col } from "antd";
import styled from "styled-components";

const ColumnContainer = styled.div`
  position: ${(props) => props.columnstyle.position};
  height: ${(props) => props.columnstyle.height};
  background-image: url(${(props) => props.columnstyle.backgroundImage});
  background-size: ${(props) => props.columnstyle.backgroundSize};
  display: ${(props) => props.columnstyle.flex};
  width: ${(props) => props.columnstyle.width};
  border-top-right-radius: ${(props) => props.columnstyle.rightRadius};
  border-bottom-right-radius: ${(props) => props.columnstyle.rightRadius};
  border-top-left-radius: ${(props) => props.columnstyle.leftRadius};
  border-bottom-left-radius: ${(props) => props.columnstyle.leftRadius}; ;
`;

export default function ColumnComponent({ columnstyle, children }) {
  return (
    <ColumnContainer columnstyle={columnstyle}>{children}</ColumnContainer>
  );
}
