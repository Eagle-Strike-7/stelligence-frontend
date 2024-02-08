import React from 'react';

const LabelText = ({ label, text }: { label: string; text: string }) => {
  return (
    <div className="flex">
      <h3 className="font-bold text-md w-36">{label}</h3>
      <p className="text-md flex-1">{text}</p>
    </div>
  );
};

export default LabelText;
