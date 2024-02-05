'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import { NewStarProps } from '@/types/star/NewStarProps';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Node } from '@tiptap/core';
import FixedMenu from './FixedMenu';
import styles from '../../../../styles/starSectionInput.module.css';

// NOTE : 글 전체/섹션의 내용을 입력받는 컴포넌트 (TipTap)
const StarSectionInput = ({ star, setStar }: NewStarProps) => {
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
          // console.log(node.type.name);
          if (node.type.name === 'heading') {
            return 'What’s the title?';
          }

          return 'Can you add some further context?';
        },
      }),
      Underline,
    ],
    content: '',
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

export default StarSectionInput;
