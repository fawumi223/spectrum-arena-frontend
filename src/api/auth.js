import api from "./api";

/* ------------------------------------------------------------------
   SIGNUP (auto-login after signup)
------------------------------------------------------------------- */
export const signupUser = async (data) => {
  // Create user first
  const signupRes = await api.post("/users/signup/", data);

  // Extract credentials to auto-login
  const { phone_number, password } = data;

  // Login after signup to get tokens + user
  const loginRes = await api.post("/users/login/", {
    phone_number,
    password,
  });

  const { access, refresh, user } = loginRes.data;

  // Store tokens + user for session
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user", JSON.stringify(user));

  return {
    signup: signupRes.data,
    login: loginRes.data,
  };
};

/* ------------------------------------------------------------------
   LOGIN USING PHONE NUMBER
   Backend endpoint: POST /api/users/login/
------------------------------------------------------------------- */
export const loginUser = async ({ phone_number, password }) => {
  const response = await api.post("/users/login/", {
    phone_number,
    password,
  });

  const { access, refresh, user } = response.data;

  // 🔐 store tokens + user
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

