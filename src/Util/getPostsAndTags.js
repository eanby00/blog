import { GITHUB_API } from "../constants/API";
import { Octokit } from "octokit";
import { isFolder, isMDFile } from "./typeCheck";
import { decodeBase64 } from "./decodeBase64";
import { getDescription, getHTMLFromMD } from "./getHTML";

export const getPostsAndTags = () => {
  const octokit = new Octokit({
    auth: API_KEY,
  });

  const posts = [];
  const tags = new Set();

  const getTag = (path) => {
    return path.split("/")[GITHUB_API.TAG_DEPTH];
  };

  const addTag = (tag) => {
    tags.add(tag);
  };

  const addPost = (response, tag) => {
    const raw = decodeBase64(response.data.content);

    posts.push({
      title: response.data.name.slice(0, response.data.name.length - 2),
      tag,
      "last-modified": response.headers["last-modified"],
      "html-url": response.data["html_url"],
      html: getHTMLFromMD(raw),
      description: getDescription(raw),
    });
  };

  const addPostAndTag = (response) => {
    const tag = getTag(response.data.path);
    addTag(tag);
    addPost(response, tag);
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

  const getPost = async (path) => {
    const response = await getContent(octokit, path);

    if (isFolder(response.data)) {
      response.data.forEach(async (data) => {
        await getPost(data.path);
      });
    } else if (isMDFile(response.data)) {
      addPostAndTag(response);
    }
  };

  const getPosts = async () => {
    try {
      await getPost(GITHUB_API.PATH_POSTS);
    } catch (error) {
      console.log(error.message);
    }
  };

  getPosts();
  return {
    posts,
    tags,
  };
};
