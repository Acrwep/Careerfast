import React, { useState } from "react";
import "../css/RegisterPage.css";
import { FcGoogle } from "react-icons/fc";
import { Input } from "antd";

import {
  FiUser,
  FiPhone,
  FiMail,
  FiLock,
  FiBriefcase,
  FiHome,
} from "react-icons/fi";
import {
  nameValidation,
  phoneValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  orgNameValidation,
  orgTypeValidation,
} from "../Common/Validation";

export default function Register() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [orgName, setorgName] = useState("");
  const [orgNameError, setorgNameError] = useState("");
  const [orgType, setorgType] = useState("");
  const [orgTypeError, setorgTypeError] = useState("");
  const [role, setRole] = useState("candidate");
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    gender: "",
    confirmPassword: "",
    orgName: "",
    orgType: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = nameValidation(name);
    const phoneErr = phoneValidation(phone);
    const emailErr = emailValidation(email);
    const passwordErr = passwordValidation(password);
    const cofirmpasswordErr = passwordValidation(password);
    const orgNameErr = orgNameValidation(orgName);
    const orgTypeErr = orgTypeValidation(orgType);

    setNameError(nameErr);
    setPhoneError(phoneErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(cofirmpasswordErr);
    setorgNameError(orgNameErr);
    setorgTypeError(orgTypeErr);

    if (
      nameErr ||
      phoneErr ||
      emailErr ||
      passwordErr ||
      cofirmpasswordErr ||
      orgNameErr ||
      orgTypeErr
    )
      return;
  };

  return (
    <div className="premium-register-container">
      <div className="premium-register-card">
        <div className="premium-register-header">
          <h2 onClick={() => console.log(name, nameError)}>
            Create Your Account
          </h2>
          <p>Join us today and unlock amazing opportunities</p>
        </div>

        <div className="premium-role-switcher">
          <button
            className={`premium-role-btn ${
              role === "candidate" ? "active" : ""
            }`}
            onClick={() => setRole("candidate")}
          >
            <FiUser className="role-icon" />
            <span>Candidate</span>
          </button>
          <button
            className={`premium-role-btn ${
              role === "recruiter" ? "active" : ""
            }`}
            onClick={() => setRole("recruiter")}
          >
            <FiBriefcase className="role-icon" />
            <span>Recruiter</span>
          </button>
        </div>

        <button className="premium-google-btn">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <div className="premium-divider">
          <span className="divider-line"></span>
          <span className="divider-text">OR</span>
          <span className="divider-line"></span>
        </div>

        <form className="premium-register-form">
          <div className="premium-input-group">
            <Input
              className="register-input"
              value={name}
              size="large"
              status={nameError ? "error" : ""}
              placeholder="Enter your name"
              prefix={<FiUser />}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(nameValidation(e.target.value));
              }}
            />
            {nameError && <div className="error-message">{nameError}</div>}
          </div>

          <div className="premium-input-group">
            <Input
              className="register-input"
              size="large"
              placeholder="Mobile Number"
              status={phoneError ? "error" : ""}
              prefix={<FiPhone />}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(phoneValidation(e.target.value));
              }}
            />
            {phoneError && <div className="error-message">{phoneError}</div>}
          </div>

          <div className="premium-input-group">
            <Input
              className="register-input"
              size="large"
              placeholder="Email ID"
              status={emailError ? "error" : ""}
              prefix={<FiMail />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(emailValidation(e.target.value));
              }}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          {role === "recruiter" && (
            <>
              <div className="premium-input-group">
                <Input
                  type="text"
                  name="orgName"
                  className="register-input"
                  value={orgName}
                  size="large"
                  placeholder="Organization Name"
                  prefix={<FiBriefcase />}
                  status={orgNameError ? "error" : ""}
                  onChange={(e) => {
                    setorgName(e.target.value);
                    setorgNameError(orgNameValidation(e.target.value));
                  }}
                />
                {orgNameError && (
                  <div className="error-message">{orgNameError}</div>
                )}
              </div>
              <div className="premium-input-group">
                <Input
                  type="text"
                  className="register-input"
                  name="orgType"
                  value={orgType}
                  size="large"
                  status={orgTypeError ? "error" : ''}
                  placeholder="Organization Type"
                  prefix={<FiHome />}
                  onChange={(e) => {
                    setorgType(e.target.value);
                    setorgTypeError(orgTypeValidation(e.target.value));
                  }}
                />
                {orgTypeError && (
                  <div className="error-message">{orgTypeError}</div>
                )}
              </div>
            </>
          )}

          <div className="premium-input-group">
            <Input.Password
              size="large"
              className="register-input"
              placeholder="Password"
              prefix={<FiLock />}
              status={passwordError ? "error" : ""}
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                setPasswordError(passwordValidation(val));
                if (confirmPassword) {
                  setConfirmPasswordError(
                    confirmPasswordValidation(val, confirmPassword)
                  );
                }
              }}
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>

          <div className="premium-input-group">
            <Input.Password
              size="large"
              className="register-input"
              placeholder="Confirm Password"
              prefix={<FiLock />}
              value={confirmPassword}
              status={confirmPasswordError ? "error" : ""}
              onChange={(e) => {
                const val = e.target.value;
                setConfirmPassword(val);
                setConfirmPasswordError(
                  confirmPasswordValidation(password, val)
                );
              }}
            />
            {confirmPasswordError && (
              <div className="error-message">{confirmPasswordError}</div>
            )}
          </div>

          <button
            type="submit"
            className="premium-submit-btn"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>

        <div className="premium-login-link">
          Already have an account?{" "}
          <a href="/login" className="premium-login-anchor">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
