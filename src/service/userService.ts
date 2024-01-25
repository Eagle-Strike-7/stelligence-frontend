import axios, { AxiosResponse } from 'axios';

interface UserData {
  nickname: string;
  email: string;
  profileUrl: string;
  socialType: string;
}
interface BookmarkData {
  bookmarkId: number;
  documentId: number;
  title: string;
}
interface BadgeData {
  badgeType: string;
  badgeTitle: string;
}

// NOTE 유저 정보 조회
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const response = await axios.get<UserData>(
      // NOTE 테스트용 -> 추후에 변경
      // 'http://localhost:8080/api/members/me',
      '/dummyUserData.json',
    );
    return response.data;
  } catch (error) {
    console.error('회원정보 조회 실패: ', error);
    return null;
  }
};

// NOTE 북마크 정보 조회
export const getBookmarkData = async (): Promise<BookmarkData[] | null> => {
  try {
    const response = await axios.get<BookmarkData[]>(
      // NOTE 테스트용 -> 추후에 변경
      // 'http://localhost:8080/api/bookmarks?page=00&size=00',
      '/dummyBookmarkData.json',
    );
    return response.data;
  } catch (error) {
    console.error('북마크 조회 실패: ', error);
    return null;
  }
};

// NOTE 배지 정보 조회
export const getBadgeData = async (): Promise<BadgeData[] | null> => {
  try {
    const response = await axios.get<BadgeData[]>(
      // NOTE 테스트용 -> 추후에 변경
      // 'http://localhost:8080/api/members/badge',
      '/dummyBadgeData.json',
    );
    return response.data;
  } catch (error) {
    console.error('배지 조회 실패: ', error);
    return null;
  }
};

// NOTE 닉네임 수정
export const putNickname = async (
  newNickname: string,
): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method: 'PUT',
      url: 'http://localhost:8080/api/members/me/nickname',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        nickname: newNickname,
      },
    });

    return response;
  } catch (error) {
    console.error('닉네임 수정 실패: ', error);
    throw error;
  }
};
