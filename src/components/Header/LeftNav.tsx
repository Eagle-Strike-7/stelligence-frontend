import React from 'react';
import VoteButton from './VoteButton';
import DebateButton from './DebateButton';

const LeftNav = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex gap-2 mobile:flex-col desktop:flex-row mobile:ml-4 desktop:ml-20 w-40">
      <VoteButton onClose={onClose} />
      <DebateButton onClose={onClose} />
    </div>
  );
};

export default LeftNav;
