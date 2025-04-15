import { Message } from '../types';
import { sicLifeKnowledge, KnowledgeItem } from './knowledgeBase';

// Chatbot name
const CHATBOT_NAME = "Wofa Ahoto";

// Define conversation context
interface ConversationContext {
  lastTopic?: string;
  userName?: string;
  mood?: 'positive' | 'neutral' | 'negative';
  previousQuestions: string[];
  lastCategory?: string;
  lastSubcategory?: string;
}

// Initialize context
let context: ConversationContext = {
  previousQuestions: []
};

// Response templates with context awareness
const RESPONSES = {
  greeting: [
    `Hello! I'm ${CHATBOT_NAME}, your SIC Life insurance assistant. How can I help you today?`,
    `Hi there! I'm ${CHATBOT_NAME}, your SIC Life insurance guide. What can I do for you?`,
    `Greetings! I'm ${CHATBOT_NAME}, your SIC Life insurance expert. How may I assist you?`
  ],
  farewell: [
    "Goodbye! Have a great day! Remember, SIC Life is here to protect your future.",
    "See you later! Take care! Don't hesitate to reach out if you have more questions about SIC Life.",
    "Bye! Feel free to come back if you need more help with SIC Life insurance!"
  ],
  thanks: [
    "You're welcome! Is there anything else you'd like to know about SIC Life?",
    "Glad I could help! Do you have any other questions about our insurance products?",
    "My pleasure! Is there anything else you need assistance with regarding SIC Life?"
  ],
  name: [
    "Nice to meet you! I'll remember your name. How can I help you with SIC Life insurance today?",
    "That's a great name! I'm happy to know you. What brings you to SIC Life today?",
    "Thanks for introducing yourself! How can I assist you with SIC Life insurance?"
  ],
  mood_positive: [
    "I'm glad you're feeling good! Let's discuss how SIC Life can help protect your positive future.",
    "That's wonderful to hear! Your positive outlook aligns well with SIC Life's mission to provide certainty.",
    "Your positive energy is contagious! Let's explore how SIC Life can enhance your financial security."
  ],
  mood_negative: [
    "I'm sorry to hear that. SIC Life is here to help provide security during challenging times. What specific concerns do you have?",
    "That sounds challenging. SIC Life offers various insurance solutions that might help. Would you like to discuss them?",
    "I'm here to listen if you need someone to talk to. SIC Life's mission is to provide certainty when life takes unexpected turns."
  ],
  default: [
    "I'm not sure I understand. Could you rephrase your question about SIC Life insurance?",
    "I'm still learning about SIC Life's offerings. Could you try asking in a different way?",
    "I'm not sure about that specific aspect of SIC Life. Can you provide more details?"
  ]
};

// Extract name from message
const extractName = (message: string): string | null => {
  const nameMatch = message.match(/my name is ([a-zA-Z]+)/i);
  return nameMatch ? nameMatch[1] : null;
};

// Detect mood from message
const detectMood = (message: string): 'positive' | 'neutral' | 'negative' => {
  const positiveWords = ['happy', 'good', 'great', 'awesome', 'excellent', 'wonderful', 'amazing'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'horrible', 'angry', 'frustrated'];
  
  const lowerMessage = message.toLowerCase();
  
  for (const word of positiveWords) {
    if (lowerMessage.includes(word)) return 'positive';
  }
  
  for (const word of negativeWords) {
    if (lowerMessage.includes(word)) return 'negative';
  }
  
  return 'neutral';
};

