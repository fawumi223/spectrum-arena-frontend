const roles = [
  "Software Engineer",
  "Frontend Developer",
  "Mobile App Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Product Manager",
  "Graphic Designer",
  "Data Analyst",
  "Electrician",
  "Plumber",
  "Carpenter",
];

const companies = [
  "Spectrum Arena",
  "TechBridge",
  "NexWork",
  "BuildRight",
  "SkillHub",
  "ConstructPro",
  "PrimeTech",
];

const states = ["Lagos", "Abuja", "Rivers", "Oyo"];
const cities = {
  Lagos: ["Ikeja", "Lekki", "Yaba", "Surulere"],
  Abuja: ["Wuse", "Maitama", "Garki", "Kubwa"],
  Rivers: ["Port Harcourt", "Obio-Akpor"],
  Oyo: ["Ibadan", "Ogbomosho"],
};

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const mockInternalJobs = Array.from({ length: 40 }).map((_, i) => {
  const state = rand(states);
  const city = rand(cities[state]);

  return {
    id: i + 1,
    role: rand(roles),
    company: rand(companies),
    state,
    city,
    type: ["Full-Time", "Part-Time", "Contract"][i % 3],
    salary: `₦${(150000 + Math.random() * 850000).toFixed(0)}`,
    description: "We are looking for a skilled talent to join our team.",
  };
});

export default mockInternalJobs;

