import { Tag, TagLabel } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PageTitleDescriptionProps {
  title: string;
  description: string;
  tagTitle?: string;
  relatedDebateId?: number | null;
  parentDocumentId?: number;
}

const PageTitleDescription = ({
  title,
  description,
  tagTitle = '💬 연관 토론:',
  relatedDebateId,
  parentDocumentId,
}: PageTitleDescriptionProps) => {
  const router = useRouter();
  const handleClickRelatedDebate = () => {
    if (relatedDebateId) {
      router.push(`/debate-list/${relatedDebateId}`);
    }
  };

  const handleClickParentDocumentId = () => {
    if (parentDocumentId) {
      router.push(`/stars/${parentDocumentId}`);
    }
  };
  // FIXME : 태그 정리하기
  return (
    <div className="flex flex-col gap-1 text-white w-max ml-1 mb-12">
      <div className="flex">
        <h1 className="text-4xl font-bold w-fit">{title}</h1>
        {relatedDebateId && (
          <Tag
            size="md"
            backgroundColor="white"
            color="black"
            height="fit-content"
            alignSelf="center"
            marginLeft="0.5rem"
            paddingY="0.3rem"
            onClick={handleClickRelatedDebate}
            _hover={{
              cursor: 'pointer',
            }}
          >
            <TagLabel>
              {tagTitle}
              {relatedDebateId}
            </TagLabel>
          </Tag>
        )}
        {parentDocumentId && (
          <Tag
            size="md"
            backgroundColor="white"
            color="black"
            height="fit-content"
            alignSelf="center"
            marginLeft="0.5rem"
            paddingY="0.3rem"
            onClick={handleClickParentDocumentId}
            _hover={{
              cursor: 'pointer',
            }}
          >
            <TagLabel>{tagTitle}</TagLabel>
          </Tag>
        )}
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default PageTitleDescription;
