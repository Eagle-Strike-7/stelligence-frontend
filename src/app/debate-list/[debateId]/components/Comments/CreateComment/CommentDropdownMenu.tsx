import { Tag } from '@chakra-ui/react';

const CommentDropdownMenu: React.FC<{
  items: number[];
  handleClickDropdownComment: (e: React.MouseEvent<HTMLSpanElement>) => void;
}> = ({ items, handleClickDropdownComment }) => {
  return (
    <div className="flex-col absolute max-h-[7.5rem] overflow-y-auto py-2 px-3 mt-1 rounded-md shadow-lg z-10 flex gap-2 bg-primary-dark-500/20 ">
      {items.map(item => {
        return (
          <Tag
            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            key={item}
            bg="primary.900"
            color="primary.300"
            fontWeight={700}
            id={item.toString()}
            onClick={handleClickDropdownComment}
          >
            #{item}
          </Tag>
        );
      })}
    </div>
  );
};

export default CommentDropdownMenu;
