import { GITHUB_API } from "../constants/API";
import { hasData, loadData, saveData } from "../store/store";
import { isFolder, isMDFile } from "./checkType";
import { decodeBase64 } from "./decodeBase64";
import { getDescription, getHTMLFromMD } from "./getHTML";
import { getCommit, getContent } from "./request";

const getRawPosts = async (path) => {
  const posts = [];
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
    }
  }

  return posts;
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

const modifyPost = async (post, tag) => {
  const raw = decodeBase64(post.content);
  const date = await getDate(post.path);
  return {
    title: post.name.slice(0, post.name.length - 3),
    tag,
    date: formatDate(date),
    "html-url": post["html_url"],
    html: getHTMLFromMD(raw),
    description: getDescription(raw),
  };
};

const modifyPosts = (posts) => {
  return Promise.all(
    posts.map(
      async (post) => await modifyPost(post.data, getTag(post.data.path))
    )
  );
};

const sortPosts = (posts) => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getTags = (posts) => {
  return Array.from(new Set(posts.map((post) => post.tag)));
};

const getPostsAndTags = async () => {
  try {
    const rawPosts = await getRawPosts(GITHUB_API.PATH_POSTS);
    const modifiedPosts = await modifyPosts(rawPosts);
    const sortedPosts = sortPosts(modifiedPosts);
    const tags = getTags(sortedPosts);
    return { posts: sortedPosts, tags };
  } catch (error) {
    console.log(error.message);
  }
};

export const getData = async () => {
  if (hasData()) {
    return loadData();
  }

  const { posts, tags } = await getPostsAndTags();
  saveData(posts, tags);
  return { posts, tags };
};