import axios from "axios";

export const api = async (accessToken, apiUrl, method = "GET", data = null) => {
  try {
    const response = await axios({
      method: method,
      url: apiUrl,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
