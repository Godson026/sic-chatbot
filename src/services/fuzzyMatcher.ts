import Fuse from 'fuse.js';
import { responseMap } from './responseService';

// Interface for search items
interface SearchItem {
  key: string;
  aliases: string[];
  category: string;
  searchText: string; // Added field for combined searchable text
}

// Convert responseMap keys to SearchItems with aliases and combined search text
const searchItems: SearchItem[] = Object.keys(responseMap).map(key => {
  const aliases = getAliases(key);
  const category = getCategoryFromKey(key);
  // Combine all searchable text for better matching
  const searchText = [
    key.replace(/_/g, ' '),
    ...aliases,
    category,
    responseMap[key].answer.substring(0, 150) // Include start of answer text
  ].join(' ').toLowerCase();

  return {
    key,
    aliases,
    category,
    searchText
  };
});

// Enhanced Fuse.js options for better matching
const fuseOptions = {
  includeScore: true,
  threshold: 0.5, // More lenient threshold
  minMatchCharLength: 2, // Reduced for better partial matches
  distance: 200, // Increased distance for better fuzzy matching
  keys: [
    { name: 'searchText', weight: 0.7 }, // Primary search field
    { name: 'aliases', weight: 0.2 },
    { name: 'category', weight: 0.1 }
  ],
  shouldSort: true,
  findAllMatches: true,
  location: 0,
  ignoreLocation: true, // Ignore location for better matching
};

// Initialize Fuse instance
const fuse = new Fuse(searchItems, fuseOptions);

// Enhanced input normalization
function normalizeInput(input: string): string {
  const normalized = input
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // Remove special characters
    .replace(/\s+/g, ' ')     // Normalize spaces
    .trim();
  
  console.log('Normalized input:', normalized);
  return normalized;
}

// Enhanced getAliases function with more variations
function getAliases(key: string): string[] {
  const commonAliases: Record<string, string[]> = {
    'claims_process': [
      'make claim', 'file claim', 'claim process', 'claim procedure',
      'death claim', 'accident claim', 'maturity claim',
      'how to claim', 'claim money', 'insurance claim',
      'submit claim', 'start claim', 'begin claim', 'initiate claim'
    ],
    'payment_methods': [
      'pay premium', 'payment options', 'how to pay', 'momo payment',
      'mobile money', 'bank payment', 'pay insurance',
      'premium payment', 'salary deduction', 'standing order',
      'make payment', 'payment process', 'pay bill', 'payment method'
    ],
    'education_plan': [
      'school fees', 'education policy', 'child education', 'study plan',
      'university cover', 'education insurance', 'school insurance',
      'child plan', 'education savings', 'academic plan'
    ],
    'investment_returns': [
      'investment plans', 'returns', 'interest rate', 'investment benefits',
      'profit', 'investment options', 'savings plan',
      'investment policy', 'growth', 'investment returns'
    ],
    'policy_updates': [
      'update policy', 'change policy', 'modify policy', 'policy changes',
      'policy information', 'policy details', 'check policy',
      'policy status', 'policy document', 'insurance details'
    ],
    'branch_locations': [
      'office location', 'branch office', 'find branch', 'nearest office',
      'branch address', 'where located', 'directions',
      'head office', 'regional office', 'branch contacts'
    ]
  };

  const baseAliases = commonAliases[key] || [];
  const keyWords = key.split('_');
  
  // Add variations of the key itself
  const keyVariations = [
    key.replace(/_/g, ' '),
    key.replace(/_/g, ''),
    ...keyWords,
    keyWords.join(' ')
  ];

  return Array.from(new Set([...baseAliases, ...keyVariations]));
}

// Enhanced findBestResponseKey with detailed logging
export function findBestResponseKey(userInput: string): string | null {
  const normalizedInput = normalizeInput(userInput);
  
  console.log('\n=== Fuzzy Search Debug ===');
  console.log('Original input:', userInput);
  console.log('Normalized input:', normalizedInput);
  
  const results = fuse.search(normalizedInput);
  
  console.log('\nSearch results:');
  results.slice(0, 3).forEach((result, index) => {
    console.log(`\nMatch ${index + 1}:`);
    console.log('Key:', result.item.key);
    console.log('Score:', result.score);
    console.log('Category:', result.item.category);
    console.log('Matched aliases:', result.item.aliases.slice(0, 3));
  });
  
  if (results.length === 0) {
    console.log('\nNo matches found!');
    return null;
  }

  // Only return match if confidence is high enough
  if (results[0].score && results[0].score <= 0.5) {
    console.log('\nBest match selected:', results[0].item.key);
    return results[0].item.key;
  }

  console.log('\nNo match with sufficient confidence found');
  return null;
}

// Enhanced getMatchConfidence with logging
export function getMatchConfidence(matchedKey: string, userInput: string): number {
  const results = fuse.search(normalizeInput(userInput));
  const confidence = results.length > 0 && results[0].item.key === matchedKey ? 
    1 - (results[0].score || 0) : 0;
  
  console.log('\n=== Confidence Score ===');
  console.log('Matched key:', matchedKey);
  console.log('Confidence:', confidence);
  
  return confidence;
}

// Get related topics based on category and previous matches
export function getRelatedTopics(matchedKey: string): string[] {
  const category = getCategoryFromKey(matchedKey);
  const relatedItems = searchItems
    .filter(item => item.category === category && item.key !== matchedKey)
    .slice(0, 2)
    .map(item => item.key);
    
  console.log('\n=== Related Topics ===');
  console.log('Category:', category);
  console.log('Related items:', relatedItems);
  
  return relatedItems;
}

// Get category from key
function getCategoryFromKey(key: string): string {
  if (key.includes('claim')) return 'claims';
  if (key.includes('payment')) return 'payments';
  if (key.includes('education')) return 'education';
  if (key.includes('investment')) return 'investments';
  if (key.includes('policy')) return 'policy';
  if (key.includes('branch')) return 'branches';
  return 'general';
} 