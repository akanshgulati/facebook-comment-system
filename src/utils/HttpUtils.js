export const StorageKeys = {
  USER_META: 'user-meta',
  USER: 'user-',
  CONTENT_META: 'content-meta',
  CONTENT: 'content-'
};
/**
 * Returns all posts from local storage
 * @returns {Promise<any>}
 */
import { Get, Set } from './StorageUtils';

export const GetContent = id => new Promise((resolve, reject) => {
  try {
    const content = Get(`${StorageKeys.CONTENT}${id}`);
    // to mock a call from backend, adding a timeout of 1 second
    setTimeout(() => {
      resolve(content);
    }, 1000);
  } catch (e) {
    reject(e);
  }
});

export const GetContents = (depth = 1, parent) => new Promise((resolve, reject) => {
  try {
    const contentMeta = Get(StorageKeys.CONTENT_META);
    let contents = contentMeta.map(contentId => Get(`${StorageKeys.CONTENT}${contentId}`));
    contents = contents.filter((content) => {
      if (parent) {
        return content.parent === parent;
      }
      return content.depth === depth;
    });
    // to mock a call from backend, adding a timeout of 1 second
    setTimeout(() => {
      resolve(contents);
    }, 1000);
  } catch (e) {
    reject(e);
  }
});

export const UpdateContent = (content, key, value) => {
  const localContent = Get(`${StorageKeys.CONTENT}${content.id}`);
  if (!localContent) {
    return;
  }
  localContent[key] = value;
  Set(`${StorageKeys.CONTENT}${content.id}`, localContent);
};

export const SetContent = (content) => {
  if (content) {
    const contentMeta = Get(StorageKeys.CONTENT_META) || [];
    // Adding hash of ids to get later
    if (!contentMeta.includes(content.id)) {
      contentMeta.push(content.id);
    }
    Set(StorageKeys.CONTENT_META, contentMeta);
    // adding particular content item
    Set(`${StorageKeys.CONTENT}${content.id}`, content);
  }
};

/**
 * Give list of all users and their details from local storage
 * @param userId
 * @returns {Promise<any>}
 * @constructor
 */
export const GetUsers = (userId) => new Promise((resolve, reject) => {
  try {
    const userMeta = Get(StorageKeys.USER_META);
    let users = userMeta.map(userId => Get(`${StorageKeys.USER}${userId}`));
    // Sending a single user detail in case userId is mentioned
    if (userId) {
      users = users.filter((user) => {
        return user.id === userId;
      })[0];
    }
    // to mock a call from backend, adding a timeout of 1 second
    setTimeout(() => {
      resolve(users);
    }, 1000);
  } catch (e) {
    reject(e);
  }
});

export const SetUser = (userData) =>{
  if(userData){
    const userMeta = Get(StorageKeys.USER_META) || [];
    // Adding hash of ids to get later
    if (!userMeta.includes(userData.id)) {
      userMeta.push(userData.id);
    }
    Set(StorageKeys.USER_META, userMeta);
    // adding particular content item
    Set(`${StorageKeys.USER}${userData.id}`, userData);
  }
};
