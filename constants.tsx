
import { Policy } from './types';
import papa from './assets/papa.jpeg';
import rm from './assets/rm.png';
import ju from './assets/jeevanumang.jpeg';
import ja from './assets/jeevanumar.png';
import jl from './assets/jeevanl.png';
import jlb from './assets/jeevanlabh.png';
export const POLICIES: Policy[] = [
  {
    id: 'jeevan-umang',
    policyNumber: '945',
    name: 'Jeevan Umang',
    category: 'Endowment',
    tagline: 'Whole life protection with 8% survival benefit.',
    description: 'A non-linked, participating, individual, whole life assurance plan which offers a combination of income and protection to your family. It provides for annual survival benefits from the end of the premium paying term till maturity and a lump sum payment at the time of maturity or on death of the policyholder during the policy term.',
    minSumAssured: 200000,
    entryAgeRange: '90 days to 55 years',
    keyBenefits: [
      'Guaranteed 8% of Basic Sum Assured annually after premium paying term.',
      'Lumpsum amount at the end of the term or on death.',
      'Loan facility available after 2 years.',
      'Tax benefits under Section 80C and 10(10D).'
    ],
    imageUrl: `${ju}`,
    documentsRequired: [
      'Aadhar Card / Voter ID (Identity Proof)',
      'Utility Bills / Bank Statement (Address Proof)',
      'Birth Certificate / 10th Marksheet (Age Proof)',
      '3 Passport size photographs',
      'Income Proof (Form 16 / ITR) for high sum assured'
    ],
    premiumMode: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly (NACH)'],
    termOptions: 'Premium Paying Term: 15, 20, 25 or 30 years'
  },
  {
    id: 'jeevan-labh',
    policyNumber: '936',
    name: 'Jeevan Labh',
    category: 'Endowment',
    tagline: 'Limited premium paying, non-linked endowment plan.',
    description: 'A limited premium paying, non-linked, participating endowment plan which offers a combination of protection and savings. This plan provides financial support for the family in case of unfortunate death of the policyholder any time before maturity and a lump sum amount at the time of maturity for the surviving policyholder.',
    minSumAssured: 200000,
    entryAgeRange: '8 years to 59 years',
    keyBenefits: [
      'Limited premium payment (pay for 10/13/16 years).',
      'High maturity returns with accrued bonuses.',
      'Financial support for the family in case of death.',
      'Liquidity through loan facility.'
    ],
    imageUrl: `${jlb}`,
    documentsRequired: [
      'Aadhar Card / PAN Card',
      'Residential Address Proof',
      'Age Proof (School Leaving Certificate)',
      '2 Recent Photographs',
      'Bank Account Details (Cancelled Cheque)'
    ],
    premiumMode: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
    termOptions: 'Policy Terms: 16, 21, and 25 years'
  },
  {
    id: 'jeevan-amar',
    policyNumber: '855',
    name: 'Jeevan Amar',
    category: 'Term',
    tagline: 'Pure protection at low cost.',
    description: 'A Non-Linked, Non-participating, Individual, Life Insurance Term Plan which provides financial protection to the insured\'s family in case of unfortunate death. It offers flexibility to choose from two benefit options: Level Sum Assured and Increasing Sum Assured.',
    minSumAssured: 2500000,
    entryAgeRange: '18 years to 65 years',
    keyBenefits: [
      'Pure risk cover with very low premiums.',
      'Special discounted rates for non-smokers.',
      'Special rates for women policyholders.',
      'Option to choose Death Benefit in installments.'
    ],
    imageUrl: `${ja}`,
    documentsRequired: [
      'PAN Card (Mandatory)',
      'Aadhar Card',
      'Medical Reports (if applicable)',
      'Last 3 months Salary Slips / ITR',
      'Income Proof (Mandatory for high cover)'
    ],
    premiumMode: ['Single', 'Yearly', 'Half-yearly'],
    termOptions: 'Policy Term: 10 to 40 years'
  },
  {
    id: 'jeevan-lakshya',
    policyNumber: '933',
    name: 'Jeevan Lakshya',
    category: 'Children',
    tagline: 'Secure your child\'s educational dreams.',
    description: 'A participating non-linked plan which offers a combination of Protection and Savings, specifically aimed at children\'s future needs. In case of the parent\'s death, it pays an annual income and a final lump sum for the child\'s education.',
    minSumAssured: 100000,
    entryAgeRange: '18 years to 50 years',
    keyBenefits: [
      'Annual income benefit of 10% of Sum Assured to child.',
      'Future premiums waived in case of proposer\'s death.',
      'Large lump sum at maturity for higher education.',
      'Ideal gift for your child\'s future.'
    ],
    imageUrl: `${jl}`,
    documentsRequired: [
      'Aadhar/ID proof of Proposer (Parent)',
      'Birth Certificate of Child',
      'Address Proof',
      'Income Proof of Proposer',
      'Photographs of Proposer and Nominee'
    ],
    premiumMode: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
    termOptions: 'Policy Term: 13 to 25 years'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Sanjeev Kumar',
    role: 'Agent & Advisor',
    experience: '27+ Years',
    image: `${papa}`,
    bio: 'Dedicated to helping over 5,000 families secure their financial future through personalized insurance planning.',
    awards: ['1500+ satisfied policyholders']
  },
  {
    name: 'Rochish Mathur',
    role: 'LIC Development Officer',
    experience: '*',
    image: `${rm}`,
    bio: 'Expert in retirement planning and child education fund management.',
    awards: ['All India No.1 DO']
  },
  
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800', title: 'Award Ceremony 2023' },
  { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', title: 'Office Strategy Meeting' },
  { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', title: 'Financial Literacy Workshop' },
  { url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800', title: 'Team Building Event' },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', title: 'Client Appreciation Day' },
  { url: 'https://images.unsplash.com/photo-1606857521015-7f9f14243970?auto=format&fit=crop&q=80&w=800', title: 'LIC Regional Conference' }
];

export const APP_THEME = {
  primary: '#002147', // Deep Navy
  secondary: '#D4AF37', // Metallic Gold
  accent: '#E63946', // Urgency Red
};
