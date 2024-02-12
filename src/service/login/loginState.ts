export const setLoginStateLocalStorage = (isLogin: boolean | undefined) => {
  window.localStorage.setItem('isLogin', JSON.stringify(isLogin));
};

export const getLoginStateLocalStorage = () => {
  const isLogin = window.localStorage.getItem('isLogin');
  return isLogin;
};

export const removeLoginStateLocalStorage = () => {
  window.localStorage.removeItem('isLogin');
};
