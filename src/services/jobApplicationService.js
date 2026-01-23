export function saveJobApplication(app) {
  const existing = JSON.parse(localStorage.getItem("jobApplications") || "[]");
  existing.push(app);
  localStorage.setItem("jobApplications", JSON.stringify(existing));
}

export function getApplications() {
  return JSON.parse(localStorage.getItem("jobApplications") || "[]");
}

