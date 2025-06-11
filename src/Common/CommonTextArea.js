import React from "react";
import TextArea from "antd/es/input/TextArea";
import { label, style } from "framer-motion/client";
import { message, Form } from "antd";
export default function CommonTextArea({
  placeholder,
  name,
  mandatory,
  value,
  errormessage,
  label,
  message,
  onChange,
  clasname = "premium-input",
  text,
  style,
}) {
  return (
    <div className="commontextarea">
      <Form.Item
        layout="vertical"
        label={<span style={{ fontWeight: 500 }}>{label}</span>}
        name={name}
        rules={[
          {
            required: { mandatory },
            message:
              errormessage || `Please select your ${label?.toLowerCase()}`,
          },
        ]}
      >
        <TextArea
          style={style}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          className="premium-input"
        />
      </Form.Item>
    </div>
  );
}
