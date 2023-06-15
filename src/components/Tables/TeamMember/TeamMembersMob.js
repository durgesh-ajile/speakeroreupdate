import React from 'react';
import './TeamMembers.css';
import { BiSearchAlt } from 'react-icons/bi';

function createData(name, calories, fat, carbs, protein, action) {
  return { name, calories, fat, carbs, protein, action };
}

const rows = [
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
];

export default function TeamMembers() {
  return (
    <div className="team-members-container">
      <div className="search-bar">
        {/* <BiSearchAlt className="search-icon" /> */}
        <input
          placeholder="Search via subscription plan"
          className="search-input"
        />
      </div>
      <div className="member-list">
        {rows.map((row) => (
          <div className="member-card" key={row.name}>
            <div className="member-info">
              <div className="info-row">
                <span className="info-label">USER ID |</span>
                <span className="info-value">{row.name}</span>
              </div>
              <div className="info-row">
                <span className="info-value">{row.calories}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Plan |</span>
                <span className="info-value">{row.fat}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Start Date|</span>
                <span className="info-value">{row.carbs}</span>
                <span className="info-label">Expiry Date|</span>
                <span className="info-value">{row.carbs}</span>
              </div>
              <div className="button-group">
                <button className="backlist-button">Backlist</button>
                <button className="make-member-button">Make Member</button>
              </div>
            </div>
            <hr className="divider" />
          </div>
        ))}
      </div>
    </div>
  );
}
