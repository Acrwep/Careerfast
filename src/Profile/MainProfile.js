import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Progress,
  Card,
  Avatar,
  Button,
  Space,
  Divider,
  Tag,
  Tooltip,
  Drawer,
  Upload,
  Typography,
  Input,
  Form,
  Select,
  Row,
  Col,
  DatePicker,
  message,
} from "antd";
import {
  StarOutlined,
  EyeOutlined,
  LinkOutlined,
  EditOutlined,
  CheckCircleFilled,
  PlusOutlined,
  UploadOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { IoIosMale } from "react-icons/io";
import { IoFemaleOutline } from "react-icons/io5";
import { MdOutlineNotInterested } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { GiOfficeChair } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { GiNewShoot } from "react-icons/gi";
import "../css/Profile.css";
import { FaFacebookF } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { FaFigma } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";
import { LiaSchoolSolid } from "react-icons/lia";
import profile1 from "../images/profile1.webp";
import profile2 from "../images/profile2.webp";
import profile3 from "../images/profile3.webp";
import profile5 from "../images/profile5.webp";
import profile6 from "../images/profile6.webp";
import profile7 from "../images/profile7.webp";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, subDays, format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import TextArea from "antd/es/input/TextArea";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
import { label } from "framer-motion/client";
import CommonTextArea from "../Common/CommonTextArea";
const { Title, Text } = Typography;
const { Dragger } = Upload;

// Calculate streaks
const currentStreak = 2;
const maxStreak = 3;

const { Header, Sider, Content } = Layout;
const { Meta } = Card;

const items = [
  { key: "basic", label: "Basic Details" },
  { key: "resume", label: "Resume" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Work Experience" },
  // { key: "initiatives", label: "Accomplishments & Initiatives" },
  // { key: "responsibilities", label: "Responsibilities" },
  { key: "certification", label: "Certifications" },
  { key: "projects", label: "Projects" },
  // { key: "personalDetails", label: "Personal Details" },
  { key: "sociallinks", label: "Social Links" },
];

const suggestions = [
  "Deep Learning",
  "Tone of Voice",
  "CRM Proficiency",
  "E-Discovery",
  "Embedded Programming",
  "GDPR Compliance",
  "Medical Malpractice",
  "Remote Access",
  "Education Law",
  "Substance Designer",
];

const drawerContentStyle = {
  display: "flex",
  gap: "24px",
};

const onChangeDate = (date, dateString) => {
  console.log(date, dateString); // date is a moment object, dateString is formatted string
};

export default function MainProfile() {
  const [collapsed, setCollapsed] = useState(false);
  const [certifications, setCertification] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [sideBar, setSideBar] = useState("watchlist");
  const [aboutText, setAboutText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [fileName, setFileName] = useState("");
  const [userTypeactiveButton, setUserTypeActiveButton] = useState(null);
  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [lateral, setLateral] = useState(null);

  const handleLateralTypeChange = (value) => {
    setLateral(value);
    console.log("Selected Lateral Entry Option:", value);
  };

  const today = new Date();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const storedAvatar = localStorage.getItem("profileAvatar");
    if (storedAvatar) {
      setAvatarUrl(storedAvatar);
    }

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const streakData = [
    { date: "2025-05-08", count: 4 },
    { date: "2025-05-18", count: 1 },
    { date: "2025-05-19", count: 1 },
    { date: "2025-05-20", count: 1 },
    { date: "2025-05-30", count: 1 },
    { date: "2025-05-31", count: 1 },
  ];

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    if (value.count >= 3) return "color-scale-3";
    if (value.count >= 2) return "color-scale-2";
    return "color-scale-1";
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleCustomSkillAdd = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
      setCustomSkill("");
    }
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton((prev) => buttonId);
  };

  const handleUserTypeClick = (buttonId) => {
    setUserTypeActiveButton((prev) => buttonId);
  };

  const [purpose, setPurpose] = useState(null);
  const handlePurposeClick = (buttonId) => {
    setPurpose((prev) => buttonId);
  };

  const [Class, setClass] = useState(null);
  const handleClassClick = (buttonId) => {
    setClass((prev) => buttonId);
  };

  const handleCertification = ({ file }) => {
    console.log("fileee", file);

    setCertification([file]);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleUpload = (info) => {
    const file = info.file.originFileObj || info.file;
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setAvatarUrl(imageDataUrl);
        localStorage.setItem("profileAvatar", imageDataUrl);
        message.success("Profile image updated!");
      };
      reader.readAsDataURL(file);
    } else {
      message.error("Please upload a valid image file");
    }
  };

  const handleRemove = () => {
    setAvatarUrl(defaultAvatar);
    localStorage.removeItem("profileAvatar");
    message.error("Profile image removed.");
  };
  // --- Tab Content Components ---
  const TabContent = {
    basic: () => (
      <div>
        <div className="form-row">
          <div className="form-group">
            <CommonInputField
              name="fname"
              label="First Name"
              mandotary={true}
              placeholder="Enter your first name"
              type="text"
              // error={"Please enter your first name"}
            />
          </div>
          <div className="form-group">
            <CommonInputField
              name="lname"
              label="Last Name"
              mandotary={true}
              placeholder="Enter your Last Name"
              type="text"
              // error={"Please enter your Last Name"}
            />
          </div>
        </div>

        <div className="form-group">
          <CommonInputField
            name="Username"
            label="Username"
            mandotary={true}
            placeholder="Enter your Username"
            type="text"
            // error={"Please enter your Username"}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <CommonInputField
              name="email"
              label="Email"
              mandotary={true}
              placeholder="Enter your Email"
              type="email"
              // error={"Please enter your Email"}
            />
          </div>
          <div className="form-group">
            {/* <Form.Item
              layout="vertical"
              label={<span style={{ fontWeight: 500 }}>Mobile</span>}
              name="Mobile"
              rules={[
                {
                  required: true,
                  message: "Please enter your Mobile",
                },
              ]}
            >
              <Input placeholder="Enter your lname" className="premium-input" />
            </Form.Item> */}

            <CommonInputField
              name="Mobile"
              label="Mobile"
              mandotary={true}
              placeholder="Enter your mobile"
              type="tel"
              pattern={/^[6-9]\d{9}$/}
              // error={"Please enter your mobile"}
            />
          </div>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Gender</span>}
            name="gender"
            rules={[
              {
                required: true,
                message: "Please Select your Gender",
              },
            ]}
          >
            <div className="job_nature">
              <button
                type="button"
                className={
                  activeButton === "Male"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleButtonClick("Male")}
              >
                <IoIosMale /> Male
              </button>

              <button
                type="button"
                className={
                  activeButton === "Female"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleButtonClick("Female")}
              >
                <IoFemaleOutline /> Female
              </button>

              <button
                type="button"
                className={
                  activeButton === "Others"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleButtonClick("Others")}
              >
                <MdOutlineNotInterested /> Others
              </button>
            </div>
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>User Type </span>}
            name="usertype"
            rules={[
              {
                required: true,
                message: "Please Select your User Type ",
              },
            ]}
          >
            <div className="job_nature">
              <button
                type="button"
                className={
                  userTypeactiveButton === "Collage Student"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleUserTypeClick("Collage Student")}
              >
                <LuGraduationCap /> Collage Student
              </button>

              <button
                type="button"
                className={
                  userTypeactiveButton === "Professional"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleUserTypeClick("Professional")}
              >
                <GiOfficeChair /> Professional
              </button>

              <button
                type="button"
                className={
                  userTypeactiveButton === "School Student"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleUserTypeClick("School Student")}
              >
                <PiStudent /> School Student
              </button>

              <button
                type="button"
                className={
                  userTypeactiveButton === "Fresher"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleUserTypeClick("Fresher")}
              >
                <GiNewShoot /> Fresher
              </button>
            </div>
          </Form.Item>
        </div>

        <div className="">
          {(userTypeactiveButton === "Collage Student" ||
            userTypeactiveButton === "Fresher") && (
            <>
              <div className="form-group">
                <CommonSelectField
                  label="Course"
                  name="course"
                  mandatory={true}
                  placeholder="Select Course"
                  showSearch={true}
                />
              </div>

              <div style={{ alignItems: "center" }} className="form-row">
                <div className="form-group">
                  <CommonInputField
                    name="startyear"
                    label="Start Year"
                    mandotary={true}
                    placeholder="Enter your Start Year"
                    type="date"
                    // error={"Please enter your Start Year"}
                  />
                </div>

                <div className="form-group">
                  <CommonInputField
                    name="endyear"
                    label="End Year"
                    mandotary={true}
                    placeholder="Enter your End Year"
                    type="date"
                    // error={"Please enter your End Year"}
                  />
                </div>
              </div>
            </>
          )}

          {userTypeactiveButton === "School Student" && (
            <>
              <Form.Item
                layout="vertical"
                label={<span style={{ fontWeight: 500 }}>Class</span>}
                name="usertype"
                rules={[
                  {
                    required: true,
                    message: "Please Select your Class",
                  },
                ]}
              >
                <div className="job_nature">
                  <button
                    type="button"
                    className={
                      Class === "1"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("1")}
                  >
                    <LiaSchoolSolid /> 1
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "2"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("2")}
                  >
                    <LiaSchoolSolid /> 2
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "3"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("3")}
                  >
                    <LiaSchoolSolid /> 3
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "4"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("4")}
                  >
                    <LiaSchoolSolid /> 4
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "5"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("5")}
                  >
                    <LiaSchoolSolid /> 5
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "6"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("6")}
                  >
                    <LiaSchoolSolid /> 6
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "7"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("7")}
                  >
                    <LiaSchoolSolid /> 7
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "8"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("8")}
                  >
                    <LiaSchoolSolid /> 8
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "9"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("9")}
                  >
                    <LiaSchoolSolid /> 9
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "10"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("10")}
                  >
                    <LiaSchoolSolid /> 10
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "11"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("11")}
                  >
                    <LiaSchoolSolid /> 11
                  </button>

                  <button
                    type="button"
                    className={
                      Class === "12"
                        ? "job_nature_button_active"
                        : "job_nature_button"
                    }
                    onClick={() => handleClassClick("12")}
                  >
                    <LiaSchoolSolid /> 12
                  </button>
                </div>
              </Form.Item>
            </>
          )}
        </div>

        <div className="form-group">
          <CommonInputField
            name="location"
            label="Location"
            mandotary={true}
            placeholder="Enter your Location"
            type="text"
            // error={"Please enter your Location"}
          />
        </div>
        <div style={{ textAlign: "-webkit-right" }} className="save_btn">
          <button className="primary-btn">
            <span>Save</span>
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 5.833L8.166 16.833L3.666 12.333"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    ),
    resume: () => (
      <>
        <Title level={4}>Resume</Title>
        <Text type="secondary">
          Remember that one pager that highlights how amazing you are? Time to
          let employers notice your potential through it.
        </Text>

        <div
          style={{
            border: "1px dashed #d9d9d9",
            borderRadius: 8,
            padding: 32,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          <Upload
            name="resume"
            showUploadList={false}
            accept=".doc,.docx,.pdf"
            maxCount={1}
            beforeUpload={() => false} // Prevent auto-upload
          >
            <Button
              style={{ background: "#5f2eea" }}
              icon={<UploadOutlined />}
              type="primary"
            >
              Update Resume
            </Button>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                Supported file formats: DOC, DOCX, PDF. File size limit: 10 MB.
              </Text>
            </div>
          </Upload>
        </div>
      </>
    ),
    about: () => (
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 24,
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <CheckCircleFilled style={{ color: "#00c853", marginRight: 8 }} />
          <Title level={4} style={{ margin: 0 }}>
            About
          </Title>
        </div>

        <div style={{ marginBottom: 8 }}>
          <Text strong>
            About Me <span style={{ color: "red" }}>*</span>
          </Text>
          <div style={{ fontSize: 12, color: "#888" }}>
            Maximum 1000 characters can be added
          </div>
        </div>

        <CommonTextArea
          style={{ height: 150 }}
          mandatory={true}
          rows={6}
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />

        <Button
          icon={
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712106.png"
              alt="AI"
              width={18}
              style={{ marginRight: 8 }}
            />
          }
          onClick={() =>
            setAboutText(
              "I am a detail-oriented and results-driven professional with a passion for continuous learning and growth. With a proven track record in [Your Industry], I thrive in fast-paced environments and excel at problem-solving, teamwork, and communication. I’m eager to bring my unique strengths and dedication to a dynamic organization where I can make a meaningful impact."
            )
          }
          style={{
            marginTop: 16,
            background: "#f0f2f5",
            border: "1px solid #d9d9d9",
            boxShadow: "none",
            fontWeight: 500,
          }}
        >
          Generate with AI
        </Button>
      </div>
    ),

    skills: () => (
      <div
        className="drawer_skills"
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 24,
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <CheckCircleFilled style={{ color: "#00c853", marginRight: 8 }} />
          <Title level={4} style={{ margin: 0 }}>
            Skills
          </Title>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Text strong>Suggestions</Text>
          <div style={{ marginTop: 12 }}>
            {suggestions.map((skill) => (
              <Tag
                key={skill}
                style={{
                  borderStyle: "dashed",
                  marginBottom: 8,
                  borderRadius: 50,
                  cursor: "pointer",
                  fontSize: 13,
                  padding: "7px 10px",
                }}
                onClick={() => handleAddSkill(skill)}
              >
                {skill}
              </Tag>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ marginTop: 8, marginBottom: 12 }}>
            {selectedSkills.map((skill) => (
              <Tag
                key={skill}
                closable
                onClose={() => handleRemoveSkill(skill)}
                style={{
                  marginBottom: 15,
                  fontSize: 14,
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#e9e0fe",
                  color: "#5f2eea",
                  borderRadius: 50,
                }}
              >
                {skill}
              </Tag>
            ))}
          </div>

          <CommonInputField
            label={"Skills"}
            onPressEnter={handleCustomSkillAdd}
            value={customSkill}
            name={"Job title"}
            onChange={(e) => setCustomSkill(e.target.value)}
            mandotary={true}
            placeholder={"List your skills here, showcasing what you excel at."}
            // error={"Please enter your job title"}
          />
          <Button
            type="primary"
            style={{ marginTop: 20, background: "#5f2eea" }}
            onClick={handleCustomSkillAdd}
          >
            Add Custom Skill
          </Button>
        </div>
      </div>
    ),
    education: () => (
      <div>
        <div className="form-group">
          <CommonSelectField
            label={"Qualification"}
            name={"qualificaton"}
            placeholder={"Select Qualification"}
            mandatory={true}
            showSearch={true}
            optionFilterProp={"lable"}
          />
        </div>

        <div className="form-group">
          <div className="form-group">
            <CommonSelectField
              label={"Course"}
              name={"course"}
              placeholder={"Select Course"}
              mandatory={true}
              showSearch={true}
              optionFilterProp={"lable"}
            />
          </div>
        </div>

        <div className="form-group">
          <CommonSelectField
            label={"Specialization"}
            name={"specialization"}
            placeholder={"Select Specialization"}
            mandatory={true}
            showSearch={true}
            optionFilterProp={"lable"}
          />
        </div>

        <div className="form-group">
          <CommonInputField
            name="collage"
            label="Collage"
            mandotary={true}
            placeholder="Collage"
            type="text"
            // error={"Please enter your Collage"}
          />
        </div>

        <Row style={{ alignItems: "end", gap: 20 }}>
          <Col lg={11}>
            <div className="form-group">
              <CommonInputField
                name="startyear"
                label="Start year"
                mandotary={true}
                placeholder="Start year"
                type="date"
                // error={"Please enter your Start year"}
              />
            </div>
          </Col>
          <Col lg={11}>
            <div className="form-group">
              <CommonInputField
                name="endyear"
                label="End year"
                mandotary={true}
                placeholder="End year"
                type="date"
                // error={"Please enter your End year"}
              />
            </div>
          </Col>
        </Row>

        <div className="form-group">
          <CommonSelectField
            label={"Course type"}
            name={"coursetype"}
            placeholder={"Select Course type"}
            mandatory={true}
            showSearch={true}
            optionFilterProp={"lable"}
          />
        </div>

        <Row style={{ alignItems: "end", gap: 20 }}>
          <Col lg={11}>
            <div className="form-group">
              <CommonInputField
                name="percentage"
                label="Percentage"
                mandotary={true}
                placeholder="Percentage"
                type="text"
                // error={"Please enter your Percentage"}
              />
            </div>
          </Col>
          <Col lg={11}>
            <div className="form-group">
              <CommonInputField
                name="cgpa"
                label="CGPA"
                mandotary={true}
                placeholder="CGPA"
                type="text"
                // error={"Please Enter your CGPA"}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ gap: 20 }}>
          <Col lg={11}>
            <div className="form-group">
              <CommonInputField
                name="rollnumber"
                label="Roll Number"
                mandotary={true}
                placeholder="Roll Number"
                type="number"
                // error={"Please Enter your Roll Number"}
              />
            </div>
          </Col>
          <Col lg={11}>
            <div className="form-group">
              <CommonSelectField
                label="Are you a Lateral Entry Student?"
                name="lateralstudent"
                placeholder="Lateral Entry"
                mandatory={true}
                showSearch={true}
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                value={lateral}
                optionFilterProp="label"
                onChange={handleLateralTypeChange}
              />
            </div>
          </Col>
        </Row>
      </div>
    ),
    experience: () => (
      <div>
        <div className="form-group">
          <CommonSelectField
            label="Designation"
            name="designation"
            mandatory={true}
            placeholder="Select Designation"
            showSearch={true}
            optionFilterProp="label"
          />
        </div>

        <div className="form-group">
          <CommonSelectField
            label="Organisation"
            name="organisation"
            mandatory={true}
            placeholder="Select Organisation"
            showSearch={true}
            optionFilterProp="label"
          />
        </div>

        <div className="form-group">
          <CommonSelectField
            label="Employment type"
            name="employmenttype"
            mandatory={true}
            placeholder="Select Employmenttype"
            showSearch={true}
            optionFilterProp="label"
          />
        </div>

        <div style={{ alignItems: "end" }} className="form-row">
          <div className="form-group">
            <Form.Item
              layout="vertical"
              label={<span style={{ fontWeight: 500 }}>Duration</span>}
              name="Duration"
              rules={[
                {
                  required: true,
                  message: "Please Select your Start Date",
                },
              ]}
            >
              <DatePicker
                placeholder="Start date"
                onChange={onChangeDate}
                needConfirm
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              layout="vertical"
              name="Duration"
              rules={[
                {
                  required: true,
                  message: "Please Select your End Date",
                },
              ]}
            >
              <DatePicker
                placeholder="End date"
                onChange={onChangeDate}
                needConfirm
              />
            </Form.Item>
          </div>
        </div>

        <div className="form-group">
          <CommonInputField
            name={"location"}
            label="Location"
            mandotary={true}
            placeholder={"Location"}
            type={"text"}
            // error={"Please Enter your Location"}
          />
        </div>
      </div>
    ),
    sociallinks: () => (
      <div>
        <div style={{ alignItems: "end" }} className="form-row">
          <div className="form-group">
            <CommonInputField
              name="Linkedin"
              label="Linkedin"
              mandotary={true}
              placeholder="Add link"
              type="text"
              // error={"Please Enter your Linkedin"}
            />
          </div>
          <div className="form-group">
            <CommonInputField
              name="Facebook"
              label="Facebook"
              mandotary={true}
              placeholder="Add link"
              type="text"
              // error={"Please Enter your Facebook"}
            />
          </div>
        </div>

        <div style={{ alignItems: "end" }} className="form-row">
          <div className="form-group">
            <CommonInputField
              name="Instagram"
              label="Instagram"
              mandotary={true}
              placeholder="Add link"
              type="text"
              // error={"Please Enter your Instagram"}
            />
          </div>
          <div className="form-group">
            <CommonInputField
              name="Twitter"
              label="Twitter"
              mandotary={true}
              placeholder="Add link"
              type="text"
              // error={"Please Enter your Twitter"}
            />
          </div>
        </div>

        <div style={{ alignItems: "end" }} className="form-row">
          <div className="form-group">
            <CommonInputField
              name="Dribbble"
              label="Dribbble"
              mandotary={true}
              placeholder="Add link"
              type="text"
              // error={"Please Enter your Dribbble"}
            />
          </div>
          <div className="form-group">
            <CommonInputField
              name="Behance"
              label="Behance"
              mandotary={true}
              placeholder="Add link"
              type="text"
              // error={"Please Enter your Behance"}
            />
          </div>
        </div>
      </div>
    ),

    projects: () => (
      <div>
        <div className="form-group">
          <CommonInputField
            name="projectname"
            label="Project Name"
            mandotary={true}
            placeholder="Project Name"
            type="text"
            // error={"Please Enter your Project Name"}
          />
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Project Type</span>}
            name="projecttype"
            rules={[
              {
                required: true,
                message: "Please Select your Project Type",
              },
            ]}
          >
            <div className="job_nature">
              <button
                type="button"
                className={
                  activeButton === "Full Time"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleButtonClick("Full Time")}
              >
                Full Time
              </button>

              <button
                type="button"
                className={
                  activeButton === "Part Time"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleButtonClick("Part Time")}
              >
                Part Time
              </button>

              <button
                type="button"
                className={
                  activeButton === "Freelance"
                    ? "job_nature_button_active"
                    : "job_nature_button"
                }
                onClick={() => handleButtonClick("Freelance")}
              >
                Freelance
              </button>
            </div>
          </Form.Item>
        </div>

        <Row style={{ alignItems: "end", gap: 20 }}>
          <Col lg={11}>
            <div className="form-group">
              <Form.Item
                layout="vertical"
                label={
                  <span style={{ fontWeight: 500 }}>Project Duration</span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Enter Project Duration",
                  },
                ]}
                name={"Duration"}
              >
                <DatePicker
                  placeholder="Start date"
                  onChange={onChangeDate}
                  needConfirm
                />
              </Form.Item>
            </div>
          </Col>
          <Col lg={11}>
            <div className="form-group">
              <Form.Item
                layout="vertical"
                rules={[
                  {
                    required: true,
                    message: "Please Enter your End date",
                  },
                ]}
              >
                <DatePicker
                  placeholder="End date"
                  onChange={onChangeDate}
                  needConfirm
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {/*  */}

        <div className="form-group">
          <CommonTextArea
            label={"Project Description"}
            placeholder={"Enter your description"}
            mandatory={true}
            name={"description"}
          />
        </div>
      </div>
    ),

    certification: () => (
      <Dragger
        fileList={certifications}
        onChange={handleCertification}
        status="done"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: "#5f2eea" }} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company<br></br> data or other banned files.
        </p>
      </Dragger>
    ),
  };
  //////////////////////////////////////////////////
  return (
    <>
      <Header className="profile-banner">
        <div className="banner-content">
          <Tooltip title="Edit Background">
            <Button
              style={{ color: "rgb(95, 46, 234)" }}
              shape="circle"
              icon={<EditOutlined />}
              className="edit-banner-btn"
            />
          </Tooltip>
        </div>
      </Header>

      <Content className="profile-main-content">
        {/* Profile Header Card */}
        <Card className="profile-header-card">
          <div
            className="profile-header-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="profile-header-left"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  border: "1px solid #cfcfcf",
                  borderRadius: "50%",
                  padding: "7px",
                }}
              >
                <Avatar size={90} src={avatarUrl} />
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleUpload}
                >
                  <Button
                    icon={<UploadOutlined />}
                    size="small"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      borderRadius: "50%",
                      padding: "4px 2px",
                      fontSize: 12,
                      backgroundColor: "#fff",
                      boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                    }}
                  />
                </Upload>

                {/* Remove Button */}
                {avatarUrl !== defaultAvatar && (
                  <Button
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    style={{
                      position: "absolute",
                      top: 0,
                      right: "0px",
                      borderRadius: "50%",
                      padding: "4px 2px",
                      fontSize: 12,
                      backgroundColor: "#fff",
                      boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                    }}
                    onClick={handleRemove}
                  />
                )}
              </div>

              <div style={{ marginLeft: 16, textAlign: "left" }}>
                <h2 style={{ marginBottom: 4 }}>Santhosh Kathirvel</h2>
                <p style={{ marginBottom: 6, color: "#666" }}>@santhkat7778</p>
                <div>
                  <Tag color="blue">Markerz Global Solution</Tag>
                  <Tag color="purple">Accountant</Tag>
                </div>
              </div>
            </div>

            <Space>
              <Tooltip title="Share profile">
                <Button shape="circle" icon={<LinkOutlined />} />
              </Tooltip>
              <Tooltip title="View as others see">
                <Button shape="circle" icon={<EyeOutlined />} />
              </Tooltip>
              <Button
                className="userprofile-edit-profile"
                type="primary"
                icon={<EditOutlined />}
              >
                Edit Profile
              </Button>
            </Space>
          </div>
        </Card>

        {/* Profile Sections */}
        <div className="profile-sections">
          {/* About Section */}
          <Card
            title="About"
            className="profile-section-card"
            extra={
              <Button
                onClick={() => {
                  setActiveTab("about");
                  showDrawer();
                }}
                style={{ color: "#5f2eea" }}
                type="link"
              >
                <PlusOutlined />
                Add About
              </Button>
            }
          >
            <p className="profile-section-description">
              Craft an engaging story in your bio and make meaningful
              connections with peers and recruiters alike!
            </p>

            <Divider />

            <Card title="Resume" className="resume-card">
              <p className="resume-card-title">
                <strong>
                  Add your Resume & get your profile filled in a click!
                </strong>
              </p>
              <p className="resume-card-description">
                Adding your Resume helps you to tell who you are and what makes
                you different — to employers and recruiters.
              </p>
              <label
                className="resume_upload"
                htmlFor="upload-input"
                style={{ cursor: "pointer" }}
              >
                Click me
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>

              <Button type="primary" className="upload-resume-btn">
                Upload Resume
              </Button>

              {fileName && (
                <div style={{ marginTop: "15px", fontWeight: "bold" }}>
                  Selected File: {fileName}
                </div>
              )}
            </Card>
          </Card>

          {/* Rankings Section */}
          <Card
            title="Rankings"
            className="profile-section-card rankings-card"
            extra={
              <Button style={{ color: "#5f2eea" }} type="link">
                How it works?
              </Button>
            }
          >
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-label">Total Points</div>
                <div className="stat-value">0</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Total Badges</div>
                <div className="stat-value">2</div>
              </div>
            </div>

            <Divider />

            <div className="badges-container">
              <Avatar
                size={50}
                icon={<StarOutlined />}
                className="badge-avatar gold-badge"
              />
              <Avatar
                size={50}
                icon={<StarOutlined />}
                className="badge-avatar silver-badge"
              />

              <Avatar
                size={50}
                icon={<StarOutlined />}
                className="badge-avatar silver-badge"
              />
              <Avatar
                size={50}
                icon={<StarOutlined />}
                className="badge-avatar silver-badge"
              />
            </div>
          </Card>
        </div>

        {/* Profile Sections */}
        <div style={{ marginTop: 25 }} className="profile-sections">
          {/* social link Section */}

          <div className="profile-section-card userprofile_cards">
            <div className="skills_card">
              <div style={{ textAlign: "left" }}>
                <h3>Skills</h3>
                <p className="profile-section-description">
                  Craft an engaging story in your bio and make meaningful
                  connections with peers and recruiters alike!
                </p>
                <Button
                  onClick={() => {
                    setActiveTab("skills");
                    showDrawer();
                  }}
                  style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                  type="link"
                >
                  <PlusOutlined />
                  Add Skills
                </Button>
              </div>
              <div>
                <img src={profile1}></img>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        {/* Profile Sections */}
        <div style={{ marginTop: 25 }} className="profile-sections">
          {/* Skills Section */}

          <div className="profile-section-card userprofile_cards">
            <div className="skills_card">
              <div style={{ textAlign: "left" }}>
                <h3>Work Experience</h3>
                <p className="profile-section-description">
                  Narrate your professional journey and fast-track your way to
                  new career heights!
                </p>
                <Button
                  onClick={() => {
                    setActiveTab("experience");
                    showDrawer();
                  }}
                  style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                  type="link"
                >
                  <PlusOutlined />
                  Add Work Experience
                </Button>
              </div>
              <div>
                <img src={profile2}></img>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        {/* Profile Sections */}
        <div style={{ marginTop: 25 }} className="profile-sections">
          {/* Education Section */}

          <div className="profile-section-card userprofile_cards">
            <div className="skills_card">
              <div style={{ textAlign: "left" }}>
                <h3>Education</h3>
                <p className="profile-section-description">
                  Showcase your academic journey and open doors to your dream
                  career opportunities!
                </p>
                <Button
                  onClick={() => {
                    setActiveTab("education");
                    showDrawer();
                  }}
                  style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                  type="link"
                >
                  <PlusOutlined />
                  Add Education
                </Button>
              </div>
              <div>
                <img src={profile3}></img>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        {/* Profile Sections */}
        {/* Responsibilities Section */}
        {/* <div style={{ marginTop: 25 }} className="profile-sections">
            <div className="profile-section-card userprofile_cards">
              <div className="skills_card">
                <div style={{ textAlign: "left" }}>
                  <h3>Responsibilities</h3>
                  <p className="profile-section-description">
                    Highlight the responsibilities you've mastered to
                    demonstrate your leadership and expertise!
                  </p>
                  <Button
                    onClick={showDrawer}
                    style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                    type="link"
                  >
                    <PlusOutlined />
                    Add Responsibilities
                  </Button>
                </div>
                <div>
                  <img src={profile4}></img>
                </div>
              </div>
              <Divider />
            </div>
          </div> */}

        {/* Profile Sections */}
        <div style={{ marginTop: 25 }} className="profile-sections">
          {/* Certificate Section */}

          <div className="profile-section-card userprofile_cards">
            <div className="skills_card">
              <div style={{ textAlign: "left" }}>
                <h3>Certificate</h3>
                <p className="profile-section-description">
                  Flaunt your certifications and show recruiters that you're a
                  step ahead in your field!
                </p>
                <Button
                  onClick={() => {
                    setActiveTab("certification");
                    showDrawer();
                  }}
                  style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                  type="link"
                >
                  <PlusOutlined />
                  Add Certificate
                </Button>
              </div>
              <div>
                <img src={profile5}></img>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        {/* Profile Sections */}
        <div style={{ marginTop: 25 }} className="profile-sections">
          {/* Projects Section */}

          <div className="profile-section-card userprofile_cards">
            <div className="skills_card">
              <div style={{ textAlign: "left" }}>
                <h3>Projects</h3>
                <p className="profile-section-description">
                  Unveil your projects to the world and pave your path to
                  professional greatness!
                </p>
                <Button
                  onClick={() => {
                    setActiveTab("projects");
                    showDrawer();
                  }}
                  style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                  type="link"
                >
                  <PlusOutlined />
                  Add Projects
                </Button>
              </div>
              <div>
                <img src={profile6}></img>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        {/* Profile Sections */}
        <div style={{ marginTop: 25 }} className="profile-sections">
          {/* Achievements Section */}

          <div className="profile-section-card userprofile_cards">
            <div className="skills_card">
              <div style={{ textAlign: "left" }}>
                <h3>Achievements</h3>
                <p className="profile-section-description">
                  Broadcast your triumphs and make a remarkable impression on
                  industry leaders!
                </p>
                <Button
                  onClick={() => {
                    setActiveButton("achievements");
                    showDrawer();
                  }}
                  style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                  type="link"
                >
                  <PlusOutlined />
                  Add Achievements
                </Button>
              </div>
              <div>
                <img src={profile7}></img>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        {/* Profile Sections */}
        <div style={{ marginTop: 25 }} className="profile-sections">
          {/* Social Links Section */}
          <div className="profile-section-card userprofile_cards">
            <div className="skills_card">
              <div style={{ textAlign: "left" }}>
                <h3>Social Links</h3>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setActiveButton("sociallinks");
                    showDrawer();
                  }}
                  style={{ color: "#5f2eea", paddingLeft: 0, paddingTop: 10 }}
                  type="link"
                >
                  <PlusOutlined />
                  Add Links
                </Button>
              </div>
            </div>
            <div className="userprofile_social">
              <Tooltip title="Not yet added">
                <FaFacebookF />
              </Tooltip>
              <Tooltip title="Not yet added">
                <BsThreads />
              </Tooltip>
              <Tooltip title="Not yet added">
                <FaInstagram />
              </Tooltip>
              <Tooltip title="Not yet added">
                <FaLinkedinIn />
              </Tooltip>
              <Tooltip title="Not yet added">
                <FaBehance />
              </Tooltip>
              <Tooltip title="Not yet added">
                <FaDribbble />
              </Tooltip>
              <Tooltip title="Not yet added">
                <FaFigma />
              </Tooltip>
              <Tooltip title="Not yet added">
                <IoMdLink />
              </Tooltip>
            </div>

            <Divider />

            {/* Streak Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="streak-container"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "0.5px",
                  }}
                >
                  Activity Streak
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "3px",
                        background: "var(--color-scale-1)",
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.85rem",
                      }}
                    >
                      1 Activity
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "3px",
                        background: "var(--color-scale-3)",
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.85rem",
                      }}
                    >
                      3+ Activities
                    </span>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div
                  style={{
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="loading-pulse" />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <CalendarHeatmap
                    startDate={subDays(today, 365)}
                    endDate={today}
                    values={streakData}
                    classForValue={getClassForValue}
                    showWeekdayLabels={true}
                    gutterSize={3}
                    monthLabels={[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ]}
                    weekdayLabels={[
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ]}
                    transformDayElement={(el, value) => {
                      if (!value || !value.date) return el;
                      const date = format(parseISO(value.date), "MMMM d, yyyy");
                      return (
                        <Tooltip
                          title={`${date} | ${value.count} ${
                            value.count > 1 ? "Activities" : "Activity"
                          }`}
                          arrow
                          placement="top"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "#0f3460",
                                color: "white",
                                fontSize: "0.85rem",
                                "& .MuiTooltip-arrow": {
                                  color: "#0f3460",
                                },
                              },
                            },
                          }}
                        >
                          {el}
                        </Tooltip>
                      );
                    }}
                  />
                </motion.div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "32px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px 20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    minWidth: "120px",
                  }}
                >
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Current Streak
                  </div>
                  <div
                    style={{
                      color: "#4cc9f0",
                      fontSize: "16px",
                      fontWeight: 700,
                      marginTop: "1px",
                    }}
                  >
                    {currentStreak} {currentStreak === 1 ? "Day" : "Days"}
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px 20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    minWidth: "120px",
                  }}
                >
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Max Streak
                  </div>
                  <div
                    style={{
                      color: "#f72585",
                      fontSize: "16px",
                      fontWeight: 700,
                      marginTop: "1px",
                    }}
                  >
                    {maxStreak} {maxStreak === 1 ? "Day" : "Days"}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* drawer */}
            <Drawer
              title={null}
              placement="right"
              onClose={onCloseDrawer}
              open={open}
              width={1100}
              className="user_details_drawer"
            >
              <div style={{ display: "flex", gap: 24 }}>
                {/* Sidebar */}
                <div
                  style={{
                    width: 300,
                    background: "#f9f9f9",
                    padding: 16,
                    borderRight: "1px solid #eee",
                  }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Enhance your Profile</Text>
                    <Text
                      type="secondary"
                      style={{ display: "block", marginTop: 4 }}
                    >
                      Stay ahead of the competition by regularly updating your
                      profile.
                    </Text>
                    <Progress
                      percent={78}
                      size="small"
                      style={{ marginTop: 8 }}
                    />
                  </div>
                  <Menu
                    mode="vertical"
                    selectedKeys={[activeTab]}
                    onClick={(e) => setActiveTab(e.key)}
                    items={items}
                  />
                </div>

                {/* Dynamic Content */}
                <div style={{ flex: 1, padding: 5 }}>
                  {TabContent[activeTab] ? (
                    TabContent[activeTab]()
                  ) : (
                    <p>Section not found</p>
                  )}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </Content>
    </>
  );
}
