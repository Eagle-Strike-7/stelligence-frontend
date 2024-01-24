import axios from 'axios';

interface UserData {
  nickname: string;
  email: string;
  profileUrl: string;
  socialType: string;
}

const getUserData = async (): Promise<UserData | null> => {
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

export default getUserData;
