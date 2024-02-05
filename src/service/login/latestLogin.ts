export const setLatestLogin = (socialType: string | undefined) => {
  localStorage.setItem('socialType', JSON.stringify(socialType));
};

export const getLatestLogin = () => {
  const socialType = localStorage.getItem('socialType');
  return socialType;
};
