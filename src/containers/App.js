import React, { useState, useEffect } from "react";
import MainContent from "./MainContent";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const MainView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [accessToken, setAccessToken] = useState(null);
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

  useEffect(() => {
    const fetchAccessToken = async () => {
      const request = {
        scopes: ["user.read"], // Update with the scopes your API requires
      };

      try {
        const response = await instance.acquireTokenSilent(request);
        setAccessToken(response.accessToken);
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          instance.acquireTokenRedirect(request);
        } else {
          console.error("Error acquiring token silently", error);
        }
      }
    };

    if (activeAccount) {
      fetchAccessToken();
    }
  }, [instance, activeAccount]);
  return (
    <>
      <AuthenticatedTemplate>
        {activeAccount ? <MainContent accessToken={accessToken} /> : ""}
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
