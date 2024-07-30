import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "26ba84c8-fe43-4f5f-96af-8568955a970b",
    authority:
      "https://login.microsoftonline.com/5b973f99-77df-4beb-b27d-aa0c70b8482c",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },

  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["api://b9a23d5a-5d95-4bf2-865c-aeacdd5d0afa/access_as_argt_user"], // Add the required scopes here
};
