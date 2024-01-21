import axios from 'axios';

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
