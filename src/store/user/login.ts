import { atom } from 'recoil';

const loginState = atom({
  key: 'loginState',
  default: { email: '', nickname: '', profileImgUrl: '' },
});

export default loginState;
