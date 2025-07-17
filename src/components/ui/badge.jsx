import React from 'react';


const Badge = ({ children, className = "" }) => {
  return (
    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export { Badge };
