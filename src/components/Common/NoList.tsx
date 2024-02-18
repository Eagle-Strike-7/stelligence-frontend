import React from 'react';

const NoList = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-3 text-white text-center py-10 ">
      <p className="text-xl font-bold">{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default NoList;
