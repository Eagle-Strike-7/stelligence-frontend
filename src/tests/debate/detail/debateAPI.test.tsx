import { getDebateData } from '@/app/debate-list/[debateId]/page.server';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('토론 상세 페이지 데이터 패칭', () => {
  test('데이터 패칭 성공', async () => {
    const mockApiResponse = {
      data: {
        success: true,
        message: 'Data fetched successfully',
        results: {
          debateId: 1,
          createdAt: '2024-02-05T06:01:18.420Z',
          endAt: '2024-02-05T06:01:18.420Z',
          documentId: 1,
          documentTitle: 'Sample Debate',
          contributor: {
            memberId: 1,
            nickname: 'Contributor',
            profileImgUrl: 'http://example.com/profile.jpg',
          },
          contributeId: 1,
          contributeTitle: 'Contribution Title',
          contributeDescription: 'Contribution Description',
          amendments: [],
          prevDebate: null,
          nextDebate: null,
        },
      },
    };

    mockedAxios.get.mockResolvedValue(mockApiResponse);

    const debateDetail = await getDebateData(1);
    expect(debateDetail).toEqual(mockApiResponse.data.results);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/debates/1`,
    );
  });
});
