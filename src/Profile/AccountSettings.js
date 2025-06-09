import React, { useState } from "react";
import { IoMdCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { Drawer, Input, Form } from "antd";
export default function AccountSettings() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("Users Roles / Permissions");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [open, setOpen] = useState(false);
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Santhosh Kathirvel",
      email: "santhoshkathirvel.s@actetechnologies.com",
      phone: "+91 6383990217",
      role: "Account Owner",
      avatar: "SK",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+1 555-123-4567",
      role: "Manager",
      avatar: "JD",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+44 7700 900123",
      role: "Evaluator",
      avatar: "JS",
    },
  ]);

  // Available roles
  const roles = ["Account Owner", "Manager", "Evaluator"];

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  // Tabs configuration
  const tabs = [
    "Users Roles / Permissions",
    "Plans",
    "Billing history",
    "Blocked Candidates & Org.",
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="account-settings-container">
      <h2 style={{ textAlign: "left" }}>Account Settings</h2>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === "Users Roles / Permissions" && (
        <>
          {/* Section Title */}
          <div className="section-header">
            <h3>Users Roles / Permissions</h3>
            <p>
              Manage user roles, set permissions, and control access for a
              secure system.
            </p>
          </div>

          {/* User Cards */}
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">{user.avatar}</div>
              <div className="user-info">
                <div style={{ textAlign: "left" }} className="user-name">
                  {user.name}
                </div>
                <div className="user-email">
                  <HiOutlineMail /> {user.email}
                </div>
                <div className="user-phone">
                  <IoMdCall /> {user.phone}
                </div>
              </div>
              <div className="user-role-label">{user.role}</div>

              {/* Role Buttons - only show if not Account Owner */}
              {user.role !== "Account Owner" && (
                <div className="role-buttons">
                  {roles
                    .filter(
                      (role) => role !== user.role && role !== "Account Owner"
                    )
                    .map((role) => (
                      <button
                        key={role}
                        className="role-btn"
                        onClick={() => handleRoleChange(user.id, role)}
                      >
                        {role}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}

          {/* Add User Button */}
          <button onClick={showDrawer} className="add-user-btn">
            + Add New User
          </button>

          <Drawer
            className="adduser_drawer"
            title="Add new user"
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={open}
          >
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
                label={<span style={{ fontWeight: 500 }}>Official Email</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Official Email",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  className="premium-input"
                />
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item
                layout="vertical"
                label={<span style={{ fontWeight: 500 }}>Mobile No.</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Number",
                  },
                ]}
              >
                <Input
                  type="tel"
                  placeholder="Number"
                  className="premium-input"
                />
              </Form.Item>
            </div>
            <div style={{textAlign: "end"}}>
              <button>Add +</button>
            </div>
          </Drawer>
        </>
      )}

      {activeTab === "Plans" && (
        <div className="plans-container">
          <h2>Plans</h2>
          <p>Compare plans and explore the benefits.</p>

          {/* Current Plan Banner */}
          <div className="current-plan-box">
            <div className="current-plan-info">
              <span className="status-dot" />
              <div style={{ textAlign: "left" }}>
                <strong>Current Plan</strong>
                <div>Standard Plan</div>
                <small>
                  The changes will be reflected within 15 minutes if you
                  upgrade.
                </small>
              </div>
            </div>
            <div className="upgrade-box">
              <strong>
                Upgrade <span className="highlight">Plan</span>
              </strong>
              <p className="upgrade-note">Get 3x more visibility</p>
              <a href="#" className="view-plans">
                View plans
              </a>
            </div>
          </div>

          <hr />

          {/* Toggle Billing Cycle */}
          <div className="plan-toggle">
            <h3 style={{ textAlign: "center" }}>Plan & Features</h3>
            <p style={{ textAlign: "center" }}>
              Discover the Features of Each Plan & Select the Right One for You
            </p>
            <div className="toggle-buttons">
              <button
                className={billingCycle === "monthly" ? "active" : ""}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={billingCycle === "annually" ? "active" : ""}
                onClick={() => setBillingCycle("annually")}
              >
                Annually <span className="save-text">(save up to 17%)</span>
              </button>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="plans-grid">
            <div className="plan-card">
              <h4>Standard</h4>
              <p className="price">₹0</p>
              <small>₹0 Annually</small>
              <p>
                Get limited access to job listings and competitions to find the
                right talent.
              </p>
              <button className="activeplan">
                <GoDotFill /> Current Plan
              </button>
              <div className="activeplanline"></div>

              <div className="activeplanlist">
                <h6>Includes:</h6>
                <ul>
                  <li>Upto 3 public live jobs/internships at any time</li>
                  <li>Public Approval within 24 hours</li>
                  <li>Upto 14 day registration window</li>
                  <li>24 hour support via email</li>
                  <li>Upto 50 assessment attempts allowed per opportunity</li>
                  <li>Upto 10 interviews allowed per opportunity listing</li>
                </ul>
              </div>
            </div>

            <div className="plan-card highlighted">
              <h4>Hiring Plan</h4>
              <p className="price">
                ₹4,999 <span>/Mo</span>
              </p>
              <small>₹59,988 Annually</small>
              <p>
                Increased access to job listings, competitions and more
                features.
              </p>
              <button className="getplan">Get now</button>
              <div className="activeplanline"></div>
              <div className="activeplanlist">
                <h6>Everything from Basic & plus:</h6>
                <ul>
                  <li>Upto 10 public live jobs/internships at any time</li>
                  <li>Public approval within an hour</li>
                  <li>Upto 60 day registration window</li>
                  <li>
                    Dedicated Relationship Manager to solve all your hiring
                    needs
                  </li>
                  <li>Upto 150 assessment attempts allowed per opportunity</li>
                  <li>Upto 50 interviews allowed per opportunity listing</li>
                </ul>
              </div>
            </div>

            <div className="plan-card">
              <h4>Enterprise</h4>
              <p className="price">Custom</p>
              <p>
                Access to unlimited job listings, AI-powered tools and custom
                solutions.
              </p>
              <button className="getplan">Get now</button>
              <div className="activeplanline"></div>
              <div className="activeplanlist">
                <h6>Everything from Hiring plan & plus:</h6>
                <ul>
                  <li>Unlimited public live jobs/internships at any time</li>
                  <li>Public Approval of listings within 10 minutes</li>
                  <li>Upto 180 day registration window</li>
                  <li>
                    Dedicated Relationship Manager to solve all your hiring
                    needs
                  </li>
                  <li>Newsletter Inclusion for each public listing</li>
                  <li>Access to state of the art AI interviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Billing history" && (
        <div className="tab-content">
          <h3>Billing History</h3>
          <p>View your payment history and invoices.</p>
          {/* Placeholder for billing content */}
          <div className="blurred-blocks">
            <div className="blurred-item"></div>
            <div className="blurred-item"></div>
          </div>
        </div>
      )}

      {activeTab === "Blocked Candidates & Org." && (
        <div className="tab-content">
          <h3>Blocked Candidates & Organizations</h3>
          <p>Manage your blocked list.</p>
          {/* Placeholder for blocked content */}
          <div className="blurred-blocks">
            <div className="blurred-item"></div>
            <div className="blurred-item"></div>
          </div>
        </div>
      )}
    </div>
  );
}
