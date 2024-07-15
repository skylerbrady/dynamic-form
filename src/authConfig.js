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
};

export const loginRequest = {
  scopes: ["User.Read"],
};
