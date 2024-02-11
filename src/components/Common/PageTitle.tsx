import React from 'react';

const PageTitle: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
  return <h2 className="text-2xl font-semibold text-white">{pageTitle}</h2>;
};

export default PageTitle;
