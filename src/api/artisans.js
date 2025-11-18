export const getNearbyArtisans = async (lat, lng, radius = 10) => {
  const res = await fetch(
    `/api/artisans/nearby/?lat=${lat}&lng=${lng}&radius=${radius}`
  );
  return await res.json();
};

