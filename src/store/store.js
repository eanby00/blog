const setStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

const getStorage = (key) => {
  return sessionStorage.getItem(key);
};

export const saveData = (posts, tags) => {
  setStorage("posts", posts);
  setStorage("tags", tags);
};

export const loadData = () => {
  const posts = JSON.parse(getStorage("posts"));
  const tags = JSON.parse(getStorage("tags"));
  return { posts, tags };
};

export const hasData = () => {
  return !(sessionStorage.length === 0);
};
