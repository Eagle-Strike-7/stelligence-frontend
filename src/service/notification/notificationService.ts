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

export const deleteNotificationAll = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('알림 일괄 삭제 실패: ', error);
    throw error;
  }
};

export default getNotifications;
