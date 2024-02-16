import React from 'react';
import ChakraSelect from '@/components/Common/ChakraSelect';

interface CommentsHeaderProps {
  commentsNum: number;
  setSelectedOption: (setValue: string) => void;
}
const CommentsHeader = ({
  commentsNum,
  setSelectedOption,
}: CommentsHeaderProps) => {
  const commentSelectOptions = [
    { value: '등록순', label: '등록순' },
    { value: '최신순', label: '최신순' },
  ];
  return (
    <div className="flex justify-between my-3">
      <div className="flex justify-left place-items-end">
        <span className="text-2xl font-bold text-white">토론 현황</span>
        <span className="text-white ml-2">(총 {commentsNum}개)</span>
      </div>
      <ChakraSelect
        options={commentSelectOptions}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
};

export default CommentsHeader;
