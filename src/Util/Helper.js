export const $ = (identifier, targetTag) => {
  return targetTag
    ? targetTag.querySelector(identifier)
    : document.querySelector(identifier);
};

export const $All = (identifier, targetTag) => {
  return targetTag
    ? targetTag.querySelectorAll(identifier)
    : document.querySelectorAll(identifier);
};

export const createElement = (selector, targetTag) => {
  return document
    .importNode($(selector).content, true)
    .querySelector(targetTag);
};

export const hasClass = (targetTag, className) => {
  return targetTag.classList.contains(className);
};

export const generateID = (title) => {
  const titleCode = title
    .split("")
    .map((char) => char.charCodeAt())
    .reduce((prev, curr) => prev + curr, 0)
    .toString(16);
  const randomDate = (Date.now() * Math.random()).toString(16).replace(".", "");
  return titleCode + randomDate;
};

export const sortArray = (array) => {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const deduplication = (array) => {
  return Array.from(new Set(array));
};
