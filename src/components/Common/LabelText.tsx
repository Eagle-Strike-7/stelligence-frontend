import React from 'react';

const LabelText = ({
  label,
  text,
}: {
  label: string;
  text: string | number;
}) => {
  return (
    <div className="flex">
      <h3 className="font-bold text-md w-36 text-white">{label}</h3>
      <p className="text-md flex-1 text-white">{text}</p>
    </div>
  );
};

export default LabelText;
