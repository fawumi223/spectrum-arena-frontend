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
  );
}

