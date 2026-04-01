import axios from "axios";

export default axios.create({
  baseURL: "https://glistening-healing-production-30d3.up.railway.app/api",
  headers: { "Content-Type": "application/json" },
});
