import { useNavigate } from "react-router-dom";

export default function HeroAnimation() {
  const navigate = useNavigate();

  return (
    <section className="text-center py-24 px-6 bg-deepBlue">
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
        Connecting You to Skilled Artisans and Local Job Listings
      </h1>

      <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
        Spectrum Arena helps you find trusted artisans in your area and
        automatically fetch local job opportunities — all in one platform.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-brightOrange hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition"
      >
        Get Started
      </button>
    </section>
  );
}
