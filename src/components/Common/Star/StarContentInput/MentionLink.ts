import apiClient from '@/service/login/axiosClient';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const getMentionId = async (selectedText: string) => {
  if (selectedText === '') {
    return '';
  }
  try {
    const response = await apiClient.get('/api/documents/exact-search', {
      params: {
        title: selectedText,
        limit: 1,
      },
    });
    const { data } = response;
    console.log(data);
    if (data.results.length === 0) {
      alert('해당하는 문서가 없습니다.');
      throw new Error('해당하는 문서가 없습니다.');
    } else {
      const starId = data.results.documentId;
      return starId;
    }
  } catch (error) {
    alert('해당하는 문서가 없습니다.');
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
                  const fullMatchText = match[0];

                  if (match.index !== undefined) {
                    let start = match.index + 1; // 공백 안 밀리게 1추가
                    const textBeforeMatch = text.slice(0, start);
                    const newlinesBeforeMatch = (
                      textBeforeMatch.match(/\n/g) || []
                    ).length; // \n개수만큼 앞으로 당겨져서 원래 글의 \n의 개수를 세기 (null일때 빈배열 처리)

                    // '\n' 문자의 개수만큼 start 인덱스를 조정
                    start += newlinesBeforeMatch;

                    const end = start + fullMatchText.length;
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
