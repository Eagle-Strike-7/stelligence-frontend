import React from 'react';

interface MiddelTitleProps {
  title: string;
  color: string;
}
const MiddleTitle = ({ title, color }: MiddelTitleProps) => {
  return (
    <div className={`text-${color} font-bold text-left text-xl my-2`}>
      {title}
    </div>
  );
};

export default MiddleTitle;
