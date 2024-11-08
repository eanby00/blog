import { GITHUB_API } from "../constants/API";
import { hasData, loadData, saveData } from "../store/store";
import { isFolder, isMDFile } from "./checkType";
import { decodeBase64 } from "./decodeBase64";
import { getDescription, getHTMLFromMD } from "./getHTML";
import { generateID } from "./Helper";
import { getCommit, getContent } from "./request";

const getTag = (path) => {
  return path.split("/")[GITHUB_API.TAG_DEPTH];
};

const getPath = (path) => {
  return path.split("/").slice(0, -1).join("/");
};

const getDate = async (path) => {
  const commit = await getCommit(path);
  return new Date(commit.data[0].commit.author.date);
};

const formatDate = (day) => {
  const year = day.getFullYear();
  const month = day.getMonth() + 1;
  const date = day.getDate();
  return `${year}.${month < 10 ? "0" + month.toString() : month}.${date}.`;
};

const modifyPost = async ({ content, path, name, html_url }) => {
  const raw = decodeBase64(content);
  const date = await getDate(path);
  const title = name.slice(0, -3);

  return {
    id: generateID(title),
    title,
    tag: getTag(path),
    path: getPath(path),
    date: formatDate(date),
    html_url,
    html: getHTMLFromMD(raw),
    description: getDescription(raw),
  };
};

const modifyImage = ({ name, content, path }) => {
  return {
    name,
    content,
    path: getPath(path),
    type: name.split(".").pop(),
  };
};

const getRawPosts = async (path) => {
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
    } else {
      images.push(modifyImage(data));
    }
  }

  return { posts, images };
};

const connectImages = (posts, images) => {
  return posts.map((post) => {
    return {
      ...post,
      images: images.filter((image) => post.path === image.path),
    };
  });
};

const sortPosts = (posts) => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getTags = (posts) => {
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
