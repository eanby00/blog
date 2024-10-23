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

const modifyImage = (image) => {
  const name = image.data.name;
  return {
    name,
    content: image.data.content,
    path: getPath(image.data.path),
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
    const response = await getContent(target);
    if (isFolder(response.data)) {
      response.data.forEach((element) => {
        queue.push(element.path);
      });
    } else if (isMDFile(response.data)) {
      posts.push(response);
    } else {
      images.push(modifyImage(response));
    }
  }

  return { rawPosts: posts, images };
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

const trimPost = async (post, tag) => {
  const raw = decodeBase64(post.content);
  const date = await getDate(post.path);
  const title = post.name.slice(0, post.name.length - 3);

  return {
    id: generateID(title),
    title,
    tag,
    path: getPath(post.path),
    date: formatDate(date),
    "html-url": post["html_url"],
    html: getHTMLFromMD(raw),
    description: getDescription(raw),
  };
};

const trimPosts = (posts) => {
  return Promise.all(
    posts.map(async (post) => await trimPost(post.data, getTag(post.data.path)))
  );
};

const sortPosts = (posts) => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getTags = (posts) => {
  return Array.from(new Set(posts.map((post) => post.tag)));
};

const getPostsAndTagsAndImages = async () => {
  try {
    const { rawPosts, images } = await getRawPosts(GITHUB_API.PATH_POSTS);
    const modifiedPosts = await trimPosts(rawPosts);
    const sortedPosts = sortPosts(modifiedPosts);
    const tags = getTags(sortedPosts);
    return { posts: sortedPosts, tags, images };
  } catch (error) {
    console.log(error.message);
  }
};

export const getData = async () => {
  if (hasData()) {
    const { posts, tags } = loadData();
    return { posts: sortPosts(posts), tags };
  }

  const { posts, tags, images } = await getPostsAndTagsAndImages();
  saveData(posts, tags, images);
  return { posts, tags };
};
