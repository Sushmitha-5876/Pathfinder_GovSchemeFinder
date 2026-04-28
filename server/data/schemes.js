export const schemes = [
  {
    slug: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    description: "Income support scheme for eligible landholding farmer families.",
    benefits: ["Rs 6,000 per year in three equal installments", "Direct benefit transfer to bank account"],
    eligibilityText: ["Indian farmer family with cultivable land", "Subject to exclusion rules for higher-income taxpayers and certain government employees"],
    requiredDocuments: ["Aadhaar card", "Land records", "Bank account details", "Mobile number"],
    link: "https://pmkisan.gov.in/",
    tags: ["farmer", "agriculture", "income support"],
    eligibility: { minAge: 18, maxAge: 100, genders: ["any"], states: ["all"], maxIncome: 800000, categories: ["any"], occupations: ["farmer"] }
  },
  {
    slug: "nsp-scholarship",
    name: "National Scholarship Portal Scholarship",
    description: "Central and state scholarships for eligible students across India.",
    benefits: ["Tuition fee support", "Maintenance allowance depending on scholarship type"],
    eligibilityText: ["Student enrolled in a recognized institution", "Income, merit, category and course rules vary by scholarship"],
    requiredDocuments: ["Aadhaar card", "Income certificate", "Caste/category certificate if applicable", "Previous marksheet", "Bank details"],
    link: "https://scholarships.gov.in/",
    tags: ["student", "education", "scholarship"],
    eligibility: { minAge: 5, maxAge: 35, genders: ["any"], states: ["all"], maxIncome: 800000, categories: ["any"], occupations: ["student"] }
  },
  {
    slug: "pm-awas-yojana",
    name: "Pradhan Mantri Awas Yojana",
    description: "Housing support for eligible urban and rural households.",
    benefits: ["Housing assistance or interest subsidy", "Support for construction or purchase of eligible house"],
    eligibilityText: ["Household should not own a pucca house in India", "Income category and local body verification apply"],
    requiredDocuments: ["Aadhaar card", "Income proof", "Address proof", "Bank details", "Property documents if applicable"],
    link: "https://pmaymis.gov.in/",
    tags: ["housing", "home", "urban", "rural"],
    eligibility: { minAge: 18, maxAge: 100, genders: ["any"], states: ["all"], maxIncome: 1800000, categories: ["any"], occupations: ["any"] }
  },
  {
    slug: "sukanya-samriddhi-yojana",
    name: "Sukanya Samriddhi Yojana",
    description: "Small savings scheme for the education and marriage expenses of a girl child.",
    benefits: ["Government-backed savings account", "Tax benefits under applicable rules", "Attractive notified interest rate"],
    eligibilityText: ["Account can be opened for a girl child below 10 years", "Parent or guardian opens and operates the account"],
    requiredDocuments: ["Birth certificate of girl child", "Aadhaar/PAN of guardian", "Address proof", "Photograph"],
    link: "https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx",
    tags: ["girl child", "savings", "women"],
    eligibility: { minAge: 0, maxAge: 10, genders: ["female"], states: ["all"], categories: ["any"], occupations: ["student", "child", "any"] }
  },
  {
    slug: "ayushman-bharat",
    name: "Ayushman Bharat PM-JAY",
    description: "Health assurance scheme for eligible vulnerable families.",
    benefits: ["Health cover up to Rs 5 lakh per family per year", "Cashless treatment at empanelled hospitals"],
    eligibilityText: ["Eligibility is based on deprivation and occupational criteria", "State-specific health assurance integrations may apply"],
    requiredDocuments: ["Aadhaar card", "Ration card or family ID", "Mobile number", "PM-JAY card if available"],
    link: "https://pmjay.gov.in/",
    tags: ["health", "insurance", "medical"],
    eligibility: { minAge: 0, maxAge: 100, genders: ["any"], states: ["all"], maxIncome: 250000, categories: ["any"], occupations: ["worker", "farmer", "unemployed", "self-employed", "any"] }
  },
  {
    slug: "pm-mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana",
    description: "Loans for non-corporate, non-farm micro and small enterprises.",
    benefits: ["Collateral-free loans up to Rs 10 lakh", "Shishu, Kishor and Tarun loan categories"],
    eligibilityText: ["Applicant should run or plan an income-generating micro enterprise", "Lender appraisal and repayment capacity checks apply"],
    requiredDocuments: ["Identity proof", "Address proof", "Business plan", "Bank statement", "Quotation or project report if applicable"],
    link: "https://www.mudra.org.in/",
    tags: ["business", "loan", "self-employed", "worker"],
    eligibility: { minAge: 18, maxAge: 65, genders: ["any"], states: ["all"], maxIncome: 1200000, categories: ["any"], occupations: ["self-employed", "worker", "unemployed"] }
  },
  {
    slug: "atal-pension-yojana",
    name: "Atal Pension Yojana",
    description: "Pension scheme focused on workers in the unorganised sector.",
    benefits: ["Guaranteed monthly pension depending on contribution", "Automatic bank account deduction facility"],
    eligibilityText: ["Indian citizen with savings bank account", "Age should be between 18 and 40 years"],
    requiredDocuments: ["Aadhaar card", "Bank account details", "Mobile number"],
    link: "https://www.npscra.nsdl.co.in/scheme-details.php",
    tags: ["pension", "worker", "unorganised"],
    eligibility: { minAge: 18, maxAge: 40, genders: ["any"], states: ["all"], maxIncome: 1500000, categories: ["any"], occupations: ["worker", "self-employed", "farmer", "unemployed"] }
  },
  {
    slug: "stand-up-india",
    name: "Stand-Up India",
    description: "Bank loans for SC/ST and women entrepreneurs starting greenfield enterprises.",
    benefits: ["Bank loans from Rs 10 lakh to Rs 1 crore", "Support for manufacturing, services, trading and allied agriculture activities"],
    eligibilityText: ["Applicant should be SC/ST or a woman entrepreneur", "Enterprise should generally be a greenfield project"],
    requiredDocuments: ["Identity proof", "Category certificate if applicable", "Project report", "Bank details", "Business registration documents"],
    link: "https://www.standupmitra.in/",
    tags: ["entrepreneur", "women", "sc", "st", "loan"],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      states: ["all"],
      maxIncome: 2500000,
      occupations: ["self-employed", "worker", "unemployed"],
      anyOf: [{ genders: ["female"] }, { categories: ["SC", "ST"] }]
    }
  },
  {
    slug: "pm-ujjwala-yojana",
    name: "Pradhan Mantri Ujjwala Yojana",
    description: "LPG connections for eligible women from poor households.",
    benefits: ["Deposit-free LPG connection", "Financial support as per scheme rules"],
    eligibilityText: ["Adult woman from an eligible poor household", "Household should not already have an LPG connection"],
    requiredDocuments: ["Aadhaar card", "Ration card", "Bank account details", "Address proof"],
    link: "https://www.pmuy.gov.in/",
    tags: ["women", "lpg", "household"],
    eligibility: { minAge: 18, maxAge: 100, genders: ["female"], states: ["all"], maxIncome: 250000, categories: ["SC", "ST", "OBC", "General", "any"], occupations: ["worker", "farmer", "unemployed", "self-employed", "homemaker"] }
  },
  {
    slug: "pm-vishwakarma",
    name: "PM Vishwakarma",
    description: "Support for traditional artisans and craftspeople.",
    benefits: ["Skill training", "Toolkit incentive", "Collateral-free credit support", "Marketing support"],
    eligibilityText: ["Artisan or craftsperson working with hands and tools in eligible trades", "Minimum age is 18 years"],
    requiredDocuments: ["Aadhaar card", "Bank details", "Mobile number", "Occupation proof if requested"],
    link: "https://pmvishwakarma.gov.in/",
    tags: ["artisan", "worker", "skill", "loan"],
    eligibility: { minAge: 18, maxAge: 100, genders: ["any"], states: ["all"], maxIncome: 800000, categories: ["any"], occupations: ["artisan", "worker", "self-employed"] }
  },
  {
    slug: "kanyashree-prakalpa",
    name: "Kanyashree Prakalpa",
    description: "West Bengal scheme supporting girls' education and delaying child marriage.",
    benefits: ["Annual scholarship", "One-time grant for eligible girls"],
    eligibilityText: ["Girl student from West Bengal", "Age, education and family income rules apply"],
    requiredDocuments: ["Birth certificate", "School certificate", "Income certificate", "Bank details", "Aadhaar card"],
    link: "https://wbkanyashree.gov.in/",
    tags: ["student", "girl child", "west bengal"],
    eligibility: { minAge: 13, maxAge: 19, genders: ["female"], states: ["West Bengal"], maxIncome: 120000, categories: ["any"], occupations: ["student"] }
  },
  {
    slug: "mahadbt-scholarship",
    name: "MahaDBT Scholarship",
    description: "Maharashtra scholarship portal for eligible students across departments.",
    benefits: ["Fee reimbursement", "Maintenance allowance depending on scheme", "Direct benefit transfer"],
    eligibilityText: ["Student domiciled in Maharashtra", "Course, caste/category and income rules vary by department"],
    requiredDocuments: ["Domicile certificate", "Income certificate", "Caste certificate if applicable", "Marksheet", "Bank details"],
    link: "https://mahadbt.maharashtra.gov.in/",
    tags: ["student", "scholarship", "maharashtra"],
    eligibility: { minAge: 5, maxAge: 35, genders: ["any"], states: ["Maharashtra"], maxIncome: 800000, categories: ["SC", "ST", "OBC", "General", "any"], occupations: ["student"] }
  }
];
