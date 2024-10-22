export const $ = (identifier) => {
  return document.querySelector(identifier);
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
