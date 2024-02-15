import React, { useEffect, useState } from 'react';
import { Amendment } from '@/types/common/Amendment';
import transTitleTagtoAmendment from '@/lib/debate/transTitleAndTagChanged';
import DebateInformation from './DebateInfo/DebateInformation';
import DebateSlider from './DebateSlider/DebateSlider';
import { Debate } from '../../page.server';

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
        setTotalAmendments(current => {
          return [newAmendment, ...(current || [])];
        });
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
    <div
      className={`flex flex-col p-10 pb-20 rounded-lg mb-10 text-white border-2 border-primary-dark-500/20 ${debateData?.status === 'CLOSED' ? 'opacity-60' : ''}`}
    >
      {debateData && (
        <>
          <DebateInformation
            contributeData={debateData.contribute}
            debateEndAt={debateData.endAt}
          />
          {totalAmendments && <DebateSlider amendments={totalAmendments} />}
        </>
      )}
    </div>
  );
};

export default DebateDetail;
