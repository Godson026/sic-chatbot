import React, { useState } from 'react';
import { QuoteFormData } from '../types';
import { calculateQuote } from '../services/api';
import { insuranceProducts } from '../services/knowledgeBase';

interface QuoteFormProps {
  onSubmit: (quote: number) => void;
  onCancel: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    age: 0,
    gender: 'male',
    occupation: '',
    coverageAmount: 0,
    productType: '',
    hasMedicalConditions: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quote = calculateQuote(formData);
    onSubmit(quote);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Insurance Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.productType}
          onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
          required
        >
          <option value="">Select a product</option>
          {insuranceProducts.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          min="18"
          max="100"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Occupation</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.occupation}
          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Coverage Amount (GHS)</label>
        <input
          type="number"
          min="10000"
          step="10000"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.coverageAmount || ''}
          onChange={(e) => setFormData({ ...formData, coverageAmount: parseInt(e.target.value) })}
          required
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
            checked={formData.hasMedicalConditions}
            onChange={(e) => setFormData({ ...formData, hasMedicalConditions: e.target.checked })}
          />
          <span className="ml-2 text-sm text-gray-700">Do you have any pre-existing medical conditions?</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white sic-bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Calculate Quote
        </button>
      </div>
    </form>
  );
};

export default QuoteForm; 