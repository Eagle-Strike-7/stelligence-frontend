import { StarSection } from '@/types/star/StarProps';
import { CreateDictionaryProps } from '@/app/stars/[starId]/revise/components/ReviseStarForm';
import { Amendment } from '@/types/star/ReviseStarProps';

interface AddSectionProps {
  sections: StarSection[];
  newSection: StarSection;
}

interface AddCreateAmendmentProps {
  sectionKey: number;
  order: number;
  dict: CreateDictionaryProps;
  newAmendment: Amendment;
}

interface DeleteCreateAmendmentProps {
  sectionKey: number;
  order: number;
  dict: CreateDictionaryProps;
}

// NOTE : 추가한 섹션 보여주기
const addSection = ({ sections, newSection }: AddSectionProps) => {
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

// NOTE : 추가한 섹션 관리
const addCreateAmendment = ({
  sectionKey,
  order,
  dict,
  newAmendment,
}: AddCreateAmendmentProps) => {
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

// NOTE : 추가한 섹션의 내용 수정
const modifyCreateAmendment = ({
  sectionKey,
  order,
  dict,
  newAmendment,
}: AddCreateAmendmentProps) => {
  if (sectionKey in dict) {
    dict[sectionKey] = dict[sectionKey].map(amendment => {
      return amendment.creatingOrder === order ? newAmendment : amendment;
    });
  }
  return dict;
};

// NOTE : 추가한 섹션의 내용 삭제
const deleteCreateAmendment = ({
  sectionKey,
  order,
  dict,
}: DeleteCreateAmendmentProps) => {
  if (sectionKey in dict) {
    dict[sectionKey].splice(order, 1);
    dict[sectionKey].forEach((amendment, index) => {
      if (index >= order + 1) {
        amendment.creatingOrder = index;
      }
    });
  }
  return dict;
};

export {
  addCreateAmendment,
  modifyCreateAmendment,
  deleteCreateAmendment,
  addSection,
};
