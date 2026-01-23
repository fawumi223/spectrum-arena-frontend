import apiClient from "./api";

export async function initNuban() {
  const response = await apiClient.post("/payments/wallet/init-nuban/");
  return response.data;
}

export async function getWallet() {
  const response = await apiClient.get("/users/me/"); // TEMP until backend wallet endpoint is exposed
  return response.data;
}

