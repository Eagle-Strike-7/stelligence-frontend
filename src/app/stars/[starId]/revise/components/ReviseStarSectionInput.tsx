'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import FixedMenu from '@/components/Common/Star/StarContentInput/FixedMenu';
import styles from '../../../../../styles/starSectionInput.module.css';

interface StarContentProps {
  state?: '읽기' | '수정' | '추가' | '삭제';
  content: string;
  setContent: (content: string) => void;
}
// NOTE : 글 섹션의 내용의 수정/추가를 입력받는 컴포넌트 (TipTap)
const ReviseStarSectionInput = ({
  state,
  content,
  setContent,
}: StarContentProps) => {
  if (state === '추가') {
    content = '';
  }

  const editor = useEditor({
    extensions: [StarterKit, Image, Underline],
    content,
    onUpdate: () => {
      if (editor) {
        const htmlContent = editor.getHTML();
        setContent(htmlContent);
      }
    },
  });

  const logContent = () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      console.log(htmlContent);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md">
      {editor && <FixedMenu editor={editor} />}
      <EditorContent editor={editor} className={styles.ProseMirror} />

      <button type="button" onClick={logContent}>
        Log Content
      </button>
    </div>
  );
};

export default ReviseStarSectionInput;
