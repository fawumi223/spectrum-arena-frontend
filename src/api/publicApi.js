import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api/";

const publicApi = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicApi;

