import PageTitle from '@/components/Common/PageTitle';
import { Button } from '@chakra-ui/react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { LuBookmark } from 'react-icons/lu';
import { usePathname, useRouter } from 'next/navigation';

interface StarInfoProps {
  title: string;
  lastModifiedAt: string;
  editable: boolean;
}

// NOTE : 글의 정보를 보여주는 컴포넌트
// FIXME : 최종 수정 일시 추가, 편집중 상태 추가
const StarInfo = ({ title, lastModifiedAt, editable }: StarInfoProps) => {
  const pathname = usePathname();
  const documentId = pathname.split('/').pop();

  const router = useRouter();

  const handleClick = () => {
    alert('투표중인 글입니다.');
  };

  const handleEdit = () => {
    router.push(`/stars/${documentId}/revise`);
  };

  return (
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-col">
        <PageTitle pageTitle={title} />
        <div className="text-sm text-input-placeholder">
          수정 일시: {lastModifiedAt}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row">
          <Button size="md" colorScheme="gray" variant="ghost" p="0">
            <LuBookmark size="1.5rem " />
          </Button>
          <Button size="md" colorScheme="gray" variant="ghost" p="0">
            <AiOutlineEllipsis size="1.5rem " />
          </Button>
        </div>
        {editable === false ? ( // TODO : 버튼 수정 및 정리하기
          <Button
            size="md"
            colorScheme="accent"
            variant="solid"
            onClick={handleClick}
          >
            투표중
          </Button>
        ) : (
          <Button
            size="md"
            colorScheme="gray"
            variant="outline"
            onClick={handleEdit}
          >
            편집
          </Button>
        )}
      </div>
    </div>
  );
};

export default StarInfo;
