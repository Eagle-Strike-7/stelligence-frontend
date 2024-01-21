import axios from 'axios';

// NOTE 닉네임 조회
// TODO 백엔드 실제 url로 변경, response 받은 후 작업
export const getNickname = () => {
  axios
    .get('api/members/me/nickname')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

// NOTE 닉네임 수정
// TODO 백엔드 실제 url로 변경, response 받은 후 작업
const putNickname = (nickname: string) => {
  axios({
    method: 'PUT',
    url: 'api/members/me/nickname',
    headers: {
      'Content-type': 'application/json',
    },
    data: {
      nickname,
    },
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
export default putNickname;
