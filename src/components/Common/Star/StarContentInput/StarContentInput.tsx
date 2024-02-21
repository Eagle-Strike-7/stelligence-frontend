'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Node } from '@tiptap/core';
import FixedMenu from './FixedMenu';
import styles from '../../../../styles/starSectionInput.module.css';
// import CustomPasteHandler from './ImageExtension';
import LinkifyExtension from './MentionLink';

interface StarContentProps {
  content: string;
  setContent: (content: string) => void;
}

// NOTE : 글 전체의 내용을 입력받는 컴포넌트 (TipTap)
const StarContentInput = ({ content, setContent }: StarContentProps) => {
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
      // CustomPasteHandler,
      Underline,
      LinkifyExtension,
      Link.configure({
        openOnClick: true,
        autolink: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          console.log(node.type.name);
          if (node.type.name === 'heading') {
            return '#, ##, ###을 통해 문단을 구분해보세요!';
          }

          return 'Can you add some further context?';
        },
      }),
    ],
    content,
    onUpdate: () => {
      if (editor) {
        const htmlContent = editor.getHTML();
        setContent(htmlContent);
      }
    },
  });

  // FIXME : 콘솔 삭제
  // const logContent = () => {
  //   if (editor) {
  //     const htmlContent = editor.getHTML();
  //     console.log(htmlContent);
  //   }
  // };

  return (
    <div className="rounded-md border border-[#303134]">
      {editor && <FixedMenu editor={editor} />}
      <EditorContent editor={editor} className={styles.ProseMirror} />

      {/* <button type="button" className="text-white" onClick={logContent}>
        Log Content
      </button> */}
    </div>
  );
};

export default StarContentInput;
