'use client';

import React from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
// import { Placeholder } from '@tiptap/extension-placeholder';
import { Node } from '@tiptap/core';
import FixedMenu from './FixedMenu';
import styles from '../../../../styles/starSectionInput.module.css';
import LinkifyExtension, { getMentionId } from './MentionLink';

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
      Underline,
      LinkifyExtension,
      Link.configure({
        openOnClick: true,
        autolink: false,
      }),
      // Placeholder.configure({
      //   placeholder: ({ node }) => {
      //     console.log(node.type.name);
      //     if (node.type.name === 'heading') {
      //       return 'What’s the title?';
      //     }

      //     return 'Can you add some further context?';
      //   },
      // }),
    ],
    content,
    onUpdate: () => {
      if (editor) {
        const htmlContent = editor.getHTML();
        setContent(htmlContent);
      }
    },
  });

  const handleLink = async () => {
    if (editor) {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, ' ');

      const starId = await getMentionId(selectedText);
      if (starId) {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: `http://www.stelligence.site/stars/${starId}` })
          .run();
      }
    }
  };

  const logContent = () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      console.log(htmlContent);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md">
      {editor && (
        <>
          <FixedMenu editor={editor} />
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <button
              type="button"
              onClick={handleLink}
              className="text-black text-sm bg-primaryLight-dark rounded-sm px-1"
            >
              Link
            </button>
          </BubbleMenu>
        </>
      )}
      <EditorContent editor={editor} className={styles.ProseMirror} />

      <button type="button" onClick={logContent}>
        Log Content
      </button>
    </div>
  );
};

export default StarContentInput;
