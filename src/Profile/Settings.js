import React from "react";
import {
  Switch,
  Typography,
  Collapse,
  Input,
  Form,
  Button,
  Select,
} from "antd";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
const { Title, Text } = Typography;
const { Option } = Select;
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const text1 = [
  {
    key: "1",
    texted: (
      <>
        <div className="settings_page">
          <div style={{ textAlign: "left" }}>
            {" "}
            <h5>Newsletter Preference</h5>
            <p>
              Our newsletter will gain you access to the latest updates
              regarding the hiring challenges of top recruiters (like Walmart,
              Flipkart, Uber, Amazon, etc.), jobs & internships, competitions,
              quizzes, and hackathons from elite colleges across the world.
            </p>
          </div>
          <div>
            <Switch onChange={onChange} />
          </div>
        </div>

        <div className="settings_page">
          <div style={{ textAlign: "left" }}>
            {" "}
            <h5>Email Notification Preferences</h5>
            <p>
              Automated reminders are sent in case of incomplete registration
              (incomplete extended form or incomplete payment), daily quiz and
              hackathon reminders, submission reminders, and reminder to submit
              a review.
            </p>
          </div>
          <div>
            <Switch size="small" onChange={onChange} />
          </div>
        </div>

        <div className="settings_page">
          <div style={{ textAlign: "left" }}>
            {" "}
            <p>
              You can turn on the emails sent by the organizers for a
              single/multiple competitions from the My Registration page.
            </p>
          </div>
          <div>
            <Switch size="small" onChange={onChange} />
          </div>
        </div>

        <div className="settings_page">
          <div style={{ textAlign: "left" }}>
            {" "}
            <p>Relevant Jobs notifications</p>
          </div>
          <div>
            <Switch size="small" onChange={onChange} />
          </div>
        </div>
      </>
    ),
  },
  {
    key: "2",
    texted: (
      <>
        <div className="settings_page">
          <div style={{ textAlign: "left" }}>
            {" "}
            <h5>Change Password</h5>
            <p>
              If you wish to change your password, you can change from here.
            </p>
          </div>
        </div>
        <Form name="passform" autoComplete="off">
          <div style={{ display: "flex" }}>
            <CommonInputField
              name="currentpass"
              label="Enter current password"
              mandotary={true}
              placeholder="******"
              type="password"
              // error={"Please enter your current password"}
            />
          </div>

          <div className="form-row">
            <CommonInputField
              name="newpass"
              label="Enter New password"
              mandotary={true}
              placeholder="******"
              type="password"
              // error={"Please enter your new password"}
            />

            <CommonInputField
              name="confirmpass"
              label="Enter Confirm password"
              mandotary={true}
              placeholder="******"
              type="password"
              // error={"Please enter your confirm password"}
            />
          </div>
          <div style={{ display: "flex", paddingTop: 26 }}>
            <Button
              className="additional_details_btn"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </>
    ),
  },
  {
    key: "3",
    texted: (
      <>
        <div className="settings_page">
          <div style={{ textAlign: "left" }}>
            {" "}
            <h5>Profile Visibility</h5>
            <p>
              You can choose to make your profile public (searchable on Google)
              or private (hidden from search engines).
            </p>
          </div>
          <div>
            <CommonSelectField
              style={{
                borderRadius: "5px",
                backgroundColor: "rgb(147 134 255)",
              }}
              name="profilevisibility"
              defaultValue="Public"
              options={[
                {
                  value: "Public",
                  label: "Public",
                },
                {
                  value: "Private",
                  label: "Private",
                },
              ]}
              showSearch={true}
            />
          </div>
        </div>
      </>
    ),
  },
];

const items = text1.map(({ key, texted }) => ({
  key,
  label:
    key === "1"
      ? "Notifications"
      : key === "2"
      ? "Password"
      : key === "4"
      ? "Profile"
      : "Manage Devices",
  children: texted,
}));

export default function Settings() {
  return (
    <section
      style={{
        padding: "24px 32px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
      }}
    >
      <div
        style={{
          marginBottom: 24,
          textAlign: "left",
        }}
      >
        {" "}
        <Title level={3} style={{ margin: 0 }}>
          Settings
        </Title>
        <hr></hr>
      </div>

      <Collapse
        className="settings_collapse"
        items={items}
        bordered={false}
        defaultActiveKey={["1"]}
      />
    </section>
  );
}
