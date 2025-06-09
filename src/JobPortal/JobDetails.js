import React, { useState } from "react";
import {
  Row,
  Col,
  Collapse,
  Form,
  Input,
  Space,
  Drawer,
  Button,
  message,
} from "antd";
import {
  FaRegBuilding,
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaCrown,
  FaHeart,
} from "react-icons/fa";
import {
  StarFilled,
  MinusCircleFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { IoIosShareAlt } from "react-icons/io";
import { FcIdea } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { BsBookmarkDash } from "react-icons/bs";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { CommonToaster } from "../Common/CommonToaster";

const tabs = [
  "Job Description",
  "Dates & Deadlines",
  "Reviews",
  "FAQs & Discussions",
];

export default function JobDetails() {
  const [wishlisted, setWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setWishlisted(!wishlisted);
    // Show toast notification
    if (wishlisted === false) {
      CommonToaster("Added to wishlist ❤️", "success");
    } else {
      CommonToaster("Removed from wishlist 💔", "error");
    }
  };

  const [bookMark, setBookMark] = useState(false);
  const handBookMarkToggle = () => {
    setBookMark(!bookMark);
    if (bookMark === false) {
      CommonToaster("Added to Bookmark", "success");
    } else {
      CommonToaster("Removed from Bookmark", "error");
    }
  };

  const [activeTab, setActiveTab] = useState("Job Description");
  const [feedback, setFeedback] = useState("");
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [initialForm] = Form.useForm();
  const [experienceForm] = Form.useForm();

  const [step, setStep] = useState("initial"); // 'initial' or 'experience'

  const [userData, setUserData] = useState({}); // Store form values temporarily

  const handleInitialSubmit = (values) => {
    setUserData(values);
    setStep("experience");
  };

  const handleExperienceSubmit = (values) => {
    const finalData = { ...userData, ...values };
    console.log("Final submitted data:", finalData);
    message.success("Applied Successfully!");

    // Reset all forms and loop back
    initialForm.resetFields();
    experienceForm.resetFields();
    setUserData({});
    setStep("initial");
    // Close the drawer
    onClose();
  };

  const [form] = Form.useForm();
  const [showExperienceField, setShowExperienceField] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
    setShowExperienceField(true); // Show experience input
  };

  return (
    <section className="premium-job-details">
      <Row>
        <Col lg={24} md={24} sm={24}>
          <div className="premium-job-card">
            <div className="">
              <div className="premium-border"></div>
              <div className="premium-indicator">
                <FaCrown className="crown-icon" />
                <span>Premium</span>
              </div>

              <div className="company-logo-wrapper">
                <div className="icons">
                  <span className="icon" onClick={handBookMarkToggle}>
                    {bookMark ? (
                      <BsBookmarkPlusFill className="icon bookmark active" />
                    ) : (
                      <BsBookmarkDash className="icon bookmark" />
                    )}
                  </span>
                </div>

                <img
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/683465341f9b9_organisation_image-15kxnlB56t969793549VxJZL2Qik1.png"
                  alt="Company Logo"
                  className="premium-logo"
                />
              </div>

              <div className="job-content">
                <h2 className="premium-job-title">
                  Sales and Marketing Manager
                </h2>

                <div className="job-meta-item">
                  <FaRegBuilding className="meta-icon premium-icon" />
                  <span className="meta-text">
                    Spaceblack Adsorbents Pvt. Ltd.
                  </span>
                  <span className="verified-badge">Verified</span>
                </div>

                <div className="job-meta-item">
                  <FaMapMarkerAlt className="meta-icon premium-icon" />
                  <span className="meta-text">Vadodara</span>
                </div>

                <div className="job-meta-item">
                  <FaRegCalendarAlt className="meta-icon premium-icon" />
                  <span className="meta-text">Updated On: May 26, 2025</span>
                </div>

                <div className="job-tags">
                  <span className="tag">Full Time</span>
                  <span className="tag">5+ Years Exp</span>
                  <span className="tag">$80k-$120k</span>
                </div>
              </div>
            </div>

            <div className="job_card">
              <div className="quick_apply">
                <div className="quick_apply_btn">
                  <>
                    <div className="icons">
                      <span className="icon" onClick={handleWishlistToggle}>
                        {wishlisted ? (
                          <FaHeart className="icon heart active" />
                        ) : (
                          <FaRegHeart className="icon heart" />
                        )}
                      </span>

                      <IoMdCalendar className="icon calendar" />
                    </div>
                  </>
                  <button className="share_btn">
                    <IoIosShareAlt /> Share
                  </button>
                </div>

                <button onClick={showDrawer} className="quick_apply_main_btn">
                  Quick Apply
                </button>
                <Drawer
                  size="default"
                  title="Apply Now"
                  closable={{ "aria-label": "Close Button" }}
                  onClose={onClose}
                  open={open}
                >
                  <p>
                    Hi Santhosh! we request you to take a couple of minutes to
                    update your profile.
                  </p>
                  <>
                    {step === "initial" && (
                      <Form
                        form={initialForm}
                        name="initialForm"
                        layout="vertical"
                        onFinish={handleInitialSubmit}
                        autoComplete="off"
                      >
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input className="premium-input" />
                        </Form.Item>
                        <Form.Item
                          name="age"
                          label="Age"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your age",
                            },
                          ]}
                        >
                          <Input className="premium-input" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            className="additional_details_btn"
                            type="primary"
                            htmlType="submit"
                          >
                            Save
                          </Button>
                        </Form.Item>
                      </Form>
                    )}

                    {step === "experience" && (
                      <Form
                        form={experienceForm}
                        name="experienceForm"
                        layout="vertical"
                        onFinish={handleExperienceSubmit}
                      >
                        <Form.Item
                          name="experience"
                          label="How many years of experience do you have?"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your experience",
                            },
                          ]}
                        >
                          <Input
                            className="premium-input"
                            placeholder="e.g., 3 years"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            className="additional_details_btn"
                            type="primary"
                            htmlType="submit"
                          >
                            Save Experience
                          </Button>
                        </Form.Item>
                      </Form>
                    )}
                  </>
                </Drawer>
                <div className="eligibility_section">
                  <strong>Eligibility</strong>
                  <p>
                    Fresher • Engineering Students • Postgraduate •<br />
                    MBA Students • Undergraduate •<br />
                    Experienced Professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="job-details-container">
        {/* Premium Tab Navigation */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="tab-label">{tab}</span>
              {activeTab === tab && <div className="active-indicator" />}
            </button>
          ))}
        </div>
        {activeTab === "Job Description" && (
          <div className="job-content-tab">
            <div className="premium-tab-header">
              <h3>Details</h3>
              <div className="accent-line" />
            </div>

            <section className="premium-section">
              <div className="section-tab-header">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M12,3L2,12H5V20H19V12H22L12,3Z" />
                </svg>
                <strong>About Us:</strong>
              </div>
              <ul className="premium-list">
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    SpaceBlack Adsorbents Pvt Ltd is a fast-growing
                    manufacturer, supplier and exporter of Activated Carbon.
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Our state-of-the-art facility delivers premium-grade
                    products for water purification, air treatment, food
                    processing, and various industrial applications across India
                    and overseas.
                  </span>
                </li>
              </ul>
            </section>

            <section className="premium-section">
              <div className="section-tab-header">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <strong>Role Overview:</strong>
              </div>
              <ul className="premium-list">
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    We are seeking a dynamic and driven Sales and Marketing
                    Manager to lead business growth through strategic sales,
                    customer acquisition, and marketing initiatives.
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    This is a high-impact role with direct influence on revenue
                    and market expansion.
                  </span>
                </li>
              </ul>
            </section>

            <section className="premium-section">
              <div className="section-tab-header">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M3,3V21H21V3H3M7,7H17V9H7V7M7,11H17V13H7V11M7,15H14V17H7V15Z" />
                </svg>
                <strong>Key Responsibilities:</strong>
              </div>
              <ul className="premium-list">
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Identify, develop, and manage domestic and international
                    sales opportunities
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Achieve quarter-on-quarter sales targets and revenue goals
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Develop and implement marketing campaigns and
                    lead-generation strategies
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Build strong customer relationships and ensure high service
                    standards
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Represent the company in exhibitions, industry events, and
                    trade shows
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>Conduct market research and competitor analysis</span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Prepare and deliver presentations, technical proposals, and
                    quotations
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Maintain detailed records of leads, opportunities, and
                    client communications
                  </span>
                </li>
              </ul>
            </section>

            <section className="premium-section">
              <div className="section-tab-header">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 2H14C15.1 2 16 2.9 16 4V6H19C20.1 6 21 6.9 21 8V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V8C3 6.9 3.9 6 5 6H8V4C8 2.9 8.9 2 10 2M10 6H14V4H10V6Z" />
                </svg>
                <strong>Candidate Requirements:</strong>
              </div>
              <ul className="premium-list">
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Education: Bachelor’s in Marketing, Business, Chemistry, or
                    Engineering (preferred)
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Experience: 0-10 years in industrial B2B sales (Activated
                    Carbon or related sectors preferred)
                  </span>
                </li>
              </ul>
            </section>

            <section className="premium-section">
              <div className="section-tab-header">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 7L9 19L3.5 13.5L5.91 11.09L9 14.17L18.59 4.59L21 7Z" />
                </svg>
                <strong>Skills:</strong>
              </div>
              <ul className="premium-list">
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>Strong verbal and written communication</span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>Confident in negotiation and closing deals</span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>Willingness to travel across India and abroad</span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Proficiency in MS Office, CRM tools, and sales tracking
                    systems
                  </span>
                </li>
                <li className="list-item">
                  <span className="bullet">•</span>
                  <span>
                    Self-starter with strong time management and follow-up
                    skills
                  </span>
                </li>
              </ul>
            </section>

            <div className="important_note">
              <p>
                <FcIdea className="idea" /> If an employer asks you to pay any
                kind of fee, please notify us immediately. Unstop does not
                charge any fee from the applicants and we do not allow other
                companies also to do so.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Dates & Deadlines" && (
          <div className="job_filter">
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
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="reviews-tab">
            {/* Feedback & Rating */}
            <section className="premium-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className="section-title">Share Your Experience</h3>
                <p className="section-subtitle">
                  Your feedback helps us improve
                </p>
              </div>

              <div className="rating-container">
                <div className="rating-prompt">
                  How would you rate this opportunity?
                </div>
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index} className="star-label">
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          className="visually-hidden"
                        />
                        <FaStar
                          className="star"
                          color={
                            ratingValue <= (hover || rating)
                              ? "#4F46E5"
                              : "#E5E7EB"
                          }
                          size={28}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(0)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Your detailed feedback</label>
                <textarea
                  className="premium-textarea"
                  placeholder="What did you like or think could be improved?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />
                <div className="character-count">{feedback.length}/500</div>
              </div>

              <button className="premium-submit-btn">
                <span>Submit Review</span>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </section>

            {/* FAQ / Discussion */}
            <section className="premium-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="section-title">Community Discussion</h3>
                <p className="section-subtitle">
                  Ask questions and get answers
                </p>
              </div>

              <div className="input-group">
                <label className="input-label">Start a discussion</label>
                <textarea
                  className="premium-textarea"
                  placeholder="Be specific with your question to get better answers..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                />
              </div>

              <button className="premium-submit-btn">
                <span>Post Question</span>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="empty-state">
                <div className="empty-icon">
                  <FiLock size={24} />
                </div>
                <h4 className="empty-title">No discussions yet</h4>
                <p className="empty-message">
                  Be the first to start a conversation about this opportunity
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === "FAQs & Discussions" && (
          <div className="reviews-tab premium-indigo-theme">
            <div className="indigo-header">
              <div className="review-badge">
                <StarFilled style={{ color: "#ffc107" }} />
                <span>4.9/5.0</span>
              </div>
              <h2 className="indigo-title">What Our Clients Say</h2>
              <p className="indigo-subtitle">
                Trusted by thousands of satisfied customers
              </p>
            </div>

            <Collapse
              accordion
              items={items}
              className="indigo-collapse"
              expandIcon={({ isActive }) => (
                <div className="indigo-expand-icon">
                  {isActive ? <MinusCircleFilled /> : <PlusCircleFilled />}
                </div>
              )}
              expandIconPosition="end"
              bordered={false}
            />
          </div>
        )}
      </div>
    </section>
  );
}
