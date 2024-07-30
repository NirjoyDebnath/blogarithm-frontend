import React, { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Dummy: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {text}
      </div>
    </div>
  );
};

export default Dummy;
