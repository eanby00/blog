import { Octokit } from "octokit";

export const $ = (identifier) => {
  return document.querySelector(identifier);
};

export const octokit = new Octokit({
  auth: API_KEY,
});
