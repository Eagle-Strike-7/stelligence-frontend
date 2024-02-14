import React, { useEffect, useState } from 'react';
import { Amendment } from '@/types/common/Amendment';
import transTitleTagtoAmendment from '@/lib/debate/transTitleAndTagChanged';
import DebateInformation from './DebateInformation';
import DebateSlider from './Carousel/DebateSlider';
import MiddleTitle from './MiddleTitle';
import { Debate } from '../page.server';

interface DeabteDetailProps {
  debateData: Debate | null;
}

const DebateDetail: React.FC<DeabteDetailProps> = ({ debateData }) => {
  const [totalAmendments, setTotalAmendments] = useState<Amendment[]>();
  useEffect(() => {
    setTotalAmendments(debateData?.contribute.amendments || []);

    const handleAmendment = (
      changedType: 'title' | 'tag',
      before: string,
      after: string,
    ) => {
      if (before !== after) {
        const newAmendment = transTitleTagtoAmendment(
          changedType,
          before,
          after,
        );
        setTotalAmendments(current => {return [newAmendment, ...(current || [])]});
      }
    };

    if (debateData) {
      handleAmendment(
        'title',
        debateData.contribute.beforeDocumentTitle,
        debateData.contribute.afterDocumentTitle,
      );

      handleAmendment(
        'tag',
        debateData.contribute.beforeParentDocumentTitle,
        debateData.contribute.afterParentDocumentTitle,
      );
    }
  }, [debateData]);

  return (
    <div className="flex-col ">
      {debateData && (
        <div
          className={`flex flex-col px-10 pt-8 pb-20 rounded-lg text-white border-2 border-primary-dark-500/20 mb-10 ${debateData.status === 'CLOSED' ? 'opacity-60' : ''}`}
        >
          <DebateInformation contributeData={debateData.contribute} />
          <div className="mt-10 my-5">
            <MiddleTitle title="수정 요청 사항" color="white" />
            <div className="tiptap flex justify-between gap-5 text-primary-dark-500 ">
              <p className="font-bold w-1/2 text-center mb-4 ">수정 전</p>
              <p className="font-bold w-1/2 text-center mb-4">수정 후</p>
            </div>
          </div>
          {totalAmendments && <DebateSlider amendments={totalAmendments} />}
        </div>
      )}
    </div>
  );
};

export default DebateDetail;
