const API_BASE = "http://127.0.0.1:8000/api"; // change to your deployed backend later

export const fetchJobs = async () => {
  try {
    const response = await fetch(`${API_BASE}/jobs/`);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

