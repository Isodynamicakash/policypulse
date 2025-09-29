import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scheme from './models/scheme.model.js';
import Schemev2 from './models/schemev2.model.js';
import User from './models/user.model.js';
import connectDB from './db/index.js';

dotenv.config();

// Sample government schemes data based on actual Indian government schemes
const schemesV1Data = [
    {
        title: "Pradhan Mantri Jan Aushadhi Yojana (PMJAY)",
        objective: "To provide affordable and quality medicines to the people of India through dedicated outlets known as Jan Aushadhi Stores.",
        keyFeatures: [
            "Quality medicines at affordable prices",
            "Covers both generic and branded medicines",
            "More than 1,500 medicines available",
            "Pan India coverage with over 8,000 stores"
        ],
        howToApply: {
            online: "Visit https://janaushadhi.gov.in/ and locate nearest store",
            offline: "Visit any Jan Aushadhi store across India"
        },
        documentsRequired: [
            "Prescription from registered medical practitioner",
            "Valid ID proof",
            "Medical reports if required"
        ],
        tags: ["health", "medicine", "affordable", "generic"],
        level: "central",
        ministry: "Ministry of Chemicals and Fertilizers",
        eligibilityAgeMin: 0,
        eligibilityAgeMax: 100,
        category: {
            incomeGroup: ["EWS", "General", "OBC", "SC", "ST"],
            gender: ["male", "female", "other"]
        },
        state: ["all"]
    },
    {
        title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        objective: "To provide financial assistance of Rs. 6,000 per year to all landholding farmer families across the country.",
        keyFeatures: [
            "Rs. 2,000 every four months",
            "Direct Benefit Transfer (DBT)",
            "Covers all landholding farmers",
            "No limit on family income"
        ],
        howToApply: {
            online: "Register at https://pmkisan.gov.in/",
            offline: "Visit nearest Common Service Center (CSC) or bank"
        },
        documentsRequired: [
            "Aadhaar Card",
            "Bank Account Details",
            "Land Ownership Papers",
            "Mobile Number"
        ],
        tags: ["agriculture", "farmer", "income support", "rural"],
        level: "central",
        ministry: "Ministry of Agriculture and Farmers Welfare",
        eligibilityAgeMin: 18,
        eligibilityAgeMax: 100,
        category: {
            incomeGroup: ["EWS", "General", "OBC", "SC", "ST"],
            gender: ["male", "female", "other"]
        },
        state: ["all"]
    },
    {
        title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)",
        objective: "To provide health insurance coverage of up to Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.",
        keyFeatures: [
            "Health coverage up to Rs. 5 lakh per family per year",
            "Covers over 1,400 procedures",
            "Cashless and paperless access",
            "Pre and post-hospitalization expenses covered"
        ],
        howToApply: {
            online: "Check eligibility at https://pmjay.gov.in/",
            offline: "Visit nearest empanelled hospital"
        },
        documentsRequired: [
            "Aadhaar Card",
            "Ration Card",
            "SECC database verification",
            "Family identification"
        ],
        tags: ["health", "insurance", "cashless", "hospitalization"],
        level: "central",
        ministry: "Ministry of Health and Family Welfare",
        eligibilityAgeMin: 0,
        eligibilityAgeMax: 100,
        category: {
            incomeGroup: ["EWS", "SC", "ST"],
            gender: ["male", "female", "other"]
        },
        state: ["all"]
    },
    {
        title: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
        objective: "To provide affordable housing to all eligible families in urban areas by the year 2022.",
        keyFeatures: [
            "Interest subsidy on home loans",
            "In-situ slum redevelopment",
            "Credit linked subsidy scheme",
            "Affordable housing in partnership"
        ],
        howToApply: {
            online: "Apply at https://pmaymis.gov.in/",
            offline: "Visit nearest urban local body office"
        },
        documentsRequired: [
            "Aadhaar Card",
            "Income Certificate",
            "Property Documents",
            "Bank Account Details",
            "Passport Size Photo"
        ],
        tags: ["housing", "urban", "subsidy", "affordable"],
        level: "central",
        ministry: "Ministry of Housing and Urban Affairs",
        eligibilityAgeMin: 18,
        eligibilityAgeMax: 100,
        category: {
            incomeGroup: ["EWS", "OBC", "SC", "ST"],
            gender: ["male", "female", "other"]
        },
        state: ["all"]
    },
    {
        title: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
        objective: "To provide at least 100 days of guaranteed wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.",
        keyFeatures: [
            "100 days guaranteed employment",
            "Wage payment within 15 days",
            "Work within 5 km radius",
            "Equal wages for men and women"
        ],
        howToApply: {
            online: "Apply through NREGA official website",
            offline: "Visit Gram Panchayat office for job card"
        },
        documentsRequired: [
            "Aadhaar Card",
            "Ration Card",
            "Bank Account Details",
            "Address Proof",
            "Passport Size Photo"
        ],
        tags: ["employment", "rural", "wage", "guarantee"],
        level: "central",
        ministry: "Ministry of Rural Development",
        eligibilityAgeMin: 18,
        eligibilityAgeMax: 100,
        category: {
            incomeGroup: ["EWS", "General", "OBC", "SC", "ST"],
            gender: ["male", "female", "other"]
        },
        state: ["all"]
    },
    {
        title: "Pradhan Mantri Mudra Yojana (PMMY)",
        objective: "To provide funding to non-corporate, non-farm small/micro enterprises up to Rs. 10 lakh.",
        keyFeatures: [
            "Collateral-free loans up to Rs. 10 lakh",
            "Three categories: Shishu, Kishore, Tarun",
            "Support for small businesses",
            "Quick processing and disbursal"
        ],
        howToApply: {
            online: "Apply through bank websites or Mudra portal",
            offline: "Visit nearest bank branch"
        },
        documentsRequired: [
            "Business Plan/Project Report",
            "Identity Proof",
            "Address Proof",
            "Bank Statements",
            "Business Registration Certificate"
        ],
        tags: ["business", "loan", "micro-finance", "entrepreneur"],
        level: "central",
        ministry: "Ministry of Finance",
        eligibilityAgeMin: 18,
        eligibilityAgeMax: 100,
        category: {
            incomeGroup: ["EWS", "General", "OBC", "SC", "ST"],
            gender: ["male", "female", "other"]
        },
        state: ["all"]
    }
];

