export const setStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const getKey = (index) => {
  return sessionStorage.key(index);
};

export const getPosts = () => {
  const posts = [];
  for (let i = 0; i < sessionStorage.length; ++i) {
    const key = getKey(i);
    if (key !== "tags" && key !== "IsThisFirstTime_Log_From_LiveServer") {
      posts.push(getStorage(key));
    }
  }
  return posts;
};

export const getTags = () => {
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
