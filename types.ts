
export interface Policy {
  id: string;
  name: string;
  category: 'Endowment' | 'Term' | 'MoneyBack' | 'Pension' | 'Children';
  tagline: string;
  description: string;
  minSumAssured: number;
  entryAgeRange: string;
  keyBenefits: string[];
  imageUrl: string;
  policyNumber: string;
  documentsRequired: string[];
  premiumMode?: string[];
  termOptions?: string;
}

export interface CalculationResult {
  age: number;
  sumAssured: number;
  term: number;
  estimatedPremium: number;
  maturityValue: number;
}
