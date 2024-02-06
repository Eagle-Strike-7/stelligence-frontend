import useDebounce from '@/hooks/useDebounce';
import { Input, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from '@/types/common/ResponseType';
import { Document, NewStarProps } from '@/types/star/NewStarProps';

// NOTE : 상위 계층 태그를 입력받는 컴포넌트 (글쓰기, 수정)
const StarTagInput = ({ star, setStar }: NewStarProps) => {
  const [starTag, setStarTag] = useState({
    enteredTag: '', // input에 입력된 값
    connectedTag: '', // 태그로 생성된 값
  });

  const debouncedTag = useDebounce(starTag.enteredTag, 300);
  const getTagResults = async () => {
    const tempUrl =
      'http://ec2-43-203-87-227.ap-northeast-2.compute.amazonaws.com/api/documents/search';

    if (debouncedTag === '') {
      return [];
    }
    try {
      const response = await axios.get<ResponseType<Document>>(
        `${tempUrl}?title=${debouncedTag}`,
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
    queryKey: [debouncedTag],
    queryFn: getTagResults,
  });

  // input에 값이 입력될 때
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStarTag({ ...starTag, enteredTag: e.target.value });
  };

  const handleClick = (doc: Document) => {
    setStarTag({ ...starTag, enteredTag: '', connectedTag: doc.title });
    setStar({ ...star, documentId: doc.documentId });
  };

  const handleKeyDown = (e: React.KeyboardEvent, doc: Document) => {
    if (e.key === 'Enter') {
      handleClick(doc);
    }
  };

  const handleDelete = () => {
    setStarTag({ ...starTag, connectedTag: '' });
    setStar({ ...star, documentId: 0 });
  };

  // NOTE : 검색어가 바뀌면 검색 다시하기
  useEffect(() => {
    searchTag.refetch();
  }, [debouncedTag]);

  return (
    <div className="flex flex-row grow mb-4">
      <span className="w-28 text-md font-bold mt-2">상위 계층 태그</span>

      <div className="mb-3 relative grow">
        <Input
          size="md"
          variant="outline"
          placeholder="연결할 글의 제목을 입력해 주세요"
          value={starTag.enteredTag}
          onChange={handleChange}
          zIndex="1"
        />
        {/* NOTE : 검색어가 있을 때만 드롭다운 */}
        {debouncedTag !== '' ? (
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
        {starTag.connectedTag !== '' ? (
          <Tag
            size="lg"
            variant="subtle"
            colorScheme="blue"
            my="0.5rem"
            minW="fit-content"
            maxW="fit-content"
          >
            <TagLabel>{starTag.connectedTag}</TagLabel>
            <TagCloseButton onClick={handleDelete} />
          </Tag>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default StarTagInput;
