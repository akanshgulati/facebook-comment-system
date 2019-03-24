/* eslint-disable */
export const generateId = () => 'xxxxxxxx-xxxx-Sxxx-Uxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  let r = Math.random() * 16 | 0,
    v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
export const getPlural = (singular, plural, count) => {
  if (count > 1) {
    return plural;
  }
  return singular;
};

