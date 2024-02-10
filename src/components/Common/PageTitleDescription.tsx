import React from 'react';

const PageTitleDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-1 text-white w-max ml-2 mb-12">
      <h1 className="text-4xl font-bold">{title}</h1>

      <p className="text-sm">{description}</p>
    </div>
  );
};

export default PageTitleDescription;
