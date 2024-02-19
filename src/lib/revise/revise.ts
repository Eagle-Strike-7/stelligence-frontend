import { StarSection } from '@/types/star/StarProps';
import { DictionaryProps } from '@/app/stars/[starId]/revise/components/ReviseStarForm';
import { Amendment } from '@/types/star/ReviseStarProps';
import { WriteType, Heading } from '@/types/common/ResponseType';

interface SectionProps {
  sections: StarSection[];
  newSection: StarSection;
}

interface DeleteSectionProps {
  sections: StarSection[];
  sectionKey: number;
  order: number;
}

interface AddAmendmentProps {
  sectionKey: number;
  order: number;
  dict: DictionaryProps;
  newAmendment: Amendment;
}

interface DeleteAmendmentProps {
  sectionKey: number;
  order: number;
  dict: DictionaryProps;
}

// NOTE : 추가한 섹션 보여주기
const addSection = ({ sections, newSection }: SectionProps) => {
  const index = sections.findIndex(section => {
    return (
      section.sectionId === newSection.sectionId &&
      section.creatingOrder === newSection.creatingOrder - 1
    );
  });

  const newSections = [
    ...sections.slice(0, index + 1), // 이전 색션까지 처리
    newSection,
    ...sections.slice(index + 1).map(section => {
      // 추가한 섹션(index+1) 뒤부터 확인
      if (section.sectionId === newSection.sectionId) {
        // 같은 섹션이면 추가한 뒷부분의 순서 미루기
        return { ...section, creatingOrder: section.creatingOrder + 1 };
      }
      return section;
    }),
  ];
  return newSections;
};

// NOTE : 수정한 섹션 보여주기
const updateSection = ({ sections, newSection }: SectionProps) => {
  let index;
  if (newSection.creatingOrder === 0) {
    index = sections.findIndex(section => {
      return section.sectionId === newSection.sectionId;
    });
    index -= 1;
  } else {
    index = sections.findIndex(section => {
      return (
        section.sectionId === newSection.sectionId &&
        section.creatingOrder === newSection.creatingOrder - 1
      );
    });
  }

  const newSections = [
    ...sections.slice(0, index + 1), // 이전 색션까지 처리
    newSection,
    ...sections.slice(index + 2, sections.length),
  ];
  return newSections;
};

// NOTE : 삭제한 섹션
const deleteSection = ({ sections, sectionKey, order }: DeleteSectionProps) => {
  const newSections = sections.filter(section => {
    return section.sectionId !== sectionKey || section.creatingOrder !== order;
  });
  return newSections;
};

// NOTE : 섹션 추가 요청
const addAmendment = ({
  sectionKey,
  order,
  dict,
  newAmendment,
}: AddAmendmentProps) => {
  if (sectionKey in dict) {
    dict[sectionKey].splice(order, 0, newAmendment);
    dict[sectionKey].forEach((amendment, index) => {
      if (index >= order + 1) {
        amendment.creatingOrder = index + 1; // creatingOrder 미뤄주기
      }
    });
  } else {
    dict[sectionKey] = [newAmendment];
  }
  return dict;
};

// NOTE : 섹션 수정 요청
const updateAmendment = ({
  sectionKey,
  order,
  dict,
  newAmendment,
}: AddAmendmentProps) => {
  if (sectionKey in dict) {
    dict[sectionKey] = dict[sectionKey].map(amendment => {
      return amendment.creatingOrder === order ? newAmendment : amendment;
    });
  } else if (order === 0) {
    dict[sectionKey] = [newAmendment];
  }
  return dict;
};

// NOTE : 섹션 삭제 요청
const deleteAmendment = ({ sectionKey, order, dict }: DeleteAmendmentProps) => {
  if (sectionKey in dict) {
    dict[sectionKey].splice(order, 1);
    dict[sectionKey].forEach((amendment, index) => {
      if (index >= order + 1) {
        amendment.creatingOrder = index;
      }
    });
  }
  if (order === 0) {
    // 기존 섹션
    const newAmendment = {
      sectionId: sectionKey,
      type: WriteType.DELETE,
      newSectionHeading: Heading.H1,
      newSectionTitle: '',
      newSectionContent: '',
      creatingOrder: order,
    };
    dict[sectionKey] = [newAmendment];
  }
  return dict;
};

export {
  addSection,
  updateSection,
  deleteSection,
  addAmendment,
  updateAmendment,
  deleteAmendment,
};
