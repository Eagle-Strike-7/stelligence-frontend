import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BookmarkResponse,
  deleteBookmarkData,
  getBookmarkData,
  postBookmarkData,
} from '@/service/userService';
import ReportModal from '@/components/Common/ReportModal';
import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import StarStatusButton from './StarStatusButton';

interface StarInfoProps {
  title: string;
  parentDocumentTitle: string;
  lastModifiedAt: string;
}

// NOTE : 글의 정보를 보여주는 컴포넌트
const StarInfo = ({
  title,
  parentDocumentTitle,
  lastModifiedAt,
}: StarInfoProps) => {
  const starId = Number(useParams().starId);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReviseList = () => {
    // FIXME : 링크 확인 필요
    router.push(`/stars/${starId}/revised-list`);
  };

  const handleHistory = () => {
    router.push(`/stars/${starId}/history-list`);
  };

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const createBookmarkMutation = useMutation({
    mutationFn: postBookmarkData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'bookmark'] });
      setIsBookmarked(true);
      toast({
        title: '북마크 추가 성공!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: error => {
      console.error('북마크 추가 실패: ', error);
    },
  });
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmarkData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'bookmark'] });
      setIsBookmarked(false);
      toast({
        title: '북마크 취소',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: error => {
      console.error('북마크 삭제 실패: ', error);
    },
  });
  const handleCreateBookmark = () => {
    createBookmarkMutation.mutate(Number(starId));
  };

  const handleDeleteBookmark = () => {
    deleteBookmarkMutation.mutate(Number(starId));
  };

  // NOTE 북마크 단건조회
  const { data: bookmarked } = useQuery<BookmarkResponse>({
    queryKey: ['bookmark', starId],
    queryFn: () => {
      return getBookmarkData(starId);
    },
  });
  useEffect(() => {
    setIsBookmarked(bookmarked?.results.bookmarked ?? false);
  }, [bookmarked]);

  return (
    <div className="flex flex-row w-full justify-between">
      {/* // NOTE 신고 모달 */}
      <ReportModal
        isOpen={isOpen}
        onClose={onClose}
        title="document"
        dataId={starId}
      />
      <div className="flex flex-col">
        <PageTitleDescription
          title={title}
          description={`수정일시: ${lastModifiedAt}`}
        />
        <div>{parentDocumentTitle}</div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {/* SECTION : 북마크 버튼 */}
          {isBookmarked ? (
            <Button
              size="md"
              variant="ghost"
              color="white"
              _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
              p="0"
              onClick={handleDeleteBookmark}
            >
              <FaBookmark size="1.5rem" />
            </Button>
          ) : (
            <Button
              size="md"
              variant="ghost"
              color="white"
              _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
              p="0"
              onClick={handleCreateBookmark}
            >
              <FaRegBookmark size="1.5rem" />
            </Button>
          )}
          {/* SECTION : 더보기 버튼 (지난 수정요청, 역사, 신고) */}
          <Menu>
            <MenuButton
              as={Button}
              size="md"
              color="white"
              variant="ghost"
              p="0.5rem"
              mb="0.1rem"
              _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
              _expanded={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            >
              <AiOutlineEllipsis size="1.5rem" />
            </MenuButton>
            <MenuList sx={{ minWidth: '7rem' }}>
              <MenuItem
                sx={{ justifyContent: 'center' }}
                onClick={handleReviseList}
              >
                지난 수정 요청
              </MenuItem>
              <MenuItem
                sx={{ justifyContent: 'center' }}
                onClick={handleHistory}
              >
                역사
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }} onClick={onOpen}>
                신고
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        {/* SECTION : 편집/투표중/토론중 버튼 */}
        <StarStatusButton />
      </div>
    </div>
  );
};

export default StarInfo;
