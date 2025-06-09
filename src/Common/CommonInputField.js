import React from "react";
import { Input, Form } from "antd";
import { pattern } from "framer-motion/client";

export default function CommonInputField({
  label,
  mandotary,
  onChange,
  error,
  placeholder,
  type,
  pattern,
  value,
  name,
  onPressEnter,
}) {
  return (
    <div className="commoninputfield">
      <Form.Item
        layout="vertical"
        label={
          <span style={{ fontWeight: 500 }}>
            <span className="mandatory_star"
              style={{
                color: "red",
                fontSize: 14,
                fontFamily: "SimSun,sans-serif",
              }}
            >
              * </span>{label}
          </span>
        }
        // name="hiring"
        rules={[
          {
            required: mandotary,
          },
        ]}
      >
        <Input
          name={name}
          placeholder={placeholder}
          className={error ? "premium-input-error" : "premium-input"}
          onChange={onChange}
          type={type}
          pattern={pattern}
          value={value}
          onPressEnter={onPressEnter}
        />
      </Form.Item>
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
}
