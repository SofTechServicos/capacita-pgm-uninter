'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div 
        className="cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-900 z-50 shadow-lg">
          <div className="flex gap-2">
            <HelpCircle size={14} className="flex-shrink-0 mt-0.5" />
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
