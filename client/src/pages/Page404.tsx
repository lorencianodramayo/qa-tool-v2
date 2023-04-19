// @ts-nocheck
import { Link as RouterLink } from "react-router-dom";

import { Space } from "antd";

export default function Page404() {
  return (
    <Space wrap>
      <RouterLink to="/">Go to Home</RouterLink>
    </Space>
  );
}
