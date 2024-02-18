import React, { useState } from 'react';
import { Amendment } from '@/types/star/ReviseStarProps';
import { Heading, WriteType } from '@/types/common/ResponseType';
import { StarSection } from '@/types/star/StarProps';
import {
  addSection,
  addCreateAmendment,
  modifyCreateAmendment,
  deleteCreateAmendment,
} from '@/lib/revise/revise';
import ReviseStarSectionTitle from './ReviseStarSectionTitle';
import ReviseStarSectionShow from './ReviseStarSectionShow';
import CreateButton from './CreateButton';
import StarContent from '../../components/StarContent';
import ReviseStarSectionInput from './ReviseStarSectionInput';
import { CreateDictionaryProps } from './ReviseStarForm';

interface ReviseStarSectionProps {
  sections: StarSection[];
  setSections: React.Dispatch<React.SetStateAction<StarSection[]>>;
  section: StarSection;
  addAmendment: (newAmendment: Amendment) => void;
  createAmendments: CreateDictionaryProps;
  setCreateAmendments: React.Dispatch<
    React.SetStateAction<CreateDictionaryProps>
  >;
}

// NOTE : 글의 한 섹션을 나타내는 컴포넌트 (읽기상태 + 수정상태)
const ReviseStarSection = ({
  sections,
  setSections,
  section,
  addAmendment,
  createAmendments,
  setCreateAmendments,
}: ReviseStarSectionProps) => {
  const [state, setState] = useState<'읽기' | '수정' | '추가' | '삭제'>('읽기');
  const [heading, setHeading] = useState<Heading>(section.heading);
  const [beforeTitle, setBeforeTitle] = useState<string>(section.title);
  const [afterTitle, setAfterTitle] = useState<string>(section.title);
  const [beforeContent, setBeforeContent] = useState<string>(section.content);
  const [afterContent, setAfterContent] = useState<string>(section.content);
  const [createHeading, setCreateHeading] = useState<Heading>(Heading.H1);
  const [createTitle, setCreateTitle] = useState<string>('');
  const [createContent, setCreateContent] = useState<string>('');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // SECTION : 수정 상태일 때 정보 담기
    if (state === '수정') {
      if (beforeTitle !== afterTitle || beforeContent !== afterContent) {
        if (section.creatingOrder !== 0) {
          // 추가 후 수정할 경우
          const newAmendment = {
            sectionId: section.sectionId,
            type: WriteType.CREATE,
            newSectionHeading: heading,
            newSectionTitle: afterTitle,
            newSectionContent: afterContent,
            creatingOrder: section.creatingOrder,
          };
          const newCreateAmendments = modifyCreateAmendment({
            sectionKey: section.sectionId,
            order: section.creatingOrder,
            dict: createAmendments,
            newAmendment,
          });
          setCreateAmendments(newCreateAmendments);
        } else {
          // 기존 문단을 수정할 경우
          addAmendment({
            sectionId: section.sectionId,
            type: WriteType.UPDATE,
            newSectionHeading: heading,
            newSectionTitle: afterTitle,
            newSectionContent: afterContent,
            creatingOrder: section.creatingOrder,
          });
        }
        setBeforeTitle(afterTitle);
        setBeforeContent(afterContent);
      }
      setState('읽기');

      // SECTION : 추가 상태일 때 정보 담기
    } else if (state === '추가') {
      if (createTitle !== '' || createContent !== '') {
        const newAmendment = {
          sectionId: section.sectionId,
          type: WriteType.CREATE,
          newSectionHeading: createHeading,
          newSectionTitle: createTitle,
          newSectionContent: createContent,
          creatingOrder: section.creatingOrder + 1,
        };
        const newCreateAmendments = addCreateAmendment({
          // 이전 섹션 다음에 추가
          sectionKey: section.sectionId,
          order: section.creatingOrder, // (추가 위치) creatingOrder는 1부터 시작
          dict: createAmendments,
          newAmendment,
        });
        setCreateAmendments(newCreateAmendments);

        const newSection = {
          sectionId: section.sectionId,
          revision: 0,
          heading: createHeading,
          title: createTitle,
          content: createContent,
          creatingOrder: section.creatingOrder + 1,
        };
        const newSections = addSection({ sections, newSection });
        setSections(newSections);

        setCreateTitle('');
        setCreateContent('');
      }
      setState('읽기');

      // SECTION : 삭제 상태일 때 정보 담기
    } else if (state === '삭제') {
      if (section.creatingOrder !== 0) {
        // 추가 후 삭제할 경우
        const newCreateAmendments = deleteCreateAmendment({
          sectionKey: section.sectionId,
          order: section.creatingOrder - 1, // 삭제 위치 (creatingOrder는 1부터 시작하기 때문에 -1)
          dict: createAmendments,
        });
        setCreateAmendments(newCreateAmendments);
      } else {
        // 기존 문단을 삭제할 경우
        addAmendment({
          sectionId: section.sectionId,
          type: WriteType.DELETE,
          newSectionHeading: heading,
          newSectionTitle: afterTitle,
          newSectionContent: '',
          creatingOrder: section.creatingOrder,
        });
      }
      setBeforeTitle(afterTitle);
      setBeforeContent('');
    }
    setState('읽기');
  };

  return (
    <>
      {/* {section.sectionId === 1 && (
        <CreateButton state={state} setRevise={setRevise} />
      )} */}

      {/* SECTION : 읽기모드 */}
      {state === '읽기' && (
        <>
          <ReviseStarSectionShow
            heading={heading}
            title={beforeTitle}
            content={beforeContent}
            setState={setState}
          />
          <CreateButton state={state} setState={setState} />
        </>
      )}

      {/* SECTION : 추가모드 */}
      {state === '추가' && (
        <>
          <ReviseStarSectionShow
            heading={heading}
            title={afterTitle}
            content={afterContent}
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
            content={createContent}
            setContent={setCreateContent}
          />
        </>
      )}

      {/* SECTION : 수정 모드(글쓰기 모드) */}
      {state === '수정' && (
        <>
          <ReviseStarSectionTitle
            heading={heading}
            setHeading={setHeading}
            title={afterTitle}
            setTitle={setAfterTitle}
            handleClick={handleButtonClick}
          />
          <ReviseStarSectionInput
            content={beforeContent}
            setContent={setAfterContent}
          />
        </>
      )}

      {/* SECTION : 삭제모드 */}
      {state === '삭제' && (
        // TODO : 배경 빨간색으로 만들어주기, 삭제 범위 확인하기
        <>
          <ReviseStarSectionTitle
            heading={heading}
            setHeading={setHeading}
            title={afterTitle}
            setTitle={setAfterTitle}
            handleClick={handleButtonClick}
          />
          <StarContent content="" />
        </>
      )}
    </>
  );
};

export default ReviseStarSection;
