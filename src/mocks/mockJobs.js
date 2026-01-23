const mockJobs = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  company: ["MTN", "Dangote", "UBA", "KPMG", "GTCO", "Paystack"][i % 6],
  role: ["Frontend Developer", "Plumber", "Accountant", "Data Analyst", "Sales Rep"][i % 5],
  type: ["Full-Time", "Contract", "Remote"][i % 3],
  salary: ["₦150,000", "₦200,000", "₦300,000", "₦500,000"][i % 4],
  location: ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"][i % 5],
}));
export default mockJobs;

