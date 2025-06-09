import React, { useState } from "react";
import {
  Tabs,
  Input,
  Button,
  Card,
  Tag,
  Space,
  Typography,
  Dropdown,
  Menu,
  Badge,
  Select,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  HeartFilled,
  ShareAltOutlined,
  WifiOutlined,
  EllipsisOutlined,
  FilterOutlined,
  StarFilled,
  StarOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { CommonToaster } from "../Common/CommonToaster";
import CommonSelectField from "../Common/CommonSelectField";

const { Title, Text } = Typography;
const { Option } = Select;

const tabLabels = ["All Opportunities", "Internships", "Full-time Roles"];

const statusOptions = [
  { value: "live", label: "Live" },
  { value: "closed", label: "Closed" },
  { value: "upcoming", label: "Upcoming" },
];

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "deadline", label: "Application Deadline" },
  { value: "popular", label: "Most Popular" },
];

const mockOpportunities = [
  {
    id: 1,
    title: "Data Engineer",
    company: "Komodo Health",
    type: "Full-time",
    location: "San Francisco, CA (Hybrid)",
    salary: "$120,000 - $150,000",
    deadline: "2023-11-15",
    status: "live",
    saved: true,
    logo: "https://via.placeholder.com/80/4a90e2/ffffff?text=KH",
  },
  {
    id: 2,
    title: "Product Design Intern",
    company: "Figma",
    type: "Internship",
    location: "Remote",
    salary: "$45/hr",
    deadline: "2023-10-30",
    status: "live",
    saved: false,
    logo: "https://via.placeholder.com/80/ff7262/ffffff?text=FIG",
  },
  {
    id: 3,
    title: "Machine Learning Researcher",
    company: "OpenAI",
    type: "Full-time",
    location: "San Francisco, CA",
    salary: "$180,000 - $220,000",
    deadline: "2023-11-05",
    status: "upcoming",
    saved: true,
    logo: "https://via.placeholder.com/80/10a37f/ffffff?text=AI",
  },
];

const getStatusTag = (status) => {
  switch (status) {
    case "live":
      return (
        <Tag color="green" icon={<WifiOutlined />}>
          Live
        </Tag>
      );
    case "closed":
      return <Tag color="red">Closed</Tag>;
    case "upcoming":
      return <Tag color="orange">Upcoming</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const OpportunityCard = ({ opportunity, onSave }) => {
  const [saved, setSaved] = useState(opportunity.saved);

  const handleSave = () => {
    setSaved(!saved);
    if (saved === false) {
      CommonToaster("Added to favourites ⭐", "success");
    } else {
      CommonToaster("Removed from favourites ☆", "error");
    }
    onSave(opportunity.id, !saved);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<ShareAltOutlined />}>
        Share
      </Menu.Item>
      <Menu.Item key="2" icon={<CalendarOutlined />}>
        Add to Calendar
      </Menu.Item>
      <Menu.Item key="3">View Similar Roles</Menu.Item>
    </Menu>
  );

  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        border: "none",
      }}
    >
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flexShrink: 0 }}>
          <img
            src={opportunity.logo}
            alt={opportunity.company}
            style={{
              borderRadius: 8,
              width: 80,
              height: 80,
              objectFit: "cover",
              border: "1px solid #f0f0f0",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Title level={5} style={{ margin: 0 }}>
              {opportunity.title}
            </Title>
            <Button
              type="text"
              icon={
                saved ? (
                  <StarFilled style={{ color: "#faad14" }} />
                ) : (
                  <StarOutlined />
                )
              }
              onClick={handleSave}
            />
          </div>

          <Text
            strong
            style={{ display: "block", marginBottom: 4, textAlign: "left" }}
          >
            {opportunity.company}
          </Text>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              flexWrap: "wrap",
            }}
          >
            <Tag>{opportunity.type}</Tag>
            <Tag>{opportunity.location}</Tag>
            <Tag color="blue">{opportunity.salary}</Tag>
            {getStatusTag(opportunity.status)}
          </div>

          <Text
            type="secondary"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <CalendarOutlined /> Apply by {opportunity.deadline}
          </Text>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Dropdown overlay={menu} placement="bottomRight">
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
          <Button
            type="primary"
            size="large"
            style={{ borderRadius: 8, background: "rgb(95, 46, 234)" }}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function WatchList() {
  const [activeTab, setActiveTab] = useState("0");
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlisted, setWishlisted] = useState(false);

  const handleSave = (id, saved) => {
    setOpportunities(
      opportunities.map((opp) => (opp.id === id ? { ...opp, saved } : opp))
    );
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    // Filter by tab
    if (activeTab === "1" && opp.type !== "Internship") return false;
    if (activeTab === "2" && opp.type !== "Full-time") return false;

    // Filter by search
    if (
      searchQuery &&
      !`${opp.title} ${opp.company}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const tabItems = tabLabels.map((label, index) => ({
    key: index.toString(),
    label: (
      <span style={{ padding: "0 16px" }}>
        {label}{" "}
        {index === 0 && (
          <Badge
            count={opportunities.length}
            style={{ backgroundColor: "#5f2eea" }}
          />
        )}
      </span>
    ),
    children: (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
            marginTop: 15,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Input
            placeholder="Search by role or company..."
            prefix={<SearchOutlined />}
            style={{
              flex: "1 1 300px",
              borderRadius: 8,
              padding: "10px 16px",
              maxWidth: 400,
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <CommonSelectField
            defaultValue={["live"]}
            name="watchlist"
            className="custom-select"
            options={statusOptions}
            showSearch={true}
          />

          <CommonSelectField
            defaultValue={["recent"]}
            name="watchlist"
            className="custom-select"
            options={sortOptions}
            showSearch={true}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onSave={handleSave}
              />
            ))
          ) : (
            <Card style={{ textAlign: "center", padding: 40 }}>
              <Title level={4} style={{ color: "#bfbfbf" }}>
                No opportunities found
              </Title>
              <Text type="secondary">
                Try adjusting your filters or search query
              </Text>
            </Card>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <section
      className="watchlist-container"
      style={{
        padding: "24px 32px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
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
        <Title level={3} style={{ margin: 0 }}>
          My Opportunity Watchlist
        </Title>
      </div>

      <Tabs
        defaultActiveKey="0"
        items={tabItems}
        onChange={setActiveTab}
        tabBarStyle={{ marginBottom: 0 }}
        tabBarExtraContent={
          <Text type="secondary">
            {filteredOpportunities.length} opportunities
          </Text>
        }
      />
    </section>
  );
}
