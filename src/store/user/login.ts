import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const userData = atom({
  key: 'userData',
  default: { email: '', nickname: '', profileImgUrl: '' },
});
