import {
  createComment,
  deleteComment,
  updateComment,
} from '@/service/debate/comment';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('댓글 기능', () => {
  // NOTE 댓글 작성 테스트 로직
  describe('댓글 작성', () => {
    beforeEach(() => {
      // 각 테스트가 실행되기 전에 axios 호출 결과를 초기화합니다.
      mockedAxios.post.mockClear();
    });

    test('기본 댓글 작성', async () => {
      // 모킹된 axios.post 호출에 대한 반환 값 설정
      mockedAxios.post.mockResolvedValue({
        data: {
          success: true,
          id: 1,
          content: '새 댓글입니다.',
        },
      });

      const result = await createComment('새 댓글입니다.');
      expect(result).toHaveProperty('id');
      expect(result.content).toBe('새 댓글입니다.');
      // NOTE Axios 호출이 예상대로 실행되었는지 확인
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    test('다른 댓글 태그 시 (멘션 기능)', async () => {
      // 멘션 기능 포함하여 댓글 작성
      const result = await createComment('#1 새로운 댓글!');
      expect(result.content).toContain('#1');
    });

    test('빈 댓글 작성 시도', async () => {
      await expect(createComment('')).rejects.toThrow(
        '댓글 내용이 비어있습니다.',
      );
    });

    test('글자 수 제한 초과 시', async () => {
      const longContent = 'a'.repeat(1001); // 예시로 1000자 제한 가정
      await expect(createComment(longContent)).rejects.toThrow(
        '글자 수 제한을 초과했습니다.',
      );
    });
  });

  // NOTE 댓글 수정 테스트 로직
  describe('댓글 수정', () => {
    beforeEach(() => {
      // 각 테스트가 실행되기 전에 axios 호출 결과를 초기화합니다.
      mockedAxios.patch.mockClear();
    });

    test('기본 댓글 수정', async () => {
      mockedAxios.patch.mockResolvedValue({
        data: {
          success: true,
          content: '수정된 댓글 내용',
        },
      });

      const result = await updateComment(1, '수정된 댓글 내용', 1);
      expect(result.content).toBe('수정된 댓글 내용');
      expect(mockedAxios.patch).toHaveBeenCalled();
    });

    test('수정 권한 없는 사용자의 수정 시도', async () => {
      await expect(updateComment(1, '무단 수정 시도', 1)).rejects.toThrow(
        '수정 권한이 없습니다.',
      );
    });

    test('수정 시 글자 수 제한 초과', async () => {
      const longContent = 'a'.repeat(1001);
      await expect(updateComment(1, longContent, 1)).rejects.toThrow(
        '글자 수 제한을 초과했습니다.',
      );
    });
  });

  describe('댓글 삭제', () => {
    // NOTE 댓글 삭제 테스트 로직
    beforeEach(() => {
      mockedAxios.delete.mockClear();
    });

    test('기본 댓글 삭제', async () => {
      mockedAxios.delete.mockResolvedValue({
        data: {
          success: true,
        },
      });

      const result = await deleteComment(1, 1);
      expect(result).toBeTruthy();
      expect(mockedAxios.delete).toHaveBeenCalled();
    });
    test('삭제 권한 없는 사용자의 삭제 시도', async () => {
      await expect(deleteComment(1, 1)).rejects.toThrow(
        '삭제 권한이 없습니다.',
      );
    });

    test('삭제 후 댓글 목록 갱신 확인', async () => {
      const updatedComments = await deleteComment(1, 1);
      expect(updatedComments).not.toContainEqual(
        expect.objectContaining({ id: 1 }),
      );
    });

    // NOTE 댓글 알림
    describe('댓글 알림', () => {
      test('다른 사용자가 댓글 작성 시 알림', async () => {
        // TODO 추가 필요
      });
    });
  });

  // TODO 댓글 신고 테스트 로직 추후 추가
});
