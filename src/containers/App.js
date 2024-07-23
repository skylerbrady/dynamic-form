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
        prompt: "select_account",
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!activeAccount) {
      handleRedirect();
    }
  }, [activeAccount, handleRedirect]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const request = {
        scopes: loginRequest.scopes, // scopes API requires
        account: activeAccount,
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const checkAndRefreshToken = async () => {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          const request = {
            scopes: loginRequest.scopes,
            account: accounts[0],
          };

          try {
            const response = await instance.acquireTokenSilent(request);
            setAccessToken(response.accessToken);
          } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
              instance.acquireTokenRedirect(request);
            } else {
              console.error("Error refreshing token silently", error);
            }
          }
        }
      };

      checkAndRefreshToken();
    }, 300000); //refresh token every 5 minutes

    return () => clearInterval(intervalId);
  }, [instance]);

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
