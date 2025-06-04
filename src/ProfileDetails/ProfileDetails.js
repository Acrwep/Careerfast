import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Form,
  Steps,
  Divider,
  Input,
  Card,
  Typography,
  Button,
  Avatar,
  Progress,
  Modal,
  Select,
  Flex,
  Checkbox,
  message,
  DatePicker,
  Space,
  Spin
} from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import { Country, State, City } from "country-state-city";
import { auth } from "../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../css/ProfileDetailsPage.css";
import { MdDeleteForever } from "react-icons/md";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

const ProfileDetails = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(25);
  const [emailVerified, setEmailVerified] = useState("");
  const [email, setEmail] = useState("");
  const [numberVerified, setNumberVerified] = useState("");
  const [number, setNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [experienceType, setExperienceType] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const recaptchaContainerRef = useRef(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [recaptchaInitAttempts, setRecaptchaInitAttempts] = useState(0);

  const initializeRecaptcha = useCallback(async () => {
  try {
    // Check if Firebase auth is available
    if (!auth) {
      console.error("Firebase auth not initialized");
      return;
    }

    // Clear existing verifier
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      delete window.recaptchaVerifier;
    }

    // Wait for grecaptcha to be available
    if (!window.grecaptcha || !window.grecaptcha.enterprise) {
      console.log("Waiting for grecaptcha to load...");
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (window.grecaptcha?.enterprise) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    }

    const verifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved");
          setRecaptchaReady(true);
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
          setRecaptchaReady(false);
        }
      },
      auth
    );

    // Verify the verifier was created
    if (!verifier) {
      throw new Error("Failed to create verifier");
    }

    window.recaptchaVerifier = verifier;
    setRecaptchaVerifier(verifier);

    // Force verification
    await verifier.verify();
    setRecaptchaReady(true);
    console.log("reCAPTCHA initialized successfully");

  } catch (error) {
    console.error("reCAPTCHA initialization failed:", error);
    setRecaptchaReady(false);
    // Retry with exponential backoff
    const delay = Math.min(1000 * Math.pow(2, recaptchaInitAttempts), 10000);
    setTimeout(initializeRecaptcha, delay);
  }
}, [auth, recaptchaInitAttempts]);
// 

  useEffect(() => {
    setCountryList(Country.getAllCountries());
    initializeRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, [initializeRecaptcha]);

  useEffect(() => {
  // Load reCAPTCHA script dynamically if not present
  if (!window.recaptchaVerifier) {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => initializeRecaptcha();
    document.body.appendChild(script);
  } else {
    initializeRecaptcha();
  }
}, []);

  const handleCountryChange = (countryCode) => {
    const country = countryList.find((c) => c.isoCode === countryCode);
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setStateList(State.getStatesOfCountry(countryCode));
    setCityList([]);
    form.setFieldsValue({
      country: countryCode,
      state: undefined,
      city: undefined,
    });
  };

  const handleStateChange = (stateName) => {
    const state = stateList.find((s) => s.name === stateName);
    setSelectedState(state);
    form.setFieldsValue({ state: stateName, city: undefined });
    if (selectedCountry && state) {
      const cities = City.getCitiesOfState(
        selectedCountry.isoCode,
        state.isoCode
      );
      setCityList(cities);
      setSelectedCity(null);
    }
  };

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
    form.setFieldsValue({ city: cityName });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const handAvatarClick = () => {
    if (profileImage) setIsModalVisible(true);
  };

  const handleExperienceTypeChange = (value) => setExperienceType(value);
  const handleCheckboxChange = (index, e) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index].currentlyWorking = e.target.checked;
    if (e.target.checked) {
      updatedCompanies[index].endDate = null;
    }
    setCompanies(updatedCompanies);
  };

  const sendOtp = async () => {
    try {
      setOtpSending(true);
      setOtpError(null);

      // Ensure recaptcha is ready
      if (!recaptchaVerifier) {
        message.error("reCAPTCHA not initialized. Please wait...");
        await initializeRecaptcha();
        return;
      }

      let phoneNumber = form.getFieldValue("number");
      if (!phoneNumber) {
        message.error("Please enter a phone number");
        return;
      }

      // Clean and validate phone number
      phoneNumber = phoneNumber.replace(/\D/g, ""); // Remove all non-digit characters

      // Check for valid Indian mobile number
      if (phoneNumber.length !== 10 || !phoneNumber.match(/^[6-9]\d{9}$/)) {
        message.error("Please enter a valid 10-digit Indian mobile number");
        return;
      }

      // Format for Firebase (India country code)
      const formattedPhoneNumber = `+91${phoneNumber}`;

      message.loading("Sending OTP...", 0);

      try {
        // Verify recaptcha is ready
        await recaptchaVerifier.verify();

        const result = await signInWithPhoneNumber(
          auth,
          formattedPhoneNumber,
          recaptchaVerifier
        );

        message.destroy();
        setConfirmationResult(result);
        setOtpModalOpen(true);
        message.success("OTP sent successfully!");
      } catch (error) {
        console.error("OTP send error:", error);
        message.destroy();

        if (error.code === "auth/too-many-requests") {
          message.error("Too many attempts. Please try again later.");
        } else {
          message.error(error.message || "Failed to send OTP");
        }

        // Reset recaptcha
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }
        setRecaptchaReady(false);
        await initializeRecaptcha();
      }
    } catch (error) {
      console.error("Unexpected error in sendOtp:", error);
      message.error("An unexpected error occurred");
    } finally {
      setOtpSending(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setOtpError(null);
      if (!otp || otp.length !== 6) {
        setOtpError("Please enter a valid 6-digit OTP");
        return;
      }

      message.loading("Verifying OTP...", 0);
      await confirmationResult.confirm(otp);

      message.destroy();
      message.success("Phone number verified successfully.");
      setNumberVerified("Verified");
      setOtpModalOpen(false);

      if (currentStep < stepItems.length - 1) {
        setCurrentStep(currentStep + 1);
        setProgress(progress + 25);
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      message.destroy();
      setOtpError("Invalid OTP. Please try again.");
      setOtp("");
    }
  };

  const nextStep = async () => {
    // try {
    //   await form.validateFields();

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const validateNumber = (number) => {
      const phoneRegex = /^[6-9]\d{9}$/;
      return phoneRegex.test(number);
    };

    const emailValue = form.getFieldValue("email");
    if (emailValue && validateEmail(emailValue)) {
      setEmailVerified("Verified");
    } else {
      setEmailVerified("Not Verified");
    }

    const numberValue = form.getFieldValue("number");
    if (numberValue && validateNumber(numberValue)) {
      setNumberVerified("Pending Verification");
    } else {
      setNumberVerified("Not Verified");
    }

    if (currentStep < stepItems.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(progress + 25);
    }
    // } catch (error) {
    //   console.error("Validation failed:", error);
    //   message.error("Please fill in all required fields correctly");
    // }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(progress - 25);
    }
  };

  // add company
  const [companies, setCompanies] = useState([
    {
      companyName: "",
      designation: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
    },
  ]);

  const handleAddCompany = () => {
    setCompanies([
      ...companies,
      {
        companyName: "",
        designation: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ]);
  };

  const handleDeleteCompany = (index) => {
    if (companies.length === 1) return;
    let data = [...companies];
    data.splice(index, 1);
    setCompanies(data);
  };
  //

  const stepItems = [
    {
      title: "Personal Info",
      description: "Add your personal details",
      icon: <UserOutlined />,
      content: (
        <div className="step-content">
          <Card className="premium-card">
            <div className="avatar-section">
              <Avatar
                onClick={handAvatarClick}
                size={80}
                src={profileImage || null}
                icon={!profileImage && <UserOutlined />}
                className="profile-avatar"
              />
              <label className="image_upload" htmlFor="upload-input">
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "block" }}
                  onChange={handleImageChange}
                ></input>
              </label>
              <Button
                type="primary"
                shape="round"
                icon={<EditOutlined />}
                className="edit-btn"
              >
                Edit Photo
              </Button>
              <Modal
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                centered
                style={{ textAlign: "center", padding: 0 }}
              >
                <img
                  src={profileImage}
                  alt="Profile Zoomed"
                  style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
                />
              </Modal>
            </div>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>First Name</span>}
                    name="fname"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your First Name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your fname"
                      className="premium-input"
                    />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>Last Name</span>}
                    name="lname"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Last Name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your lname"
                      className="premium-input"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="form-group">
                <Form.Item
                  layout="vertical"
                  id="email_verified"
                  label={<span style={{ fontWeight: 500 }}>Email Address</span>}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email Address",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="premium-input"
                  />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item
                  layout="vertical"
                  id="number_verified"
                  label={<span style={{ fontWeight: 500 }}>Phone Number</span>}
                  name="number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit Indian mobile number",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="premium-input"
                  />
                </Form.Item>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>Country</span>}
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Country",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select Country"
                      optionFilterProp="children"
                      onChange={handleCountryChange}
                      className="premium-input"
                    >
                      {countryList.map((country) => (
                        <Select.Option
                          key={country.isoCode}
                          value={country.isoCode}
                        >
                          {country.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>State</span>}
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: "Please select your State",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select State"
                      optionFilterProp="children"
                      disabled={!selectedCountry}
                      className="premium-input"
                      onChange={handleStateChange}
                    >
                      {stateList.map((state) => (
                        <Select.Option key={state.isoCode} value={state.name}>
                          {state.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>City</span>}
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Please select your City",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select City"
                      optionFilterProp="children"
                      disabled={!selectedState}
                      className="premium-input"
                      onChange={handleCityChange}
                    >
                      {cityList.map((city) => (
                        <Select.Option key={city.name} value={city.name}>
                          {city.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>Pincode</span>}
                    name="Pincode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Pincode",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Your Pincode"
                      className="premium-input"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="form-group">
                <Form.Item
                  layout="vertical"
                  label={<span style={{ fontWeight: 500 }}>Address</span>}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Address",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Enter Your Address"
                    className="premium-input"
                  />
                </Form.Item>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      title: "Professional Info",
      description: "Add your professional details",
      icon: <SolutionOutlined />,
      content: (
        <div className="step-content">
          <Card className="premium-card">
            <div className="form-section">
              <div className="form-group">
                <Form.Item
                  layout="vertical"
                  label={
                    <span style={{ fontWeight: 500 }}>
                      Fresher / Experience
                    </span>
                  }
                  name="experiencetype"
                  rules={[
                    { required: true, message: "Please enter your job title" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Experience"
                    optionFilterProp="label"
                    className="premium-input"
                    onChange={handleExperienceTypeChange}
                    options={[
                      {
                        value: "Fresher",
                        label: "Fresher",
                      },
                      {
                        value: "Experience",
                        label: "Experience",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
              {(experienceType === "Experience" || experienceType === null) && (
                <div className="forexprience">
                  <div className="form-row">
                    <div className="form-group">
                      <Form.Item
                        layout="vertical"
                        label={
                          <span style={{ fontWeight: 500 }}>
                            Total Years Of Experience
                          </span>
                        }
                        name="yearsexperience"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your job title",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Experience"
                          optionFilterProp="label"
                          className="premium-input"
                          options={[
                            {
                              value: "0 Years",
                              label: "0 Years",
                            },
                            {
                              value: "1 Years",
                              label: "1 Years",
                            },
                            {
                              value: "2 Years",
                              label: "2 Years",
                            },
                            {
                              value: "3 Years",
                              label: "3 Years",
                            },
                            {
                              value: "4 Years",
                              label: "4 Years",
                            },
                            {
                              value: "5 Years",
                              label: "5 Years",
                            },
                            {
                              value: "6 Years",
                              label: "6 Years",
                            },
                            {
                              value: "7 Years",
                              label: "7 Years",
                            },
                            {
                              value: "8 Years",
                              label: "8 Years",
                            },
                            {
                              value: "9 Years",
                              label: "9 Years",
                            },
                            {
                              value: "10 Years",
                              label: "10 Years",
                            },
                            {
                              value: "11 Years",
                              label: "11 Years",
                            },
                          ]}
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <Form.Item
                        layout="vertical"
                        label={
                          <span style={{ fontWeight: 500 }}>
                            Total Months Of Experience
                          </span>
                        }
                        name="experiencemonth"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your job title",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Experience"
                          optionFilterProp="label"
                          className="premium-input"
                          options={[
                            {
                              value: "0 Month",
                              label: "0 Month",
                            },
                            {
                              value: "1 Month",
                              label: "1 Month",
                            },
                            {
                              value: "2 Months",
                              label: "2 Months",
                            },
                            {
                              value: "3 Months",
                              label: "3 Months",
                            },
                            {
                              value: "4 Months",
                              label: "4 Months",
                            },
                            {
                              value: "5 Months",
                              label: "5 Months",
                            },
                            {
                              value: "6 Months",
                              label: "6 Months",
                            },
                            {
                              value: "7 Months",
                              label: "7 Months",
                            },
                            {
                              value: "8 Months",
                              label: "8 Months",
                            },
                            {
                              value: "9 Months",
                              label: "9 Months",
                            },
                            {
                              value: "10 Months",
                              label: "10 Months",
                            },
                            {
                              value: "11 Months",
                              label: "11 Months",
                            },
                            {
                              value: "12 Months",
                              label: "12 Months",
                            },
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="form-group">
                    <Form.Item
                      layout="vertical"
                      label={<span style={{ fontWeight: 500 }}>Job Title</span>}
                      name="jobTitle"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your job title",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Software Engineer"
                        className="premium-input"
                      />
                    </Form.Item>
                  </div>
                  {companies.map((company, index) => (
                    <div className="add-company-section" key={company.id}>
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        {index == 0 ? (
                          ""
                        ) : (
                          <MdDeleteForever
                            onClick={() => handleDeleteCompany(index)}
                            name={["companies", index, "job-delete"]}
                            className="job-delete"
                          />
                        )}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <Form.Item
                            layout="vertical"
                            label={
                              <span style={{ fontWeight: 500 }}>
                                Company name
                              </span>
                            }
                            name={["companies", index, "company"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter your Company name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Tech Corp Inc."
                              className="premium-input"
                            />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <Form.Item
                            layout="vertical"
                            label={
                              <span style={{ fontWeight: 500 }}>
                                Designation
                              </span>
                            }
                            name={["companies", index, "designation"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter your Designation",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter your Designation"
                              className="premium-input"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="from-group">
                          <Form.Item
                            layout="vertical"
                            label={
                              <span style={{ fontWeight: 500 }}>
                                Start Date
                              </span>
                            }
                            name={["companies", index, "startdate"]}
                            rules={[
                              {
                                required: true,
                                message: "Please pick your start date",
                              },
                            ]}
                          >
                            <DatePicker
                              value={startDate}
                              onChange={(date) => setStartDate(date)}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div className="from-group">
                          <Form.Item
                            layout="vertical"
                            label={
                              <span style={{ fontWeight: 500 }}>End Date</span>
                            }
                            name={["companies", index, "enddate"]}
                          >
                            <DatePicker
                              value={endDate}
                              onChange={(date) => setEndDate(date)}
                              disabled={company.currentlyWorking}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="professional-checkbox">
                        <Checkbox
                          checked={company.currentlyWorking}
                          onChange={(e) => handleCheckboxChange(index, e)}
                        >
                          Currently Working?
                        </Checkbox>
                      </div>
                    </div>
                  ))}

                  <div
                    style={{ display: "flex", justifyContent: "end" }}
                    className=""
                  >
                    <Button onClick={handleAddCompany} className="add-btn">
                      Add Company <IoMdAdd className="add-icon" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="form-group">
                <Form.Item
                  layout="vertical"
                  label={<span style={{ fontWeight: 500 }}>Skills</span>}
                  name="skills"
                  rules={[
                    { required: true, message: "Please enter your Skills" },
                  ]}
                >
                  <Select
                    className="premium-input skills-select"
                    mode="tags"
                    placeholder="Enter your skills"
                    open={false}
                    suffixIcon={null}
                  />
                </Form.Item>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      title: "Verification",
      description: "Verify your identity",
      icon: <CreditCardOutlined />,
      content: (
        <div className="step-content">
          <Card className="premium-card">
            <div className="verification-section">
              <div
                className="verification-item"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                {emailVerified === "Verified" ? (
                  <CheckCircleOutlined
                    style={{ color: "green", fontSize: 20 }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{
                      color: emailVerified ? "red" : "gray",
                      fontSize: 20,
                    }}
                  />
                )}
                <Text strong>Email Verification</Text>
                <Text
                  type={
                    emailVerified === "Verified"
                      ? "success"
                      : emailVerified
                      ? "danger"
                      : "secondary"
                  }
                  style={{ marginLeft: "auto" }}
                >
                  {emailVerified || "Not Checked"}
                </Text>
              </div>
              <Divider />
              <div
                className="verification-item"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                {numberVerified === "Verified" ? (
                  <CheckCircleOutlined
                    style={{ color: "green", fontSize: 20 }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{
                      color:
                        numberVerified &&
                        numberVerified !== "Pending Verification"
                          ? "red"
                          : "gray",
                      fontSize: 20,
                    }}
                  />
                )}
                <Text strong>Phone Verification</Text>
                <Text
                  type={
                    numberVerified === "Verified"
                      ? "success"
                      : numberVerified === "Pending Verification"
                      ? "warning"
                      : numberVerified
                      ? "danger"
                      : "secondary"
                  }
                  style={{ marginLeft: "auto" }}
                >
                  {numberVerified || "Not Checked"}
                </Text>
              </div>
              <div
                id="recaptcha-container"
                ref={recaptchaContainerRef}
                style={{ display: "none" }}
              ></div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      title: "Completion",
      description: "Profile setup complete",
      icon: <CheckCircleOutlined />,
      content: (
        <div className="step-content">
          <Card className="premium-card completion-card">
            <div className="completion-content">
              <CheckCircleOutlined className="success-icon" />
              <Title level={3}>Profile Setup Complete!</Title>
              <Text type="secondary">
                Your profile has been successfully set up. You can now access
                all features.
              </Text>
              <Button type="primary" size="large" className="dashboard-btn">
                Go to Dashboard <ArrowRightOutlined />
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="profile-details-container">
      <div className="profile-header">
        <Title level={2}>Complete Your Profile</Title>
        <Text type="secondary">
          Follow these steps to set up your professional profile
        </Text>
      </div>

      <div className="progress-container">
        <Progress percent={progress} strokeColor="#8d3ffb" showInfo={false} />
        <Text strong>{progress}% Complete</Text>
      </div>
      <Form
        form={form}
        layout="vertical"
        name="multi-step-form"
        className="multi-step-form"
      >
        <Steps
          current={currentStep}
          items={stepItems.map((item) => ({
            title: item.title,
            description: item.description,
            icon: item.icon,
          }))}
          className="premium-steps"
        />

        <Divider className="section-divider" />

        <div className="step-content-container">
          {stepItems[currentStep].content}
        </div>

        <div className="navigation-buttons">
          {currentStep > 0 && (
            <Button
              size="large"
              onClick={prevStep}
              className="nav-btn prev-btn"
            >
              Previous
            </Button>
          )}

          {currentStep === 2 ? (
            <Button
              type="primary"
              size="large"
              onClick={sendOtp}
              className="nav-btn next-btn"
              disabled={
                numberVerified === "Verified" || !recaptchaReady || otpSending
              }
              loading={otpSending}
            >
              {numberVerified === "Verified" ? (
                "Verified"
              ) : otpSending ? (
                "Sending OTP..."
              ) : recaptchaReady ? (
                "Send OTP"
              ) : (
                <>
                  <Spin size="small" style={{ marginRight: 8 }} />
                  Preparing verification...
                </>
              )}
            </Button>
          ) : currentStep < stepItems.length - 1 ? (
            <Button
              type="primary"
              size="large"
              onClick={nextStep}
              className="nav-btn next-btn"
            >
              Next Step
            </Button>
          ) : null}
        </div>
        <Modal
          title="Enter OTP"
          open={otpModalOpen}
          onCancel={() => {
            setOtpModalOpen(false);
            setOtp("");
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setOtpModalOpen(false);
                setOtp("");
              }}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={verifyOtp}
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>,
          ]}
        >
          <Input.OTP
            value={otp}
            onChange={setOtp}
            length={6}
            inputType="number"
            style={{ justifyContent: "center" }}
          />
          {otpError && (
            <div style={{ color: "red", marginTop: 10 }}>{otpError}</div>
          )}
        </Modal>
      </Form>
    </div>
  );
};

export default ProfileDetails;
