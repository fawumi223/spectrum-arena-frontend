// ---------------------------
// REALISTIC DATA SOURCES
// ---------------------------
const names = [
  "John Ade", "Chinedu Okafor", "Mary Johnson", "Wale Shonubi", "Bisi Ade",
  "Samuel Ayo", "Grace Peters", "Yusuf Tijani", "Blessing Okoro", "Emeka Umeh",
  "Tosin Akande", "Bukola Balogun", "Habib Olawale", "Sade Akin", "Rita Chukwu",
  "Musa Abdullahi", "Rafael Daniel", "Kemi Bello", "Halima Danjuma", "Seyi Lawal",
  "Aisha Suleiman", "Gbenga Ogun", "Iniobong Udo", "Obinna Eze", "Hadiza Bello",
  "Peter Ojo", "Chiamaka Obi", "Ibrahim Sule", "Tunde Oseni", "Fatima Adamu",
  "Olamide Owolabi", "Chisom Umeh", "Adeolu Akin", "Damilola Oladele", "Ngozi Ejiofor",
  "Kolawole Ode", "Precious Ibeh", "Babatunde Ayeni", "Joseph Eke", "Amarachukwu Okeke",
  "Nafisat Idris", "Opeyemi Shola", "Oghenetega James", "Tairat Abdullahi", "Abubakar Sani",
  "Oluwatobi Ige", "Chidera Nwankwo", "Ayomide Alabi", "Morenike Adebayo", "Tochi Ezenwa"
];

const skills = [
  "Electrician", "Plumber", "Painter", "Carpenter", "Mechanic",
  "AC Technician", "Welder", "Tiler", "Generator Repair", "POP Specialist",
  "Solar Installer", "Interior Decorator", "CCTV Installer", "Auto Electrician",
  "Mason", "Floor Polisher", "Furniture Maker", "Upholsterer", "Water Pump Repair", "Aluminum Fabricator"
];

// ---------------------------
// STATES + CITIES MAP
// ---------------------------
const states = {
  Lagos: ["Ikeja", "Lekki", "Yaba", "Surulere", "Ilupeju", "VI", "Ajah", "Maryland", "Gbagada", "Oshodi"],
  Abuja: ["Wuse", "Garki", "Maitama", "Asokoro", "Kubwa", "Jabi", "Utako", "Nyanya", "Lugbe", "Lokogoma"],
  Ogun: ["Abeokuta", "Sagamu", "Ijebu-Ode", "Mowe", "Ibafo", "Agbara", "Ota"],
  Oyo: ["Ibadan", "Ogbomosho", "Iseyin", "Saki", "Oyo Town"],
  Rivers: ["PH City", "Eleme", "Choba", "Rumuola", "GRA", "Ogbunabali"],
  Kaduna: ["Kaduna North", "Kaduna South", "Zaria", "Kafanchan"],
  Kano: ["Nassarawa", "Gwale", "Tarauni", "Fagge", "Kumbotso", "Dala"],
  Enugu: ["Enugu North", "Enugu South", "Nsukka", "Abakpa", "Ogui"],
  Delta: ["Asaba", "Warri", "Sapele", "Ughelli"],
  Edo: ["Benin City", "Ekpoma", "Irrua", "Auchi"]
};

// ---------------------------
// GENERATOR
// ---------------------------
const stateList = Object.keys(states);

const mockArtisans = Array.from({ length: 50 }).map((_, i) => {
  const name = names[i % names.length];
  const skill = skills[i % skills.length];
  const state = stateList[i % stateList.length];
  const cityList = states[state];
  const city = cityList[i % cityList.length];

  return {
    id: i + 1,
    full_name: name,
    skill,
    state,
    city,
    distance: Math.floor(Math.random() * 9000) + 500, // 500m – 9500m
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 – 5.0
    image: "/placeholder-user.png",
  };
});

export default mockArtisans;

