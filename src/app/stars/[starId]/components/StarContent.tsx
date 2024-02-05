'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import styles from '../../../../styles/starContent.module.css';

// NOTE : 상세보기 페이지, 글의 내용을 보여주는 컴포넌트
// TODO : 편집중 여부 표시
const StarContent = ({ content }: { content: string }) => {
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content]);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });
  if (!editor) {
    return (
      <div className="flex flex-col w-full my-8">별 보러 가는 중...⭐️</div>
    );
  }

  return (
    <div className="flex flex-col w-full my-8">
      <EditorContent editor={editor} className={styles.ProseMirror} />
    </div>
  );
};

export default StarContent;
