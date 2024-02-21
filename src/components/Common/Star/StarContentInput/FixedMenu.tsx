import React, { useRef } from 'react';
import { Editor } from '@tiptap/core';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListNumbered,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from 'react-icons/md';
import { IoCode, IoListSharp } from 'react-icons/io5';
import { PiCodeBlockBold } from 'react-icons/pi';
import { BsChatSquareQuote } from 'react-icons/bs';
import { LuImage } from 'react-icons/lu';
import axios from 'axios';

// NOTE : 글 전체/섹션의 내용을 입력받는 컴포넌트 (TipTap의 메뉴바)
const FixedMenu = ({ editor }: { editor: Editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }
  const handleClickImage = () => {
    fileInputRef.current?.click();
  };

  // NOTE : 업로드한 이미지 URL로 변환하는 요청
  const postImage = async (blobFile: Blob) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/images/upload`,
        blobFile,
        {
          headers: {
            'Content-Type': blobFile.type,
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        return response.data.results;
      }
      alert('사진 첨부 실패');
      return undefined;
    } catch (error) {
      // 요청 실패하면 에러 출력
      alert('사진 첨부 실패');
      console.error('Error:', error);
      return undefined;
    }
  };

  // NOTE : 글 작성창에 이미지 업로드
  const uploadImage = (file: File): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async () => {
        const arrayBuffer = reader.result;
        if (arrayBuffer) {
          const blob = new Blob([arrayBuffer], { type: file.type });
          try {
            const response = await postImage(blob);
            if (response) {
              resolve(response);
            } else {
              reject(new Error('Image upload failed'));
            }
          } catch (error) {
            reject(new Error((error as Error).message)); // FIXME : react query로 변경할 것!
          }
        } else {
          reject(new Error('File read failed'));
        }
      };

      reader.onerror = error => {
        console.error('FileReader error:', error);
        reject(new Error('FileReader error')); // FileReader 에러 처리
      };
    });
  };

  return (
    <div className="flex justify-center bg-[#303134] border-b border-[#212121]">
      <ButtonGroup isAttached variant="ghost">
        {/* NOTE : 볼드체 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('bold')}
        >
          <MdFormatBold className="text-white" />
        </Button>

        {/* NOTE : 이탤릭체 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('italic')}
        >
          <MdFormatItalic className="text-white" />
        </Button>

        {/* NOTE : 밑줄 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('underline')}
        >
          <MdFormatUnderlined className="text-white" />
        </Button>

        {/* NOTE : 취소선 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('strike')}
        >
          <MdFormatStrikethrough className="text-white" />
        </Button>

        {/* NOTE : 코드 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleCode().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('code')}
        >
          <IoCode className="text-white" />
        </Button>

        <span className="pt-2.5 text-bold text-gray-300"> | </span>
        {/* NOTE : 글머리기호 목록 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('bulletList')}
        >
          <IoListSharp className="text-white" />
        </Button>

        {/* NOTE : 번호 매기기 목록 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('orderedList')}
        >
          <MdFormatListNumbered className="text-white" />
        </Button>

        {/* NOTE : 인용문 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('blockquote')}
        >
          <BsChatSquareQuote className="text-white" />
        </Button>

        {/* NOTE : 코드블럭 */}
        <Button
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
          isActive={editor.isActive('codeBlock')}
        >
          <PiCodeBlockBold className="text-white" />
        </Button>

        <span className="pt-2.5 text-bold text-gray-300"> | </span>

        {/* NOTE : 사진 */}
        <Button
          onClick={handleClickImage}
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _active={{
            bg: 'rgba(118, 147, 231, 0.5)',
            transition: 'background-color 0.2s ease',
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={async e => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];

                const maxSize = 3 * 1024 * 1024; // 10MB
                if (file.size > maxSize) {
                  alert('파일 크기가 3MB를 초과했습니다.');
                  return;
                }
                try {
                  const imageURL = await uploadImage(file); // 이미지 주소값으로 변환
                  if (imageURL) {
                    // 주소값으로 이미지 추가
                    editor.chain().focus().setImage({ src: imageURL }).run();
                  } else {
                    console.log('이미지 업로드 실패');
                  }
                } catch (error) {
                  console.log(e.target.files);
                }
              }
            }}
            className="hidden"
          />
          <LuImage className="text-white" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default FixedMenu;
