'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useEffect } from 'react';
import styles from '@/styles/starContent.module.css';
import { WriteType } from '@/types/common/ResponseType';

// NOTE : 수정요청 사항 보여주는 컴포넌트
const ReviseContent = ({
  heading,
  title,
  content,
  type,
}: {
  heading: string;
  title: string;
  content: string;
  type?: WriteType;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
    editable: false,
  });

  useEffect(() => {
    let totalContent;
    // NOTE 타입에 따라서 다른 컨텐츠 렌더링
    totalContent =
      heading !== ''
        ? `<${heading.toLowerCase()}>${title}</${heading.toLowerCase()}>${content}`
        : '';
    if (type === WriteType.DELETE) {
      totalContent =
        heading !== ''
          ? `<s><${heading.toLowerCase()}>${title}</${heading.toLowerCase()}>${content}</s>`
          : '';
    }

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
    <div className="flex flex-col w-full mb-3">
      <EditorContent
        editor={editor}
        className={`${styles.ProseMirror} ${styles.revise__content} ${type === WriteType.CREATE && styles.created} ${type === WriteType.DELETE && styles.deleted}`}
      />
    </div>
  );
};

export default ReviseContent;
