import apiClient from '@/service/login/axiosClient';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const getMentionId = async (selectedText: string) => {
  if (selectedText === '') {
    return '';
  }
  try {
    console.log('selectedText:', selectedText);
    const response = await apiClient.get('/api/documents/search', {
      params: {
        title: selectedText,
        limit: 1,
      },
    });
    const { data } = response;
    if (data.results.length === 0) {
      throw new Error('해당하는 문서가 없습니다.');
      alert('해당하는 문서가 없습니다.');
    } else {
      const starId = data.results[0].documentId;
      return starId;
    }
  } catch (error) {
    throw new Error('해당하는 문서가 없습니다.');
  }
};

const LinkifyExtension = Extension.create({
  name: 'linkify',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('linkify'),
        props: {
          handleDOMEvents: {
            input(view: EditorView, event: Event) {
              const inputEvent = event as InputEvent;
              if (
                inputEvent.inputType === 'insertText' &&
                inputEvent.data === ']'
              ) {
                // 사용자가 입력을 완료할 때 (두 번째 ']' 입력 후) 패턴 검사
                const { doc } = view.state; // ProseMirror에서 현재 문서를 나타내는 객체
                const text = doc.textBetween(0, doc.content.size, '\n'); // 현재 문서의 전체 텍스트를 추출
                const matches = Array.from(text.matchAll(/\[\[(.*?)\]\]/g)); // [[...]] 형식에 매칭되는 모든 패턴을 추출
                matches.forEach(async match => {
                  const selectedText = match[1];
                  const start = match.index;

                  if (start !== undefined) {
                    const end = start + match[0].length + 2;
                    const documentId = await getMentionId(selectedText);

                    if (documentId) {
                      view.dispatch(
                        view.state.tr
                          .addMark(
                            start,
                            end,
                            view.state.schema.marks.link.create({
                              href: `http://www.stelligence.site/stars/${documentId}`,
                            }),
                          )
                          .removeStoredMark(view.state.schema.marks.link), // Optional: Remove link mark from the selection
                      );
                      view.updateState(view.state);
                    }
                  }
                });
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});

export default LinkifyExtension;
