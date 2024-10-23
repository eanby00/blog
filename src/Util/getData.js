import { GITHUB_API } from "../constants/API";
import { hasData, loadData, saveData } from "../store/store";
import { isFolder, isMDFile } from "./checkType";
import { decodeBase64 } from "./decodeBase64";
import { getDescription, getHTMLFromMD } from "./getHTML";
import { $, generateID } from "./Helper";
import { getCommit, getContent } from "./request";

const getPath = (path) => {
  return path.split("/").slice(0, -1).join("/");
};

const modifyPost = async ({ data }) => {
  const raw = decodeBase64(data.content);
  const date = await getDate(data.path);
  const title = data.name.slice(0, data.name.length - 3);

  return {
    id: generateID(title),
    title,
    tag: getTag(data.path),
    path: getPath(data.path),
    date: formatDate(date),
    "html-url": data["html_url"],
    html: getHTMLFromMD(raw),
    description: getDescription(raw),
  };
};

const modifyImage = ({ data }) => {
  return {
    name: data.name,
    content: data.content,
    path: getPath(data.path),
    type: data.name.split(".").pop(),
  };
};

const getRawPosts = async (path) => {
  const posts = [];
  const images = [];
  const queue = [];
  queue.push(path);

  while (queue.length > 0) {
    const target = queue.shift();
    const response = await getContent(target);
    if (isFolder(response.data)) {
      response.data.forEach((element) => {
        queue.push(element.path);
      });
    } else if (isMDFile(response.data)) {
      posts.push(await modifyPost(response));
    } else {
      images.push(modifyImage(response));
    }
  }

  return { posts, images };
};

const getTag = (path) => {
  return path.split("/")[GITHUB_API.TAG_DEPTH];
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
