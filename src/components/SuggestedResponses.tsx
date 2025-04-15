import React from 'react';

interface SuggestedResponsesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestedResponses: React.FC<SuggestedResponsesProps> = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;
  
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="sic-bg-orange hover:bg-orange-500 text-white text-sm px-3 py-1 rounded-full transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestedResponses; 