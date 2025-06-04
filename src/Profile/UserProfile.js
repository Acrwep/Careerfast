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
  UserOutlined,
  FileTextOutlined,
  StarOutlined,
  EyeOutlined,
  LinkOutlined,
  EditOutlined,
  SettingOutlined,
  BookOutlined,
  TrophyOutlined,
  CheckCircleFilled,
  PlusOutlined,
  ClockCircleOutlined,
  AccountBookFilled,
  TeamOutlined,
  NotificationOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  UploadOutlined,
  InboxOutlined,
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
import { BsPersonFillUp } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import profile1 from "../images/profile1.webp";
import profile2 from "../images/profile2.webp";
import profile3 from "../images/profile3.webp";
import profile4 from "../images/profile4.webp";
import profile5 from "../images/profile5.webp";
import profile6 from "../images/profile6.webp";
import profile7 from "../images/profile7.webp";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, subDays, format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import TextArea from "antd/es/input/TextArea";
const { Title, Text } = Typography;
const { Dragger } = Upload;

// Calculate streaks
const currentStreak = 2;
const maxStreak = 3;

const { Header, Sider, Content } = Layout;
const { Meta } = Card;

const menuItems = [
  { key: "1", icon: <FaRegHeart />, label: "Watchlist" },
  { key: "2", icon: <FaRegBookmark />, label: "Bookmarked Questions" },
  { key: "3", icon: <ClockCircleOutlined />, label: "Recently Viewed" },
  { key: "4", icon: <SafetyCertificateOutlined />, label: "Certificates" },
  { key: "5", icon: <SettingOutlined />, label: "Settings" },
  { key: "6", icon: <FaListOl />, label: "Manage Listing" },
  { key: "7", icon: <SettingOutlined />, label: "Account Settings" },
];

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,

  // Hide scrollbar for Webkit (Chrome, Safari)
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE 10+

  // Optional: use custom class instead of inline styles for full control
};

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

