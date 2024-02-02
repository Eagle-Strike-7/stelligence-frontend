import '@testing-library/jest-dom';
import Page from '@/app/debateList/page';
import { fireEvent, render, screen } from '@testing-library/react';
import { dummyEndDebateList } from '@/constants/dummyData';
import axios from 'axios';
import { useRouter } from 'next/navigation';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/router', () => {return {
  useRouter: jest.fn(),
}});

// NOTE 토론 목록 정렬 방식 테스트 코드
describe('토론 목록 정렬 방식', () => {
  it('사용자가 정렬 옵션을 선택하면 해당 정렬에 따른 토론 목록이 렌더링된다', async () => {
    render(<Page />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '최신순' },
    });

    const headingElement = screen.getByRole('heading', {
      level: 2,
      name: '마리모는 식물이 아니라 동물입니다',
    });
    expect(headingElement).toBeInTheDocument();
  });
});

// NOTE 토론 목록 진행중/완료 필터링 테스트 코드
describe('진행중/완료 필터링', () => {
  beforeEach(() => {
    // Mocking and initial setup
    mockedAxios.get.mockResolvedValueOnce({ data: dummyEndDebateList });
    render(<Page />);
  });

  test('종료 탭 클릭 시 종료된 토론만 렌더링되어야 한다', async () => {
    fireEvent.click(screen.getByText('종료'));
    const finishedDiscussionTitle = await screen.findByText('끝난토론 예시1');
    expect(finishedDiscussionTitle).toBeInTheDocument();
  });

  test('종료 탭 클릭 시 탭의 스타일이 변경되어야 한다', () => {
    const finishedTab = screen.getByText('종료');
    fireEvent.click(finishedTab);
    expect(finishedTab).toHaveStyle('color: black');
  });

  test('종료 탭 클릭 시 select 요소가 사라져야 한다', () => {
    fireEvent.click(screen.getByText('종료'));
    const selectElement = screen.queryByRole('combobox');
    expect(selectElement).not.toBeInTheDocument();
  });
});

// NOTE 토론 목록 카드 클릭 시 페이지 이동 테스트 코드
describe('토론 카드 클릭 시 페이지 이동 테스트', () => {
  test('토론 카드를 클릭하면 해당 토론 페이지로 이동해야 한다', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    render(<Page />);

    fireEvent.click(screen.getByText('끝난토론 예시1'));

    expect(pushMock).toHaveBeenCalledWith('/debateList/1');
  });
});

// NOTE 토론 목록 페이지네이션 테스트 코드
describe('PaginationComponent', () => {
  it('특정 페이지 번호를 클릭하면 해당 페이지의 데이터가 렌더링되어야 한다', async () => {
    // 가정: 페이지 2의 데이터를 모킹합니다.
    const page2Data = {
      data: {
        items: [
          { id: 'item1', name: 'Item 1' },
          { id: 'item2', name: 'Item 2' },
        ],
        currentPage: 2,
        totalPages: 5,
      },
    };
    mockedAxios.get.mockResolvedValueOnce(page2Data);

    render(<Page />);

    fireEvent.click(screen.getByText('2'));

    // NOTE axios 호출이 올바른 URL로 이루어졌는지 확인
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('page=2'));

    // NOTE 페이지 2의 첫 번째 아이템이 화면에 표시되는지 확인
    const item = await screen.findByText('Item 1');
    expect(item).toBeInTheDocument();
  });
  it('"다음" 버튼을 클릭하면 다음 페이지의 데이터가 렌더링되어야 한다', async () => {
    // NOTE 현재 페이지가 1이고, 다음 페이지 클릭 시 페이지 2의 데이터를 반환
    const page2Data = {
      data: {
        items: [
          {
            id: 11,
            originalTitle: 'dfs',
            title: 'dfs는 이렇게 구현하면 안됩니다',
            username: '독수리타법 7남매',
            time: '2024. 04. 10. 11:38',
            content:
              '마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.',
            commentNum: 4,
          },
          {
            id: 12,
            originalTitle: '날씨',
            title: '날씨가 이렇게 맑다니!',
            username: '여행갈고양',
            time: '2025. 02. 10. 10:22',
            content: '여행갈 때에는 오늘의 날씨가 중요하긴 합니다. 그러나',
            commentNum: 4,
          },
        ],
        currentPage: 2,
        totalPages: 2,
      },
    };
    mockedAxios.get.mockResolvedValueOnce(page2Data);

    render(<Page />);

    // "다음" 버튼 클릭
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    // axios 호출이 올바른 URL로 이루어졌는지 확인
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('page=2'));

    // 페이지 2의 첫 번째 아이템이 화면에 표시되는지 확인
    const item = await screen.findByText('dfs는 이렇게 구현하면 안됩니다');
    expect(item).toBeInTheDocument();
  });
});
