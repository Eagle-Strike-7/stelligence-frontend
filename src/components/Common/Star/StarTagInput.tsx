import useDebounce from '@/hooks/useDebounce';
import { Input, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from '@/types/common/ResponseType';
import { Document, StarProps } from '@/types/newStar/newStarProps';

// NOTE : 상위 계층 태그를 입력받는 컴포넌트 (글쓰기, 수정)
const StarTagInput = ({ star, setStar }: StarProps) => {
  const debouncedTag = useDebounce(star.tag, 300);
  const [connectedTag, setConnectedTag] = useState<string>('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStar({ ...star, tag: e.target.value });
  };

  const handleClick = (tag: string) => {
    setConnectedTag(tag);
    setStar({ ...star, tag: '' });
  };

  const handleKeyDown = (e: React.KeyboardEvent, tag: string) => {
    if (e.key === 'Enter') {
      handleClick(tag);
    }
  };

  const handleDelete = () => {
    setConnectedTag('');
  };

  // NOTE : 검색어가 바뀌면 검색 다시하기
  useEffect(() => {
    searchTag.refetch();
  }, [debouncedTag]);

  return (
    <div className="flex flex-row grow mb-4 mr-10">
      <span className="w-28 text-md font-bold mt-2">상위 계층 태그</span>

      <div className="mb-3 relative grow">
        <Input
          size="md"
          variant="outline"
          placeholder="연결할 글의 제목을 입력해 주세요"
          value={star.tag}
          onChange={handleChange}
          zIndex="1"
        />
        {/* NOTE : 검색어가 있을 때만 드롭다운 */}
        {debouncedTag !== '' ? (
          <div className="absolute w-full mt-1 border border-gray-300 bg-white rounded-md z-10">
            {/* NOTE : 결과가 있을 때 */}
            {searchTag.data && searchTag.data.length > 0 ? (
              searchTag.data.map(tag => {
                return (
                  <div
                    key={tag.documentId}
                    role="button"
                    tabIndex={0}
                    className="p-2 pl-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleClick(tag.title);
                    }}
                    onKeyDown={event => {
                      handleKeyDown(event, tag.title);
                    }}
                  >
                    {tag.title}
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
        {connectedTag !== '' ? (
          <Tag
            size="lg"
            variant="subtle"
            colorScheme="blue"
            my="0.5rem"
            minW="fit-content"
            maxW="fit-content"
          >
            <TagLabel>{connectedTag}</TagLabel>
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
