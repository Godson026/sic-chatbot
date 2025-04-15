import { Message, QuoteFormData, ClaimFormData, PolicyStatus, ClaimStatus, ChatContext } from '../types';
import { sicLifeKnowledge, insuranceProducts, branches, chatbotResponses } from './knowledgeBase';
import { responseMap, formatResponseWithConfidence, getFallbackResponse } from './responseService';
import { findBestResponseKey, getMatchConfidence } from './fuzzyMatcher';

// Mock API endpoints (replace with real endpoints in production)
const API_URL = 'https://api.siclife.com';

// Chat context to maintain conversation state
let chatContext: ChatContext = {
  currentTopic: undefined,
  userData: {},
  conversationFlow: undefined
};

interface ChatState {
  previousResponses: string[];
  lastMatchedKey: string | null;
}

let chatState: ChatState = {
  previousResponses: [],
  lastMatchedKey: null
};

// Helper function to find relevant knowledge base items
const findRelevantKnowledge = (query: string): any[] => {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(' ').filter(word => word.length > 2);
  
  return sicLifeKnowledge.filter(item => {
    const matchScore = item.keywords.reduce((score, keyword) => {
      if (words.some(word => keyword.includes(word))) score += 1;
      return score;
    }, 0);
    return matchScore > 0;
  }).sort((a, b) => {
    const aScore = a.keywords.filter(k => words.some(w => k.includes(w))).length;
    const bScore = b.keywords.filter(k => words.some(w => k.includes(w))).length;
    return bScore - aScore;
  });
};

// Utility functions for delays
const getTypingDelay = (text: string): number => {
  const baseDelay = 1000; // Minimum 1 second
  const charsPerMinute = 300;
  const delayPerChar = (60 * 1000) / charsPerMinute;
  const delay = Math.min(text.length * delayPerChar, 3000); // Max 3 seconds
  return Math.max(baseDelay, delay);
};

const getThinkingDelay = (): number => {
  return 1000 + Math.random() * 1000;
};

// Process user message and generate response
export const processMessage = async (message: string): Promise<Message> => {
  // Add thinking delay
  await new Promise(resolve => setTimeout(resolve, getThinkingDelay()));

  // Find best matching response using fuzzy matching
  const matchedKey = findBestResponseKey(message);
  const confidence = matchedKey ? getMatchConfidence(matchedKey, message) : 0;

  let responseData;
  if (matchedKey && confidence > 0.4) {
    responseData = responseMap[matchedKey];
    chatState.lastMatchedKey = matchedKey;
  } else {
    responseData = getFallbackResponse(message, chatState.previousResponses);
  }

  // Format response with confidence level
  const formattedContent = formatResponseWithConfidence(
    responseData,
    confidence,
    true // Always show follow-up questions for better user guidance
  );

  // Update chat state
  chatState.previousResponses.push(formattedContent);
  
  // Keep only last 5 responses in history
  if (chatState.previousResponses.length > 5) {
    chatState.previousResponses.shift();
  }

  // Add typing delay based on response length
  await new Promise(resolve => setTimeout(resolve, getTypingDelay(formattedContent)));

  // Return a properly formatted Message object
  return {
    id: Date.now().toString(),
    content: formattedContent,
    sender: 'agent',
    timestamp: new Date(),
    type: 'text',
    metadata: {
      confidence,
      category: matchedKey ? matchedKey.split('_')[0] : 'general',
      hasFollowUp: Boolean(responseData.followUp)
    }
  };
};

// Mock function for quote calculation
export const calculateQuote = (data: QuoteFormData): number => {
  const baseRate = 10;
  const ageFactor = Math.floor(data.age / 10);
  const coverageFactor = data.coverageAmount / 10000;
  const healthFactor = data.hasMedicalConditions ? 1.5 : 1;
  
  return baseRate * ageFactor * coverageFactor * healthFactor;
};

// Mock function for claim submission
export const submitClaim = async (data: ClaimFormData): Promise<string> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `CLAIM-${Date.now()}`;
};

// Mock function for policy status check
export const checkPolicyStatus = async (policyNumber: string): Promise<PolicyStatus> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    policyNumber,
    status: 'active',
    nextPaymentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    premiumAmount: 250
  };
};

// Mock function for claim status check
export const checkClaimStatus = async (claimId: string): Promise<ClaimStatus> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    claimId,
    status: 'processing',
    lastUpdated: new Date(),
    nextSteps: 'Your claim is being reviewed by our claims department.'
  };
};

// Reset chat state (useful for testing or starting new conversations)
export const resetChatState = () => {
  chatState = {
    previousResponses: [],
    lastMatchedKey: null
  };
}; 