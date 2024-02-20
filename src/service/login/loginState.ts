export const setLoginStateLocalStorage = (isLogin: boolean | undefined) => {
  window.localStorage.setItem('isLogin', JSON.stringify(isLogin));
};

export const getLoginStateLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const isLogin = window.localStorage.getItem('isLogin');
    return isLogin;
  }
  return null;
};

export const removeLoginStateLocalStorage = () => {
  window.localStorage.removeItem('isLogin');
};
