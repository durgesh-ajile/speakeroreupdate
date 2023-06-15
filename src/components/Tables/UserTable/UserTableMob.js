import React from "react";
import UsersCard from "./UsersCard";
import { BiSearchAlt } from "react-icons/bi";
const UsersWrapper = () => {
  return (
    <div>
      <div className="input-div">
      <input
  placeholder="Search via roles"
  style={{
    padding: '8px 8px 8px 32px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    width: '280px',
    marginTop: '20px',
    backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3E%3Ccircle cx="11" cy="11" r="8" fill="white" /%3E%3Cpath d="M21 21l-4.35-4.35" /%3E%3C/svg%3E')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '8px center',
    backgroundSize: '16px',
  }}
/>
      </div>
      <UsersCard />
      <hr style={{ marginLeft: 0, width: "100vw" }} />
      <UsersCard />
      <hr style={{ marginLeft: 0, width: "100vw" }} />
      <UsersCard />
    </div>
  );
};

export default UsersWrapper;
