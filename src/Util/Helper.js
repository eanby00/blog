import { Octokit } from "octokit";

export const $ = (identifier) => {
  return document.querySelector(identifier);
};

export const octokit = new Octokit({
  auth: API_KEY,
});

export const createElement = (selector, targetTag) => {
  return document
    .importNode($(selector).content, true)
    .querySelector(targetTag);
};

export const hasClass = (targetTag, className) => {
  return targetTag.classList.contains(className);
};
