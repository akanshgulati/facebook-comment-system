
/**
 * Generate unique uuid for ids of content
 * @returns {string}
 */
/* eslint-disable */
export const generateId = () => 'xxxxxxxx-xxxx-Sxxx-Uxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  let r = Math.random() * 16 | 0,
    v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
/**
 * Returns singular or plural string based on the count
 * @param singular
 * @param plural
 * @param count
 * @returns {*}
 */
export const getPlural = (singular, plural, count) => {
  if (count > 1) {
    return plural;
  }
  return singular;
};
/**
 * Trim the string to show ellipsis if content is larger than expected length
 * @param content
 * @param length
 * @returns {*}
 */
export const trim = (content, length) => {
  if (content.length > length) {
    return content.slice(0, length) + '...';
  }
  return content
};
