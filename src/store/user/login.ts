import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const loggedInUserState = atom({
  key: 'loggedInUserState',
  default: { memberId: 0, email: '', nickname: '', profileImgUrl: '' },
});
