const deleteCookie = (name: string, path: string = '/', domain?: string) => {
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  if (path) {
    cookieString += ` path=${path};`;
  }
  if (domain) {
    cookieString += ` domain=${domain};`;
  }
  document.cookie = cookieString;
};

export default deleteCookie;
