import React, { useState, useEffect } from "react";
import MainContent from "./MainContent";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const MainView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (!activeAccount) {
      handleRedirect();
    }
  });
  return (
    <>
      <AuthenticatedTemplate>
        {activeAccount ? <MainContent /> : ""}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect}>Sign up</button>
      </UnauthenticatedTemplate>
    </>
  );
};
const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <MainView />
    </MsalProvider>
  );
};
export default App;
