import React, { useState } from 'react';
import { Message as MessageType } from '../types';
import { UserIcon } from '@heroicons/react/24/solid';
import Avatar from './Avatar';
import QuoteForm from './QuoteForm';
import ClaimForm from './ClaimForm';
import PaymentForm from './PaymentForm';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const [showForm, setShowForm] = useState(true);
  const [quoteResult, setQuoteResult] = useState<number | null>(null);
  const [claimId, setClaimId] = useState<string | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleQuoteSubmit = (quote: number) => {
    setQuoteResult(quote);
    setShowForm(false);
  };

  const handleClaimSubmit = (id: string) => {
    setClaimId(id);
    setShowForm(false);
  };

  const handlePaymentSubmit = () => {
    setPaymentComplete(true);
    setShowForm(false);
  };

  const renderForm = () => {
    if (!showForm) return null;

    switch (message.type) {
      case 'form':
        if (message.metadata?.formType === 'quote') {
          return (
            <QuoteForm
              onSubmit={handleQuoteSubmit}
              onCancel={() => setShowForm(false)}
            />
          );
        }
        if (message.metadata?.formType === 'claim') {
          return (
            <ClaimForm
              onSubmit={handleClaimSubmit}
              onCancel={() => setShowForm(false)}
            />
          );
        }
        break;
      case 'payment':
        return (
          <PaymentForm
            amount={message.metadata?.amount || 0}
            onSubmit={handlePaymentSubmit}
            onCancel={() => setShowForm(false)}
          />
        );
        break;
    }
    return null;
  };

  const renderResult = () => {
    if (showForm) return null;

    if (quoteResult !== null) {
      return (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800">Your Insurance Quote</h4>
          <p className="text-green-600">Estimated Premium: GHS {quoteResult.toFixed(2)} per month</p>
          <p className="text-sm text-green-500 mt-2">
            This is an estimate. Final premium may vary based on additional factors.
          </p>
        </div>
      );
    }

    if (claimId) {
      return (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800">Claim Submitted Successfully</h4>
          <p className="text-green-600">Claim Reference: {claimId}</p>
          <p className="text-sm text-green-500 mt-2">
            You can track your claim status using this reference number.
          </p>
        </div>
      );
    }

    if (paymentComplete) {
      return (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800">Payment Successful</h4>
          <p className="text-green-600">Your payment has been processed.</p>
          <p className="text-sm text-green-500 mt-2">
            A confirmation email will be sent to your registered email address.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-10 h-10">
          <Avatar />
        </div>
      )}
      <div 
        className={`max-w-[70%] ${isUser ? 'sic-bg-primary text-white' : 'bg-white text-gray-800 border border-gray-200'} rounded-lg p-3 shadow-sm`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {renderForm()}
        {renderResult()}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full sic-bg-orange flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default Message; 