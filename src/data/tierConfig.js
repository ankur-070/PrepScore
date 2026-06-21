export const TIERS = [
  {
    min: 0,
    max: 50,
    name: 'Needs Significant Preparation',
    companies: [],
    tone: 'building',
    summary: "There's real ground to cover, but every section below tells you exactly where to start.",
  },
  {
    min: 51,
    max: 70,
    name: 'Service Company Ready',
    companies: ['TCS', 'Infosys', 'Wipro'],
    tone: 'steady',
    summary: "You're in solid shape for mass-recruiter drives. A bit more depth opens up bigger names.",
  },
  {
    min: 71,
    max: 85,
    name: 'Ready for 10–20 LPA Opportunities',
    companies: ['SAP', 'Cisco', 'Dell', 'IBM'],
    tone: 'strong',
    summary: 'A genuinely competitive profile for mid-to-senior tier product and service companies.',
  },
  {
    min: 86,
    max: 100,
    name: 'Strong Product Company Candidate',
    companies: ['Adobe', 'Walmart', 'Atlassian', 'Microsoft'],
    tone: 'excellent',
    summary: "You're tracking toward top-tier product company bars. Keep this consistency up.",
  },
]
