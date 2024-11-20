import { KEY_TYPE } from "../constants/STORE";

export const setStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

const getKey = (index) => {
  return sessionStorage.key(index);
};

const getPosts = () => {
  const posts = [];
  for (let i = 0; i < sessionStorage.length; ++i) {
    const key = getKey(i);
    if (!KEY_TYPE.WITHOUT_POST.includes(key)) {
      posts.push(getStorage(key));
    }
  }
  return posts;
};

const getTags = () => {
  return getStorage("tags");
};

export const hasData = () => {
  return getStorage("tags") ? true : false;
};

export const saveData = (posts, tags) => {
  posts.forEach((post) => {
    setStorage(post.id, post);
  });
  setStorage("tags", tags);
};

export const loadData = () => {
  return { posts: getPosts(), tags: getTags() };
};
