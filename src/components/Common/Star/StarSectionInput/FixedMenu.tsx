import React from 'react';
import { Editor } from '@tiptap/core';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListNumbered,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from 'react-icons/md';
import { IoCode, IoListSharp } from 'react-icons/io5';
import { PiCodeBlockBold } from 'react-icons/pi';

// NOTE : 글 전체/섹션의 내용을 입력받는 컴포넌트 (TipTap의 메뉴바)
const FixedMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex justify-center">
      <ButtonGroup isAttached variant="ghost">
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
        <Button
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          isActive={editor.isActive('underline')}
        >
          <MdFormatUnderlined />
        </Button>

        {/* NOTE : 취소선 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
          isActive={editor.isActive('strike')}
        >
          <MdFormatStrikethrough />
        </Button>

        {/* NOTE : 코드 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleCode().run();
          }}
          isActive={editor.isActive('code')}
        >
          <IoCode />
        </Button>

        <span className="pt-2.5 text-bold text-gray-300"> | </span>
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
            editor.chain().focus().toggleBlockquote().run();
          }}
          isActive={editor.isActive('blockquote')}
        >
          <PiCodeBlockBold />
        </Button>

        {/* NOTE : 코드블럭 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
          isActive={editor.isActive('codeBlock')}
        >
          <PiCodeBlockBold />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default FixedMenu;
