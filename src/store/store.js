const setStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key) => {
  return sessionStorage.getItem(key);
};

const getKey = (index) => {
  return sessionStorage.key(index);
};

const getPosts = () => {
  const posts = [];
  for (let i = 0; i < sessionStorage.length; ++i) {
    const key = getKey(i);
    if (key !== "tags" && key !== "IsThisFirstTime_Log_From_LiveServer") {
      posts.push(JSON.parse(getStorage(key)));
    }
  }
  return posts;
};

const getTags = () => {
  return JSON.parse(getStorage("tags"));
};

export const hasData = () => {
  return sessionStorage.length > 1;
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
