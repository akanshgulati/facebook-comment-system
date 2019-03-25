/**
 * Returns the value from local storage based on key
 * @param key
 * @returns {string}
 * @constructor
 */
export const Get = (key) => {
  if (!key) {
    return '';
  }
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : '';
};
/**
 * Update or override the local storage when value and key are present
 * @param key
 * @param value
 * @constructor
 */
export const Set = (key, value) => {
  if (!key || value === undefined || value === null) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};
