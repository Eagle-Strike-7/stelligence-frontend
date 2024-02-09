import React from 'react';
import DebateSlider from '@/app/debate-list/[debateId]/components/Carousel/DebateSlider';
import DebateInformation from './DebateInformation';
import { Debate } from '../page.server';

interface DeabteDetailProps {
  debateData: Debate | null;
}

const DebateDetail: React.FC<DeabteDetailProps> = ({ debateData }) => {
  return (
    <div>
      {debateData && (
        <div className="flex flex-col gap-6 my-5 pb-20  bg-[#E6E9FF]/40 p-10 rounded-lg mb-5 ">
          <h3 className="font-bold text-left text-2xl mr-3 mb-2 text-[#032142] ">
            개요
          </h3>
          <DebateInformation debateData={debateData} />
          <DebateSlider amendments={debateData.amendments} />
        </div>
      )}
    </div>
  );
};

export default DebateDetail;
