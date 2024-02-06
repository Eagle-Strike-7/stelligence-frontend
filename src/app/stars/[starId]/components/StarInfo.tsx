import PageTitle from '@/components/Common/PageTitle';
import { Button } from '@chakra-ui/react';
import { LuBookmark, LuSiren } from 'react-icons/lu';

// NOTE : 글의 정보를 보여주는 컴포넌트
// FIXME : 최종 수정 일시 추가, 편집중 상태 추가
const StarInfo = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-col">
        <PageTitle pageTitle={title} />
        <div className="text-sm text-input-placeholder">
          최종 수정 일시: 2024. 01. 10. 01:55
        </div>

        <div className="flex flex-row">
          <Button size="md" colorScheme="gray" variant="ghost" p="0">
            <LuBookmark size="1.5rem " />
          </Button>
          <Button size="md" colorScheme="gray" variant="ghost" p="0">
            <LuSiren size="1.5rem" className="h-full pb-1" />
          </Button>
        </div>
      </div>

      <div className="flex flex-row">
        <Button
          variant="solid"
          colorScheme="blue"
          background="accent.500"
          mr="0.5rem"
        >
          편집중
        </Button>
        <Button size="md" colorScheme="gray" variant="outline">
          히스토리
        </Button>
      </div>
    </div>
  );
};

export default StarInfo;
