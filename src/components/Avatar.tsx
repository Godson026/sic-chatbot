import React from 'react';

const Avatar: React.FC = () => {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.1))' }}
        >
          {/* Head */}
          <circle cx="50" cy="35" r="25" fill="#8D6E63" />
          
          {/* Face */}
          <circle cx="40" cy="30" r="3" fill="#FFF" /> {/* Left eye */}
          <circle cx="60" cy="30" r="3" fill="#FFF" /> {/* Right eye */}
          <path d="M45 40 Q50 45 55 40" stroke="#FFF" strokeWidth="2" fill="none" /> {/* Smile */}
          
          {/* Glasses */}
          <path d="M35 30 H65" stroke="#FFD700" strokeWidth="2" fill="none" />
          <rect x="35" y="25" width="10" height="8" rx="2" stroke="#FFD700" strokeWidth="2" fill="none" />
          <rect x="55" y="25" width="10" height="8" rx="2" stroke="#FFD700" strokeWidth="2" fill="none" />
          
          {/* Suit */}
          <path d="M25 60 L50 35 L75 60" fill="#4CAF50" /> {/* Green jacket */}
          <rect x="45" y="35" width="10" height="15" fill="#FFD700" /> {/* Yellow tie */}
        </svg>
      </div>
    </div>
  );
};

export default Avatar; 