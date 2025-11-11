import apiClient from "./apiClient";

// Signup user
export const signupUser = async (data) => {
  const response = await apiClient.post("/users/signup/", data);
  return response.data;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await apiClient.post("/token/", credentials);
  const { access, refresh } = response.data;
  localStorage.setItem("token", access);
  localStorage.setItem("refresh", refresh);
  return response.data;
};

