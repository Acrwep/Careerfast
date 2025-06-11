import React from "react";
import { Form, Input } from "antd";
const { Password } = Input;
export default function CommonPasswordField({
  label,
  mandatory,
  name,
  placeholder,
  value,
  error,
  errorMessage,
  message,
  onChange,
  prefix,
  size,
  min,
}) {
  return (
    <div className="commonpassfield">
      <Form.Item
        layout="vertical"
        help={error}
        label={<span style={{ fontWeight: 500 }}>{label}</span>}
        name={name}
        rules={[
          {
            required: mandatory,
          },
          {
            min: min,
          },
        ]}
      >
        <Input.Password
          prefix={prefix}
          placeholder={placeholder}
          size={size}
          value={value}
          className="premium-input"
          onChange={onChange}
        />
      </Form.Item>
      <div
        className={
          error ? "show-premium-input-error" : "hide-premium-input-error"
        }
      >
        <p style={{ color: "red" }}>{label + error}</p>
      </div>
    </div>
  );
}
