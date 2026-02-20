import api from "./api";

/* ------------------------------------------------------------------
   HELPERS
------------------------------------------------------------------- */

// Normalize phone input (prevents login mismatch later)
const normalizePhone = (phone) => {
  if (!phone) return phone;

  let cleaned = phone.trim();

  // convert +234XXXXXXXXXX → 0XXXXXXXXXX
  if (cleaned.startsWith("+234")) {
    cleaned = "0" + cleaned.slice(4);
  }

  return cleaned;
};


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
    const payload = {
      full_name,
      phone_number: normalizePhone(phone_number),
      password,
      role: role ? role.toUpperCase() : "CLIENT",
    };

    // Only include email if user provided it
    if (email && email.trim() !== "") {
      payload.email = email.trim();
    }

    const response = await api.post("/users/signup/", payload);

    const data = response.data || {};
    const access = data.access;
    const refresh = data.refresh;
    const user = data.user;

    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return data;
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
      phone_number: normalizePhone(phone_number),
      password,
    });

    const data = response.data || {};
    const access = data.access;
    const refresh = data.refresh;
    const user = data.user;

    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return data;
  } catch (err) {
    console.error("Login failed:", err?.response?.data || err.message);
    throw err;
  }
};

