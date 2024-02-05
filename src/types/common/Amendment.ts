export interface Contributor {
  memberId: number;
  nickname: string;
  profileImgUrl: string;
}

export interface Amendment {
  amendmentId: number;
  type: string;
  targetSection: {
    sectionId: number;
    revision: number;
    heading: string;
    title: string;
    content: string;
  };
  requestedSectionHeading: string;
  requestedSectionTitle: string;
  requestedSectionContent: string;
  creatingOrder: number;
}
