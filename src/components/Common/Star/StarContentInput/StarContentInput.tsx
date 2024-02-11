'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Node } from '@tiptap/core';
import FixedMenu from './FixedMenu';
import styles from '../../../../styles/starSectionInput.module.css';

interface StarContentProps {
  state?: '읽기' | '수정' | '추가' | '삭제';
  content: string;
  setContent: (content: string) => void;
}
// NOTE : 글 전체의 내용을 입력받는 컴포넌트 (TipTap)
const StarContentInput = ({ state, content, setContent }: StarContentProps) => {
  if (state === '추가') {
    content = '';
  }

  const CustomDocument = Node.create({
    name: 'doc',
    topNode: true,
    content: 'heading block*',
  });

  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: ({ node }) => {
          console.log(node.type.name);
          if (node.type.name === 'heading') {
            return 'What’s the title?';
          }

          return 'Can you add some further context?';
        },
      }),
      Underline,
    ],
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

export default StarContentInput;