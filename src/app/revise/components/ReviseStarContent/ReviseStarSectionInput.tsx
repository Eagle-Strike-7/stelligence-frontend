import OutlineButton from '@/components/Common/Button/OutlineButton';
import StarSectionInput from '@/components/Common/Star/StarSectionInput/StarSectionInput';
import { Input, Select } from '@chakra-ui/react';
import React from 'react';

// NOTE : 글의 내용을 추가, 수정하는 컴포넌트
const ReviseStarSectionInput = ({
  setCreate,
  setRevise,
}: {
  setCreate?: (value: boolean) => void;
  setRevise: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col w-full justify-center my-8">
      <div className="flex flex-row w-full mb-2">
        <Select placeholder="소제목" size="sm" rounded="md" w="6rem">
          <option value="h2">h2</option>
          <option value="h3">h3</option>
        </Select>

        <Input size="sm" variant="outline" rounded="md" mx="0.25rem" />

        <OutlineButton name="완료" setCreate={setCreate} setRevise={setRevise} />
      </div>

      <StarSectionInput />
    </div>
  );
};

export default ReviseStarSectionInput;
