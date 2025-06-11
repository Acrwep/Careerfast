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
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import "../css/LoginPage.css";
import loginImage from "../images/login_image.png";
import { useNavigate } from "react-router-dom";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  phoneValidation,
  confirmPasswordValidation,
  orgNameValidation,
  orgTypeValidation,
} from "../Common/Validation";
import CommonInputField from "../Common/CommonInputField";
import CommonPasswordField from "../Common/CommonPasswordField";

const { Title, Text, Link } = Typography;

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState("candidate");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    orgName: "",
    orgType: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    orgName: "",
    orgType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    let validator;
    switch (field) {
      case "name":
        validator = nameValidator;
        break;
      case "phone":
        validator = phoneValidation;
        break;
      case "email":
        validator = emailValidator;
        break;
      case "password":
        validator = passwordValidator;
        break;
      case "confirmPassword":
        validator = (val) => confirmPasswordValidation(formData.password, val);
        break;
      case "orgName":
        validator = orgNameValidation;
        break;
      case "orgType":
        validator = orgTypeValidation;
        break;
      default:
        validator = () => "";
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validator(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const newErrors = {
      name: nameValidator(formData.name),
      phone: phoneValidation(formData.phone),
      email: emailValidator(formData.email),
      password: passwordValidator(formData.password),
      confirmPassword: confirmPasswordValidation(
        formData.password,
        formData.confirmPassword
      ),
      orgName:
        activeTab === "recruiter" ? orgNameValidation(formData.orgName) : "",
      orgType:
        activeTab === "recruiter" ? orgTypeValidation(formData.orgType) : "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      message.success("Registration successful!");
      navigate("/login");
    }, 3000);
  };

  const tabItems = [
    {
      key: "candidate",
      label: (
        <span className="tab-label" style={{ padding: "0 24px" }}>
          Candidate Registration
        </span>
      ),
    },
    {
      key: "recruiter",
      label: (
        <span className="tab-label" style={{ padding: "0 24px" }}>
          Recruiter Registration
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
          <div style={{ height: 870 }} className="login-animation">
            <Card className="login_card" bordered={false}>
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <Title
                  level={2}
                  style={{ marginBottom: 8, fontWeight: 700, color: "#2d3748" }}
                >
                  Join CareerFast!
                </Title>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  {activeTab === "candidate"
                    ? "Start your career journey with us"
                    : "Find the best talent for your organization"}
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
                className="login_form"
                layout="vertical"
                onSubmitCapture={handleSubmit}
              >
                <div style={{ marginBottom: "0px" }}>
                  <CommonInputField
                    label="Full Name"
                    name="name"
                    mandotary={true}
                    placeholder="Enter your full name"
                    prefix={
                      <UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
                    }
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                  />
                </div>

                <div style={{ marginBottom: "0px" }}>
                  <CommonInputField
                    label="Phone Number"
                    name="phone"
                    mandotary={true}
                    placeholder="Enter your phone number"
                    prefix={
                      <PhoneOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
                    }
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    error={errors.phone}
                  />
                </div>

                <div style={{ marginBottom: "0px" }}>
                  <CommonInputField
                    label="Email"
                    name="email"
                    mandotary={true}
                    placeholder="Enter your email"
                    prefix={
                      <MailOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
                    }
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                  />
                </div>

                {activeTab === "recruiter" && (
                  <>
                    <div className="form-row">
                      <div style={{ marginBottom: "0px" }}>
                        <CommonInputField
                          label="Organization Name"
                          name="orgName"
                          mandotary={true}
                          placeholder="Enter your organization name"
                          prefix={
                            <HomeOutlined
                              style={{ color: "rgba(0, 0, 0, 0.25)" }}
                            />
                          }
                          value={formData.orgName}
                          onChange={(e) =>
                            handleInputChange("orgName", e.target.value)
                          }
                          error={errors.orgName}
                        />
                      </div>
                      <div style={{ marginBottom: "0px" }}>
                        <CommonInputField
                          label="Organization Type"
                          name="orgType"
                          mandotary={true}
                          placeholder="E.g., IT, Healthcare, Finance"
                          prefix={
                            <SolutionOutlined
                              style={{ color: "rgba(0, 0, 0, 0.25)" }}
                            />
                          }
                          value={formData.orgType}
                          onChange={(e) =>
                            handleInputChange("orgType", e.target.value)
                          }
                          error={errors.orgType}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="form-row">
                  <div style={{ marginBottom: "0px" }}>
                    <CommonPasswordField
                      label="Password"
                      name="password"
                      placeholder="••••••••"
                      prefix={
                        <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      error={errors.password}
                      mandatory={true}
                      min={8}
                    />
                  </div>

                  <div style={{ marginBottom: "0px" }}>
                    <CommonPasswordField
                      label="Confirm Password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      prefix={
                        <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      error={errors.confirmPassword}
                      mandatory={true}
                      min={8}
                    />
                  </div>
                </div>

                {/* <div style={{ marginBottom: 14, marginTop: 30 }}>
                  <Form.Item name="terms" valuePropName="checked">
                    <Checkbox style={{ fontWeight: 500 }}>
                      I agree to the <Link href="#">Terms of Service</Link> and{" "}
                      <Link href="#">Privacy Policy</Link>
                    </Checkbox>
                  </Form.Item>
                </div> */}

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
                      ? "Registering..."
                      : `Create ${
                          activeTab === "candidate" ? "Candidate" : "Recruiter"
                        } Account`}
                  </Button>
                </Form.Item>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Text type="secondary" style={{ fontSize: 15 }}>
                    Already have an account? 
                    <Link
                      href="/login"
                      style={{ color: "#8d3ffb", fontWeight: 600 }}
                      className="hover-underline"
                    >
                       Sign in now
                    </Link>
                  </Text>
                </div>
              </Form>
            </Card>
          </div>
        </Col>

        <Col span={12}>
          {" "}
          <div style={{ height: 870 }} className="login_image">
            <img src={loginImage} alt="Registration illustration"></img>
          </div>
          <div className="floating_circle2"></div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
