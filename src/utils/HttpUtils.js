/**
 * Returns all posts from local storage
 * @returns {Promise<any>}
 */
import { Get, Set } from './StorageUtils';

export const GetContent = id => new Promise((resolve, reject) => {
  try {
    const content = Get(`content-${id}`);
    setTimeout(() => {
      resolve(content);
    }, 1000);
  } catch (e) {
    reject(e);
  }
});

export const GetContents = (depth = 1, parent) => new Promise((resolve, reject) => {
  try {
    const contentMeta = Get('content-meta');
    let contents = contentMeta.map(contentId => Get(`content-${contentId}`));
    contents = contents.filter((content) => {
      if (parent) {
        return content.parent === parent;
      }
      return content.depth === depth;
    });
    setTimeout(() => {
      resolve(contents);
    }, 1000);
  } catch (e) {
    reject(e);
  }
});

export const UpdateContent = (content, key, value) => {
  const localContent = Get(`content-${content.id}`);
  localContent[key] = value;
  Set(`content-${content.id}`, localContent);
};

export const SetContent = (content) => {
  if (content) {
    const contentMeta = Get('content-meta') || [];
    // Adding hash of ids to get later
    if (!contentMeta.includes(content.id)) {
      contentMeta.push(content.id);
    }
    Set('content-meta', contentMeta);
    // adding particular content item
    Set(`content-${content.id}`, content);
  }
};
