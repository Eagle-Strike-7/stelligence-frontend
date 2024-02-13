import { StarSection } from '@/types/star/StarProps';

interface AddSectionProps {
  sections: StarSection[];
  setSections: React.Dispatch<React.SetStateAction<StarSection[]>>;
  newSection: StarSection;
}

const addSection = ({ sections, setSections, newSection }: AddSectionProps) => {
  const index = sections.findIndex(section => {
    return section.sectionId === newSection.sectionId;
  });

  setSections(prevSections => {
    return [
      ...prevSections.slice(0, index + 1),
      newSection,
      ...prevSections.slice(index + 1),
    ];
  });
};

export default addSection;
