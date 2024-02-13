export const setLatestLogin = (socialType: string | undefined) => {
  window.localStorage.setItem('socialType', JSON.stringify(socialType));
};

export const getLatestLogin = () => {
  const socialType = window.localStorage.getItem('socialType');
  return socialType;
};
