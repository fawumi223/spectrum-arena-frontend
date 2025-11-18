import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MAP (Leaflet)
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Components
import HireArtisanModal from "../components/HireArtisanModal";
import AllReviews from "../components/AllReviews";
import WriteReviewModal from "../components/WriteReviewModal";

// FIX LEAFLET ICONS (required)
const defaultIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});
L.Marker.prototype.options.icon = defaultIcon;

export default function ArtisanProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showHire, setShowHire] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // ----------------------------------------
  // LOAD ARTISAN PROFILE
  // ----------------------------------------
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/artisans/${id}/`);
      const data = await res.json();

      // Handle GeoJSON
      if (data.properties) {
        setArtisan({
          ...data.properties,
          location: data.geometry,
        });
      } else {
        setArtisan(data);
      }

      setLoading(false);
    } catch (err) {
      console.log("Profile load error", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  // ----------------------------------------
  // HIRE REQUEST SUBMISSION
  // ----------------------------------------
  async function submitHire(formData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/artisans/${id}/hire/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    alert(data.message || "Hire request sent!");
    setShowHire(false);
  }

  // ----------------------------------------
  // LOADING & NOT FOUND STATES
  // ----------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Artisan not found.
      </div>
    );
  }

  // Extract coordinates
  const lat = artisan.location?.coordinates?.[1];
  const lng = artisan.location?.coordinates?.[0];

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-brightOrange hover:text-orange-300 font-semibold"
        >
          ← Back
        </button>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-6">
          <img
            src={artisan.image || "/placeholder-user.png"}
            alt={artisan.full_name}
            className="h-40 w-40 object-cover rounded-full border border-white/10 shadow-md"
          />
        </div>

        {/* NAME */}
        <h1 className="text-3xl font-bold text-center">{artisan.full_name}</h1>

        {/* SKILL */}
        <p className="text-center text-white/60 text-lg">{artisan.skill}</p>

        {/* DISTANCE */}
        {artisan.distance && (
          <p className="text-center text-brightOrange mt-1">
            {(artisan.distance / 1000).toFixed(2)} km away
          </p>
        )}

        {/* CONTACT SECTION */}
        <div className="mt-8 bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

          <p className="mb-1"><strong>Phone:</strong> {artisan.phone}</p>
          <p className="mb-1"><strong>Address:</strong> {artisan.address}</p>
          <p className="mb-1"><strong>City:</strong> {artisan.city}</p>
          <p className="mb-1"><strong>State:</strong> {artisan.state}</p>
        </div>

        {/* MAP */}
        {lat && lng && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Artisan Location</h2>

            <MapContainer
              center={[lat, lng]}
              zoom={15}
              style={{ height: "350px", width: "100%", borderRadius: "12px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={[lat, lng]}>
                <Popup>{artisan.full_name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {/* HIRE BUTTON */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowHire(true)}
            className="bg-brightOrange text-deepBlue font-bold px-8 py-3 rounded-lg hover:bg-orange-400 transition"
          >
            Hire Artisan
          </button>

          <button
            onClick={() => setShowReview(true)}
            className="ml-3 bg-[#1a1d25] border border-white/10 px-8 py-3 rounded-lg hover:border-brightOrange transition"
          >
            Write Review
          </button>
        </div>

        {/* REVIEWS LIST */}
        <div className="mt-10">
          <AllReviews artisanId={id} />
        </div>
      </div>

      {/* HIRE MODAL */}
      {showHire && (
        <HireArtisanModal
          artisan={artisan}
          onClose={() => setShowHire(false)}
          onSubmit={submitHire}
        />
      )}

      {/* WRITE REVIEW MODAL */}
      {showReview && (
        <WriteReviewModal
          artisanId={id}
          artisan={artisan}
          onClose={() => setShowReview(false)}
          onSuccess={fetchProfile}
        />
      )}
    </div>
  );
}

