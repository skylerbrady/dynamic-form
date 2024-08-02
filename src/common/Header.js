import React from "react";
import { useMsal } from "@azure/msal-react";
import "./header.css";

const Header = (props) => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <header className="header">
      <div className="user-menu">
        <span>{props.userName}</span>
        {props.unauthenticated ? (
          <button className="logout-button" onClick={props.handleRedirect}>
            Sign up
          </button>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
