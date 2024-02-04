import { AxiosResponse } from 'axios';
import apiClient from './login/axiosClient';

interface UserData {
  nickname: string;
  email: string;
  profileImgUrl: string;
  socialType: string;
}
interface UserResponse {
  success: boolean;
  message: string;
  results: UserData;
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
interface MiniProfileData {
  memberId: number;
  nickname: string;
  profileImgUrl: string;
}
interface BookmarkResponse {
  success: boolean;
  message: string;
  results: BookmarkData[];
}
interface BadgeResponse {
  success: boolean;
  message: string;
  results: BadgeData[];
}
interface MiniProfileResponse {
  success: boolean;
  message: string;
  results: MiniProfileData;
}

// NOTE 유저 정보 조회
export const getUserData = async (): Promise<UserResponse | null> => {
  try {
    const response = await apiClient.get<UserResponse>('/api/members/me');
    return response.data;
  } catch (error) {
    console.error('회원정보 조회 실패: ', error);
    return null;
  }
};

// NOTE 북마크 정보 조회
export const getBookmarkData = async (): Promise<BookmarkResponse | null> => {
  try {
    const response = await apiClient.get<BookmarkResponse>('/api/bookmarks');
    return response.data;
  } catch (error) {
    console.error('북마크 조회 실패: ', error);
    return null;
  }
};

// NOTE 배지 정보 조회
export const getBadgeData = async (): Promise<BadgeResponse | null> => {
  try {
    const response = await apiClient.get<BadgeResponse>(
      '/api/members/me/badges',
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
    const response = await apiClient.put('/api/members/me/nickname', {
      nickname: newNickname,
    });

    return response.data;
  } catch (error) {
    console.error('닉네임 수정 실패: ', error);
    throw error;
  }
};

// NOTE 미니프로필 정보 조회
export const getMiniProfile = async (): Promise<MiniProfileResponse | null> => {
  try {
    const response = await apiClient.get<MiniProfileResponse>(
      '/api/members/me/mini-profile',
    );
    return response.data;
  } catch (error) {
    console.error('미니프로필 조회 실패: ', error);
    return null;
  }
};
