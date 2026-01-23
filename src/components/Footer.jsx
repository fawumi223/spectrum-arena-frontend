import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0e16] text-white py-8 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-white/80">Artisanrevsuretechnology@gmail.com</p>
          <p className="text-white/80 mt-1">07040673421</p>
          <p className="text-white/80">08034807178</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <p className="text-white/80">Instagram: <span className="font-medium">@Spectrum_Arena</span></p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Spectrum Arena</h3>
          <p className="text-white/60">
            Connecting clients, artisans and companies through verified skills.
          </p>
        </div>
      </div>

      <div className="text-center text-white/60 text-sm mt-6">
        © {new Date().getFullYear()} Spectrum Arena. All rights reserved.
      </div>
    </footer>
  );
}

