import axios from 'axios';

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

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const response = await axios.get<UserData>(
      'http://localhost:8080/api/members/me',
    );
    return response.data;
  } catch (error) {
    console.error('회원정보 조회 실패: ', error);
    return null;
  }
};

export const getBookmarkData = async (): Promise<BookmarkData[] | null> => {
  try {
    const response = await axios.get<BookmarkData[]>(
      'http://localhost:8080/api/bookmarks?page=00&size=00',
    );
    return response.data;
  } catch (error) {
    console.error('북마크 조회 실패: ', error);
    return null;
  }
};
