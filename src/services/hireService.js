const STORAGE_KEY = "hire_requests";

/** Save hire request */
export function saveHireRequest(request) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.push(request);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/** Load all hire requests */
export function getHireRequests() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

/** Load requests by artisan ID */
export function getHireRequestsForArtisan(artisanId) {
  const all = getHireRequests();
  return all.filter(r => r.artisanId === artisanId);
}

