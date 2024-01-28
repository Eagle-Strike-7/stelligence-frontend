import React from 'react';

const StateTab: React.FC<{ tab1: string; tab2: string }> = ({ tab1, tab2 }) => {
  return (
    <div className="flex my-6">
      <h2 className="text-lg font-semibold mr-4 hover:cursor-pointer">
        {tab1}
      </h2>
      <h2 className="text-lg font-semibold hover:cursor-pointer">{tab2}</h2>
    </div>
  );
};

export default StateTab;
