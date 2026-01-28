import api from "./api";

/* ------------------------------------------------------------------
   SIGNUP (DEMO MODE: auto-login via signup response)
------------------------------------------------------------------- */
export const signupUser = async ({
  full_name,
  phone_number,
  password,
  role,
  email,
}) => {
  try {
    // Build payload cleanly (NO nulls, NO OTP fields)
    const payload = {
      full_name,
      phone_number,
      password,
      role: role ? role.toUpperCase() : "CLIENT",
    };

    // Only include email if user provided it
    if (email && email.trim() !== "") {
      payload.email = email.trim();
    }

    // Signup (backend returns JWT directly in demo mode)
    const response = await api.post("/users/signup/", payload);

    const { access, refresh, user } = response.data;

    // Persist auth
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (err) {
    console.error("Signup failed:", err?.response?.data || err.message);
    throw err;
  }
};

/* ------------------------------------------------------------------
   LOGIN
------------------------------------------------------------------- */
export const loginUser = async ({ phone_number, password }) => {
  try {
    const response = await api.post("/users/login/", {
      phone_number,
      password,
    });

    const { access, refresh, user } = response.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (err) {
    console.error("Login failed:", err?.response?.data || err.message);
    throw err;
  }
};

