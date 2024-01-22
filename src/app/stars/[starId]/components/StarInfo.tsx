import PageTitle from '@/components/Common/PageTitle';
import { Button } from '@chakra-ui/react';
import { LuBookmark, LuSiren } from 'react-icons/lu';

// NOTE : 글의 정보를 보여주는 컴포넌트
// FIXME : 북마크, 신고 버튼 수정 필요
const StarInfo = () => {
    return (
        <div className="flex flex-row w-full mb-6 justify-between items-center justify-items-center">
            <div className="flex flex-col">
                <PageTitle pageTitle="마리모" />
                <div className="mb-2 text-input-placeholder">
                    최종 수정 일시: 2024. 01. 10. 01:55
                </div>
                <div className="flex flex-row items-center justify-items-center">
                    <Button size="md" colorScheme="gray" variant="ghost">
                        <LuBookmark size="2rem" className="h-full mr-2" />
                    </Button>
                    <Button size="md" colorScheme="gray" variant="ghost">
                        <LuSiren size="2rem" className="h-full pb-1" />
                    </Button>
                </div>
            </div>
            <Button size="md" colorScheme="gray" variant="outline" mt="1rem">
                수정 요청 목록
            </Button>
        </div>
    );
};

export default StarInfo;
