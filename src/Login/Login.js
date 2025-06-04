import React, { useState } from "react";
import {
  Tabs,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Card,
  Divider,
  message,
  Col,
  Row,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "../css/LoginPage.css";
import loginImage from "../images/login_image.png";
import Header from "../Header/Header";

const { Title, Text, Link } = Typography;

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("candidate");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success(
        `Welcome back, ${
          activeTab === "candidate" ? "Candidate" : "Recruiter"
        }!`
      );
      form.resetFields();
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabItems = [
    {
      key: "candidate",
      label: (
        <span className="tab-label" style={{ padding: "0 24px" }}>
          Candidate Login
        </span>
      ),
    },
    {
      key: "recruiter",
      label: (
        <span className="tab-label" style={{ padding: "0 24px" }}>
          Recruiter Login
        </span>
      ),
    },
  ];

  return (
    <div className="loginpage_container">
      <Row>
        <Col span={12}>
          {" "}
          <div className="floating_circle1"></div>
          <div className="login-animation">
            <Card className="login_card" bordered={false}>
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                {/* <img
                  className="career-fast-logo"
                  src="https://workstatus.qubinex.com/static/media/logo-re-3.c9213a795657103d1ce1.png"
                  alt="CareerFast Pro"
                /> */}
                <Title
                  level={2}
                  style={{ marginBottom: 8, fontWeight: 700, color: "#2d3748" }}
                >
                  Welcome to CareerFast
                </Title>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  Accelerate your{" "}
                  {activeTab === "candidate"
                    ? "career journey"
                    : "hiring process"}
                </Text>
              </div>

              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                centered
                size="large"
                tabBarStyle={{ marginBottom: 32 }}
                items={tabItems}
              />

              <Form
                form={form}
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                scrollToFirstError
              >
                <Form.Item
                  label={<span style={{ fontWeight: 500 }}>Email</span>}
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={
                      <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="your@email.com"
                    size="large"
                    className="premium-input"
                  />
                </Form.Item>

                <Form.Item
                  label={<span style={{ fontWeight: 500 }}>Password</span>}
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="••••••••"
                    size="large"
                    className="premium-input"
                  />
                </Form.Item>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 24,
                    marginTop: 30,
                  }}
                >
                  <Form.Item name="remember" noStyle>
                    <Checkbox style={{ fontWeight: 500 }}>Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    style={{ color: "#8d3ffb", fontWeight: 500 }}
                    href="#"
                    className="hover-underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={isLoading}
                    className="premium-button"
                  >
                    {isLoading
                      ? "Authenticating..."
                      : `Continue as ${
                          activeTab === "candidate" ? "Candidate" : "Recruiter"
                        }`}
                  </Button>
                </Form.Item>

                <Divider style={{ color: "rgba(0,0,0,0.25)", fontSize: 14 }}>
                  or continue with
                </Divider>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 16,
                    marginBottom: 24,
                  }}
                >
                  <Button
                    shape="circle"
                    size="large"
                    className="social-button"
                    icon={
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                        alt="Google"
                        style={{ width: 20 }}
                      />
                    }
                  />
                  <Button
                    shape="circle"
                    size="large"
                    className="social-button"
                    icon={
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                        alt="Facebook"
                        style={{ width: 20 }}
                      />
                    }
                  />
                  <Button
                    shape="circle"
                    size="large"
                    className="social-button"
                    icon={
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                        alt="Instagram"
                        style={{ width: 20 }}
                      />
                    }
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <Text type="secondary" style={{ fontSize: 15 }}>
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      style={{ color: "#8d3ffb", fontWeight: 600 }}
                      className="hover-underline"
                    >
                      Sign up now
                    </Link>
                  </Text>
                </div>
              </Form>
            </Card>
          </div>
        </Col>

        <Col span={12}>
          {" "}
          <div className="login_image">
            <img src={loginImage}></img>
          </div>
          <div className="floating_circle2"></div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
