import React from 'react';

interface ReviseStarReasonProps {
  contributeDescription: string;
  setContributeDescription: (value: string) => void;
}

// NOTE : 수정 이유를 입력하는 컴포넌트
const ReviseStarReason = ({
  contributeDescription,
  setContributeDescription,
}: ReviseStarReasonProps) => {
  return (
    <div className="flex flex-col w-full pb-12 border-b border-[#303134]">
      <h3 className="text-white text-lg font-bold mb-2">수정 이유</h3>
      <textarea
        className="w-full h-28 p-4 bg-[#303134] text-white rounded-md resize-none"
        placeholder="수정 이유를 입력하세요"
        value={contributeDescription}
        onChange={e => {
          setContributeDescription(e.target.value);
        }}
      />
    </div>
  );
};
export default ReviseStarReason;