export default function UserProfile() {
  const [collapsed, setCollapsed] = useState(false);
  const [certifications, setCertification] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [aboutText, setAboutText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [fileName, setFileName] = useState("");
  const [userTypeactiveButton, setUserTypeActiveButton] = useState(null);

  const today = new Date();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
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

  // --- Tab Content Components ---
  const TabContent = {
    basic: () => (
      <div>
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
              <Input placeholder="Enter your fname" className="premium-input" />
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
              <Input placeholder="Enter your lname" className="premium-input" />
            </Form.Item>
          </div>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Username </span>}
            name="Username "
            rules={[
              {
                required: true,
                message: "Please enter Username ",
              },
            ]}
          >
            <Input placeholder="Your Username " className="premium-input" />
          </Form.Item>
        </div>

        <div className="form-row">
          <div className="form-group">
            <Form.Item
              layout="vertical"
              label={<span style={{ fontWeight: 500 }}>Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your Email",
                },
              ]}
            >
              <Input
                placeholder="Enter your Mobile"
                className="premium-input"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
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
            </Form.Item>
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
                <Form.Item
                  layout="vertical"
                  label={<span style={{ fontWeight: 500 }}>Course</span>}
                  name="Course"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Course",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Course"
                    optionFilterProp="label"
                    className="premium-input"
                  />
                </Form.Item>
              </div>

              <div style={{ alignItems: "center" }} className="form-row">
                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>Start Year</span>}
                    name="Start Year"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Start Year",
                      },
                    ]}
                  >
                    <Input placeholder="Start Year" className="premium-input" />
                  </Form.Item>
                </div>

                <div className="form-group">
                  <Form.Item
                    layout="vertical"
                    label={<span style={{ fontWeight: 500 }}>End Year</span>}
                    name="End Year"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your End Year",
                      },
                    ]}
                  >
                    <Input placeholder="End Year" className="premium-input" />
                  </Form.Item>
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
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Location</span>}
            name="Location"
            rules={[
              {
                required: true,
                message: "Please enter your Location",
              },
            ]}
          >
            <Input
              placeholder="Enter your Location"
              className="premium-input"
            />
          </Form.Item>
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

        <Input.TextArea
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
          <Text strong>Skills</Text>
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

          <Input
            placeholder="List your skills here, showcasing what you excel at."
            value={customSkill}
            className="premium-input"
            onChange={(e) => setCustomSkill(e.target.value)}
            onPressEnter={handleCustomSkillAdd}
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
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Qualification</span>}
            rules={[
              {
                required: true,
                message: "Please Select your Qualification",
              },
            ]}
            name={"Qualification"}
          >
            <Select
              showSearch
              placeholder="Select Qualification"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Course</span>}
            rules={[
              {
                required: true,
                message: "Please Select your Course",
              },
            ]}
            name={"Course"}
          >
            <Select
              showSearch
              placeholder="Select Course"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Specialization</span>}
            rules={[
              {
                required: true,
                message: "Please Select your Specialization",
              },
            ]}
            name={"Specialization"}
          >
            <Select
              showSearch
              placeholder="Select Specialization"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Collage</span>}
            rules={[
              {
                required: true,
                message: "Please Enter your Collage",
              },
            ]}
            name={"Collage"}
          >
            <Input placeholder="Collage" className="premium-input" />
          </Form.Item>
        </div>

        <Row style={{ alignItems: "end", gap: 20 }}>
          <Col lg={11}>
            <div className="form-group">
              <Form.Item
                layout="vertical"
                label={<span style={{ fontWeight: 500 }}>Duration</span>}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Start year",
                  },
                ]}
                name={"Duration"}
              >
                <Input placeholder="Start year" className="premium-input" />
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
                    message: "Please Enter your End year",
                  },
                ]}
              >
                <Input placeholder="End year" className="premium-input" />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Course type</span>}
            rules={[
              {
                required: true,
                message: "Please Select your Course type",
              },
            ]}
            name={"Course"}
          >
            <Select
              showSearch
              placeholder="Select Course type"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
        </div>

        <Row style={{ alignItems: "end", gap: 20 }}>
          <Col lg={11}>
            <div className="form-group">
              <Form.Item
                layout="vertical"
                label={<span style={{ fontWeight: 500 }}>Percentage</span>}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Percentage",
                  },
                ]}
                name={"Percentage"}
              >
                <Input placeholder="Percentage" className="premium-input" />
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
                    message: "Please Enter your CGPA",
                  },
                ]}
                name={"CGPA"}
              >
                <Input placeholder="CGPA" className="premium-input" />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row style={{ gap: 20 }}>
          <Col lg={11}>
            <div className="form-group">
              <Form.Item
                layout="vertical"
                label={<span style={{ fontWeight: 500 }}>Roll Number</span>}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Roll Number",
                  },
                ]}
                name={"Roll"}
              >
                <Input placeholder="Roll Number" className="premium-input" />
              </Form.Item>
            </div>
          </Col>
          <Col lg={11}>
            <div className="form-group">
              <Form.Item
                layout="vertical"
                label={
                  <span style={{ fontWeight: 500 }}>
                    Are you a Lateral Entry Student?
                  </span>
                }
                name={"Lateral"}
                rules={[
                  {
                    required: true,
                    message: "Please Enter your Lateral Entry",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Lateral Entry"
                  optionFilterProp="label"
                  className="premium-input"
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>
    ),
    experience: () => (
      <div>
        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Designation</span>}
            name={"Designation"}
            rules={[
              { required: true, message: "Please Select your Designation" },
            ]}
          >
            <Select
              showSearch
              placeholder="Select Designation"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Organisation</span>}
            name={"Organisation"}
            rules={[
              { required: true, message: "Please Select your Organisation" },
            ]}
          >
            <Select
              showSearch
              placeholder="Select Organisation"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Employment Type</span>}
            name={"EmploymentType"}
            rules={[
              { required: true, message: "Please Select your Employment Type" },
            ]}
          >
            <Select
              showSearch
              placeholder="Select Employment Type"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
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
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Location</span>}
            rules={[
              {
                required: true,
                message: "Please Enter your Location",
              },
            ]}
            name={"Location"}
          >
            <Input placeholder="Location" className="premium-input" />
          </Form.Item>
        </div>
      </div>
    ),
    sociallinks: () => (
      <div>
        <div style={{ alignItems: "end" }} className="form-row">
          <div className="form-group">
            <Form.Item
              layout="vertical"
              label={<span style={{ fontWeight: 500 }}>Linkedin</span>}
              name="Linkedin"
            >
              <Input placeholder="Add Link" className="premium-input" />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              layout="vertical"
              name="Facebook"
              label={<span style={{ fontWeight: 500 }}>Facebook</span>}
            >
              <Input placeholder="Add Link" className="premium-input" />
            </Form.Item>
          </div>
        </div>

        <div style={{ alignItems: "end" }} className="form-row">
          <div className="form-group">
            <Form.Item
              layout="vertical"
              label={<span style={{ fontWeight: 500 }}>Instagram</span>}
              name="Instagram"
            >
              <Input placeholder="Add Link" className="premium-input" />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              layout="vertical"
              name="Twitter"
              label={<span style={{ fontWeight: 500 }}>Twitter</span>}
            >
              <Input placeholder="Add Link" className="premium-input" />
            </Form.Item>
          </div>
        </div>

        <div style={{ alignItems: "end" }} className="form-row">
          <div className="form-group">
            <Form.Item
              layout="vertical"
              label={<span style={{ fontWeight: 500 }}>Dribbble</span>}
              name="Dribbble"
            >
              <Input placeholder="Add Link" className="premium-input" />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              layout="vertical"
              name="Behance"
              label={<span style={{ fontWeight: 500 }}>Behance</span>}
            >
              <Input placeholder="Add Link" className="premium-input" />
            </Form.Item>
          </div>
        </div>
      </div>
    ),

    projects: () => (
      <div>
        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Project Name</span>}
            rules={[
              {
                required: true,
                message: "Please Enter your Project Name",
              },
            ]}
            name={"Qualification"}
          >
            <Select
              showSearch
              placeholder="Project Name"
              optionFilterProp="label"
              className="premium-input"
            />
          </Form.Item>
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
                <DatePicker placeholder="Start date" onChange={onChangeDate} needConfirm />
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
                 <DatePicker placeholder="End date" onChange={onChangeDate} needConfirm />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {/*  */}

        <div className="form-group">
          <Form.Item
            layout="vertical"
            label={<span style={{ fontWeight: 500 }}>Project Description</span>}
            rules={[
              {
                required: true,
                message: "Please Select your Specialization",
              },
            ]}
            name={"Specialization"}
          >
            <TextArea placeholder="Enter your description" />
          </Form.Item>
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
    <Layout className="profile-layout">
      {/* Sidebar */}
      <Sider
        style={siderStyle}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        className="profile-sider"
        breakpoint="lg"
      >
        <div className="profile-card-sidebar">
          <Avatar
            size={80}
            src="https://i.imgur.com/your-avatar.png"
            className="profile-avatar"
          />
          <h3 className="profile-name">Santhosh Kathirvel</h3>
          <p className="profile-email">
            santhoshkathirvel.s@actetechnologies.com
          </p>

          <div className="profile-completion">
            <div className="progress-header">
              <span style={{ color: "#000" }}>Profile Completion</span>
              <span style={{ color: "#000" }}>56%</span>
            </div>
            <Progress
              percent={56}
              strokeColor="#22c55e"
              showInfo={false}
              className="profile-progress"
            />
          </div>
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          className="profile-menu"
        />
      </Sider>

      {/* Main Content */}
      <Layout className="profile-content-layout">
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
            <div className="profile-header-content">
              <div className="profile-header-left">
                <Avatar
                  size={90}
                  src="https://i.imgur.com/your-avatar.png"
                  className="main-profile-avatar"
                />
                <div className="profile-header-info">
                  <h2>Santhosh Kathirvel</h2>
                  <p className="username">@santhkat7778</p>
                  <div className="profile-tags">
                    <Tag color="blue">Markerz Global Solution</Tag>
                    <Tag color="purple">Accountant</Tag>
                  </div>
                </div>
              </div>

              <Space className="profile-header-actions">
                <Tooltip title="Share profile">
                  <Button shape="circle" icon={<LinkOutlined />} />
                </Tooltip>
                <Tooltip title="View as others see">
                  <Button shape="circle" icon={<EyeOutlined />} />
                </Tooltip>
                <Button
                  style={{ background: "#5f2eea" }}
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
                  Adding your Resume helps you to tell who you are and what
                  makes you different — to employers and recruiters.
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
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
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
                        const date = format(
                          parseISO(value.date),
                          "MMMM d, yyyy"
                        );
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
      </Layout>
    </Layout>
  );
}
