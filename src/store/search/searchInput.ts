import { atom } from 'recoil';

const searchTextState = atom({
  key: 'searchTextState',
  default: '',
});

export default searchTextState;
