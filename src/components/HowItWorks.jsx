import {
  UserPlus,
  MapPin,
  Briefcase,
  PiggyBank,
} from "lucide-react";

function Card({ icon, title, text }) {
  return (
    <div className="bg-[#0b1e3d] p-6 rounded-xl text-center">
      <div className="flex justify-center mb-4 text-brightOrange">
        {icon}
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-white/70">{text}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <>
      {/* HOW IT WORKS SECTION */}
      <section className="py-20">
        <h3 className="text-center text-brightOrange text-sm font-semibold">
          HOW IT WORKS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto px-6">
          <Card
            icon={<UserPlus size={40} />}
            title="Sign up & verify"
            text="Create an account and verify with OTP"
          />
          <Card
            icon={<MapPin size={40} />}
            title="Discover nearby jobs"
            text="Jobs are fetched automatically based on your location"
          />
          <Card
            icon={<Briefcase size={40} />}
            title="Find skilled artisans"
            text="Connect with verified artisans around you"
          />
          <Card
            icon={<PiggyBank size={40} />}
            title="Save & grow"
            text="Use savings & thrift tools built into the platform"
          />
        </div>
      </section>

      {/* SAVINGS & THRIFT SECTION */}
      <section className="py-20 bg-[#081428] text-center px-6">
        <h3 className="text-brightOrange text-sm font-semibold">
          SAVINGS & THRIFT
        </h3>

        <h2 className="text-3xl md:text-4xl font-bold mt-6 max-w-3xl mx-auto">
          Flexible savings plans for individuals and companies
        </h2>

        <p className="text-white/70 mt-6 max-w-2xl mx-auto">
          Lock funds securely, grow your discipline, and build structured
          financial habits using our built-in savings and thrift system.
        </p>
      </section>
    </>
  );
}
