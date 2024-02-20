import { Amendment } from '@/types/common/Amendment';
import { WriteType } from '@/types/common/ResponseType';

const transTitleTagtoAmendment = (
  changedType: 'title' | 'tag',
  beforeContent: string,
  afterContent: string,
): Amendment => {
  const title = changedType === 'title' ? '글 제목 변경' : '상위계층태그 변경';
  const content = beforeContent || 'X';
  const requestedContent = afterContent || 'X';

  return {
    amendmentId: 0,
    type: WriteType.UPDATE,
    targetSection: {
      sectionId: 0,
      revision: 0,
      heading: 'H1',
      title,
      content,
    },
    requestedSectionHeading: 'H1',
    requestedSectionTitle: title,
    requestedSectionContent: requestedContent,
    creatingOrder: 0,
  };
};

export default transTitleTagtoAmendment;
