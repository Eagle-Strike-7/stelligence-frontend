import React from 'react'

// FIXME: 타입은 기능구현 때 변경 예정
export interface StarSectionProps {
  id: number,
  section_title: string,
  section_content: string
}

// NOTE: 글 상세보기 섹션 컴포넌트 
const StarSection = ({section_content}: Pick<StarSectionProps, 'section_content'> ) => {
  return (
    <div className="border-2 rounded-lg p-4 bg-section-Bg">
      {section_content}
    </div>
  )
}

export default StarSection