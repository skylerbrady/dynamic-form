import React from "react";
import { useMsal } from "@azure/msal-react";
import "./header.css";

const Header = ({ userName }) => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <header className="header">
      <div className="user-menu">
        <span>{userName}</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0078D4",
    color: "#fff",
  },
  title: {
    margin: 0,
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
  },
  logoutButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#fff",
    color: "#0078D4",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;
