import { ResponseType } from '@/types/common/ResponseType';
import { AxiosResponse } from 'axios';
import apiClient from '../login/axiosClient';

export interface NotificationData {
  notificationId: number;
  message: string;
  uri: string;
  createdAt: string;
  read: boolean;
}
const getNotifications = async (): Promise<ResponseType<NotificationData>> => {
  try {
    const response =
      await apiClient.get<ResponseType<NotificationData>>('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('알림 조회 실패: ', error);

    throw error;
  }
};

export const patchNotificationAll = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.patch('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('알림 일괄 읽음처리 실패: ', error);
    throw error;
  }
};

export const deleteNotificationAll = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('알림 일괄 삭제 실패: ', error);
    throw error;
  }
};

export const patchNotification = async (
  notificationId: number,
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.patch(
      `/api/notifications/${notificationId}`,
    );
    return response.data;
  } catch (error) {
    console.error('알림 개별 읽음처리 실패: ', error);
    throw error;
  }
};

export const deleteNotification = async (
  notificationId: number,
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete(
      `/api/notifications/${notificationId}`,
    );
    return response.data;
  } catch (error) {
    console.error('알림 개별 삭제 실패: ', error);
    throw error;
  }
};

export default getNotifications;