// Find relevant knowledge based on user message
const findRelevantKnowledge = (message: string): KnowledgeItem | null => {
  const lowerMessage = message.toLowerCase();
  
  // Extract keywords from the message
  const keywords = lowerMessage
    .replace(/[.,?!]/g, '') // Remove punctuation
    .split(' ')
    .filter(word => 
      word.length > 2 && // Filter out short words
      !['what', 'how', 'when', 'where', 'why', 'who', 'the', 'and', 'for', 'that', 'this'].includes(word)
    );
  
  // Score function for relevance
  const getRelevanceScore = (item: KnowledgeItem): number => {
    const itemText = `${item.category} ${item.subcategory || ''} ${item.question} ${item.answer}`.toLowerCase();
    return keywords.reduce((score, keyword) => {
      if (itemText.includes(keyword)) {
        score += 1;
        // Bonus points for category/subcategory matches
        if (item.category.toLowerCase().includes(keyword)) score += 2;
        if (item.subcategory?.toLowerCase().includes(keyword)) score += 1.5;
      }
      return score;
    }, 0);
  };

  // First, check if we can find matches in the last category for context continuity
  if (context.lastCategory) {
    const categoryItems = sicLifeKnowledge.filter(item => item.category === context.lastCategory);
    const bestCategoryMatch = categoryItems
      .map(item => ({ item, score: getRelevanceScore(item) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)[0];
    
    if (bestCategoryMatch && bestCategoryMatch.score >= 2) {
      return bestCategoryMatch.item;
    }
  }

  // If no good match in last category, search all items
  const allMatches = sicLifeKnowledge
    .map(item => ({ item, score: getRelevanceScore(item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (allMatches.length > 0 && allMatches[0].score >= 1) {
    const bestMatch = allMatches[0].item;
    context.lastCategory = bestMatch.category;
    context.lastSubcategory = bestMatch.subcategory;
    return bestMatch;
  }

  // Special handling for service-related queries
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    const servicesItem = sicLifeKnowledge.find(item => 
      item.category === 'Services' && 
      item.question === 'What services does SIC Life offer?'
    );
    if (servicesItem) {
      context.lastCategory = 'Services';
      return servicesItem;
    }
  }

  return null;
};

// Get response type based on message content and context
const getResponseType = (message: string): keyof typeof RESPONSES => {
  const lowerMessage = message.toLowerCase();
  
  // Check for name introduction
  if (lowerMessage.match(/my name is/i)) {
    return 'name';
  }
  
  // Check for greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return 'greeting';
  }
  
  // Check for farewells
  if (lowerMessage.match(/^(bye|goodbye|see you|farewell)/)) {
    return 'farewell';
  }
  
  // Check for thanks
  if (lowerMessage.match(/^(thanks|thank you|appreciate it)/)) {
    return 'thanks';
  }
  
  // Check for questions about services
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    const servicesKnowledge = findRelevantKnowledge(message);
    if (servicesKnowledge) {
      return 'default';
    }
  }
  
  // Check mood
  const mood = detectMood(message);
  if (mood === 'positive') return 'mood_positive';
  if (mood === 'negative') return 'mood_negative';
  
  return 'default';
};

// Get a random response from the appropriate category
const getRandomResponse = (type: keyof typeof RESPONSES): string => {
  const responses = RESPONSES[type];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Update context based on message
const updateContext = (message: string) => {
  // Extract name if present
  const name = extractName(message);
  if (name) {
    context.userName = name;
  }
  
  // Update mood
  context.mood = detectMood(message);
  
  // Add to previous questions
  context.previousQuestions.push(message);
  
  // Keep only last 5 questions
  if (context.previousQuestions.length > 5) {
    context.previousQuestions.shift();
  }
};

// Generate personalized response
const generatePersonalizedResponse = (response: string): string => {
  if (context.userName) {
    return response.replace(/you/i, context.userName);
  }
  return response;
};

export const processMessage = async (message: string): Promise<Message> => {
  // Update context
  updateContext(message);
  
  // Find relevant knowledge
  const relevantKnowledge = findRelevantKnowledge(message);
  
  // If we found relevant knowledge, use it
  if (relevantKnowledge) {
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now().toString(),
      content: relevantKnowledge.answer,
      sender: 'agent',
      timestamp: new Date(),
    };
  }
  
  // Otherwise, use template responses
  const responseType = getResponseType(message);
  let responseText = getRandomResponse(responseType);
  responseText = generatePersonalizedResponse(responseText);
  
  // Simulate thinking time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Date.now().toString(),
    content: responseText,
    sender: 'agent',
    timestamp: new Date(),
  };
}; 