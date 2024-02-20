import React from 'react';
import VoteButton from './VoteButton';
import DebateButton from './DebateButton';

const LeftNav = () => {
  return (
    <div className="flex mobile:flex-col desktop:flex-row mobile:ml-4 desktop:ml-20 w-40">
      <VoteButton />
      <DebateButton />
    </div>
  );
};

export default LeftNav;
