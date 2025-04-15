import { sicLifeKnowledge } from './knowledgeBase';



export type SuggestionTopic = 
  | 'default' 
  | 'products' 
  | 'payment' 
  | 'claims' 
  | 'policy' 
  | 'agent' 
  | 'education' 
  | 'investment';

interface SuggestionContext {
  lastMessage?: string;
  category?: string;
  activeTopic?: SuggestionTopic;
  userIntent?: string;
}

// Professional response templates for consistent tone
const responseTemplates = {
  greeting: "Thank you for reaching out to SIC Life. I'm here to assist you with {topic}.",
  clarification: "To better assist you with {topic}, could you please provide more details about {detail}?",
  followUp: "Is there anything specific about {topic} you'd like to know more about?",
  handoff: "For this specific request about {topic}, I'd be happy to connect you with one of our experienced agents who can provide more detailed assistance.",
  documentation: "For {topic}, you'll need the following documents: {documents}. Would you like me to explain the process in detail?",
  location: "Our {service} services are available at all SIC Life branches across Ghana. The nearest branch to assist you is {branch}."
};

// Comprehensive suggestion map with professional, Ghana-specific content
export const suggestionMap: Record<SuggestionTopic, string[]> = {
  default: [
    "What insurance solutions does SIC Life offer?",
    "I need guidance on choosing the right insurance plan",
    "How can I speak with a customer service representative?",
    "What are the ways to pay my premium?",
    "I need assistance with a claim",
    "Where is the nearest SIC Life branch?"
  ],
  products: [
    "Could you explain the different types of life insurance policies?",
    "Tell me about SIC Life's education savings plans",
    "What investment-linked policies do you offer?",
    "Do you have group insurance for organizations?",
    "What funeral insurance options are available?",
    "How does your pension scheme work?"
  ],
  payment: [
    "What are the accepted premium payment methods?",
    "Can I pay using Mobile Money (MTN, Vodafone, AirtelTigo)?",
    "How do I set up automatic premium deductions?",
    "What's the grace period for missed payments?",
    "Can I pay my premium at any SIC Life branch?",
    "How do I update my payment information?"
  ],
  claims: [
    "What's the process for filing a claim?",
    "Which documents are required for a death claim?",
    "How long does the claims process take?",
    "Can I track my claim status online?",
    "What's the procedure for maturity claims?",
    "How do I submit additional claim documents?"
  ],
  policy: [
    "How do I access my policy information?",
    "Can I modify my policy coverage?",
    "How do I update my beneficiaries?",
    "What's my policy's current cash value?",
    "How do I reinstate a lapsed policy?",
    "Can I get a duplicate policy document?"
  ],
  agent: [
    "I'd like to schedule a meeting with an agent",
    "What are your branch working hours?",
    "Can I get assistance via WhatsApp?",
    "How do I reach your customer care team?",
    "Is there an agent near my location?",
    "Can someone visit me for policy discussion?"
  ],
  education: [
    "How does the Education Plan Plus work?",
    "What's the minimum premium for education plans?",
    "Can I add multiple children to one plan?",
    "What happens if I can't continue payments?",
    "Are university fees covered abroad?",
    "How flexible are the payment terms?"
  ],
  investment: [
    "What investment returns can I expect?",
    "How safe are my invested funds?",
    "Can I withdraw partial amounts?",
    "What's the minimum investment period?",
    "Do you offer unit-linked policies?",
    "How are investment profits taxed?"
  ]
};

// Enhanced topic identifiers with Ghana-specific terms
const topicIdentifiers = {
  products: [
    'insurance', 'plan', 'coverage', 'policy', 'protection',
    'funeral', 'education', 'group', 'pension', 'investment'
  ],
  payment: [
    'pay', 'premium', 'momo', 'mobile money', 'bank', 'deduction',
    'salary', 'grace period', 'due', 'automatic', 'payment'
  ],
  claims: [
    'claim', 'death', 'maturity', 'process', 'document',
    'file', 'submit', 'beneficiary', 'compensation'
  ],
  policy: [
    'policy', 'coverage', 'beneficiary', 'document', 'modify',
    'change', 'update', 'information', 'details'
  ],
  agent: [
    'agent', 'branch', 'office', 'visit', 'contact', 'whatsapp',
    'representative', 'customer service', 'location'
  ],
  education: [
    'education', 'school', 'university', 'student', 'child',
    'academic', 'study', 'college', 'abroad'
  ],
  investment: [
    'investment', 'returns', 'interest', 'fund', 'profit',
    'withdraw', 'unit', 'linked', 'growth'
  ]
};

// Get topic from message with improved context awareness
export const getTopicFromSuggestion = (text: string): SuggestionTopic => {
  const lowercaseText = text.toLowerCase();

  // Check each topic's keywords
  for (const [topic, keywords] of Object.entries(topicIdentifiers)) {
    if (keywords.some(keyword => lowercaseText.includes(keyword))) {
      return topic as SuggestionTopic;
    }
  }

  return 'default';
};

// Get suggestions with enhanced context awareness
export const getSuggestions = (context: SuggestionContext = {}): string[] => {
  const { lastMessage = '', category, activeTopic, userIntent } = context;

  // If there's an active topic, mix current topic with related suggestions
  if (activeTopic && suggestionMap[activeTopic]) {
    return getNextSuggestions(activeTopic);
  }

  // Determine topic from last message with intent consideration
  if (lastMessage) {
    const topic = getTopicFromSuggestion(lastMessage);
    return getNextSuggestions(topic);
  }

  return suggestionMap.default;
};

// Get related topics with improved relevance
export const getRelatedTopics = (currentTopic: SuggestionTopic): SuggestionTopic[] => {
  const topicRelations: Record<SuggestionTopic, SuggestionTopic[]> = {
    default: ['products', 'agent', 'claims'],
    products: ['investment', 'education', 'policy'],
    payment: ['policy', 'agent', 'claims'],
    claims: ['policy', 'agent', 'payment'],
    policy: ['payment', 'claims', 'products'],
    agent: ['claims', 'policy', 'products'],
    education: ['products', 'investment', 'payment'],
    investment: ['products', 'policy', 'education']
  };

  return topicRelations[currentTopic] || ['default'];
};

// Get next suggestions with improved context mixing
export const getNextSuggestions = (currentTopic: SuggestionTopic): string[] => {
  const relatedTopics = getRelatedTopics(currentTopic);
  const suggestions: string[] = [];

  // Add 3-4 suggestions from current topic
  const currentTopicSuggestions = [...suggestionMap[currentTopic]]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 3);
  suggestions.push(...currentTopicSuggestions);

  // Add 1-2 suggestions from related topics
  relatedTopics.forEach(topic => {
    const relatedSuggestions = [...suggestionMap[topic]]
      .sort(() => Math.random() - 0.5)
      .slice(0, 1);
    suggestions.push(...relatedSuggestions);
  });

  // Shuffle and limit to 5 suggestions for better UX
  return suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
};

// Format response with professional tone
export const formatResponse = (template: keyof typeof responseTemplates, params: Record<string, string>): string => {
  let response = responseTemplates[template];
  Object.entries(params).forEach(([key, value]) => {
    response = response.replace(`{${key}}`, value);
  });
  return response;
}; 