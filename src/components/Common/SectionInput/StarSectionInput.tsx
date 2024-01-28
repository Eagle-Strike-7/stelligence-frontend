'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import FixedMenu from './FixedMenu';

const StarSectionInput = ({ inputTitle }: { inputTitle: string }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '<p>Hello World! 🌎️</p>',
  });

  const logContent = () => {
    if (editor) {
      // const htmlContent = editor.getHTML();
      // console.log(htmlContent);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-lg font-bold mb-2">{inputTitle}</div>
      <div className="border border-gray-300 rounded-md">
        {editor && <FixedMenu editor={editor} />}
        <EditorContent editor={editor} />
        <button type="button" onClick={logContent}>
          Log Content
        </button>
      </div>
    </div>
  );
};

export default StarSectionInput;
