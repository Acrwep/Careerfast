import React from "react";
import { MdMenuBook, MdOndemandVideo, MdSearch } from "react-icons/md";
import { FaUsers, FaFileUpload, FaRegSmileWink } from "react-icons/fa";

export default function LoginPortal() {
  return (
    <div className="login-portal-container">
      <div className="portal-left">
        <div className="left-content">
          <h1 className="main-heading">
            Login Once.
            <br />
            Access 3 Portals.
          </h1>
          <p className="subheading">
            Your complete career development solution
          </p>

          <div className="features-container">
            <div className="feature-card">
              <div className="feature-header">
                <div className="icon-circle blue">
                  <MdMenuBook className="feature-icon" />
                </div>
                <h3>Learning Management System</h3>
              </div>
              <ul className="feature-list">
                <li>Watch top trainers' videos and docs</li>
                <li>Learn anytime with structured courses</li>
                <li>Quickly find topics with organized materials</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="icon-circle green">
                  <MdOndemandVideo className="feature-icon" />
                </div>
                <h3>AI Interview Preparation</h3>
              </div>
              <ul className="feature-list">
                <li>Practice company-based interview questions</li>
                <li>Take online assessment tests</li>
                <li>Get personalized feedback</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="icon-circle gold">
                  <FaUsers className="feature-icon" />
                </div>
                <h3>Placement Portal</h3>
              </div>
              <ul className="feature-list">
                <li>Upload your optimized resume</li>
                <li>Connect with top employers</li>
                <li>Your dream job awaits!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="portal-right">
        <div className="login-form-container">

        </div>
      </div>
    </div>
  );
}
