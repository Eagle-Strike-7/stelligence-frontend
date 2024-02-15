import { ResponseType } from '@/types/common/ResponseType';
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

export default getNotifications;
