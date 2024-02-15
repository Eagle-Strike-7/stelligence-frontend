import { Button, Textarea } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface EditCommentFormProps {
  updatedComment: string;
  setUpdatedComment: Dispatch<SetStateAction<string>>;
  handleUpdateComment: () => void;
}

const EditCommentForm: React.FC<EditCommentFormProps> = ({
  updatedComment,
  setUpdatedComment,
  handleUpdateComment,
}) => {return (
  <div className="flex flex-col w-full my-2 h-max">
    <Textarea
      h="max"
      bg="#212121"
      border="none"
      marginBottom={4}
      placeholder="댓글을 여기에 입력해주세요 :)"
      value={updatedComment}
      onChange={e => {return setUpdatedComment(e.target.value)}}
    />
    <Button
      w={20}
      alignSelf="end"
      size="sm"
      bg="primary.500"
      onClick={handleUpdateComment}
      _hover={{ bg: 'primary.600' }}
    >
      수정완료
    </Button>
  </div>
)};

export default EditCommentForm;
