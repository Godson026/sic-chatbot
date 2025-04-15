import React from 'react';
import styled from 'styled-components';

interface SuggestedQuestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isLoading?: boolean;
}

interface SuggestionContainerProps {
  isLoading: boolean;
}

const SuggestionContainer = styled.div<SuggestionContainerProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  margin-top: 8px;
  opacity: ${({ isLoading }) => isLoading ? 0 : 1};
  transition: opacity 0.3s ease;
`;

const SuggestionChip = styled.button`
  background: #f0f4f8;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  white-space: nowrap;

  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  suggestions,
  onSuggestionClick,
  isLoading = false
}) => {
  return (
    <SuggestionContainer isLoading={isLoading}>
      {suggestions.map((suggestion, index) => (
        <SuggestionChip
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </SuggestionChip>
      ))}
    </SuggestionContainer>
  );
};

export default SuggestedQuestions; 