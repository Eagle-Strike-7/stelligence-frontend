import React from 'react';

// FIXME: 기능구현 때 삭제 예정
export interface StarSectionProps {
    id: number;
    sectionTitle: string;
    sectionContent: string;
}

// NOTE: 글 내용의 문단(섹션) 컴포넌트
const StarSection = ({
    sectionContent,
}: Pick<StarSectionProps, 'sectionContent'>) => {
    return (
        <div className="border-2 rounded-lg p-4 bg-section-Bg">
            {sectionContent}
        </div>
    );
};

export default StarSection;
