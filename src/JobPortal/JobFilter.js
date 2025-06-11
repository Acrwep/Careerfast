import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Tag,
  Typography,
  Space,
  Button,
  Dropdown,
  Menu,
  Badge,
  Drawer,
  Radio,
  Divider,
  List,
  Switch,
  Input,
  Checkbox,
  Slider,
  Select,
} from "antd";
import {
  ClockCircleOutlined,
  StarFilled,
  ThunderboltFilled,
  CrownFilled,
  FilterOutlined,
  ThunderboltOutlined,
  DownOutlined,
  LaptopOutlined,
  TrophyOutlined,
  BookOutlined,
  ReadOutlined,
  UserOutlined,
  CodeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ToolOutlined,
  CloseOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../css/JobFilter.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import CommonSelectField from "../Common/CommonSelectField";
import { style } from "framer-motion/client";

const { Title, Text, Link } = Typography;
const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer (Full Stack)",
    company: "Trellix",
    daysLeft: "13 days left",
    level: "Experienced Professionals",
    logo: "https://cdn.worldvectorlogo.com/logos/trellix.svg",
    salary: "$120K - $150K",
    location: "Remote • San Francisco, CA",
    type: "Full-time",
    premium: true,
    urgent: true,
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    eligibility: "Fresher • Graduate • Postgraduate",
  },
  {
    id: 2,
    title: "Lead Frontend Developer",
    company: "Meta",
    daysLeft: "5 days left",
    level: "Senior Level",
    logo: "https://cdn.worldvectorlogo.com/logos/meta-3.svg",
    salary: "$140K - $180K",
    location: "Menlo Park, CA",
    type: "Full-time",
    premium: true,
    skills: ["React", "GraphQL", "Next.js", "WebGL"],
    eligibility: "Fresher • Graduate • Postgraduate",
  },
  {
    id: 3,
    title: "Technical Product Manager",
    company: "Google",
    daysLeft: "10 days left",
    level: "Leadership",
    logo: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
    salary: "$130K - $170K",
    location: "Mountain View, CA",
    type: "Full-time",
    premium: true,
    urgent: false,
    skills: ["Product Strategy", "Agile", "Data Analysis", "Go-to-Market"],
    eligibility: "Fresher • Graduate • Postgraduate",
  },
  {
    id: 4,
    title: "Technical Product Manager",
    company: "Facebook",
    daysLeft: "10 days left",
    level: "Leadership",
    logo: "https://cdn.worldvectorlogo.com/logos/facebook-2020-2-1.svg",
    salary: "$130K - $170K",
    location: "Mountain View, CA",
    type: "Full-time",
    premium: true,
    urgent: false,
    skills: ["Product Strategy", "Agile", "Data Analysis", "Go-to-Market"],
    eligibility: "Fresher • Graduate • Postgraduate",
  },
];

const FILTER_SECTIONS = [
  { key: "status", label: "Status", count: 1 },
  { key: "type", label: "Type" },
  { key: "timing", label: "Timing" },
  { key: "workdays", label: "Work Days" },
  { key: "usertype", label: "User Type" },
  { key: "category", label: "Category", count: 5 },
  { key: "location", label: "Location" },
];

const workTypes = ["In Office", "Remote", "Field Work", "Hybrid"];
const userTypes = ["Fresher", "Professionals", "College Students"];
const category = [
  "Backend Development",
  "Frontend Development",
  "College Students",
  "Backend Development",
  "Frontend Development",
  "College Students",
  "Backend Development",
  "Frontend Development",
  "College Students",
  "Backend Development",
  "Frontend Development",
  "College Students",
];

const dropdownItems = () => (
  <Menu style={{ minWidth: 220, padding: "0.5rem 0" }}>
    <Menu.Item key="internships" icon={<LaptopOutlined />}>
      Internships
    </Menu.Item>
    <Menu.Item
      key="jobs"
      icon={<ReadOutlined />}
      style={{ background: "#f0f7ff" }}
    >
      Jobs
    </Menu.Item>
    <Menu.SubMenu
      key="competitions"
      title="Competitions"
      icon={<TrophyOutlined />}
    >
      <Menu.Item key="comp-1">Online</Menu.Item>
      <Menu.Item key="comp-2">Onsite</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item key="mentorship" icon={<UserOutlined />}>
      Mentorship
    </Menu.Item>
    <Menu.SubMenu key="courses" title="Courses" icon={<BookOutlined />}>
      <Menu.Item key="course-1">Tech</Menu.Item>
      <Menu.Item key="course-2">Design</Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu key="practice" title="Practice" icon={<CodeOutlined />}>
      <Menu.Item key="practice-1">DSA</Menu.Item>
      <Menu.Item key="practice-2">System Design</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item key="scholarships" icon={<ReadOutlined />}>
      Scholarships
    </Menu.Item>
    <Menu.Item key="articles" icon={<FileTextOutlined />}>
      Articles
    </Menu.Item>
    <Menu.Item key="conferences" icon={<CalendarOutlined />}>
      Conferences
    </Menu.Item>
    <Menu.Item key="workshops" icon={<ToolOutlined />}>
      Workshops
    </Menu.Item>
  </Menu>
);

