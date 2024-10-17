import { GITHUB_API } from "../constants/API";
import { Octokit } from "octokit";
import { isFolder, isMDFile } from "./checkType";
import { decodeBase64 } from "./decodeBase64";
import { getDescription, getHTMLFromMD } from "./getHTML";

const getContent = async (path) => {
  const octokit = new Octokit({
    auth: API_KEY,
  });

  return await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: GITHUB_API.OWNER,
    repo: GITHUB_API.REPO,
    path: path,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

const getDate = async (path) => {
  const octokit = new Octokit({
    auth: API_KEY,
  });

  const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: GITHUB_API.OWNER,
    repo: GITHUB_API.REPO,
    path: path,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return new Date(response.data[0].commit.author.date);
};

const formatDate = (day) => {
  const year = day.getFullYear();
  const month = day.getMonth() + 1;
  const date = day.getDate();
  return `${year}.${month < 10 ? "0" + month.toString() : month}.${date}`;
};

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

const getTags = (posts) => {
  return Array.from(new Set(posts.map((post) => post.tag)));
};

const modifyPost = async (post, tag) => {
  const raw = decodeBase64(post.data.content);
  const date = await getDate(post.data.path);
  return {
    title: post.data.name.slice(0, post.data.name.length - 2),
    tag,
    date: formatDate(date),
    "html-url": post.data["html_url"],
    html: getHTMLFromMD(raw),
    description: getDescription(raw),
  };
};

const modifyPosts = (posts) => {
  return Promise.all(
    posts.map(async (post) => await modifyPost(post, getTag(post.data.path)))
  );
};

export const getPostsAndTags = async () => {
  try {
    const rawPosts = await getRawPosts(GITHUB_API.PATH_POSTS);
    const modifiedPosts = await modifyPosts(rawPosts);
    const tags = getTags(modifiedPosts);
    return { posts: modifiedPosts, tags };
  } catch (error) {
    console.log(error.message);
  }
};
