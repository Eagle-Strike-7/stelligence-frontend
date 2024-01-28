import React from 'react';

const StarSectionInput = ({ inputTitle }: { inputTitle: string }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="text-md font-bold mb-2">{inputTitle}</div>
      <textarea
        className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none"
        placeholder="본문을 입력하세요"
      />
    </div>
  );
};

export default StarSectionInput;
