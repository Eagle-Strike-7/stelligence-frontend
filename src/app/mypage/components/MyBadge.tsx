import React from 'react';

interface MyBadgeProps {
  title: string;
  image: string;
  description: string;
}

const MyBadge: React.FC<MyBadgeProps> = ({ title, image, description }) => {
  return (
    <div className="relative flex flex-col bg-accent-light rounded-xl p-3 gap-2 w-32">
      <img
        src={image}
        alt={`${title} 배지 이미지`}
        className="w-20 h-20 mx-auto"
      />
      <p className="text-sm text-white font-bold truncate w-full text-center">
        {title}
      </p>
      <div className="absolute top-0 left-0 w-full h-full rounded-xl flex flex-col justify-center bg-black opacity-0 transition-all p-1 -translate-y-2 text-wrap z-10 hover:opacity-80 hover:translate-y-0">
        <h3 className="text-sm text-white font-bold text-center opacity-100">
          {description}
        </h3>
      </div>
    </div>
  );
};

export default MyBadge;
