export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'form' | 'product' | 'quote' | 'payment' | 'claim';
  metadata?: any;
}

export interface QuoteFormData {
  age: number;
  gender: 'male' | 'female';
  occupation: string;
  coverageAmount: number;
  productType: string;
  hasMedicalConditions: boolean;
}

export interface ClaimFormData {
  policyNumber: string;
  claimType: string;
  incidentDate: Date;
  description: string;
  documents: File[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'momo' | 'bank' | 'card';
  icon: string;
}

export interface PolicyStatus {
  policyNumber: string;
  status: 'active' | 'lapsed' | 'pending';
  nextPaymentDue: Date;
  premiumAmount: number;
}

export interface ClaimStatus {
  claimId: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  lastUpdated: Date;
  nextSteps?: string;
}

export interface ChatContext {
  currentTopic?: string;
  userData?: {
    name?: string;
    policyNumber?: string;
    lastInteraction?: Date;
  };
  conversationFlow?: {
    step: string;
    data: any;
  };
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
} 