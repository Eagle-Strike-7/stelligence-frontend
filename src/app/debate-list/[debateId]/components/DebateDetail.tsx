import React from 'react';
import { Debate } from '../page.server';
import DebateInformation from './DebateInformation';
import DebateSlider from './Carousel/DebateSlider';
import MiddleTitle from './MiddleTitle';

interface DeabteDetailProps {
  debateData: Debate | null;
}

const DebateDetail: React.FC<DeabteDetailProps> = ({ debateData }) => {
  return (
    <div className="flex-col ">
      {debateData && (
        <div
          className={`flex flex-col px-10 pt-8 pb-20 rounded-lg text-white border-2 border-primary-dark-500/20 mb-10 ${debateData.status === 'CLOSED' ? 'opacity-80' : ''}`}
        >
          <DebateInformation debateData={debateData} />
          <div className="mt-10 my-5">
            <MiddleTitle title="수정 요청 사항" color="white" />
            <div className="tiptap flex justify-between gap-5 text-primary-dark-500 ">
              <p className="font-bold w-1/2 text-center mb-4 ">수정 전</p>
              <p className="font-bold w-1/2 text-center mb-4">수정 후</p>
            </div>
          </div>
          <DebateSlider amendments={debateData.amendments} />
        </div>
      )}
    </div>
  );
};

export default DebateDetail;
