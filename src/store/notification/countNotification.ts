import { atom } from 'recoil';

const countNotification = atom({
  key: 'countNotification',
  default: { hasNotRead: false, count: 0 },
});

export default countNotification;
