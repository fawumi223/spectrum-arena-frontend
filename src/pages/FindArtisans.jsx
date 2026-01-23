import React, { useState, useEffect } from "react";
import mockArtisans from "../mocks/mockArtisans";
import BackButton from "../components/BackButton";

export default function FindArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [skill, setSkill] = useState("");
  const [state, setStateValue] = useState("");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");

  const [citiesForState, setCitiesForState] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract unique states & skills from mock data
  const states = [...new Set(mockArtisans.map((a) => a.state))];
  const skills = [...new Set(mockArtisans.map((a) => a.skill))];

  // --------------------------------
  // LOAD MOCK DATA FOR DEMO MODE
  // --------------------------------
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setArtisans(mockArtisans);
      setFiltered(mockArtisans);
      setLoading(false);
    }, 300);
  }, []);

  // --------------------------------
  // FILTER ARTISANS
  // --------------------------------
  useEffect(() => {
    let temp = [...artisans];

    if (skill) temp = temp.filter((a) => a.skill === skill);
    if (state) temp = temp.filter((a) => a.state === state);
    if (city) temp = temp.filter((a) => a.city === city);

    if (query) {
      temp = temp.filter(
        (a) =>
          a.full_name.toLowerCase().includes(query.toLowerCase()) ||
          a.skill.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFiltered(temp);
  }, [skill, state, city, query, artisans]);

  // --------------------------------
  // STATE > CITY CASCADE LOGIC
  // --------------------------------
  const handleStateChange = (value) => {
    setStateValue(value);
    setCity(""); // reset city

    if (!value) {
      setCitiesForState([]);
      return;
    }

    // get unique cities for selected state
    const cities = [
      ...new Set(mockArtisans.filter((a) => a.state === value).map((a) => a.city)),
    ];
    setCitiesForState(cities);
  };

return (
  <div className="min-h-screen bg-[#0d1018] text-white px-6 py-10">
    <BackButton />

    <h1 className="text-3xl font-bold mb-6 text-brightOrange">
      Find Skilled Artisans
    </h1>

    {/* FILTERS */}
    <div className="bg-[#111827] p-5 rounded-xl border border-white/10 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
      
      {/* Skill */}
      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="bg-[#1f2937] p-3 rounded-lg border border-white/10 outline-none"
      >
        <option value="">All Skills</option>
        {skills.map((sk, idx) => (
          <option key={idx} value={sk}>{sk}</option>
        ))}
      </select>

      {/* State */}
      <select
        value={state}
        onChange={(e) => handleStateChange(e.target.value)}
        className="bg-[#1f2937] p-3 rounded-lg border border-white/10 outline-none"
      >
        <option value="">All States</option>
        {states.map((st, idx) => (
          <option key={idx} value={st}>{st}</option>
        ))}
      </select>

      {/* City */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="bg-[#1f2937] p-3 rounded-lg border border-white/10 outline-none"
        disabled={!citiesForState.length}
      >
        <option value="">All Cities</option>
        {citiesForState.map((ct, idx) => (
          <option key={idx} value={ct}>{ct}</option>
        ))}
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Search artisan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#1f2937] p-3 rounded-lg border border-white/10 outline-none"
      />
    </div>

      {/* ARTISANS GRID */}
      {loading ? (
        <div className="text-center text-white/60">Loading artisans...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-white/60">No artisans found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-[#111827] rounded-xl border border-white/10 p-5 hover:border-brightOrange transition shadow-md"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={artisan.image}
                  alt={artisan.full_name}
                  className="h-24 w-24 rounded-full border border-white/10 object-cover"
                />
              </div>

              <h2 className="text-lg font-semibold text-center">{artisan.full_name}</h2>
              <p className="text-center text-brightOrange">{artisan.skill}</p>
              <p className="text-center text-white/70 text-sm mt-1">
                {artisan.city}, {artisan.state}
              </p>

              <p className="text-center text-sm text-white/60 mt-1">
                ⭐ {artisan.rating} • {(artisan.distance / 1000).toFixed(1)} km away
              </p>

              <button className="mt-4 w-full bg-brightOrange text-deepBlue font-semibold py-2 rounded-lg hover:bg-orange-400 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

