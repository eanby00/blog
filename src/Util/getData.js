import { GITHUB_API } from "../constants/API";
import { hasData, loadData, saveData } from "../store/store";
import { isFolder, isImgFile, isMDFile } from "./checkType";
import { decodeBase64 } from "./decodeBase64";
import { getDescription, getHTMLFromMD } from "./getHTML";
import { generateID } from "./Helper";
import { getCommit, getContent } from "./request";

export const getTag = (path) => {
  return path.split("/")[GITHUB_API.TAG_DEPTH];
};

export const getPath = (path) => {
  return path.split("/").slice(0, -1).join("/");
};

export const getDate = async (path) => {
  const commit = await getCommit(path);
  return commit ? new Date(commit.data[0].commit.author.date) : null;
};

export const formatDate = (day) => {
  const year = day.getFullYear();
  const month = day.getMonth() + 1;
  const date = day.getDate();
  return `${year}.${month < 10 ? "0" + month.toString() : month}.${date}.`;
};

export const modifyPost = async ({ content, path, name, html_url }) => {
  const raw = decodeBase64(content);
  const date = await getDate(path);
  const title = name.slice(0, -3);

  return {
    id: generateID(title),
    title,
    tag: getTag(path),
    path: getPath(path),
    date: date ? formatDate(date) : null,
    html_url,
    html: getHTMLFromMD(raw),
    description: getDescription(raw),
  };
};

export const modifyImage = ({ name, content, path }) => {
  return {
    name,
    content,
    path: getPath(path),
    type: name.split(".").pop(),
  };
};

export const getRawPosts = async (path) => {
  const posts = [];
  const images = [];
  const queue = [];
  queue.push(path);

  while (queue.length > 0) {
    const target = queue.shift();
    const { data } = await getContent(target);
    if (isFolder(data)) {
      data.forEach((element) => {
        queue.push(element.path);
      });
    } else if (isMDFile(data)) {
      posts.push(await modifyPost(data));
    } else if (isImgFile(data)) {
      images.push(modifyImage(data));
    }
  }

  return { posts, images };
};

export const connectImages = (posts, images) => {
  return posts.map((post) => {
    return {
      ...post,
      images: images.filter((image) => post.path === image.path),
    };
  });
};

export const sortPosts = (posts) => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getTags = (posts) => {
  return Array.from(new Set(posts.map((post) => post.tag)));
};

const getData = async () => {
  try {
    const { posts, images } = await getRawPosts(GITHUB_API.PATH_POSTS);
    const postsWithImage = connectImages(posts, images);
    const sortedPosts = sortPosts(postsWithImage);
    const tags = getTags(sortedPosts);
    return { posts: sortedPosts, tags };
  } catch (error) {
    console.log(error.message);
  }
};

export const getDatas = async () => {
  if (hasData()) {
    const { posts, tags } = loadData();
    return { posts: sortPosts(posts), tags };
  }

  const { posts, tags } = await getData();
  saveData(posts, tags);
  return { posts, tags };
};
