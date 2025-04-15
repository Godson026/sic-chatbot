import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Message from './components/Message';
import SuggestedResponses from './components/SuggestedResponses';
import Avatar from './components/Avatar';
import { Message as MessageType } from './types';
import { processMessage } from './services/api';
import SuggestedQuestions from './components/SuggestedQuestions';
import { getSuggestions, getTopicFromSuggestion, type SuggestionTopic } from './services/suggestionService';

// Chatbot name
const CHATBOT_NAME = "Wofa Ahoto";

// Suggested responses based on conversation state
const getSuggestedResponses = (messages: MessageType[]): string[] => {
  if (messages.length === 0) return [];
  
  const lastMessage = messages[messages.length - 1];
  
  // If the last message is from the agent, suggest responses based on its content
  if (lastMessage.sender === 'agent') {
    const content = lastMessage.content.toLowerCase();
    
    if (content.includes('how can i help')) {
      return [
        "I need an insurance quote",
        "How do I make a claim?",
        "Check my policy status",
        "Make a payment"
      ];
    }
    
    if (content.includes('quote')) {
      return [
        "Tell me about life insurance",
        "What's the minimum coverage?",
        "How much does it cost?",
        "What documents do I need?"
      ];
    }
    
    if (content.includes('claim')) {
      return [
        "Start a new claim",
        "Track my claim status",
        "Required documents",
        "Speak to an agent"
      ];
    }

    if (content.includes('payment')) {
      return [
        "Pay with Mobile Money",
        "Pay with card",
        "Bank transfer details",
        "Payment due date"
      ];
    }
  }
  
  // Default suggestions
  return [
    "Get an insurance quote",
    "File a claim",
    "Make a payment",
    "Contact support"
  ];
};

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botState, setBotState] = useState<'idle' | 'typing'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState<SuggestionTopic>('default');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Add welcome message when component mounts
  useEffect(() => {
    const welcomeMessage: MessageType = {
      id: Date.now().toString(),
      content: `Hello! I'm ${CHATBOT_NAME}, your SIC Life insurance assistant. How can I help you today?\n\nI can help you with:\n• Insurance quotes\n• Claims processing\n• Policy information\n• Premium payments\n• General inquiries`,
      sender: 'agent',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  }, []);

  // Update suggested responses when messages change
  useEffect(() => {
    setSuggestedResponses(getSuggestedResponses(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize suggestions
  useEffect(() => {
    setSuggestions(getSuggestions({ activeTopic: 'default' }));
  }, []);

  const handleSendMessage = async (messageText: string = inputMessage) => {
    if (!messageText.trim()) return;

    // Hide suggestions while processing
    setShowSuggestions(false);

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setBotState('typing');

    try {
      const agentMessage = await processMessage(messageText);
      setMessages(prev => [...prev, agentMessage]);

      // Update suggestions based on the bot's response
      const newTopic = getTopicFromSuggestion(agentMessage.content);
      
      // Add a delay for natural feel
      setTimeout(() => {
        setActiveTopic(newTopic);
        setSuggestions(getSuggestions({ 
          lastMessage: agentMessage.content,
          activeTopic: newTopic
        }));
        setShowSuggestions(true);
      }, 500);

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: MessageType = {
        id: Date.now().toString(),
        content: 'Sorry, there was an error processing your message. Please try again.',
        sender: 'agent',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
      setShowSuggestions(true);
    } finally {
      setBotState('idle');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Hide current suggestions immediately
    setShowSuggestions(false);
    
    // Send the message
    handleSendMessage(suggestion);
    
    // Update the topic based on the suggestion
    const newTopic = getTopicFromSuggestion(suggestion);
    
    // Update suggestions with a delay for natural feel
    setTimeout(() => {
      setActiveTopic(newTopic);
      setSuggestions(getSuggestions({ activeTopic: newTopic }));
      setShowSuggestions(true);
    }, 300);
  };

  const renderBotState = () => {
    if (botState === 'idle') return null;
    
    return (
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8">
          <Avatar />
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Agent is typing</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 sic-bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 sic-bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 sic-bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <header className="sic-bg-primary shadow-sm rounded-lg p-4 mb-4 flex items-center">
          <div className="w-10 h-10 mr-3">
            <Avatar />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{CHATBOT_NAME}</h1>
            <p className="text-sm text-white opacity-80">Your SIC Life Assistant</p>
          </div>
        </header>
        
        <main className="bg-white rounded-lg shadow-sm p-4">
          <div className="h-[600px] overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
            {messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
            {renderBotState()}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex flex-col gap-4">
            {showSuggestions && (
              <SuggestedQuestions
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
                isLoading={botState === 'typing'}
              />
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={botState === 'typing'}
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={botState === 'typing' || !inputMessage.trim()}
                className="p-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </main>
        
        <footer className="mt-4 text-center text-sm text-gray-500">
          <p>{CHATBOT_NAME} - Your trusted SIC Life insurance assistant</p>
        </footer>
      </div>
    </div>
  );
}

export default App; 