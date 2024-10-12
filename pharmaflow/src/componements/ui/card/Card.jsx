// src/components/ui/Card.jsx
import React from 'react';
// Optionally include styles for the card component

const CardHeader = ({ children }) => {
  return (
    <div className="border-b border-gray-200 mb-4 pb-2">
      {children}
    </div>
  );
};


const CardContent = ({ children }) => {
  return (
    <div className="p-2">
      {children}
    </div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h2 className="text-xl font-bold text-gray-800">
      {children}
    </h2>
  );
};


const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {children}
    </div>
  );
};

