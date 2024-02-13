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
export interface BookmarkData {
  bookmarkId: number;
  documentId: number;
  documentTitle: string;
}
interface BadgeData {
  badgeType: string;
  badgeTitle: string;
  badgeEventCategory: string;
  badgeDescription: string;
  badgeImgUrl: string;
}
interface MiniProfileData {
  memberId: number;
  nickname: string;
  profileImgUrl: string;
}
interface BookmarkResponse {
  success: boolean;
  message: string;
  results: {
    hasNext: boolean;
    bookmarks: BookmarkData[];
  };
}
interface BadgeResponse {
  success: boolean;
  message: string;
  results: {
    badges: BadgeData[];
  };
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
export const getBookmarkData = async (
  page: number,
): Promise<BookmarkResponse> => {
  try {
    const response = await apiClient.get<BookmarkResponse>('/api/bookmarks', {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('북마크 조회 실패: ', error);
    throw error;
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

// NOTE 회원 탈퇴
export const deleteUserData = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete('/api/members/me');
    return response.data;
  } catch (error) {
    console.error('회원 탈퇴 실패 ', error);
    throw error;
  }
};

// NOTE 북마크 생성
export const postBookmarkData = async (
  documentId: number,
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post('/api/bookmarks', {
      data: {
        documentId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('북마크 생성 실패 ', error);
    throw error;
  }
};

// NOTE 북마크 삭제
export const deleteBookmarkData = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete('/api/bookmarks');
    return response.data;
  } catch (error) {
    console.error('북마크 삭제 실패 ', error);
    throw error;
  }
};
