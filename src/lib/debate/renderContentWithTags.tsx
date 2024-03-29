import { Tag } from '@chakra-ui/react';
import { ReactNode } from 'react';

// NOTE 태그 포함해서 렌더링 하는 함수
const renderContentWithTags = (
  commentContent: string,
  commentIds: number[],
): ReactNode[] => {
  const regex = /#(\d+)/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;
  const elements: ReactNode[] = [];
  const handleClickInCommentTag = (e: any) => {
    const commentId = e.target.id; // 또는 적절한 방식으로 commentId를 추출
    const element = document.getElementById(`comment-${commentId}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  match = regex.exec(commentContent);
  while (match !== null) {
    const matchIndex = match.index;
    const matchText = match[0];
    const id = parseInt(match[1], 10);

    if (matchIndex > lastIndex) {
      elements.push(commentContent.substring(lastIndex, matchIndex));
    }

    if (commentIds.includes(id)) {
      elements.push(
        <Tag
          size="sm"
          key={matchIndex}
          bg="primary.900"
          color="primary.300"
          fontWeight={700}
          h="1.5rem"
          w="max-content"
          marginY={0.5}
          id={matchText}
          _hover={{ cursor: 'pointer' }}
          onClick={handleClickInCommentTag}
        >
          {matchText}
        </Tag>,
      );
    } else {
      elements.push(matchText);
    }
    lastIndex = matchIndex + matchText.length;
    match = regex.exec(commentContent);
  }
  if (lastIndex < commentContent.length) {
    elements.push(commentContent.substring(lastIndex));
  }

  return elements;
};

export default renderContentWithTags;
