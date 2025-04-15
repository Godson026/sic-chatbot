import React, { useState } from 'react';
import { ClaimFormData } from '../types';
import { submitClaim } from '../services/api';

interface ClaimFormProps {
  onSubmit: (claimId: string) => void;
  onCancel: () => void;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ClaimFormData>({
    policyNumber: '',
    claimType: '',
    incidentDate: new Date(),
    description: '',
    documents: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const claimId = await submitClaim(formData);
      onSubmit(claimId);
    } catch (error) {
      console.error('Error submitting claim:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, documents: Array.from(e.target.files) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Policy Number</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.policyNumber}
          onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Claim Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.claimType}
          onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
          required
        >
          <option value="">Select claim type</option>
          <option value="death">Death Claim</option>
          <option value="medical">Medical Claim</option>
          <option value="disability">Disability Claim</option>
          <option value="maturity">Maturity Claim</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Incident Date</label>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.incidentDate.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, incidentDate: new Date(e.target.value) })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Supporting Documents</label>
        <div className="mt-1">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:sic-bg-primary file:text-white hover:file:bg-green-700"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Please attach all relevant documents (e.g., medical reports, death certificate, police report)
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white sic-bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Claim'}
        </button>
      </div>
    </form>
  );
};

export default ClaimForm; 