const locationsData = [
  { name: "Pune", detail: "Pune, Maharashtra, India" },
  { name: "Gurgaon", detail: "Gurgaon, Haryana, India" },
  { name: "Delhi", detail: "Delhi, Delhi, India" },
  { name: "Bangalore Urban", detail: "Bangalore Urban, Karnataka, India" },
  { name: "Bangalore Rural", detail: "Bangalore Rural, Karnataka, India" },
];

// Create dropdown menu for reusability
const getDropdownMenu = (label) => (
  <Menu
    items={[
      { label: `${label} Option 1`, key: "1" },
      { label: `${label} Option 2`, key: "2" },
    ]}
  />
);

const JobCard = ({ job }) => (
  <Card
    hoverable
    className={`custom-job-card ${job.premium ? "premium-job-card" : ""} ${
      job.urgent ? "urgent-job-card" : ""
    }`}
    bodyStyle={{ padding: 0 }}
  >
    <div className="job-card-content">
      {job.premium && <div className="premium-border" />}
      {job.urgent && <div className="urgent-tag">URGENT</div>}
      <div className="job-card-inner">
        <div style={{ padding: "24px 24px 16px" }}>
          <Space
            direction="vertical"
            size={16}
            style={{ width: "100%", gap: 10 }}
          >
            <Space
              align="start"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={job.logo}
                alt={job.company}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                  borderRadius: 8,
                  border: "1px solid #f0f0f0",
                  padding: 4,
                  background: "#fff",
                }}
              />
              <Space>
                {job.premium && (
                  <Tag
                    icon={<StarFilled />}
                    color="gold"
                    style={{ fontWeight: 600 }}
                  >
                    Premium
                  </Tag>
                )}
                <Tag
                  bordered={false}
                  color={job.type === "Full-time" ? "blue" : "purple"}
                  style={{ fontWeight: 500 }}
                >
                  {job.type}
                </Tag>
              </Space>
            </Space>

            <Space
              direction="vertical"
              size={4}
              style={{ width: "100%", textAlign: "left", gap: 0 }}
            >
              <Link
                strong
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  textAlign: "left",
                  color: "#1f1f1f",
                  lineHeight: 1.3,
                }}
              >
                {job.title}
              </Link>
              <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                {job.company}
              </Text>
            </Space>

            <Text
              type="secondary"
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ClockCircleOutlined style={{ marginRight: 6 }} />
              {job.daysLeft} • {job.location}
            </Text>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {job.skills.map((skill, index) => (
                <Tag
                  className="job_skills"
                  key={index}
                  style={{ borderRadius: 4, padding: "4px 8px" }}
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </Space>
        </div>

        <div
          style={{
            borderTop: "1px solid #f0f0f0",
            padding: "10px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tag
            icon={
              job.level.includes("Leadership") ? (
                <CrownFilled />
              ) : (
                <ThunderboltFilled />
              )
            }
            color={job.level.includes("Leadership") ? "gold" : "geekblue"}
            style={{
              borderRadius: "999px",
              fontWeight: 500,
              padding: "4px 12px",
              margin: 0,
            }}
          >
            {job.level}
          </Tag>
          <Button
            className="apply_now"
            type="primary"
            shape="round"
            size="middle"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

export default function JobFilter() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("status");
  const [statusValue, setStatusValue] = useState("Live");

  const [visible, setVisible] = useState(false);
  const [radiusSearch, setRadiusSearch] = useState(false);
  const [radius, setRadius] = useState(50); // default 50km
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const handleToggle = (checked) => setRadiusSearch(checked);

  const handleCheck = (location) => {
    setSelected((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location]
    );
  };

  const renderLocation = () => {
    return (
      <div style={{ width: 300, padding: 16, background: "#fff" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Text strong>Location</Text>
          <Button
            type="link"
            size="small"
            danger
            onClick={() => setSelected([])}
          >
            Clear
          </Button>
        </div>

        {/* Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div>
            <Text strong>Use Radius Search</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Find nearby by Jobs
            </Text>
          </div>
          <Switch checked={radiusSearch} onChange={setRadiusSearch} />
        </div>

        {/* Conditional Slider */}
        {radiusSearch && (
          <div style={{ marginBottom: 16 }}>
            <Slider
              min={5}
              max={200}
              step={5}
              value={radius}
              onChange={setRadius}
              tooltip={{ formatter: (value) => `${value}km` }}
            />
          </div>
        )}

        {/* Search */}
        <Input
          placeholder="Search location"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        {/* Location list */}
        <List
          dataSource={locationsData.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )}
          style={{ maxHeight: 200, overflowY: "auto" }}
          renderItem={(item) => (
            <List.Item style={{ padding: "4px 0" }}>
              <Checkbox
                checked={selected.includes(item.name)}
                onChange={() => handleCheck(item.name)}
              >
                <div>
                  <Text>
                    <EnvironmentOutlined style={{ marginRight: 6 }} />
                    {item.name}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.detail}
                  </Text>
                </div>
              </Checkbox>
            </List.Item>
          )}
        />

        <Divider style={{ margin: "12px 0" }} />

        {/* Apply Button */}
        <div style={{ textAlign: "right" }}>
          <Button type="primary" className="apply_filter" shape="round">
            Apply Filter →
          </Button>
        </div>
      </div>
    );
  };

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [workTypevisible, setWorkTypeVisible] = useState(false);

  const handleCheckboxChange = (checkedValue) => {
    setSelectedTypes((prev) =>
      prev.includes(checkedValue)
        ? prev.filter((item) => item !== checkedValue)
        : [...prev, checkedValue]
    );
  };

  const handleClear = () => {
    setSelectedTypes([]);
  };

  const handleApply = () => {
    console.log("Selected Work Types:", selectedTypes);
    setWorkTypeVisible(false);
  };

  const dropdownContent = () => (
    <div style={{ padding: 16, width: 220, background: "#fff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <strong>Type</strong>
        <a onClick={handleClear} style={{ color: "#f5222d" }}>
          Clear
        </a>
      </div>
      <div>
        {workTypes.map((type) => (
          <div key={type} style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
            >
              {type}
            </Checkbox>
          </div>
        ))}
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <Button
        className="apply_filter"
        type="primary"
        shape="round"
        block
        onClick={handleApply}
      >
        Apply Filter
      </Button>
    </div>
  );

  // user types

  const [selectedType, setSelectedType] = useState(null);
  const [userTypevisible, setUserTypeVisible] = useState(false);

  const handleUserTypeClear = () => {
    setSelectedType(null);
  };

  const handleUserTypeApply = () => {
    console.log("Selected User Type:", selectedType);
    setUserTypeVisible(false);
  };

  const userType = (
    <div style={{ padding: 16, width: 220, background: "#fff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <strong>User Type</strong>
        <a onClick={handleUserTypeClear} style={{ color: "#f5222d" }}>
          Clear
        </a>
      </div>
      <Radio.Group
        className="custom-radio"
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {userTypes.map((type) => (
          <Radio key={type} value={type}>
            {type}
          </Radio>
        ))}
      </Radio.Group>
      <Divider style={{ margin: "12px 0" }} />
      <Button
        className="apply_filter"
        type="primary"
        shape="round"
        block
        onClick={handleUserTypeApply}
      >
        Apply Filter
      </Button>
    </div>
  );

  // category

  const [selectedCatergory, setSelectedCatergory] = useState(null);
  const [userCatergoryvisible, setUserCatergoryVisible] = useState(false);

  const handleUserCatergoryClear = () => {
    setSelectedCatergory(null);
  };

  const handleUserCatergoryApply = () => {
    console.log("Selected Catergory:", selectedCatergory);
    setUserCatergoryVisible(false);
  };

  const userCatergory = () => (
    <div style={{ padding: 16, width: 220, background: "#fff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <strong>Catergory</strong>
        <a onClick={handleUserCatergoryClear} style={{ color: "#f5222d" }}>
          Clear
        </a>
      </div>
      <Radio.Group
        onChange={(e) => setSelectedCatergory(e.target.value)}
        value={selectedCatergory}
        className="custom-radio"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxHeight: "200px",
          overflowY: "scroll",
        }}
      >
        {category.map((Catergory) => (
          <Radio key={Catergory} value={Catergory}>
            {Catergory}
          </Radio>
        ))}
      </Radio.Group>
      <Divider style={{ margin: "12px 0" }} />
      <Button
        type="primary"
        shape="round"
        className="apply_filter"
        block
        onClick={handleUserCatergoryApply}
      >
        Apply Filter
      </Button>
    </div>
  );

  // filter
  const [selectedSort, setSelectedSort] = useState(null);

  const handleChange = (value) => {
    setSelectedSort(value);
  };

  const clearSort = () => {
    setSelectedSort(null);
  };

  return (
    <section
      className="job_filter"
      style={{
        padding: "20px 60px 48px 60px",
        background:
          "linear-gradient(135deg, rgb(247 247 247) 0%, rgb(244 238 255) 100%)",
      }}
    >
      <div
      className="job-filter-topbar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 24px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          flexWrap: "wrap",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
          borderRadius: "12px 12px 0 0",
          marginBottom: 15,
        }}
      >
        {/* Primary Filter Dropdown */}
        <Dropdown
          popupRender={dropdownItems}
          trigger={["click"]}
          placement="bottomLeft"
          overlayStyle={{
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
            padding: "8px 0",
          }}
        >
          <Button
          className="job-filter-job"
            shape="round"
            type="primary"
          >
            <Space>
              <span style={{ fontWeight: 500 }}>Jobs</span>
              <DownOutlined style={{ fontSize: 12 }} />
            </Space>
          </Button>
        </Dropdown>

        {/* Salary Filter */}
        <>
          {selectedSort ? (
            <Button
              shape="round"
              type="default"
              style={{
                border: "1px solid #4f46e5",
                backgroundColor: "#fff",
                color: "#1e293b",
                fontWeight: 500,
                padding: "0 12px",
                height: 36,
              }}
              onClick={clearSort}
            >
              <Space>
                {selectedSort === "highToLow"
                  ? "Salary (High to Low)"
                  : "Salary (Low to High)"}
                <CloseOutlined style={{ fontSize: 12 }} />
              </Space>
            </Button>
          ) : (
            <CommonSelectField
              // label={false}
              style={{
                border: "1px solid rgba(0, 0, 0, 0.08)",
                background: "#fff",
                padding: "0 5px",
                height: 36,
                borderRadius: 20,
                color: "#2d3748",
                fontWeight: 500,
                marginBottom: 0,
              }}
              name="experiencemonth"
              onChange={handleChange}
              placeholder="Select Salary Filter"
              options={[
                {
                  id: 1,
                  label: "Salary (High to Low)",
                },
                {
                  id: 2,
                  label: "Salary (Low to High)",
                },
              ]}
              showSearch={true}
            />
          )}
        </>

        {/* Main Filters Button */}
        <Button
          shape="round"
          icon={<FilterOutlined style={{ fontSize: 14 }} />}
          onClick={() => setOpen(true)}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.08)",
            background: "#fff",
            padding: "0 16px",
            height: 36,
            color: "#2d3748",
            fontWeight: 500,
          }}
        >
          <Space>
            Filters
            <Badge
              count={6}
              offset={[-4, 0]}
              style={{
                backgroundColor: "#4f46e5",
                boxShadow: "0 0 0 1px #fff",
              }}
            />
          </Space>
        </Button>

        {/* Filters Drawer */}
        <Drawer
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FilterOutlined style={{ color: "#4f46e5" }} />
              <span style={{ fontWeight: 600 }}>Filters</span>
            </div>
          }
          placement="right"
          width={600}
          onClose={() => setOpen(false)}
          open={open}
          closable={true}
          closeIcon={<CloseOutlined style={{ color: "#64748b" }} />}
          headerStyle={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
          bodyStyle={{ padding: 0 }}
          footerStyle={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
              }}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  // Clear all filters logic
                }}
              >
                Clear All
              </Button>
              <Button
                type="primary"
                shape="round"
                style={{
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  border: "none",
                  padding: "0 24px",
                  height: 40,
                  fontWeight: 500,
                }}
                onClick={() => setOpen(false)}
              >
                Show Results
              </Button>
            </div>
          }
        >
          <div style={{ display: "flex", height: "100%" }}>
            {/* Left Navigation */}
            <div
              style={{
                width: 200,
                borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                padding: "16px 0",
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={FILTER_SECTIONS}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      background:
                        activeFilter === item.key
                          ? "rgba(79, 70, 229, 0.05)"
                          : "transparent",
                      borderRadius: 6,
                      margin: "0 12px 4px 12px",
                      padding: "10px 12px",
                      cursor: "pointer",
                      borderLeft:
                        activeFilter === item.key
                          ? "3px solid #4f46e5"
                          : "3px solid transparent",
                    }}
                    onClick={() => setActiveFilter(item.key)}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            activeFilter === item.key ? "#4f46e5" : "#2d3748",
                          fontWeight: activeFilter === item.key ? 500 : 400,
                        }}
                      >
                        {item.label}
                      </Text>
                      {item.count && (
                        <Badge
                          count={item.count}
                          size="small"
                          style={{
                            backgroundColor:
                              activeFilter === item.key ? "#4f46e5" : "#e2e8f0",
                            color:
                              activeFilter === item.key ? "#fff" : "#2d3748",
                          }}
                        />
                      )}
                    </div>
                  </List.Item>
                )}
              />
            </div>

            {/* Right Content */}
            <div
              style={{
                flex: 1,
                padding: "24px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <Title
                  level={5}
                  style={{
                    margin: 0,
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  {FILTER_SECTIONS.find((f) => f.key === activeFilter)?.label}
                </Title>
                <Button
                  type="text"
                  size="small"
                  danger
                  onClick={() => {
                    // Clear current filter logic
                  }}
                >
                  Clear
                </Button>
              </div>

              {activeFilter === "status" && (
                <Radio.Group
                  className="custom-radio"
                  onChange={(e) => setStatusValue(e.target.value)}
                  value={statusValue}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  {["Live", "Expired", "Registrations Closed", "Recent"].map(
                    (option) => (
                      <Radio
                        key={option}
                        value={option}
                        style={{
                          margin: 0,
                          padding: "12px 16px",
                          borderRadius: 8,
                          border:
                            statusValue === option
                              ? "1px solid #4f46e5"
                              : "1px solid rgba(0, 0, 0, 0.08)",
                          backgroundColor:
                            statusValue === option
                              ? "rgba(79, 70, 229, 0.05)"
                              : "#fff",
                        }}
                      >
                        {option}
                      </Radio>
                    )
                  )}
                </Radio.Group>
              )}

              {/* Additional filter sections would go here */}
            </div>
          </div>
        </Drawer>

        {/* Location Filter */}
        <Dropdown
          popupRender={renderLocation}
          trigger={["click"]}
          open={visible}
          onOpenChange={(flag) => setVisible(flag)}
          overlayStyle={{
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
            padding: "8px 0",
          }}
        >
          <Button
            shape="round"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.08)",
              background: "#fff",
              padding: "0 16px",
              height: 36,
              color: "#2d3748",
              fontWeight: 500,
            }}
          >
            <Space>
              Location
              <DownOutlined style={{ fontSize: 12, color: "#64748b" }} />
            </Space>
          </Button>
        </Dropdown>

        {/* Work Type Filter */}
        <Dropdown
          popupRender={dropdownContent}
          trigger={["click"]}
          open={workTypevisible}
          onOpenChange={(flag) => setWorkTypeVisible(flag)}
          overlayStyle={{
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
            padding: "8px 0",
          }}
        >
          <Button
            shape="round"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.08)",
              background: "#fff",
              padding: "0 16px",
              height: 36,
              color: "#2d3748",
              fontWeight: 500,
            }}
          >
            <Space>
              Work Type
              <DownOutlined style={{ fontSize: 12, color: "#64748b" }} />
            </Space>
          </Button>
        </Dropdown>

        {/*Category */}
        <Dropdown
          popupRender={userCatergory}
          trigger={["click"]}
          open={userCatergoryvisible}
          onOpenChange={(flag) => setUserCatergoryVisible(flag)}
          overlayStyle={{
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
            padding: "8px 0",
          }}
        >
          <Button
            shape="round"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.08)",
              background: "#fff",
              padding: "0 16px",
              height: 36,
              color: "#2d3748",
              fontWeight: 500,
            }}
          >
            <Space>
              Category
              <DownOutlined style={{ fontSize: 12, color: "#64748b" }} />
            </Space>
          </Button>
        </Dropdown>

        {/* Quick Apply Button */}
        <div style={{ marginLeft: "auto" }}>
          <Button
            shape="round"
            icon={<ThunderboltOutlined style={{ color: "#f59e0b" }} />}
            style={{
              border: "1px solid rgba(0, 0, 0, 0.08)",
              background: "#fff",
              padding: "0 20px",
              height: 36,
              color: "#fff",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
              background:
                "linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(124, 58, 237) 100%)",
            }}
          >
            <Space>Quick Apply</Space>
          </Button>
        </div>
      </div>

      <div>
        <Row gutter={32}>
          <Col className="job_filter_left" lg={7} xs={24} md={8}>
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </Space>
          </Col>
          <Col className="job_filter_left" lg={17} xs={24} md={16}>
            <div className="job-header">
              <div className="job-header-content">
                <img
                  className="job-logo"
                  src={jobs[0].logo}
                  alt={`${jobs[0].company} logo`}
                />
                <div className="job-title-section">
                  <h1 className="job-title">{jobs[0].title}</h1>
                  <p className="job-company">{jobs[0].company}</p>
                </div>
              </div>

              <div className="job-meta">
                <div className="job-location">
                  <p className="job-meta-item">
                    <FaLocationDot /> {jobs[0].location}
                  </p>
                  <p className="job-meta-item">
                    <FaRegCalendarAlt /> Updated: May 26, 2025
                  </p>
                </div>
                <Button type="primary" className="apply-button" size="large">
                  Apply Now
                </Button>
              </div>
            </div>

            <div className="section-card">
              <div className="job-eligibility">
                <h2 className="section-title">Eligibility</h2>
                <p>{jobs[0].eligibility}</p>
              </div>
            </div>

            <div className="section-card job-description">
              <h2 className="section-title">Job Description</h2>
              <h6>Xerox is hiring for the role of Python Developer!</h6>
              <ul>
                Responsibilities of the Candidate:
                <li>
                  Builds knowledge of the organization, processes and customers.
                </li>
                <li>
                  Requires knowledge and experience in own discipline; still
                  acquiring higher level knowledge and skills.
                </li>
                <li>Receives a moderate level of guidance and direction.</li>
                <li>
                  Moderate decision-making authority guided by policies,
                  procedures, and business operations protocol.
                </li>
              </ul>

              <ul>
                Requirements:
                <li>
                  Will need to be strong on ML pipelines, modern tech stack.
                </li>
                <li>Proven experience with MLOPs with Azure and MLFlow etc.</li>
                <li>Experience with scripting and coding using Python.</li>
                <li>
                  Working Experience with container technologies (Docker,
                  Kubernetes).
                </li>
              </ul>
            </div>

            <div className="section-card">
              <h2 className="section-title">Additional Information</h2>

              <div className="info-card">
                <div className="info-card-content">
                  <h4>Job Location(s)</h4>
                  <p>Pan India</p>
                </div>
                <img
                  className="info-card-image"
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/66702737c9e5c_location.png"
                  alt="Location"
                />
              </div>

              <div className="info-card">
                <div className="info-card-content">
                  <h4>Experience</h4>
                  <p>No prior experience required</p>
                </div>
                <img
                  className="info-card-image"
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/66710a39d5851_experience.png"
                  alt="Experience"
                />
              </div>

              <div className="info-card">
                <div className="info-card-content">
                  <h4>Salary</h4>
                  <p>Competitive compensation package</p>
                </div>
                <img
                  className="info-card-image"
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/667109f58b243_salary.png"
                  alt="Salary"
                />
              </div>

              <div className="info-card">
                <div className="info-card-content">
                  <h4>Work Schedule</h4>
                  <p>
                    <b>Working Days</b>: 5 Days
                  </p>
                </div>
                <img
                  className="info-card-image"
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/667109d710a09_work_detail.png"
                  alt="Work Details"
                />
              </div>

              <div className="info-card">
                <div className="info-card-content">
                  <h4>Job Type/Timing</h4>
                  <p>
                    <b>Job Type</b>: Work From Home
                  </p>
                  <p>
                    <b>Job Timing</b>: Full Time
                  </p>
                </div>
                <img
                  className="info-card-image"
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/667109c430518_job_typetiming.png?d=240x172"
                  alt="Work Details"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
