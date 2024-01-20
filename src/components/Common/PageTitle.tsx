import React from 'react';

const PageTitle: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
  return <h2 className="text-3xl font-semibold">{pageTitle}</h2>;
};

export default PageTitle;