const schemesV2Data = [
    {
        openDate: new Date('2024-01-01'),
        closeDate: null,
        state: "All India",
        nodalMinistryName: {
            label: "Ministry of Education"
        },
        schemeName: "National Education Policy 2020 Implementation",
        schemeShortTitle: "NEP 2020",
        tags: ["education", "policy", "digital", "inclusive"],
        level: "Central",
        schemeCategory: ["Education", "Skill Development"],
        references: [
            {
                title: "Official NEP 2020 Document",
                url: "https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf"
            }
        ],
        detailedDescription_md: `# National Education Policy 2020
        
The National Education Policy 2020 (NEP 2020) is a comprehensive framework for education transformation in India. It aims to make India a global knowledge superpower by making both school and college education more holistic, flexible, multidisciplinary, suited to 21st-century needs, and at par with the global best practices.

## Key Objectives:
- Achieving universal access to quality education
- Promoting multidisciplinary learning
- Enhancing digital infrastructure
- Strengthening teacher training programs
- Reducing curriculum load and exam stress`,
        applicationProcess: [
            {
                step: 1,
                description: "Implementation through educational institutions",
                documents: ["Institutional readiness assessment"]
            }
        ],
        eligibilityDescription_md: "All educational institutions across India are eligible for NEP 2020 implementation support.",
        benefits: [
            {
                type: "Infrastructure Support",
                description: "Digital infrastructure development for schools and colleges",
                amount: "Varies by institution size"
            }
        ],
        faqs: [
            {
                question: "What is the timeline for NEP 2020 implementation?",
                answer: "NEP 2020 is being implemented in phases from 2020 to 2030."
            }
        ],
        documents_required: [
            {
                document: "Institution Registration",
                mandatory: true
            }
        ]
    },
    {
        openDate: new Date('2024-01-01'),
        closeDate: new Date('2024-12-31'),
        state: "All India",
        nodalMinistryName: {
            label: "Ministry of Women and Child Development"
        },
        schemeName: "Pradhan Mantri Matru Vandana Yojana",
        schemeShortTitle: "PMMVY",
        tags: ["women", "maternity", "cash transfer", "nutrition"],
        level: "Central",
        schemeCategory: ["Women Welfare", "Health"],
        references: [
            {
                title: "PMMVY Official Website",
                url: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
            }
        ],
        detailedDescription_md: `# Pradhan Mantri Matru Vandana Yojana (PMMVY)
        
PMMVY is a centrally sponsored scheme being implemented in all districts of the country with effect from 1st January 2017. The scheme provides cash incentives to pregnant women and lactating mothers for improved health and nutrition outcomes.

## Benefits:
- Rs. 5,000 in three instalments
- First instalment: Rs. 1,000 on early registration
- Second instalment: Rs. 2,000 after 6 months of pregnancy
- Third instalment: Rs. 2,000 after birth registration

## Eligibility:
- Pregnant and lactating women
- First live birth only
- Age: 19 years and above`,
        applicationProcess: [
            {
                step: 1,
                description: "Register at Anganwadi Centre or approved health facility",
                documents: ["Identity proof", "Address proof", "Pregnancy certificate"]
            }
        ],
        eligibilityDescription_md: "All pregnant women and lactating mothers for their first live birth, excluding women in regular employment with the Central/State Government or PSUs.",
        benefits: [
            {
                type: "Direct Cash Transfer",
                description: "Rs. 5,000 in three instalments",
                amount: "Rs. 5,000"
            }
        ],
        faqs: [
            {
                question: "Who is eligible for PMMVY?",
                answer: "Pregnant women and lactating mothers for their first live birth, aged 19+ years."
            }
        ],
        documents_required: [
            {
                document: "Mother and Child Protection Card",
                mandatory: true
            },
            {
                document: "Aadhaar Card",
                mandatory: true
            },
            {
                document: "Bank Account Details",
                mandatory: true
            }
        ]
    },
    {
        openDate: new Date('2024-01-01'),
        closeDate: null,
        state: "All India",
        nodalMinistryName: {
            label: "Ministry of Agriculture and Farmers Welfare"
        },
        schemeName: "Pradhan Mantri Fasal Bima Yojana",
        schemeShortTitle: "PMFBY",
        tags: ["agriculture", "insurance", "crop", "farmers"],
        level: "Central",
        schemeCategory: ["Agriculture", "Insurance"],
        references: [
            {
                title: "PMFBY Portal",
                url: "https://pmfby.gov.in/"
            }
        ],
        detailedDescription_md: `# Pradhan Mantri Fasal Bima Yojana (PMFBY)
        
PMFBY was launched in 2016 to provide insurance coverage and financial support to farmers in the event of failure of their notified crop as a result of natural calamities, pests & diseases.

## Key Features:
- Low premium rates for farmers
- No upper limit on government subsidy
- Use of technology for quick settlement
- One insurance company for one state

## Premium Rates:
- Kharif crops: 2% of Sum Insured
- Rabi crops: 1.5% of Sum Insured
- Annual commercial crops: 5% of Sum Insured`,
        applicationProcess: [
            {
                step: 1,
                description: "Apply through banks, insurance companies, or online portal",
                documents: ["Land documents", "Aadhaar card", "Bank account details"]
            }
        ],
        eligibilityDescription_md: "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas are eligible.",
        benefits: [
            {
                type: "Crop Insurance",
                description: "Coverage against crop loss due to natural calamities",
                amount: "Up to Sum Insured based on crop and area"
            }
        ],
        faqs: [
            {
                question: "What crops are covered under PMFBY?",
                answer: "All food crops (cereals, millets and pulses), oilseeds and annual commercial/horticultural crops for which past yield data is available."
            }
        ],
        documents_required: [
            {
                document: "Land ownership documents or tenancy agreement",
                mandatory: true
            },
            {
                document: "Aadhaar Card",
                mandatory: true
            },
            {
                document: "Bank Account Details",
                mandatory: true
            }
        ]
    }
];

