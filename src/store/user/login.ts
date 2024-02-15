import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const loggedinUserState = atom({
  key: 'loggedinUserState',
  default: { email: '', nickname: '', profileImgUrl: '' },
});
