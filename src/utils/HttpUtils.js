/**
 * Returns all posts from local storage
 * @returns {Promise<any>}
 */
import { Get, Set } from './StorageUtils';

export const StorageKeys = {
  USER_META: 'user-meta',
  USER: 'user-',
  CONTENT_META: 'content-meta',
  CONTENT: 'content-',
};

/**
 * Returns the content from the storage, it is done in two steps
 * 1. Get all ids from content meta key
 * 2. Get content details by traversing ids in a loop
 * @param depth
 * @param parent
 * @returns {Promise<any>}
 * @constructor
 */
export const GetContents = (depth = 1, parent) => new Promise((resolve, reject) => {
  try {
    const contentMeta = Get(StorageKeys.CONTENT_META);
    let contents = contentMeta.map(contentId => Get(`${StorageKeys.CONTENT}${contentId}`));
    if (depth !== 0) {
      contents = contents.filter((content) => {
        if (parent) {
          return content.parent === parent;
        }
        return content.depth === depth;
      });
    }
    // to mock a call from backend, adding a timeout of 1 second
    setTimeout(() => {
      resolve(contents);
    }, 1000);
  } catch (e) {
    reject(e);
  }
});
/**
 * To update a particular content key
 * @param content
 * @param key
 * @param value
 * @constructor
 */
export const UpdateContent = (content, key, value) => {
  const localContent = Get(`${StorageKeys.CONTENT}${content.id}`);
  if (!localContent) {
    return;
  }
  localContent[key] = value;
  Set(`${StorageKeys.CONTENT}${content.id}`, localContent);
};
/**
 * Post new content to local storage
 * @param content
 * @constructor
 */
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
export const GetUsers = userId => new Promise((resolve, reject) => {
  try {
    const userMeta = Get(StorageKeys.USER_META);
    let users = userMeta.map(userKey => Get(`${StorageKeys.USER}${userKey}`));
    // Sending a single user detail in case userId is mentioned
    if (userId) {
      users = users.filter(user => user.id === userId)[0];
    }
    // to mock a call from backend, adding a timeout of 1 second
    setTimeout(() => {
      resolve(users);
    }, 1000);
  } catch (e) {
    reject(e);
  }
});

export const SetUser = (userData) => {
  if (userData) {
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
