import React from 'react';
import { Editor } from '@tiptap/core';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  MdFormatBold,
  MdFormatItalic,
  // MdFormatListBulleted,
  MdFormatListNumbered,
  // MdFormatQuote,
  MdFormatStrikethrough,
  // MdFormatUnderlined,
  // MdOutlineList,
} from 'react-icons/md';
// import { BsListUl } from 'react-icons/bs';
// import { GoListOrdered } from 'react-icons/go';
import { IoListSharp } from 'react-icons/io5';

// NOTE : 글 전체/섹션의 내용을 입력받는 컴포넌트 (TipTap의 메뉴바)
const FixedMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <ButtonGroup isAttached variant="outline">
      {/* NOTE : 볼드체 */}
      <Button
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        isActive={editor.isActive('bold')}
      >
        <MdFormatBold />
      </Button>

      {/* NOTE : 이탤릭체 */}
      <Button
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        isActive={editor.isActive('italic')}
      >
        <MdFormatItalic />
      </Button>

      {/* NOTE : 밑줄 */}
      {/* <Button
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
        isActive={editor.isActive('underline')}
      >
        <MdFormatUnderlined />
      </Button> */}

      {/* NOTE : 취소선 */}
      <Button
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}
        isActive={editor.isActive('strike')}
      >
        <MdFormatStrikethrough />
      </Button>

      {/* NOTE : 글머리기호 목록 */}
      <Button
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
        isActive={editor.isActive('bulletList')}
      >
        <IoListSharp />
      </Button>

      {/* NOTE : 번호 매기기 목록 */}
      <Button
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        isActive={editor.isActive('orderedList')}
      >
        <MdFormatListNumbered />
      </Button>

      {/* NOTE : 인용문 */}
      <Button
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
        isActive={editor.isActive('codeBlock')}
      >
        <MdFormatListNumbered />
      </Button>
    </ButtonGroup>
  );
};

export default FixedMenu;
