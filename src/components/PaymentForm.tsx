import React, { useState } from 'react';
import { PaymentMethod } from '../types';

interface PaymentFormProps {
  amount: number;
  onSubmit: (method: PaymentMethod) => void;
  onCancel: () => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'momo-mtn',
    name: 'MTN Mobile Money',
    type: 'momo',
    icon: '📱'
  },
  {
    id: 'momo-voda',
    name: 'Vodafone Cash',
    type: 'momo',
    icon: '📱'
  },
  {
    id: 'momo-airtel',
    name: 'AirtelTigo Money',
    type: 'momo',
    icon: '📱'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    type: 'bank',
    icon: '🏦'
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    type: 'card',
    icon: '💳'
  }
];

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSubmit, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod) {
      onSubmit(selectedMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Premium Payment</h3>
        <p className="text-sm text-gray-500">Amount: GHS {amount.toFixed(2)}</p>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod?.id === method.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod?.id === method.id}
              onChange={() => setSelectedMethod(method)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            />
            <div className="ml-3 flex items-center">
              <span className="text-xl mr-3">{method.icon}</span>
              <span className="font-medium text-gray-900">{method.name}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!selectedMethod}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white sic-bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Payment
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500 text-center">
          Secured by SIC Life Payment Gateway 🔒
        </p>
      </div>
    </form>
  );
};

export default PaymentForm; 