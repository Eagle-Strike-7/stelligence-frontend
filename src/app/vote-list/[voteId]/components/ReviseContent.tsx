'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useEffect } from 'react';
import styles from '@/styles/starContent.module.css';

// NOTE : 수정요청 사항 보여주는 컴포넌트
const ReviseContent = ({
  heading,
  title,
  content,
}: {
  heading: string;
  title: string;
  content: string;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
    editable: false,
  });

  useEffect(() => {
    const totalContent =
      heading !== ''
        ? `<${heading.toLowerCase()}>${title}</${heading.toLowerCase()}>${content}`
        : '';

    if (editor) {
      editor.commands.setContent(totalContent);
    }
  }, [heading, title, content, editor]);

  if (!editor) {
    return (
      <div className="flex flex-col w-full my-8">별 보러 가는 중...⭐️</div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <EditorContent
        editor={editor}
        className={`${styles.ProseMirror} ${styles.revise__content}`}
      />
    </div>
  );
};

export default ReviseContent;
