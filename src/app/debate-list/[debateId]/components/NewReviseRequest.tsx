import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCommentList } from '@/service/debate/comment';
import { useQuery } from '@tanstack/react-query';
import { getMiniProfile } from '@/service/userService';

const NewReviseRequest: React.FC<{
  debateId: number;
  starId: number | undefined;
  setIsNewReviseRequested: (bool: boolean) => void;
}> = ({ debateId, starId, setIsNewReviseRequested }) => {
  const router = useRouter();
  const [engagedUsers, setEngagedUsers] = useState<string[]>([]);
  const { data: miniProfileData } = useQuery({
    queryKey: ['user', 'mini'],
    queryFn: getMiniProfile,
  });

  useEffect(() => {
    getCommentList(debateId)
      .then(comments => {
        const nicknames = comments.map(item => {return item.commenter.nickname});
        setEngagedUsers([...nicknames]);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [debateId]);

  const handleNewReviseRequestByDebate = () => {
    // NOTE 수정 요청 권한이 있는 사람만 가능
    if (
      miniProfileData &&
      engagedUsers.includes(miniProfileData!.results.nickname)
    ) {
      // NOTE 로컬스토리지에 debateId 저장
      localStorage.setItem('debateId', debateId.toString());
      // NOTE 수정 요청 페이지로 이동
      router.push(`/stars/${starId}/revise`);
      // NOTE 수정 요청 버튼 이후에 안보이게 -> 백엔드 처리 필요
      setIsNewReviseRequested(true);
    } else {
      alert('수정 요청 권한이 없습니다.');
    }
  };
  return (
    <div className="flex text-center place-self-center justify-center mb-4 mt-[-1rem] ">
      <Button
        variant="solid"
        bg="primary.500"
        color="white"
        width="70rem"
        _hover={{
          bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
          color: 'white',
          transition: 'background-color 0.5s ease',
        }}
        _active={{
          bg: 'rgba(118, 147, 231, 0.5)',
          transition: 'background-color 0.2s ease',
        }}
        _focus={{
          boxShadow:
            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
        }}
        onClick={handleNewReviseRequestByDebate}
      >
        새 수정 요청
      </Button>
    </div>
  );
};

export default NewReviseRequest;
