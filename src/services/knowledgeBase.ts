// SIC Life Knowledge Base

export interface KnowledgeItem {
  id: string;
  category: string;
  subcategory?: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedQuestions?: string[];
}

export interface InsuranceProduct {
  id: string;
  name: string;
  type: string;
  description: string;
  benefits: string[];
  coverageAmount: {
    min: number;
    max: number;
  };
  premiumRange: {
    min: number;
    max: number;
  };
  eligibility: {
    minAge: number;
    maxAge: number;
    requirements: string[];
  };
  documents: string[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  location: {
    lat: number;
    lng: number;
  };
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

// Insurance Products Data
export const insuranceProducts: InsuranceProduct[] = [
  {
    id: 'universal-life',
    name: 'Education Plan Plus',
    type: 'Universal Life',
    description: 'A flexible education policy that helps secure your child\'s academic future while providing life coverage.',
    benefits: [
      'Flexible premium payments',
      'Cash value accumulation',
      'Education funding guarantee',
      'Life insurance protection'
    ],
    coverageAmount: {
      min: 10000,
      max: 1000000
    },
    premiumRange: {
      min: 100,
      max: 5000
    },
    eligibility: {
      minAge: 18,
      maxAge: 60,
      requirements: [
        'Must be a parent or legal guardian',
        'Child must be under 18 years'
      ]
    },
    documents: [
      'Valid ID',
      'Birth certificate of child',
      'Proof of income'
    ]
  },
  {
    id: 'term-life',
    name: 'SIC Life Term Assurance',
    type: 'Term Life',
    description: 'Pure life insurance coverage for a specified term with affordable premiums.',
    benefits: [
      'High coverage at low cost',
      'Fixed premiums',
      'Death benefit protection',
      'Optional riders available'
    ],
    coverageAmount: {
      min: 50000,
      max: 2000000
    },
    premiumRange: {
      min: 50,
      max: 1000
    },
    eligibility: {
      minAge: 18,
      maxAge: 65,
      requirements: [
        'Medical examination',
        'Proof of income',
        'Valid ID'
      ]
    },
    documents: [
      'Medical report',
      'Valid ID',
      'Proof of income'
    ]
  },
  {
    id: 'prod-8',
    name: 'Ultimate Family Security Plan',
    type: 'Universal Life',
    description: 'Allows policyholders to save money while having life insurance coverage.',
    benefits: [
      'Entry Age: 18-55 years',
      'Term: Up to age 60',
      'Premium: Monthly minimum of GH¢60',
      'Sum Assured: GH¢5,000 - GH¢20,000',
      'Inflation Protection: Annual premium increment (5-30%) triggers Sum Assured increase',
      'Policy Loan: Access up to 80% of accumulated fund',
      'Partial Withdrawals: Access up to 50-60% of accumulated fund',
      'Maturity Benefit',
      'Death Benefit',
      'Optional Benefits: Personal Accident (TPD/TTD), Critical Illness, Hospitalisation',
      'Settlement Options at Retirement (age 60): Lump Sum, Periodic payments as advised'
    ],
    coverageAmount: {
      min: 5000,
      max: 20000
    },
    premiumRange: {
      min: 60,
      max: 60
    },
    eligibility: {
      minAge: 18,
      maxAge: 55,
      requirements: []
    },
    documents: []
  },
  {
    id: 'prod-9',
    name: 'Guaranteed Endowment Plan',
    type: 'Universal Life',
    description: 'Offers insurance protection and savings accumulation.',
    benefits: [
      'Term: 5-20 years (maturity age not exceeding 65)',
      'Benefits: Endowment payment at maturity (Sum Assured + Terminal Bonus), Death benefit for beneficiaries, Optional premium waiver for permanent disability',
      'Unique Features: Terminal Bonus at maturity, Automatic Premium Payment Provision, Policy loans available after 5 years',
      'Premium Payment Options: Salary deduction, Bank authorization, Mobile money, Cash/Cheque',
      'Frequency: Monthly, quarterly, half-yearly, or yearly'
    ],
    coverageAmount: {
      min: 5000,
      max: 20000
    },
    premiumRange: {
      min: 60,
      max: 60
    },
    eligibility: {
      minAge: 18,
      maxAge: 65,
      requirements: []
    },
    documents: []
  },
  {
    id: 'prod-10',
    name: 'Sika Plan (Okum-Ka)',
    type: 'Universal Life',
    description: 'A two-year renewal \'susu\' scheme with life insurance cover for the informal sector.',
    benefits: [
      'Eligibility: Healthy individuals aged 18-70 years in the informal sector',
      'Premium Payment: Daily, weekly, fortnightly, or monthly',
      'Collection: Door-to-door by Sales Executives',
      'Sum Assured: GH¢1,000 for premiums less than GH¢50/month, GH¢2,000 for premiums more than GH¢50/month',
      'Partial Withdrawal: 30% after 4 months, 60% after 7 months, 100% after 12 months',
      'Benefits: Maturity Benefit, Death Benefit (Sum Assured + fund value), Interest on contribution'
    ],
    coverageAmount: {
      min: 1000,
      max: 2000
    },
    premiumRange: {
      min: 50,
      max: 50
    },
    eligibility: {
      minAge: 18,
      maxAge: 70,
      requirements: []
    },
    documents: []
  }
];

// Branch Information
export const branches: Branch[] = [
  {
    id: 'head-office',
    name: 'Head Office',
    address: 'No. 1 Jones Nelson Road, Adabraka Freetown, Accra',
    phone: '+233-302-662286',
    email: 'info@siclife.com.gh',
    location: {
      lat: 5.5602,
      lng: -0.2174
    },
    workingHours: {
      weekdays: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  }
];

// FAQ Knowledge Base
export const sicLifeKnowledge: KnowledgeItem[] = [
  // Product Information
  {
    id: 'prod-1',
    category: 'Products',
    subcategory: 'Universal Life',
    question: 'What is the Education Plan Plus?',
    answer: 'The Education Plan Plus is designed to help policyholders or their children pursue higher education. Key features include:\n\n' +
            '• Entry Age: 18-50 years\n' +
            '• Term: 10-20 years (subject to age 60)\n' +
            '• Premium: Monthly minimum of GH¢60 with minimum benefit of GH¢5,000\n' +
            '• Sum Assured: Minimum of GH¢5,000\n' +
            '• Inflation Protection: Annual premium increment (5-30%) triggers relative increase in Sum Assured\n' +
            '• Partial Withdrawal: Access up to 60% of accumulated fund\n\n' +
            'Benefits include Death Benefit and Maturity Benefit.',
    keywords: ['education', 'plan', 'plus', 'higher education', 'children', 'premium', 'benefits']
  },
  {
    id: 'prod-2',
    category: 'Products',
    question: 'What is the Final Journey Plan Plus?',
    answer: 'The Final Journey Plan Plus provides immediate cash for funeral expenses. Coverage includes:\n\n' +
            '• Up to 12 persons covered:\n' +
            '  - Primary Assured (max age 55)\n' +
            '  - Spouse (max age 75)\n' +
            '  - 2 Parents (max age 75)\n' +
            '  - 2 Parent-in-laws (max age 75)\n' +
            '  - 2 Uncles/Aunties/Brothers/Sisters (max age 75)\n' +
            '  - 4 children (max age 21)\n\n' +
            'Features:\n' +
            '• Premiums payable till age 60 (if purchased before 50) or 10 years (if after 50)\n' +
            '• 15% cash back of last 3 years premium (no claims)\n' +
            '• Waiver of Premium for secondary assured after 6 months\n' +
            '• Inflation Protection\n\n' +
            'Benefits include Death Benefit and optional benefits for celebrations.',
    keywords: ['final journey', 'funeral', 'expenses', 'death benefit', 'premium', 'waiver']
  },
  {
    id: 'prod-3',
    category: 'Products',
    question: 'What is the GES Group Life Insurance Policy?',
    answer: 'The GES Group Life Policy is a comprehensive package for GES staff nationwide. Coverage includes:\n\n' +
            '1. Death Benefit (Natural or Accidental)\n' +
            '2. Permanent Disability (24-hour protection)\n' +
            '3. Critical Illness (covers heart attack, stroke, deafness, cancer, kidney failure, loss of sight/speech, paralysis)\n\n' +
            'Eligibility: Active GES staff under 60 years\n' +
            'Premium: Minimum GH¢10.00 monthly (deducted at source)\n\n' +
            'Benefits:\n' +
            '• Death: GH¢18,000.00\n' +
            '• Permanent disability: Up to GH¢18,000.00\n' +
            '• Critical illness: Up to GH¢9,000.00\n\n' +
            'Exclusions include suicide, war, criminal action, and non-passenger aviation.',
    keywords: ['GES', 'group life', 'staff', 'death benefit', 'disability', 'critical illness']
  },
  {
    id: 'prod-4',
    category: 'Products',
    question: 'What is the Group Security Plan?',
    answer: 'The Group Security Plan protects employers against employee demise or disability. Features include:\n\n' +
            '• Annual renewable policy\n' +
            '• For Affinity Groups, Companies, or Employers\n' +
            '• Minimum 10 people required (individual rates for smaller groups)\n\n' +
            'Benefits:\n' +
            '• Death benefit\n' +
            '• Optional benefits:\n' +
            '  - Permanent Disability (24-hour protection)\n' +
            '  - Medical Expenses Cover\n' +
            '  - Critical Illness\n' +
            '  - Dependants Benefit',
    keywords: ['group security', 'employer', 'protection', 'death benefit', 'disability', 'medical']
  },
  {
    id: 'prod-5',
    category: 'Products',
    question: 'What is the Loan Protector Policy?',
    answer: 'The Loan Protector Policy pays outstanding loans when the borrower dies or becomes permanently disabled. Features:\n\n' +
            '• Eligibility: Ages 18-60 in good health\n' +
            '• Premium depends on:\n' +
            '  - Insurable events covered\n' +
            '  - Loan repayment term\n' +
            '  - Interest rate\n\n' +
            'Coverage Options:\n' +
            '1. Death Only: Pays principal outstanding\n' +
            '2. Death and Total/Permanent Disability: Pays principal outstanding\n\n' +
            'Benefits are paid to the Financial Institution within one week of claim documentation.',
    keywords: ['loan', 'protector', 'borrower', 'death', 'disability', 'financial institution']
  },
  {
    id: 'prod-6',
    category: 'Products',
    question: 'What is the Guaranteed Endowment Plan?',
    answer: 'The Guaranteed Endowment Plan offers insurance protection and savings accumulation. Features:\n\n' +
            '• Term: 5-20 years (maturity age not exceeding 65)\n' +
            '• Benefits:\n' +
            '  - Endowment payment at maturity (Sum Assured + Terminal Bonus)\n' +
            '  - Death benefit for beneficiaries\n' +
            '  - Optional premium waiver for permanent disability\n\n' +
            'Unique Features:\n' +
            '• Terminal Bonus at maturity\n' +
            '• Automatic Premium Payment Provision\n' +
            '• Policy loans available after 5 years\n\n' +
            'Premium Payment Options:\n' +
            '• Salary deduction\n' +
            '• Bank authorization\n' +
            '• Mobile money\n' +
            '• Cash/Cheque\n\n' +
            'Frequency: Monthly, quarterly, half-yearly, or yearly',
    keywords: ['endowment', 'guaranteed', 'savings', 'terminal bonus', 'premium', 'policy loan']
  },
  {
    id: 'prod-7',
    category: 'Products',
    question: 'What is Keyman Assurance?',
    answer: 'Keyman Assurance (Key-Person Loan Policy) protects businesses against the loss of key personnel. Features:\n\n' +
            'Coverage Options:\n' +
            '1. Death only\n' +
            '2. Death and/or permanent total disability\n\n' +
            'Purpose:\n' +
            '• Protects business loans/facilities for:\n' +
            '  - Starting a business\n' +
            '  - Business expansion\n' +
            '• Protects sole proprietors against enterprise loans\n\n' +
            'Benefits:\n' +
            '• Financial cushion for:\n' +
            '  - Delayed/cancelled projects\n' +
            '  - Lost expansion opportunities\n' +
            '  - Reduced credit worthiness\n' +
            '• Improves key person retention',
    keywords: ['keyman', 'assurance', 'business', 'loan', 'protection', 'key person']
  },
  
  // Claims Process
  {
    id: 'claims-1',
    category: 'Claims',
    question: 'How do I file a claim?',
    answer: 'To file a claim, follow these steps:\n1. Gather required documents (policy document, claim form, supporting documents)\n2. Visit our e-claims portal or nearest branch\n3. Submit your claim form and documents\n4. Receive your claim reference number\n5. Track your claim status online',
    keywords: ['claim', 'file', 'process', 'submit']
  },
  
  // Premium Payments
  {
    id: 'payment-1',
    category: 'Payments',
    question: 'What payment methods are available?',
    answer: 'We accept multiple payment methods:\n- Mobile Money (MTN, Vodafone, AirtelTigo)\n- Bank Transfer\n- Visa/MasterCard\n- Cash at any SIC Life branch\n- Direct Debit',
    keywords: ['payment', 'pay', 'premium', 'momo', 'bank']
  },
  
  // Policy Management
  {
    id: 'policy-1',
    category: 'Policy',
    question: 'How can I check my policy status?',
    answer: 'You can check your policy status by:\n1. Logging into your online account\n2. Using our mobile app\n3. Calling our customer service\n4. Visiting any SIC Life branch\nYou\'ll need your policy number for verification.',
    keywords: ['policy', 'status', 'check']
  },
  {
    id: 'faq-1',
    category: 'FAQs',
    question: 'What is the minimum age for taking a life insurance policy?',
    answer: 'The minimum age to take a life insurance policy is eighteen (18) years.',
    keywords: ['minimum age', 'policy', 'eligibility', 'age requirement']
  },
  {
    id: 'faq-2',
    category: 'FAQs',
    question: 'How long does it take to process a proposal?',
    answer: 'After the first premium is paid, the proposal can be processed almost immediately for a policy document.',
    keywords: ['proposal', 'process', 'time', 'policy document']
  },
  {
    id: 'faq-3',
    category: 'FAQs',
    question: 'Can I take a life insurance policy if my spouse already has one?',
    answer: 'Yes, you can have as many policies as you and your spouse want, provided you have the ability to pay for them.',
    keywords: ['spouse', 'multiple policies', 'policy', 'family']
  },
  {
    id: 'faq-4',
    category: 'FAQs',
    question: 'When and how can I access funds in my account?',
    answer: 'After one year, the policyholder can apply for a policy loan. Partial withdrawal can be accessed after two (2) years.',
    keywords: ['funds', 'access', 'withdrawal', 'policy loan', 'partial withdrawal']
  },
  {
    id: 'faq-5',
    category: 'FAQs',
    question: 'How do I know the amount of money in my account?',
    answer: 'On each policy anniversary, a statement is sent to the policyholder. Clients may however request a policy statement at any time.',
    keywords: ['account balance', 'statement', 'policy statement', 'anniversary']
  },
  {
    id: 'faq-6',
    category: 'FAQs',
    question: 'What information can I modify on my policy?',
    answer: 'The following can be changed on the policy:\n\n' +
            '• Address\n' +
            '• Beneficiary\n' +
            '• Sum Assured\n' +
            '• Premium Amount\n' +
            '• Age*\n' +
            '• Name*\n' +
            '• Signature\n\n' +
            'Please note that items marked with * will require documentary proof.',
    keywords: ['modify', 'change', 'policy', 'information', 'update']
  },
  {
    id: 'faq-7',
    category: 'FAQs',
    question: 'Where can I make a claim?',
    answer: 'You can make a claim in any of our offices which are located in all the regions.',
    keywords: ['claim', 'office', 'location', 'regions']
  },
  {
    id: 'faq-8',
    category: 'FAQs',
    question: 'Do I need a lawyer to make a claim?',
    answer: 'You can make your claim without the services of a Lawyer. Claims are processed within a maximum of three (3) hours.',
    keywords: ['lawyer', 'claim', 'process', 'time']
  },
  {
    id: 'faq-9',
    category: 'FAQs',
    question: 'How many beneficiaries can I name under my policy?',
    answer: 'You can name as many beneficiaries as you wish.',
    keywords: ['beneficiaries', 'policy', 'name', 'number']
  },
  {
    id: 'faq-10',
    category: 'FAQs',
    question: 'How can beneficiaries make a death claim?',
    answer: 'Named beneficiaries need a CERTIFICATE OF CAUSE OF DEATH and the POLICY DOCUMENT to make a death claim. In the absence of these, certification of death by a prominent person such as a Chief, a Cleric or Imam may be accepted.',
    keywords: ['beneficiaries', 'death claim', 'certificate', 'documentation']
  },
  {
    id: 'faq-11',
    category: 'FAQs',
    question: 'How will my benefit be paid at maturity?',
    answer: 'At maturity, the policyholder may elect to have the benefit paid as a lump sum or by installments after submitting the policy document together with an application for the benefit.',
    keywords: ['maturity', 'benefit', 'payment', 'lump sum', 'installments']
  },
  {
    id: 'faq-12',
    category: 'FAQs',
    question: 'What happens to my policy if I lose my job, change jobs or travel out of the country?',
    answer: 'The policy will remain in force for as long as there are sufficient funds in the account to sustain it.',
    keywords: ['job change', 'travel', 'policy status', 'funds']
  },
  {
    id: 'faq-13',
    category: 'FAQs',
    question: 'Can I have more than one Life policy?',
    answer: 'Yes, you can have more than one Life policy.',
    keywords: ['multiple policies', 'life policy', 'number of policies']
  },
  {
    id: 'faq-14',
    category: 'FAQs',
    question: 'What means can I use to pay my premiums?',
    answer: 'Premiums may be paid by:\n' +
            '• Cash or cheque\n' +
            '• Payroll deduction\n' +
            '• Direct debit through banks\n' +
            '• Controller & Accountant-General deduction scheme (for government workers)',
    keywords: ['premium payment', 'payment methods', 'deduction', 'bank']
  },
  {
    id: 'faq-15',
    category: 'FAQs',
    question: 'How can I access your products?',
    answer: 'We have offices in all the regions. Our products can be obtained through our sales representatives and from our offices in all the regions. Please see the CONTACT US page for details.',
    keywords: ['access', 'products', 'offices', 'regions', 'sales representatives']
  },
  {
    id: 'corp-1',
    category: 'Corporate Identity',
    question: 'What is the historical background of SIC Life?',
    answer: 'SIC Life Insurance LTD (SIC Life) originally existed as the Life Division of the reputable multi-line insurer, the SIC Insurance Company Limited. In conformity with the provision of the Insurance Act 2006, Act 724, SIC Life was established as a fully licensed Life Insurance Company in 2007.\n\n' +
            'The Company is the first Life Insurance Company to be inducted into the CIMG Hall of Fame in the 2017 awards ceremony, having won the CIMG Life Insurance Company for five consecutive times.\n\n' +
            'Currently, SIC Life is the largest and most reputable Life Insurance Company.',
    keywords: ['history', 'background', 'establishment', 'CIMG', 'awards', 'reputation']
  },
  {
    id: 'corp-2',
    category: 'Corporate Identity',
    question: 'What is SIC Life\'s corporate vision?',
    answer: 'SIC Life\'s corporate vision is to be recognised as the leading and most trusted brand in our industry.',
    keywords: ['vision', 'corporate vision', 'brand', 'industry', 'leading']
  },
  {
    id: 'corp-3',
    category: 'Corporate Identity',
    question: 'What is SIC Life\'s corporate mission?',
    answer: 'SIC Life\'s corporate mission is to employ a highly motivated and efficient workforce to offer innovative, value-priced life insurance and other financial products whilst ensuring optimal returns to our shareholders.',
    keywords: ['mission', 'corporate mission', 'workforce', 'innovation', 'value', 'returns']
  },
  {
    id: 'corp-4',
    category: 'Corporate Identity',
    question: 'What are SIC Life\'s corporate objectives?',
    answer: 'SIC Life\'s corporate objectives are:\n\n' +
            '1. To create the best place to work, attracting highly skilled, committed and performance-driven people\n' +
            '2. To exceed customer expectations to build sustainable relationships\n' +
            '3. To develop simple and efficient processes driven by cutting edge technology\n' +
            '4. To consistently and innovatively grow our business\n' +
            '5. To prudently manage our resources to maximize shareholder value\n' +
            '6. To be the most trusted brand',
    keywords: ['objectives', 'corporate objectives', 'workplace', 'customer', 'technology', 'growth', 'value', 'brand']
  },
  {
    id: 'corp-5',
    category: 'Corporate Identity',
    question: 'What are SIC Life\'s corporate values?',
    answer: 'SIC Life\'s corporate values are:\n\n' +
            '• Integrity\n' +
            '• Innovation\n' +
            '• Customer Focus\n' +
            '• Teamwork',
    keywords: ['values', 'corporate values', 'integrity', 'innovation', 'customer', 'teamwork']
  },
  {
    id: 'corp-6',
    category: 'Corporate Identity',
    question: 'What is SIC Life\'s tagline?',
    answer: 'SIC Life\'s tagline is "Absolute Peace of Mind".',
    keywords: ['tagline', 'slogan', 'peace of mind']
  },
  {
    id: 'agent-1',
    category: 'Agent Capabilities',
    question: 'How can the agent help me choose the right insurance product?',
    answer: 'I can help you choose the right insurance product through our Smart Product Recommender. I\'ll ask you a few questions to understand your needs:\n\n' +
            '• Do you have children or dependents?\n' +
            '• Are you planning for retirement?\n' +
            '• Do you prefer monthly or annual contributions?\n\n' +
            'Based on your answers, I can recommend the most suitable plan from our range of:\n' +
            '• Life insurance plans\n' +
            '• Education plans\n' +
            '• Investment plans\n\n' +
            'Just let me know if you\'d like to start the recommendation process!',
    keywords: ['product recommendation', 'insurance', 'plan', 'children', 'retirement', 'contributions']
  },
  {
    id: 'agent-2',
    category: 'Agent Capabilities',
    question: 'How can I check my policy status?',
    answer: 'I can help you check your policy status. Simply provide your policy number or ID, and I can show you:\n\n' +
            '• Current policy status (active, lapsed, due soon)\n' +
            '• Policy details and coverage\n' +
            '• Renewal dates\n' +
            '• Available documents and summaries\n\n' +
            'For example, I can tell you: "Your Flexi-Plan is active and due for renewal on June 14, 2025."\n\n' +
            'Would you like to check your policy status now?',
    keywords: ['policy status', 'check', 'policy number', 'ID', 'renewal', 'documents']
  },
  {
    id: 'agent-3',
    category: 'Agent Capabilities',
    question: 'How can I file a claim?',
    answer: 'I can guide you through the claims process in 3 simple steps:\n\n' +
            '1. Select claim type:\n' +
            '   • Life insurance claim\n' +
            '   • Funeral claim\n' +
            '   • Critical illness claim\n\n' +
            '2. Upload required documents:\n' +
            '   • Death certificate (for life/funeral claims)\n' +
            '   • Medical form (for critical illness claims)\n' +
            '   • Other supporting documents\n\n' +
            '3. Receive confirmation:\n' +
            '   • Get your claim tracking ID\n' +
            '   • Track claim status\n' +
            '   • Receive updates\n\n' +
            'Would you like to start filing a claim?',
    keywords: ['claim', 'file', 'process', 'documents', 'tracking', 'status']
  },
  {
    id: 'agent-4',
    category: 'Agent Capabilities',
    question: 'What types of claims can I file?',
    answer: 'You can file the following types of claims:\n\n' +
            '1. Life Insurance Claims:\n' +
            '   • Death benefit claims\n' +
            '   • Maturity claims\n' +
            '   • Surrender claims\n\n' +
            '2. Funeral Claims:\n' +
            '   • Immediate funeral expenses\n' +
            '   • Family funeral coverage\n\n' +
            '3. Critical Illness Claims:\n' +
            '   • Medical condition claims\n' +
            '   • Hospitalization claims\n' +
            '   • Disability claims\n\n' +
            'Each claim type has specific requirements and documentation needs. I can guide you through the process for any of these claims.',
    keywords: ['claim types', 'life insurance', 'funeral', 'critical illness', 'documentation']
  },
  {
    id: 'agent-5',
    category: 'Agent Capabilities',
    question: 'What documents do I need for claims?',
    answer: 'Required documents vary by claim type:\n\n' +
            'For Life Insurance Claims:\n' +
            '• Death certificate\n' +
            '• Policy document\n' +
            '• ID of beneficiary\n' +
            '• Bank details\n\n' +
            'For Funeral Claims:\n' +
            '• Death certificate\n' +
            '• Burial permit\n' +
            '• Policy document\n' +
            '• ID of claimant\n\n' +
            'For Critical Illness Claims:\n' +
            '• Medical reports\n' +
            '• Hospital bills\n' +
            '• Policy document\n' +
            '• ID of claimant\n\n' +
            'I can help you prepare the right documents for your specific claim.',
    keywords: ['documents', 'claims', 'requirements', 'certificates', 'medical reports']
  },
  {
    id: 'branch-1',
    category: 'Branches',
    question: 'What are SIC Life\'s main branch locations and contact numbers?',
    answer: 'Here are SIC Life\'s main branch locations and contact numbers:\n\n' +
            'Accra:\n' +
            '• Corporate Head Office: 030-267-8130\n' +
            '• Accra Mall Branch: 030-282-3096\n' +
            '• SIC LIFE MALL: 030-263-2342\n' +
            '• Spintex Branch: 024-680-2136\n' +
            '• Nyemitei Branch: 030-278-0600\n' +
            '• Dansoman Branch: 030-231-2608\n' +
            '• Amasaman Branch: 053-420-8181\n' +
            '• Adenta Branch: 030-393-4434\n\n' +
            'Other Major Cities:\n' +
            '• Tema Branch: 030-320-7328\n' +
            '• Kumasi: 032-202-9289\n' +
            '• Techiman: 035-209-1668\n' +
            '• Takoradi: 031-202-4508\n' +
            '• Cape-Coast: 055-927-5521\n' +
            '• Koforidua: 034-202-1078\n' +
            '• Akim-Oda: 054-205-0064\n' +
            '• Kasoa: 030-396-6830\n' +
            '• Aflao: 036-253-0234\n\n' +
            'Customer Service:\n' +
            '• Phone: 030-275-0151\n' +
            '• WhatsApp: 050-157-0652, 050-145-6983, 050-169-4554',
    keywords: ['branches', 'locations', 'contact', 'phone', 'address', 'customer service']
  },
  {
    id: 'branch-2',
    category: 'Branches',
    question: 'What are the operating hours of SIC Life branches?',
    answer: 'SIC Life branches operate during the following hours:\n\n' +
            'Weekdays (Monday - Friday):\n' +
            '• Opening: 8:00 AM\n' +
            '• Closing: 5:00 PM\n\n' +
            'Saturday:\n' +
            '• Opening: 9:00 AM\n' +
            '• Closing: 2:00 PM\n\n' +
            'Sunday:\n' +
            '• Closed\n\n' +
            'Note: Some branches may have slightly different operating hours. It\'s recommended to call ahead to confirm.',
    keywords: ['operating hours', 'business hours', 'open', 'close', 'weekdays', 'weekend']
  },
  {
    id: 'branch-3',
    category: 'Branches',
    question: 'What services are available at SIC Life branches?',
    answer: 'SIC Life branches offer the following services:\n\n' +
            '• Policy purchases and renewals\n' +
            '• Claims processing\n' +
            '• Premium payments\n' +
            '• Policy status checks\n' +
            '• Document requests\n' +
            '• Customer service support\n' +
            '• Financial advisory services\n' +
            '• ATM services (at selected branches)\n\n' +
            'Some branches also offer:\n' +
            '• Savings & Loans services\n' +
            '• Investment advisory\n' +
            '• Corporate insurance solutions',
    keywords: ['services', 'branch services', 'transactions', 'payments', 'claims']
  },
  {
    id: 'branch-4',
    category: 'Branches',
    question: 'How can I find the nearest SIC Life branch?',
    answer: 'You can find the nearest SIC Life branch through:\n\n' +
            '1. Visit our website and use the branch locator\n' +
            '2. Call our customer service: 030-275-0151\n' +
            '3. Use Google Maps and search for "SIC Life" in your area\n' +
            '4. Contact our WhatsApp support: 050-157-0652\n\n' +
            'Our branches are strategically located across Ghana in:\n' +
            '• All regional capitals\n' +
            '• Major business districts\n' +
            '• Shopping malls\n' +
            '• Commercial centers',
    keywords: ['find branch', 'locate', 'nearest', 'directions', 'location']
  },
  {
    id: 'agent-6',
    category: 'Agent Capabilities',
    question: 'How can I speak to a human agent?',
    answer: 'I can help you connect with a human agent through multiple channels:\n\n' +
            '1. WhatsApp:\n' +
            '   • Direct message: 050-157-0652\n' +
            '   • Quick response for general inquiries\n' +
            '   • Document sharing capability\n\n' +
            '2. Phone Call:\n' +
            '   • Customer Service: 030-275-0151\n' +
            '   • Available during business hours\n' +
            '   • For urgent matters\n\n' +
            '3. Live Chat:\n' +
            '   • Through our website\n' +
            '   • Real-time conversation\n' +
            '   • Screen sharing available\n\n' +
            'Before connecting you, I\'ll need to know:\n' +
            '• The reason for escalation\n' +
            '• Your preferred contact method\n' +
            '• Your contact information\n\n' +
            'Would you like me to connect you with a human agent now?',
    keywords: ['human agent', 'escalation', 'whatsapp', 'phone', 'live chat', 'support']
  },
  {
    id: 'agent-7',
    category: 'Agent Capabilities',
    question: 'When should I speak to a human agent?',
    answer: 'You may want to speak to a human agent for:\n\n' +
            '1. Complex Inquiries:\n' +
            '   • Detailed policy explanations\n' +
            '   • Complex claim situations\n' +
            '   • Investment advice\n\n' +
            '2. Urgent Matters:\n' +
            '   • Emergency claims\n' +
            '   • Policy cancellations\n' +
            '   • Payment issues\n\n' +
            '3. Special Requests:\n' +
            '   • Policy modifications\n' +
            '   • Special arrangements\n' +
            '   • Document verification\n\n' +
            '4. Technical Issues:\n' +
            '   • Website problems\n' +
            '   • App difficulties\n' +
            '   • System access\n\n' +
            'I can help assess if your situation requires human assistance and connect you appropriately.',
    keywords: ['human agent', 'when', 'complex', 'urgent', 'special', 'technical']
  },
  {
    id: 'agent-8',
    category: 'Agent Capabilities',
    question: 'What information should I prepare before speaking to a human agent?',
    answer: 'To ensure a smooth transition to a human agent, please have ready:\n\n' +
            '1. Personal Information:\n' +
            '   • Full name\n' +
            '   • Contact number\n' +
            '   • Email address\n\n' +
            '2. Policy Details (if applicable):\n' +
            '   • Policy number\n' +
            '   • Policy type\n' +
            '   • Issue or concern\n\n' +
            '3. Supporting Documents:\n' +
            '   • Relevant certificates\n' +
            '   • Previous communications\n' +
            '   • Any error messages\n\n' +
            '4. Preferred Contact Method:\n' +
            '   • WhatsApp\n' +
            '   • Phone call\n' +
            '   • Live chat\n\n' +
            'This will help the human agent assist you more effectively.',
    keywords: ['prepare', 'information', 'documents', 'contact', 'details']
  },
  {
    id: 'suggested-questions',
    category: 'Help',
    question: 'What can I ask you?',
    answer: 'Here are some questions you can ask me:\n\n' +
            '📋 General Information:\n' +
            '• What is SIC Life\'s mission and vision?\n' +
            '• Tell me about SIC Life\'s history\n' +
            '• What are SIC Life\'s corporate values?\n\n' +
            '🏦 Products & Services:\n' +
            '• What insurance products do you offer?\n' +
            '• Tell me about the Education Plan Plus\n' +
            '• What is the Final Journey Plan Plus?\n' +
            '• Explain the GES Group Life Insurance Policy\n' +
            '• What is the Group Security Plan?\n' +
            '• Tell me about the Loan Protector Policy\n' +
            '• What is Keyman Assurance?\n\n' +
            '💼 Claims & Support:\n' +
            '• How do I file a claim?\n' +
            '• What documents do I need for claims?\n' +
            '• How can I check my policy status?\n' +
            '• What payment methods are available?\n\n' +
            '📍 Branch Information:\n' +
            '• Where are your branches located?\n' +
            '• What are your branch operating hours?\n' +
            '• What services are available at branches?\n' +
            '• How can I find the nearest branch?\n\n' +
            '🤝 Agent Assistance:\n' +
            '• Can you help me choose the right insurance product?\n' +
            '• I need to speak to a human agent\n' +
            '• What information do I need for claims?\n' +
            '• Help me with my policy status\n\n' +
            '❓ FAQs:\n' +
            '• What is the minimum age for insurance?\n' +
            '• How long does policy processing take?\n' +
            '• Can I have multiple policies?\n' +
            '• How do I access my funds?\n\n' +
            'Feel free to ask any of these questions or ask something else!',
    keywords: ['help', 'questions', 'suggestions', 'what can I ask', 'examples']
  }
];

// Chatbot Responses
export const chatbotResponses = {
  greeting: [
    'Hello! I\'m Wofa Ahoto, your SIC Life insurance assistant. How can I help you today?',
    'Welcome to SIC Life! I\'m Wofa Ahoto, here to assist you with your insurance needs.',
    'Hi there! I\'m Wofa Ahoto from SIC Life. What can I help you with?'
  ],
  farewell: [
    'Thank you for chatting with SIC Life. Have a great day!',
    'Thanks for your time. Remember, we\'re here 24/7 if you need us!',
    'Thank you for choosing SIC Life. Feel free to return if you have more questions!'
  ],
  agentHandoff: [
    'I\'ll connect you with a human agent right away. Please hold on.',
    'Let me transfer you to one of our customer service representatives who can better assist you.',
    'I\'ll get a human agent to help you with this. One moment please.'
  ],
  fallback: [
    'I\'m not sure I understood that. Could you rephrase your question?',
    'I\'m still learning. Could you try asking that in a different way?',
    'I didn\'t quite catch that. Could you please be more specific?'
  ]
}; 