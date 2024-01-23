import React from 'react';

interface MyBadgeProps {
  title: string;
  image: string;
}

const MyBadge: React.FC<MyBadgeProps> = ({ title, image }) => {
  return (
    <div className="flex flex-col bg-accent-light rounded-xl p-3 gap-2 w-32">
      <img
        src={image}
        alt={`${title} 배지 이미지`}
        className="w-20 h-20 mx-auto"
      />
      <p className="text-sm text-white font-bold truncate w-full text-center">
        {title}
      </p>
    </div>
  );
};

export default MyBadge;
