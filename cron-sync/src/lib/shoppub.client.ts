import axios from "axios";

export const shoppubClient = axios.create({
  baseURL: `https://${process.env.SHOPPUB_STORE}/api/v1`,
  headers: {
    Authorization: `Token ${process.env.SHOPPUB_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

