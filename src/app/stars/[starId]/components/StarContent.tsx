'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useEffect } from 'react';
import styles from '../../../../styles/starContent.module.css';

// NOTE : 글의 내용을 읽기모드로 보여주는 컴포넌트 (tiptap)
const StarContent = ({ content }: { content: string }) => {
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content]);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    editable: false,
  });
  if (!editor) {
    return (
      <div className="flex flex-col text-white w-full">
        별 보러 가는 중...⭐️
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <EditorContent editor={editor} className={styles.ProseMirror} />
    </div>
  );
};

export default StarContent;
