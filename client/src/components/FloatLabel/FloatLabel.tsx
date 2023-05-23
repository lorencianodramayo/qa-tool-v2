import styled from "styled-components";
import { useEffect, useState } from "react";
import { Input, Select, Space } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

import "./FloatLabel.css";

const InputComponent = styled(Input)`
  &.ant-input-compact-item {
    border-color: #d9d9d9;
    box-shadow: unset;
  }
  &.ant-input-compact-item:hover,
  .ant-input-compact-item:focus,
  .ant-input-compact-item:active {
    z-index: unset;
    border-color: #d9d9d9;
    box-shadow: unset;
    border-color: #d9d9d9;
  }
`;

const InputTextAreaComponent = styled(Input.TextArea)`
  &.ant-input-compact-item {
    border-color: #d9d9d9;
    box-shadow: unset;
  }
  &.ant-input-compact-item:hover,
  .ant-input-compact-item:focus,
  .ant-input-compact-item:active {
    z-index: unset;
    border-color: #d9d9d9;
    box-shadow: unset;
    border-color: #d9d9d9;
  }
`;

const SelectComponent = styled(Select)`
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    z-index: unset;
    border-color: #d9d9d9 !important;
    box-shadow: unset !important;
    span.ant-select-selection-item span {
      display: none;
    }
  }
  &.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(
      .ant-pagination-size-changer
    ):hover
    .ant-select-selector {
    border-color: #d9d9d9;
    box-shadow: unset;
  }
  &.ant-select-disabled:where(
      .css-dev-only-do-not-override-ixblex
    ).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: unset;
    background: unset;
  }
`;

// const SelectOptionComponent = styled(Select.Option)`
//   &.ant-select-item
//     ant-select-item-option
//     ant-select-item-option-active
//     ant-select-item-option-selected {
//     color: blue;
//   }
//   &.ant-select-dropdown
//     .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
//     color: blue;
//   }
// `;

const FloatLabel = (props) => {
  const [focus, setFocus] = useState(false);
  let {
    style,
    label,
    value,
    placeholder,
    type,
    required,
    input,
    select,
    selectOptions,
    templateItem,
    showArrow,
    textArea,
    rows,
  } = props;
  if (!placeholder) placeholder = label;
  const isOccupied = focus || (value && value.length !== 0);
  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";
  const requiredMark = required ? <span className="text-danger">*</span> : null;
  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {input && (
        <InputComponent
          style={{ width: style.width }}
          onChange={props.onChange}
          type={type}
          defaultValue={value}
        />
      )}
      {textArea && (
        <InputTextAreaComponent
          style={{ width: style.width }}
          onChange={props.onChange}
          defaultValue={value}
          rows={rows}
        />
      )}
      {select && (
        <SelectComponent
          showSearch
          style={{ width: style.width, marginRight: style.marginRight }}
          value={value}
          // defaultValue={value}
          onChange={props.onChange}
          showArrow={showArrow ? true : false}
          disabled={!showArrow ? true : false}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        >
          {selectOptions.map((item, key) => (
            <Select.Option
              className="selectVersionOptions"
              key={key}
              value={item.value}
              label={item.label}
            >
              {templateItem ? (
                item.label
              ) : (
                <Space
                  wrap
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Space.Compact block>{item.label}</Space.Compact>
                    <Space.Compact block>
                      <CheckCircleFilled
                        style={{ fontSize: "18px", color: "#66bb6a" }}
                      />
                    </Space.Compact>
                </Space>
              )}
            </Select.Option>
          ))}
        </SelectComponent>
      )}
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default FloatLabel;