// Sample users for testing
const userData = [
    {
        name: "Ramesh Kumar",
        email: "ramesh.kumar@example.com",
        password: "password123",
        phoneNumber: "+91-9876543210",
        role: "USER",
        interests: ["agriculture", "health"],
        incomeGroup: "General",
        state: "Maharashtra",
        age: 35,
        gender: "male",
        favorites: []
    },
    {
        name: "Priya Sharma",
        email: "priya.sharma@example.com", 
        password: "password123",
        phoneNumber: "+91-8765432109",
        role: "USER",
        interests: ["education", "women welfare"],
        incomeGroup: "OBC",
        state: "Rajasthan",
        age: 28,
        gender: "female",
        favorites: []
    },
    {
        name: "Admin User",
        email: "admin@schemeseva.gov.in",
        password: "admin123",
        phoneNumber: "+91-9999999999",
        role: "ADMIN",
        interests: ["administration"],
        incomeGroup: "General",
        state: "Delhi",
        age: 40,
        gender: "other",
        favorites: []
    }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');
        
        // Connect to database
        await connectDB();
        
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Scheme.deleteMany({});
        await Schemev2.deleteMany({});
        await User.deleteMany({});
        
        // Seed Schemes V1 data
        console.log('📋 Seeding Schemes V1 data...');
        const seedSchemesV1 = await Scheme.insertMany(schemesV1Data);
        console.log(`✅ Inserted ${seedSchemesV1.length} schemes (V1)`);
        
        // Seed Schemes V2 data
        console.log('📋 Seeding Schemes V2 data...');
        const seedSchemesV2 = await Schemev2.insertMany(schemesV2Data);
        console.log(`✅ Inserted ${seedSchemesV2.length} schemes (V2)`);
        
        // Seed User data
        console.log('👥 Seeding User data...');
        const seedUsers = await User.insertMany(userData);
        console.log(`✅ Inserted ${seedUsers.length} users`);
        
        console.log('🎉 Database seeding completed successfully!');
        console.log('💡 You can now start the backend server with: npm start');
        console.log('📊 Database Statistics:');
        console.log(`   - Schemes (V1): ${seedSchemesV1.length}`);
        console.log(`   - Schemes (V2): ${seedSchemesV2.length}`);
        console.log(`   - Users: ${seedUsers.length}`);
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
    }
};

// Run the seeding function
if (process.argv.length > 2 && process.argv[2] === 'run') {
    seedDatabase();
}

export default seedDatabase;