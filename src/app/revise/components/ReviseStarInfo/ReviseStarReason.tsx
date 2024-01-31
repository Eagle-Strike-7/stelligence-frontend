import React from 'react';

// NOTE : 수정 이유를 입력하는 컴포넌트 (수정)
const ReviseStarReason = () => {
  return (
    <div className="flex flex-col w-full mt-4">
      <div className="text-md font-bold mb-2">수정 이유</div>
      <textarea
        className="w-full h-28 p-4 border border-gray-300 rounded-md resize-none"
        placeholder="수정 이유를 입력하세요"
      />
    </div>
  );
};
export default ReviseStarReason;
