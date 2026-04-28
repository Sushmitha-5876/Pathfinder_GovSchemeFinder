const schemes = [
  {
    id: "pm-vidyalaxmi",
    name: "PM Vidyalaxmi Education Loan Scheme",
    category: "education",
    provider: "Central Government",
    benefit: "Collateral-free education loans for higher education.",
    benefitAmount: "Up to Rs 10 lakhs",
    states: ["all"],
    tags: ["student", "education", "loan"],
    rules: {
      age: ["student", "adult"],
      income: ["low", "middle"],
      occupation: ["student"],
      category: ["general", "scst", "obc", "minority"],
      gender: ["female", "male", "other"]
    },
    eligibility: [
      "Applicant must be an Indian student.",
      "Admission should be secured in an eligible higher education institution.",
      "Family income and bank rules may apply."
    ],
    documents: ["Aadhaar card", "Admission proof", "Income certificate", "Bank details"],
    steps: [
      "Visit the official Vidyalaxmi portal.",
      "Register and complete the student profile.",
      "Compare eligible banks and submit the loan application."
    ],
    link: "https://www.vidyalakshmi.co.in/"
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    category: "finance",
    provider: "Central Government",
    benefit: "Business loans for micro and small enterprises.",
    benefitAmount: "Up to Rs 10 lakhs",
    states: ["all"],
    tags: ["business", "loan", "self employed", "worker"],
    rules: {
      age: ["adult"],
      income: ["low", "middle"],
      occupation: ["selfemployed", "worker", "unemployed"],
      category: ["general", "scst", "obc", "minority"],
      gender: ["female", "male", "other"]
    },
    eligibility: [
      "Applicant should run or plan a non-farm micro enterprise.",
      "Loan should be used for income-generating activity.",
      "Bank or lending institution approval is required."
    ],
    documents: ["Identity proof", "Address proof", "Business plan", "Bank statement"],
    steps: [
      "Approach a bank, NBFC or MFI offering MUDRA loans.",
      "Choose Shishu, Kishor or Tarun loan category.",
      "Submit documents and complete lender verification."
    ],
    link: "https://www.mudra.org.in/"
  },
  {
    id: "bbbp",
    name: "Beti Bachao Beti Padhao",
    category: "women",
    provider: "Central Government",
    benefit: "Awareness and support for girl child education and welfare.",
    benefitAmount: "Guidance and linked benefits",
    states: ["all"],
    tags: ["girl child", "women", "education"],
    rules: {
      age: ["student"],
      income: ["low", "middle", "high"],
      occupation: ["student"],
      category: ["general", "scst", "obc", "minority"],
      gender: ["female"]
    },
    eligibility: [
      "Girl child and family can access awareness and linked welfare support.",
      "Benefits differ by state and district implementation.",
      "School and local authority guidance may be needed."
    ],
    documents: ["Birth certificate", "Aadhaar card", "School records"],
    steps: [
      "Contact school, Anganwadi centre or district women and child department.",
      "Ask for local BBBP-linked support and girl child schemes.",
      "Apply for relevant linked state benefits."
    ],
    link: "https://wcd.nic.in/bbbp-schemes"
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat PM-JAY",
    category: "health",
    provider: "Central Government",
    benefit: "Health insurance cover for eligible low-income families.",
    benefitAmount: "Up to Rs 5 lakhs per family per year",
    states: ["all"],
    tags: ["health", "hospital", "insurance", "low income"],
    rules: {
      age: ["student", "adult", "senior"],
      income: ["low"],
      occupation: ["farmer", "worker", "unemployed", "selfemployed", "student"],
      category: ["general", "scst", "obc", "minority"],
      gender: ["female", "male", "other"]
    },
    eligibility: [
      "Eligibility is usually based on SECC or state health scheme database.",
      "Family should be listed as eligible on the PM-JAY portal.",
      "Treatment must be taken at empanelled hospitals."
    ],
    documents: ["Aadhaar card", "Ration card", "Mobile number", "Family ID if available"],
    steps: [
      "Check eligibility on the official PM-JAY portal.",
      "Visit a Common Service Centre or empanelled hospital helpdesk.",
      "Generate Ayushman card and use it for eligible treatment."
    ],
    link: "https://pmjay.gov.in/"
  },
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    category: "agriculture",
    provider: "Central Government",
    benefit: "Income support for eligible farmer families.",
    benefitAmount: "Rs 6,000 per year",
    states: ["all"],
    tags: ["farmer", "agriculture", "income support"],
    rules: {
      age: ["adult", "senior"],
      income: ["low", "middle"],
      occupation: ["farmer"],
      category: ["general", "scst", "obc", "minority"],
      gender: ["female", "male", "other"]
    },
    eligibility: [
      "Applicant should be part of an eligible landholding farmer family.",
      "Land records and Aadhaar should be linked correctly.",
      "Certain higher-income and institutional landholder exclusions apply."
    ],
    documents: ["Aadhaar card", "Land records", "Bank account", "Mobile number"],
    steps: [
      "Visit the PM-KISAN farmer corner.",
      "Complete new farmer registration or e-KYC.",
      "Track beneficiary status after verification."
    ],
    link: "https://pmkisan.gov.in/"
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    category: "housing",
    provider: "Central Government",
    benefit: "Housing assistance for eligible families.",
    benefitAmount: "Subsidy or assistance varies by component",
    states: ["all"],
    tags: ["housing", "home", "low income"],
    rules: {
      age: ["adult", "senior"],
      income: ["low", "middle"],
      occupation: ["farmer", "worker", "selfemployed", "unemployed"],
      category: ["general", "scst", "obc", "minority"],
      gender: ["female", "male", "other"]
    },
    eligibility: [
      "Family should not own a pucca house in India.",
      "Income category and scheme component rules apply.",
      "Urban and rural components have different application routes."
    ],
    documents: ["Aadhaar card", "Income proof", "Bank account", "Property or residence proof"],
    steps: [
      "Check whether PMAY Urban or PMAY Gramin applies.",
      "Apply through the official portal or local gram panchayat/ULB.",
      "Complete verification and track status online."
    ],
    link: "https://pmaymis.gov.in/"
  },
  {
    id: "nsp-scholarship",
    name: "National Scholarship Portal Schemes",
    category: "education",
    provider: "Central Government",
    benefit: "Scholarships for eligible students across categories.",
    benefitAmount: "Varies by scholarship",
    states: ["all"],
    tags: ["student", "scholarship", "minority", "sc st obc"],
    rules: {
      age: ["student"],
      income: ["low", "middle"],
      occupation: ["student"],
      category: ["scst", "obc", "minority"],
      gender: ["female", "male", "other"]
    },
    eligibility: [
      "Applicant must be enrolled in a recognized institution.",
      "Income and category rules depend on the selected scholarship.",
      "Institution verification is required."
    ],
    documents: ["Aadhaar card", "Caste/category certificate", "Income certificate", "Marks card", "Bank details"],
    steps: [
      "Register on the National Scholarship Portal.",
      "Select eligible central or state scholarship.",
      "Submit application and follow institution verification."
    ],
    link: "https://scholarships.gov.in/"
  },
  {
    id: "widow-pension",
    name: "Indira Gandhi National Widow Pension Scheme",
    category: "women",
    provider: "Central Government",
    benefit: "Monthly pension support for eligible widows.",
    benefitAmount: "Monthly pension as per central/state rules",
    states: ["all"],
    tags: ["women", "pension", "low income"],
    rules: {
      age: ["adult", "senior"],
      income: ["low"],
      occupation: ["worker", "unemployed", "selfemployed"],
      category: ["general", "scst", "obc", "minority"],
      gender: ["female"]
    },
    eligibility: [
      "Applicant should be a widow from a below-poverty-line household.",
      "Age and pension amount depend on current central/state rules.",
      "Local authority verification is required."
    ],
    documents: ["Aadhaar card", "Death certificate of husband", "Income/BPL proof", "Bank account"],
    steps: [
      "Visit local gram panchayat, municipality or social welfare office.",
      "Submit pension application with documents.",
      "Track approval through state social security portal if available."
    ],
    link: "https://nsap.nic.in/"
  },
  {
    id: "karnataka-ganga-kalyana",
    name: "Karnataka Ganga Kalyana Scheme",
    category: "agriculture",
    provider: "Karnataka Government",
    benefit: "Irrigation borewell support for eligible small farmers.",
    benefitAmount: "Assistance varies by corporation and category",
    states: ["karnataka"],
    tags: ["farmer", "karnataka", "irrigation"],
    rules: {
      age: ["adult", "senior"],
      income: ["low", "middle"],
      occupation: ["farmer"],
      category: ["scst", "obc", "minority"],
      gender: ["female", "male", "other"]
    },
    eligibility: [
      "Applicant should be a small or marginal farmer in Karnataka.",
      "Category and landholding rules depend on implementing corporation.",
      "Land and income documents are required."
    ],
    documents: ["Aadhaar card", "RTC/land records", "Caste certificate", "Income certificate"],
    steps: [
      "Check application notification from the relevant Karnataka corporation.",
      "Apply through Seva Sindhu or department portal when open.",
      "Complete field verification."
    ],
    link: "https://sevasindhu.karnataka.gov.in/"
  }
];
