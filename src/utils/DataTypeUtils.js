export const isNumber = (data) => {
  return Object.prototype.toString.call(data) === "[object Number]";
};
