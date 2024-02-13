import useDebounce from '@/hooks/common/useDebounce';
import { Input, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from '@/types/common/ResponseType';
import { Document } from '@/types/star/NewStarProps';
import apiClient from '../../../service/login/axiosClient';

interface StarParentDocumentIdProps {
  inputTitle: string;
  parentDocumentTitle?: string;
  setParentDocumentId: (parentDocumentId: number | null) => void;
}

// NOTE : 상위 계층 태그를 입력받는 컴포넌트 (글쓰기, 수정)
const StarTagInput = ({
  inputTitle,
  parentDocumentTitle = '',
  setParentDocumentId,
}: StarParentDocumentIdProps) => {
  const [searchTitle, setSearchTitle] = useState({
    enteredTitle: '', // input에 입력된 제목
    parentTitle: parentDocumentTitle, // 태그로 생성된 제목
  });
  console.log(searchTitle, parentDocumentTitle);
  const debouncedTitle = useDebounce(searchTitle.enteredTitle, 300);
  const getTagResults = async () => {
    if (debouncedTitle === '') {
      return [];
    }
    try {
      const response = await apiClient.get<ResponseType<Document>>(
        `/api/documents/search?title=${debouncedTitle}`,
      );
      const { data } = response;
      const searchResults = data.results.map((doc: Document) => {
        return {
          documentId: doc.documentId,
          title: doc.title,
        };
      });
      return searchResults;
    } catch (error) {
      // TODO : 에러났을 때 이전 검색 결과를 보여줄 것인지?
      return [];
    }
  };

  // NOTE : 검색기능
  const searchTag = useQuery({
    queryKey: [debouncedTitle],
    queryFn: getTagResults,
  });

  // input에 값이 입력될 때
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle({ ...searchTitle, enteredTitle: e.target.value });
  };

  const handleClick = (doc: Document) => {
    setSearchTitle({
      ...searchTitle,
      enteredTitle: '',
      parentTitle: doc.title,
    });
    setParentDocumentId(doc.documentId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, doc: Document) => {
    if (e.key === 'Enter') {
      handleClick(doc);
    }
  };

  const handleDelete = () => {
    setSearchTitle({ ...searchTitle, parentTitle: '' });
    setParentDocumentId(null);
  };

  // NOTE : 검색어가 바뀌면 검색 다시하기
  useEffect(() => {
    searchTag.refetch();
  }, [debouncedTitle]);

  return (
    <div className="flex flex-row grow mb-4">
      {inputTitle === '상위 계층 태그' ? (
        <span className="w-28 text-white text-md font-bold mt-2">
          {inputTitle}
        </span>
      ) : (
        <span className="w-40 text-white text-md font-bold mt-2">
          {inputTitle}
        </span>
      )}

      {searchTitle.parentTitle === '' ? (
        <div className="mb-3 relative grow">
          <Input
            size="md"
            variant="outline"
            color="white"
            placeholder="연결할 글의 제목을 입력해 주세요"
            value={searchTitle.enteredTitle}
            onChange={handleChange}
            zIndex="1"
          />
          {/* NOTE : 검색어가 있을 때만 드롭다운 */}
          {debouncedTitle !== '' ? (
            <div className="absolute w-full mt-1 border border-gray-300 bg-white rounded-md z-10">
              {/* NOTE : 결과가 있을 때 */}
              {searchTag.data && searchTag.data.length > 0 ? (
                searchTag.data.map(doc => {
                  return (
                    <div
                      key={doc.documentId}
                      role="button"
                      tabIndex={0}
                      className="p-2 pl-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleClick(doc);
                      }}
                      onKeyDown={event => {
                        handleKeyDown(event, doc);
                      }}
                    >
                      {doc.title}
                    </div>
                  );
                })
              ) : (
                // NOTE : 결과가 없을 때
                <div className="p-2">검색 결과가 없습니다</div>
              )}
            </div>
          ) : (
            <> </>
          )}
        </div>
      ) : (
        <Tag
          size="lg"
          variant="subtle"
          colorScheme="blue"
          my="0.5rem"
          minW="fit-content"
          maxW="fit-content"
        >
          <TagLabel>{searchTitle.parentTitle}</TagLabel>
          <TagCloseButton onClick={handleDelete} />
        </Tag>
      )}
    </div>
  );
};

export default StarTagInput;
