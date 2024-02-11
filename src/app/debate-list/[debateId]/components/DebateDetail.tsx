import React from 'react';
import { Debate } from '../page.server';
import DebateInformation from './DebateInformation';
import DebateSlider from './Carousel/DebateSlider';

interface DeabteDetailProps {
  debateData: Debate | null;
}

const DebateDetail: React.FC<DeabteDetailProps> = ({ debateData }) => {
  return (
    <div className="flex-col ">
      {debateData && (
        <div
          className={`flex flex-col px-10 pt-10 pb-16 rounded-lg text-white border-2 border-primary-dark/20 mb-10 ${debateData.status === 'CLOSED' ? 'opacity-50' : ''}`}
        >
          <DebateInformation debateData={debateData} />
          <DebateSlider amendments={debateData.amendments} />
        </div>
      )}
    </div>
  );
};

export default DebateDetail;
