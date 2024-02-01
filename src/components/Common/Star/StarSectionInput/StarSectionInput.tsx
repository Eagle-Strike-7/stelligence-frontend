'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
import { StarProps } from '@/types/newStar/newStarProps';
import FixedMenu from './FixedMenu';

// NOTE : 글 전체/섹션의 내용을 입력받는 컴포넌트 (TipTap)
const StarSectionInput = ({ star, setStar }: StarProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    onUpdate: () => {
      if (editor) {
        const htmlContent = editor.getHTML();
        setStar({ ...star, content: htmlContent });
      }
    },
  });

  const logContent = () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      // setStar({ ...star, content: htmlContent});
      console.log(htmlContent);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md">
      {editor && <FixedMenu editor={editor} />}
      <EditorContent editor={editor} className="min-h-80" />

      <button type="button" onClick={logContent}>
        Log Content
      </button>
    </div>
  );
};

export default StarSectionInput;
