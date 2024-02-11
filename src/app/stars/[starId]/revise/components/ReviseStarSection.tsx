import React, { useState } from 'react';
import { Amendment } from '@/types/star/ReviseStarProps';
import { Heading, WriteType } from '@/types/common/ResponseType';
import { StarSection } from '@/types/star/StarProps';
import ReviseStarSectionTitle from './ReviseStarSectionTitle';
import ReviseStarSectionShow from './ReviseStarSectionShow';
import CreateButton from './CreateButton';
import StarContent from '../../components/StarContent';
import ReviseStarSectionInput from './ReviseStarSectionInput';

interface ReviseStarSectionProps {
  section: StarSection;
  addAmendment: (newAmendment: Amendment) => void;
}

// NOTE : 글의 한 섹션을 나타내는 컴포넌트 (읽기상태 + 수정상태)
const ReviseStarSection = ({
  section,
  addAmendment,
}: ReviseStarSectionProps) => {
  const [state, setState] = useState<'읽기' | '수정' | '추가' | '삭제'>('읽기');
  const [heading, setHeading] = useState<Heading>(section.heading);
  const [title, setTitle] = useState<string>(section.title);
  const [content, setContent] = useState<string>(section.content);
  const [createHeading, setCreateHeading] = useState<Heading>(Heading.H1);
  const [createTitle, setCreateTitle] = useState<string>('');
  const [createContent, setCreateContent] = useState<string>('');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // SECTION : 수정 상태일 때 정보 담기
    if (state === '수정') {
      addAmendment({
        sectionId: section.sectionId,
        type: WriteType.UPDATE,
        newSectionHeading: heading,
        newSectionTitle: title,
        newSectionContent: content,
        creatingOrder: 0,
      });
      // SECTION : 추가 상태일 때 정보 담기
    } else if (state === '추가') {
      addAmendment({
        sectionId: section.sectionId,
        type: WriteType.CREATE,
        newSectionHeading: createHeading,
        newSectionTitle: title,
        newSectionContent: content,
        creatingOrder: 0,
      });
      // SECTION : 삭제 상태일 때 정보 담기
    } else if (state === '삭제') {
      addAmendment({
        sectionId: section.sectionId,
        type: WriteType.DELETE,
        newSectionHeading: heading,
        newSectionTitle: title,
        newSectionContent: '',
        creatingOrder: 0,
      });
      setContent('');
    }
    setState('읽기');
  };
  // 삭제 상태에서는?
  return (
    <>
      {/* TODO : 제일 위에 섹션 추가 버튼 */}
      {/* sectionId, revision */}
      {/* {id === 1 && <ReviseStarCreateButton setRevise={setRevise} />} */}
      {state === '읽기' && (
        // SECTION : 읽기모드
        <>
          <ReviseStarSectionShow
            heading={heading}
            title={title}
            content={content}
            setState={setState}
          />
          <CreateButton state={state} setState={setState} />
        </>
      )}
      {state === '추가' && (
        // SECTION : 추가모드
        // TODO: 추가 상태일 때 헤딩 값 설정, creatingOrder, 끝나면 컴포넌트로 보여주기 + 배경 초록색 만들기
        <>
          <ReviseStarSectionShow
            heading={heading}
            title={title}
            content={content}
            setState={setState}
          />
          <ReviseStarSectionTitle
            heading={createHeading}
            setHeading={setCreateHeading}
            title={createTitle}
            setTitle={setCreateTitle}
            handleClick={handleButtonClick}
          />
          <ReviseStarSectionInput
            state={state}
            content={createContent}
            setContent={setCreateContent}
          />
        </>
      )}
      {state === '수정' && (
        // SECTION : 수정 모드(글쓰기 모드)
        <>
          <ReviseStarSectionTitle
            heading={heading}
            setHeading={setHeading}
            title={title}
            setTitle={setTitle}
            handleClick={handleButtonClick}
          />
          <ReviseStarSectionInput content={content} setContent={setContent} />
        </>
      )}
      {state === '삭제' && (
        // SECTION : 삭제모드
        // TODO : 배경 빨간색으로 만들어주기
        <>
          <ReviseStarSectionTitle
            heading={heading}
            setHeading={setHeading}
            title={title}
            setTitle={setTitle}
            handleClick={handleButtonClick}
          />
          <StarContent content="" />
        </>
      )}
    </>
  );
};

export default ReviseStarSection;
