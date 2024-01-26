import React from 'react';
import DebateListCard from './DebateListCard';

const PagePreview = () => {
  // FIXME - 서버 연결 후 삭제할 더미 데이터
  const commentedUsersInfo = {
    userImg: 'http',
    userName: '독수리타법 8남매',
    commentContent:
      '작성자님은 아니라고 하셨지만 저는 마리모는 식물이라고 생각합니다.',
    isWriter: false,
    time: '2024/01/05 11:30',
  };

  return (
    <div className="flex flex-row gap-2 mb-10">
      <div className="flex flex-col w-full mb-6 ">
        <span className="w-32 text-lg font-bold mt-3 flex-shrink-0">
          이전페이지
        </span>
        <DebateListCard
          originalTitle={commentedUsersInfo.commentContent}
          title={commentedUsersInfo.commentContent}
          username={commentedUsersInfo.userName}
          time={commentedUsersInfo.time}
          option={{ commentNum: 2 }}
        />
      </div>
      <div className="flex flex-col w-full mb-6 ">
        <span className="w-full text-lg font-bold mt-3 flex-shrink-0 text-right">
          다음페이지
        </span>
        <DebateListCard
          originalTitle={commentedUsersInfo.commentContent}
          title={commentedUsersInfo.commentContent}
          username={commentedUsersInfo.userName}
          time={commentedUsersInfo.time}
          option={{ commentNum: 2 }}
        />
      </div>
    </div>
  );
};

export default PagePreview;
