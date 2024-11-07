import React from "react";
import "./index.css";
import App from "./containers/App";
import ReactDOM from "react-dom";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

msalInstance.addEventCallback(
  (event) => {
    // set active account after redirect
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
      console.log("hello");
    }
  },
  (error) => {
    console.log("callback error", error);
  }
);

ReactDOM.render(
  <App instance={msalInstance} />,
  document.getElementById("root")
);
