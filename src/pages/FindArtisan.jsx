import React, { useEffect, useState } from "react";
import axios from "axios";
import { Phone, MapPin, Star, Search } from "lucide-react";

export default function FindArtisan() {
  const [artisans, setArtisans] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const categories = [
    "All",
    "Carpentry",
    "Tailoring",
    "Shoe Making",
    "Plumbing",
    "Electrical",
    "Painting",
    "Mechanic",
    "Interior Deco",
  ];

  const baseURL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${baseURL}/artisans/`);
      setArtisans(resp.data || []);
    } catch (err) {
      console.error("Error fetching artisans:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtisans = artisans.filter((artisan) => {
    const matchSearch =
      artisan.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      artisan.skill?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "All" || artisan.skill?.toLowerCase() === category.toLowerCase();
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#0b173d] text-white px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-orange-400 mb-8">
          Discover Artisans
        </h1>

        {/* SEARCH + FILTER */}
        <div className="mb-8">
          <div className="flex items-center bg-[#101d4f] rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search artisans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-400"
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap gap-3 mt-5">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  category === cat
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-[#101d4f] text-gray-300 hover:bg-orange-400/10 hover:text-orange-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTISAN LIST */}
        {loading ? (
          <div className="text-center text-gray-400 mt-10">Loading artisans...</div>
        ) : filteredArtisans.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No artisans found. Try adjusting your search or category.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredArtisans.map((artisan, idx) => (
              <div
                key={idx}
                className="bg-[#101d4f] border border-white/10 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-[2px]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      artisan.profile_image ||
                      "https://res.cloudinary.com/drfiqlo5s/image/upload/v1762974116/logo_fu1xqv.png"
                    }
                    alt={artisan.full_name}
                    className="h-16 w-16 rounded-full object-cover border border-orange-400/50"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{artisan.full_name}</h3>
                    <p className="text-sm text-gray-300">{artisan.skill}</p>
                    <p className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin size={12} className="mr-1" />{" "}
                      {artisan.location || "Location not specified"}
                    </p>
                    <p className="flex items-center text-xs text-yellow-400 mt-1">
                      <Star size={12} className="mr-1" /> Rating:{" "}
                      {artisan.rating || "4.8"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="flex items-center gap-2 text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all">
                    <Phone size={14} /> Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

