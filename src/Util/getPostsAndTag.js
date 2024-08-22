import { GITHUB_API } from "../constants/API";
import { Octokit } from "octokit";
import { isFolder, isMDFile } from "./typeCheck";

export const getPostsAndTags = () => {
  const octokit = new Octokit({
    auth: API_KEY,
  });
  const posts = [];
  const tags = new Set();

  const getTag = (path) => {
    return path.split("/")[GITHUB_API.TAG_DEPTH];
  };

  const setTag = (tag) => {
    tags.add(tag);
  };

  const getContent = async (octokit, path) => {
    return await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: GITHUB_API.OWNER,
      repo: GITHUB_API.REPO,
      path: path,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  };

  const appendPostAndTag = (response) => {
    const tag = getTag(response.data.path);
    setTag(tag);

    posts.push({
      ...response.data,
      title: response.data.name.slice(0, response.data.name.length - 2),
      tag,
      "last-modified": response.headers["last-modified"],
    });
  };

  const getPost = async (path) => {
    const response = await getContent(octokit, path);

    if (isFolder(response.data)) {
      response.data.forEach(async (data) => {
        await getPost(data.path);
      });
    } else if (isMDFile(response.data)) {
      appendPostAndTag(response);
    }
  };

  const getPosts = async () => {
    await getPost(GITHUB_API.PATH_POSTS);
  };

  getPosts();
  return {
    posts,
    tags,
  };
};
