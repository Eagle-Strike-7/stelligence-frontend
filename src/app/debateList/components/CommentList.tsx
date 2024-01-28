import React from 'react';
import Comment from './CommentCard';

const CommentList = () => {
  // FIXME - 추후에 서버 연결 후 삭제할 더미 데이터
  const commentList = [
    {
      userImg: 'sdfsd',
      userName: '독수리타법 7남매',
      commentContent: '우주에는 마리모가 없습니다',
      isWriter: true,
      time: 'asdfsd',
    },
    {
      userImg: 'sdfsd',
      userName: '동기와비동',
      commentContent: '마리모는 배가 고프다는데 동물 아닐까요?',
      isWriter: false,
      time: 'asdfsd',
    },
    {
      userImg: 'sdfsd',
      userName: '여행가가',
      commentContent: '마리모는 식물임이 틀림없습니다.',
      isWriter: true,
      time: 'asdfsd',
    },
  ];

  return (
    <div className="flex flex-col w-full mb-20">
      <span className="w-32 text-lg font-bold mt-3 flex-shrink-0">
        작성된 댓글({commentList.length})
      </span>
      {commentList.map(comment => {
        return (
          <Comment
            key={comment.time}
            userImg={comment.userImg}
            userName={comment.userName}
            commentContent={comment.commentContent}
            isWriter={comment.isWriter}
            time={comment.time}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
