import { isNumber } from './DataTypeUtils';

/**
 * Returns the human understandable time
 * @param timestamp {Number} Add relative timestamp to compare with current time stamp
 * @returns {string}
 */
export const getHumanReadableTime = (timestamp) => {
  if (!isNumber(timestamp)) {
    return '';
  }
  const now = +new Date();
  // calculating the difference between current time and the param received
  const diff = Math.floor((now - timestamp) / 1000);
  // when both timestamps are equal
  if (diff === 0) {
    return 'just now';
  }
  // when different between timestamps is less than a minute
  if (diff < 60) {
    return 'a few sec. ago';
  }
  // when different between timestamps is 1 or less than 2 minutes
  if (diff === 60 || diff < 120) {
    return '1 minute ago';
  }
  // when different between timestamps is more than 2 minutes or less then an hour
  if (diff > 120 && diff < 3600) {
    return `${Math.floor(diff / 60)} min. ago`;
  }
  // when different between timestamps is 1 or less than 2 hours
  if (diff === 3600 && diff < 7200) {
    return '1 hour ago';
  }
  // when different between timestamps is more than equal to 2 hours or less than a day
  if (diff >= 7200 && diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  }
  // when different between timestamps is 1 or less than 2 days
  if (diff >= 86400 && diff < 172800) {
    return '1 day ago';
  }
  // when different between timestamps is more than equal to 2 days and less than 30 days
  if (diff >= 172800 || diff < 2592000) {
    return `${Math.floor(diff / 86400)} days ago`;
  }
  // after 30 days, show exact date of comment
  const date = new Date(timestamp);

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
/**
 * Give current time stamp
 * @returns {number}
 */
export const getTime = () => +new Date();
