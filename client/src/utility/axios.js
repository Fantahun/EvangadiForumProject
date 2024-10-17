import axios from "axios";

const serverPort = import.meta.env.PORT || 5000;

export const axiosInstance = axios.create({
  //local endpoint reference
  // baseURL: `http://localhost:${serverPort}/api/v1`,

  // deployed endpoint reference
  baseURL: "https://evangadiforumprojectg-4.onrender.com/api/v1",
});
