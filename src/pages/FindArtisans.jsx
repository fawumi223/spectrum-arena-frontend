import React, { useState, useEffect } from "react";
import ArtisanMap from "./ArtisanMap";

export default function FindArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [skill, setSkill] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // STEP 1 — Get user location (WEB)
  // ----------------------------
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => reject(err.message)
      );
    });
  };

  // ----------------------------
  // STEP 2 — Fetch from backend
  // ----------------------------
  const fetchNearby = async (skillValue = skill, queryValue = query) => {
    try {
      setLoading(true);
      const coords = await getUserLocation();

      const res = await fetch(
        `http://127.0.0.1:8000/api/artisans/nearby/?lat=${coords.lat}&lng=${coords.lng}&radius=10&skill=${skillValue}&q=${queryValue}`
      );

      const data = await res.json();

      // GeoJSON support
      if (data.features) {
        setArtisans(data.features.map((f) => f.properties));
      } else {
        setArtisans(data);
      }

      setLoading(false);
    } catch (error) {
      console.log("Location error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearby();
  }, []);

  // ----------------------------
  // STEP 3 — UI Layout
  // ----------------------------
  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Nearby Artisans</h1>

      {/* FILTER BAR */}
      <div className="mb-10">

        {/* SKILL SELECT */}
        <label className="block mb-2 font-semibold">Filter by skill</label>
        <select
          value={skill}
          onChange={(e) => {
            const newSkill = e.target.value;
            setSkill(newSkill);
            fetchNearby(newSkill, query);
          }}
          className="w-full p-3 mb-4 rounded-lg bg-[#111827] border border-white/10 text-white"
        >
          <option value="">All Skills</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Painter">Painter</option>
          <option value="Welder">Welder</option>
          <option value="AC Technician">AC Technician</option>
        </select>

        {/* SEARCH INPUT */}
        <label className="block mb-2 font-semibold">Search artisan</label>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const newQuery = e.target.value;
            setQuery(newQuery);
            fetchNearby(skill, newQuery);
          }}
          placeholder="Search by name or skill..."
          className="w-full p-3 rounded-lg bg-[#111827] border border-white/10 text-white placeholder-gray-400"
        />
      </div>

      {/* EMPTY STATE */}
      {!loading && artisans.length === 0 && (
        <p className="text-white/70 text-lg">No artisans found around your location.</p>
      )}

      {/* GRID LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* LOADING SKELETON */}
        {loading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1f2937] p-5 rounded-xl shadow animate-pulse border border-white/10"
            >
              <div className="flex justify-center mb-4">
                <div className="h-32 w-32 bg-gray-700 rounded-full" />
              </div>
              <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto mb-3" />
              <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mb-3" />
              <div className="h-3 bg-gray-700 rounded w-1/3 mx-auto" />
            </div>
          ))
        }

        {/* REAL DATA */}
        {!loading &&
          artisans.map((artisan, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-5 rounded-xl shadow-md border border-white/10 hover:border-brightOrange transition"
            >
              {/* IMAGE */}
              <div className="flex justify-center mb-4">
                <img
                  src={artisan.image || "/placeholder-user.png"}
                  alt={artisan.full_name}
                  className="h-32 w-32 object-cover rounded-full border border-white/10 shadow-md"
                />
              </div>

              {/* NAME */}
              <h2 className="text-xl font-semibold text-center">{artisan.full_name}</h2>

              {/* SKILL */}
              <p className="text-white/60 mt-1 text-center">{artisan.skill}</p>

              {/* DISTANCE */}
              {artisan.distance && (
                <p className="text-brightOrange mt-1 text-sm text-center">
                  {(artisan.distance / 1000).toFixed(2)} km away
                </p>
              )}

              <div className="flex justify-center">
                <button className="mt-4 bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-lg hover:bg-orange-400 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {/* MAP SECTION */}
      {!loading && artisans.length > 0 && (
        <ArtisanMap artisans={artisans} />
      )}

    </div>
  );
}

