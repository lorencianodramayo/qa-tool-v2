// @ts-nocheck
import { Space } from "antd";
import { useEffect } from "react";

export default function GoogleSSOSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <Space wrap>GoogleSSOSuccess</Space>;
}
