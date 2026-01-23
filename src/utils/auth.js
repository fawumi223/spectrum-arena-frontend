export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("access"));
};

