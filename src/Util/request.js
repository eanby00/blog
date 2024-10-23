import { Octokit } from "octokit";
import { GITHUB_API } from "../constants/API";

const octokit = new Octokit({
  auth: API_KEY,
});

const request = (method, path) => {
  return octokit.request(method, {
    owner: GITHUB_API.OWNER,
    repo: GITHUB_API.REPO,
    path: path,
    header: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

export const getContent = (path) => {
  return request("GET /repos/{owner}/{repo}/contents/{path}", path);
};

export const getCommit = (path) => {
  return request("GET /repos/{owner}/{repo}/commits", path);
};

export const parseMD = (text) => {
  return octokit.request("POST /markdown", {
    text: text,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
