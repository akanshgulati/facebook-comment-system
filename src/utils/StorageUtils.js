export const Get = (key) => {
  if (!key) {
    return '';
  }
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : '';
};
export const Set = (key, value) => {
  if (!key || value === undefined || value === null) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};
