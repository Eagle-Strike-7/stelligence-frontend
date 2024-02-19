import React, { useState } from 'react';
import { Heading, WriteType } from '@/types/common/ResponseType';
import { StarSection } from '@/types/star/StarProps';
import {
  addSection,
  addAmendment,
  updateAmendment,
  deleteAmendment,
  updateSection,
  deleteSection,
} from '@/lib/revise/revise';
import ReviseStarSectionTitle from './ReviseStarSectionTitle';
import ReviseStarSectionShow from './ReviseStarSectionShow';
import CreateButton from './CreateButton';
import ReviseStarSectionInput from './ReviseStarSectionInput';
import { DictionaryProps } from './ReviseStarForm';

interface ReviseStarSectionProps {
  sections: StarSection[];
  setSections: React.Dispatch<React.SetStateAction<StarSection[]>>;
  section: StarSection;
  createAmendments: DictionaryProps;
  setCreateAmendments: React.Dispatch<React.SetStateAction<DictionaryProps>>;
  existingAmendments: DictionaryProps;
  setExistingAmendments: React.Dispatch<React.SetStateAction<DictionaryProps>>;
}

// NOTE : 글의 한 섹션을 나타내는 컴포넌트 (읽기상태 + 수정상태)
const ReviseStarSection = ({
  sections,
  setSections,
  section,
  createAmendments,
  setCreateAmendments,
  existingAmendments,
  setExistingAmendments,
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

    // SECTION : 섹션 수정
    if (state === '수정') {
      if (beforeTitle !== afterTitle || beforeContent !== afterContent) {
        if (section.creatingOrder !== 0) {
          // NOTE : 추가 후 수정할 경우
          const newAmendment = {
            sectionId: section.sectionId,
            type: WriteType.CREATE,
            newSectionHeading: heading,
            newSectionTitle: afterTitle,
            newSectionContent: afterContent,
            creatingOrder: section.creatingOrder,
          };
          const newCreateAmendments = updateAmendment({
            sectionKey: section.sectionId,
            order: section.creatingOrder,
            dict: createAmendments,
            newAmendment,
          });
          setCreateAmendments(newCreateAmendments);

          const newSection = {
            sectionId: section.sectionId,
            revision: 0,
            heading,
            title: afterTitle,
            content: afterContent,
            creatingOrder: section.creatingOrder,
          };
          const newSections = updateSection({
            sections,
            newSection,
          });
          setSections(newSections);
          // console.log('추가-수정 후 createAmendments', createAmendments);
          // console.log('추가-수정 후 sections', sections);
        } else {
          // NOTE : 기존 문단을 수정할 경우
          const newAmendment = {
            sectionId: section.sectionId,
            type: WriteType.UPDATE,
            newSectionHeading: heading,
            newSectionTitle: afterTitle,
            newSectionContent: afterContent,
            creatingOrder: section.creatingOrder,
          };
          const newAmendments = updateAmendment({
            sectionKey: section.sectionId,
            order: section.creatingOrder,
            dict: existingAmendments,
            newAmendment,
          });
          setExistingAmendments(newAmendments);

          const newSection = {
            sectionId: section.sectionId,
            revision: section.revision,
            heading,
            title: afterTitle,
            content: afterContent,
            creatingOrder: section.creatingOrder,
          };
          const newSections = updateSection({
            sections,
            newSection,
          });
          setSections(newSections);
          // console.log('기존 수정 후 newAmendment', newAmendment);
          // console.log('기존 수정 후 existingAmendments', existingAmendments);
          // console.log('기존 수정 후 sections', sections);
        }
        setBeforeTitle(afterTitle);
        setBeforeContent(afterContent);
      }
      setState('읽기');

      // SECTION : 섹션 추가
    } else if (state === '추가') {
      if (createTitle !== '' || createContent !== '') {
        // NOTE : 추가
        const newAmendment = {
          sectionId: section.sectionId,
          type: WriteType.CREATE,
          newSectionHeading: createHeading,
          newSectionTitle: createTitle,
          newSectionContent: createContent,
          creatingOrder: section.creatingOrder + 1,
        };
        const newCreateAmendments = addAmendment({
          sectionKey: section.sectionId,
          order: section.creatingOrder, // 추가 위치: 이전섹션 다음 (creatingOrder는 1부터 시작하기 때문에 그대로 사용)
          dict: createAmendments,
          newAmendment,
        });
        setCreateAmendments(newCreateAmendments);

        // NOTE : sections 추가하기
        const newSection = {
          sectionId: section.sectionId,
          revision: 0,
          heading: createHeading,
          title: createTitle,
          content: createContent,
          creatingOrder: section.creatingOrder + 1, // 이전섹션 다음
        };
        const newSections = addSection({ sections, newSection });
        setSections(newSections);

        setCreateTitle('');
        setCreateContent('');
      }
      // console.log('추가 후 createAmendments', createAmendments);
      // console.log('추가 후 sections', sections);
      setState('읽기');

      // SECTION : 섹션 삭제
    } else if (state === '읽기') {
      // FIXME : 삭제 버튼 -> alert 창을 통해 넘어옴 -> state 삭제 변경 전에 함수 실행됨
      if (section.creatingOrder !== 0) {
        // NOTE : 추가 후 삭제할 경우
        const newCreateAmendments = deleteAmendment({
          sectionKey: section.sectionId,
          order: section.creatingOrder - 1, // 삭제 위치: 현재 섹션 (creatingOrder는 1부터 시작하기 때문에 -1)
          dict: createAmendments,
        });
        setCreateAmendments(newCreateAmendments);

        // console.log('삭제 후 createAmendments', createAmendments);
        // console.log('삭제 후 sections', sections);
      } else {
        // NOTE : 기존 문단을 삭제할 경우
        const newAmendments = deleteAmendment({
          sectionKey: section.sectionId,
          order: section.creatingOrder, // 삭제 위치: 현재 섹션 (creatingOrder는 1부터 시작하기 때문에 -1)
          dict: existingAmendments,
        });
        setExistingAmendments(newAmendments);
        // console.log('기존 삭제 후 existingAmendments', existingAmendments);
        // console.log('기존 삭제 후 sections', sections);
      }
      const newSections = deleteSection({
        sections,
        sectionKey: section.sectionId,
        order: section.creatingOrder,
      });
      setSections(newSections);
    }
    setState('읽기');
  };

  return (
    <>
      {/* SECTION : 읽기모드 */}
      {(state === '읽기' || state === '삭제') && (
        <>
          {(section.sectionId !== 0 || section.creatingOrder !== 0) && (
            <ReviseStarSectionShow
              heading={heading}
              title={beforeTitle}
              content={beforeContent}
              setState={setState}
              handleClick={handleButtonClick}
            />
          )}
          <CreateButton state={state} setState={setState} />
        </>
      )}

      {/* SECTION : 추가모드 */}
      {state === '추가' && (
        <>
          {section.sectionId !== 0 && (
            <ReviseStarSectionShow
              heading={heading}
              title={afterTitle}
              content={afterContent}
              setState={setState}
            />
          )}
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
        // TODO : 배경 빨간색으로 만들어주기
        <>
          <ReviseStarSectionTitle
            heading={heading}
            setHeading={setHeading}
            title=""
            setTitle={setAfterTitle}
            handleClick={handleButtonClick}
          />
          <ReviseStarSectionInput
            content={beforeContent}
            setContent={setAfterContent}
          />
        </>
      )}
    </>
  );
};

export default ReviseStarSection;
