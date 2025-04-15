import { SuggestionTopic } from './suggestionService';

interface ResponseData {
  answer: string;
  followUp?: string[];
  documents?: string[];
  contactInfo?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
}

export const responseMap: Record<string, ResponseData> = {
  // Claims Responses
  "claims_process": {
    answer: "To file a claim with SIC Life, please follow these steps:\n\n" +
            "1. Notify us immediately through our 24/7 claims hotline (030-275-0151)\n" +
            "2. Complete the relevant claim form (available at any branch or online)\n" +
            "3. Submit required documents at your nearest branch\n" +
            "4. Our claims team will process your request within 3 working days\n\n" +
            "For death claims, we offer same-day processing when all documents are complete.",
    followUp: [
      "What documents do I need for my claim?",
      "Where is the nearest branch?",
      "Can someone help me fill the forms?"
    ],
    contactInfo: {
      phone: "030-275-0151",
      whatsapp: "050-157-0652"
    }
  },

  // Payment Responses
  "payment_methods": {
    answer: "SIC Life offers multiple convenient payment options:\n\n" +
            "• Mobile Money (MTN, Vodafone, AirtelTigo)\n" +
            "• Bank transfer or direct debit\n" +
            "• Cash/card payment at any branch\n" +
            "• Salary deduction\n" +
            "• Standing order\n\n" +
            "For Mobile Money payments, use shortcode *711*100#",
    followUp: [
      "How do I set up salary deduction?",
      "What's the process for mobile money?",
      "Can I pay at any branch?"
    ]
  },

  // Education Plan Responses
  "education_plan": {
    answer: "The SIC Life Education Plan Plus is designed specifically for the Ghanaian education system. Features include:\n\n" +
            "• Flexible premium payments from GH¢60 monthly\n" +
            "• Coverage for basic to tertiary education\n" +
            "• Study abroad options\n" +
            "• Waiver of premium benefit\n" +
            "• Cash back option\n\n" +
            "The plan ensures your child's education continues even in unforeseen circumstances.",
    documents: [
      "Child's birth certificate",
      "Parent/Guardian ID",
      "Proof of income",
      "Recent passport photo"
    ]
  },

  // Investment Responses
  "investment_returns": {
    answer: "SIC Life's investment products offer competitive returns in the Ghanaian market:\n\n" +
            "• Guaranteed minimum interest rate\n" +
            "• Additional profit sharing\n" +
            "• Tax advantages\n" +
            "• Option to withdraw after 3 years\n\n" +
            "Current rates are available at your nearest branch or from our investment advisors.",
    followUp: [
      "What's the minimum investment amount?",
      "Can I speak to an investment advisor?",
      "How do I start investing?"
    ]
  },

  // Policy Management
  "policy_updates": {
    answer: "You can manage your SIC Life policy in several ways:\n\n" +
            "1. Visit any branch with your ID and policy number\n" +
            "2. Use our online portal (www.siclife.com.gh)\n" +
            "3. Contact our customer service\n" +
            "4. Request home service from an agent\n\n" +
            "For sensitive changes like beneficiary updates, please visit a branch in person.",
    contactInfo: {
      phone: "030-275-0151",
      email: "info@siclife.com.gh"
    }
  },

  // Branch Information
  "branch_locations": {
    answer: "SIC Life has branches across all regions in Ghana. Our main locations include:\n\n" +
            "• Accra (Head Office): No. 1 Jones Nelson Road\n" +
            "• Kumasi: Adum\n" +
            "• Takoradi: Market Circle\n" +
            "• Tamale: Central Business District\n\n" +
            "All branches are open Monday-Friday (8am-5pm) and Saturday (9am-2pm).",
    contactInfo: {
      phone: "030-275-0151",
      whatsapp: "050-157-0652"
    }
  },

  // Fallback Responses
  "fallback": {
    answer: "I apologize, I didn't quite understand your question. Could you please rephrase it? You can ask about:\n\n" +
            "• Our insurance products and services\n" +
            "• Claims processing\n" +
            "• Premium payments\n" +
            "• Policy information\n" +
            "• Branch locations\n\n" +
            "Or let me know if you'd like to speak with a customer service representative.",
    followUp: [
      "What insurance products do you offer?",
      "How do I file a claim?",
      "Where is your nearest branch?",
      "How can I pay my premium?"
    ],
    contactInfo: {
      phone: "030-275-0151",
      whatsapp: "050-157-0652"
    }
  },

  "general_help": {
    answer: "I'm here to help you with any questions about SIC Life's services. Here are some common topics I can assist with:\n\n" +
            "• Insurance Products: Life, Education, Investment plans\n" +
            "• Claims: Filing, tracking, and documentation\n" +
            "• Payments: Premium payment methods and schedules\n" +
            "• Policy Management: Updates, renewals, and information\n" +
            "• Branch Services: Locations and operating hours\n\n" +
            "What would you like to know more about?",
    followUp: [
      "Tell me about your insurance plans",
      "How do I make a claim?",
      "What are the payment options?",
      "Find a branch near me"
    ]
  },

  "unclear_intent": {
    answer: "I want to make sure I provide you with the most accurate information. Could you please specify:\n\n" +
            "• Are you looking for information about a specific product?\n" +
            "• Do you need help with an existing policy?\n" +
            "• Would you like to speak with a customer service representative?\n\n" +
            "This will help me better assist you.",
    followUp: [
      "Show me your products",
      "I need help with my policy",
      "Connect me to an agent",
      "Find nearest branch"
    ]
  }
};

export const getResponse = (key: string): ResponseData | undefined => {
  return responseMap[key];
};

export const formatResponseWithConfidence = (
  response: ResponseData,
  confidence: number,
  showFollowUp: boolean = true
): string => {
  let formattedResponse = response.answer;

  // Add confidence-based qualifier if confidence is low
  if (confidence < 0.7 && confidence > 0.4) {
    formattedResponse = "I think I understand your question. " + formattedResponse;
  }

  if (response.documents) {
    formattedResponse += "\n\nRequired Documents:\n" + 
      response.documents.map(doc => `• ${doc}`).join("\n");
  }

  if (response.contactInfo) {
    formattedResponse += "\n\nContact Information:";
    if (response.contactInfo.phone) formattedResponse += `\n📞 ${response.contactInfo.phone}`;
    if (response.contactInfo.whatsapp) formattedResponse += `\n💬 WhatsApp: ${response.contactInfo.whatsapp}`;
    if (response.contactInfo.email) formattedResponse += `\n✉️ ${response.contactInfo.email}`;
  }

  if (showFollowUp && response.followUp) {
    formattedResponse += "\n\nWould you like to know:\n" + 
      response.followUp.map(q => `• ${q}`).join("\n");
  }

  return formattedResponse;
};

// Get appropriate fallback response based on context
export const getFallbackResponse = (
  userInput: string,
  previousResponses: string[] = []
): ResponseData => {
  // If this is the first unclear input, use general fallback
  if (previousResponses.length === 0) {
    return responseMap.fallback;
  }

  // If we've already shown the fallback, try the general help
  if (previousResponses.includes(responseMap.fallback.answer)) {
    return responseMap.general_help;
  }

  // If we've shown both fallback and general help, use unclear intent
  return responseMap.unclear_intent;
}; 